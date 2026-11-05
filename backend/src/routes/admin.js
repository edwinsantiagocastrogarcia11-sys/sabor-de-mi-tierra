const express = require("express");
const crypto = require("crypto");
const Contacto = require("../models/Contacto");
const { crearToken, requiereAdmin } = require("../middleware/auth");

const router = express.Router();

function hash(texto) {
    return crypto.createHash("sha256").update(String(texto)).digest();
}
function iguales(a, b) {
    return crypto.timingSafeEqual(hash(a), hash(b));
}

router.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) {
        return res.status(500).json({ error: "Falta configurar el administrador."});
    }
    if (
        iguales(usuario || "", process.env.ADMIN_USER) &&
        iguales(password || "", process.env.ADMIN_PASSWORD)
    ) {
        return res.json({ token: crearToken() });
    }
    res.status(401).json({ error: "Usuario o contraseña incorrectos." });
});

router.get("/mensajes", requiereAdmin, async (req, res) => {
    try {
        const mensajes = await Contacto.find().sort({ createdAt: -1 });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron leer los mensajes." });
    }
});
 module.exports = router;