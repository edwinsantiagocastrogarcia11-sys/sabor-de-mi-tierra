const express = require("express");
const Plato = require("../models/Plato");
const { requiereAdmin } = require("../middleware/auth");

const router = express.Router();

const CAMPOS = ["nombre", "descripcion", "precio", "img", "categoria", "disponible"];

// Se queda solo con los campos permitidos
function soloPermitidos(body) {
    const datos = {};
    CAMPOS.forEach((campo) => {
        if (body[campo] !== undefined) {
            datos[campo] = body[campo];
        }
    });
    return datos;
}

// Ver platos (público)
router.get("/", async (req, res) => {
    try {
        const platos = await Plato.find().sort({ nombre: 1 });
        res.json(platos);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron leer los platos." });
    }
});

// Crear plato (solo admin)
router.post("/", requiereAdmin, async (req, res) => {
    try {
        const plato = await Plato.create(soloPermitidos(req.body));
        res.status(201).json(plato);
    } catch (error) {
        res.status(400).json({ error: "Datos del plato no válidos." });
    }
});

// Editar plato (solo admin)
router.put("/:id", requiereAdmin, async (req, res) => {
    try {
        const plato = await Plato.findByIdAndUpdate(
            req.params.id,
            soloPermitidos(req.body),
            { new: true, runValidators: true }
        );
        if (!plato) {
            return res.status(404).json({ error: "Plato no encontrado." });
        }
        res.json(plato);
    } catch (error) {
        res.status(400).json({ error: "No se pudo editar el plato." });
    }
});

// Borrar plato (solo admin)
router.delete("/:id", requiereAdmin, async (req, res) => {
    try {
        const plato = await Plato.findByIdAndDelete(req.params.id);
        if (!plato) {
            return res.status(404).json({ error: "Plato no encontrado." });
        }
        res.json({ ok: true });
    } catch (error) {
        res.status(400).json({ error: "No se pudo borrar el plato." });
    }
});

module.exports = router;