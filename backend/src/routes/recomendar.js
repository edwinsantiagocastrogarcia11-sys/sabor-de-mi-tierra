const express = require("express");
const Plato = require("../models/Plato");

const router = express.Router();
const MODELO = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// Quita tildes y pasa a minúsculas para comparar palabras
function limpiar(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Plan B: busca el plato con más palabras en común
function recomendarPorPalabras(gusto, platos) {
    const palabras = limpiar(gusto).split(/\s+/).filter((p) => p.length > 2);
    let mejor = platos[0];
    let mejorPuntos = -1;

    platos.forEach((plato) => {
        const texto = limpiar(plato.nombre + " " + plato.descripcion + " " + plato.categoria);
        let puntos = 0;
        palabras.forEach((palabra) => {
            if (texto.includes(palabra)) puntos++;
        });
        if (puntos > mejorPuntos) {
            mejorPuntos = puntos;
            mejor = plato;
        }
    });

    return "Te recomendamos: " + mejor.nombre + ". " + mejor.descripcion;
}

// Plan A: pregunta a Gemini
async function preguntarGemini(gusto, platos) {
    const lista = platos
        .map((p) => "- " + p.nombre + ": " + p.descripcion + " (" + p.categoria + ")")
        .join("\n");

    const instruccion =
        'Eres el mesero de "Sabor de mi tierra", un restaurante de comida típica colombiana. ' +
        "Recomienda UN plato del menú según el antojo del cliente. " +
        "Usa solo platos de esta lista:\n" + lista + "\n" +
        "Responde en español, amable y en máximo 3 frases. " +
        "Si el antojo no tiene relación con comida, pide amablemente que cuente qué se le antoja.";

    const respuesta = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/" + MODELO + ":generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY,
            },
            body: JSON.stringify({
                contents: [
                    { parts: [{ text: instruccion + "\n\nAntojo del cliente: " + gusto }] },
                ],
            }),
        }
    );

    if (!respuesta.ok) {
        throw new Error("Gemini respondió " + respuesta.status);
    }

    const datos = await respuesta.json();
    return datos.candidates[0].content.parts[0].text.trim();
}

router.post("/", async (req, res) => {
    try {
        const gusto = String(req.body.gusto || "").trim();

        if (!gusto) {
            return res.status(400).json({ error: "Cuéntanos qué se te antoja." });
        }
        if (gusto.length > 200) {
            return res.status(400).json({ error: "Tu antojo es muy largo (máximo 200 letras)." });
        }

        const platos = await Plato.find({ disponible: true });
        if (platos.length === 0) {
            return res.status(404).json({ error: "Por ahora no hay platos disponibles." });
        }

        let texto;
        let origen = "palabras";

        if (process.env.GEMINI_API_KEY) {
            try {
                texto = await preguntarGemini(gusto, platos);
                origen = "gemini";
            } catch (error) {
                console.log("Error con Gemini:", error.message);
            }
        }

        if (!texto) {
            texto = recomendarPorPalabras(gusto, platos);
        }

        res.json({ respuesta: texto, origen });
    } catch (error) {
        console.log("Error en recomendar:", error.message);
        res.status(500).json({ error: "No pudimos generar una recomendación." });
    }
});

module.exports = router;