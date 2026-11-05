const express = require("express");
const Contacto = require("../models/Contacto");

const router = express.Router();
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
    try {
        const nombre = String(req.body.nombre || "").trim();
        const email = String(req.body.email || "").trim();
        const mensaje = String(req.body.mensaje || "").trim();

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: "Completa todos los campos." });
        }
        if (!EMAIL.test(email)) {
            return res.status(400).json({ error: "Correo electrónico inválido." });
        }

        await Contacto.create({ nombre, email, mensaje });
        res.status(201).json({ ok: true });
    } catch (error) {
        console.log("Error en contacto:", error.message);
        res.status(500).json({ error: "No se pudo guardar el mensaje." });
    }
});

module.exports = router;