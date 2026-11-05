const express = require("express");
const Plato = require("../models/Plato");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        res.json(await Plato.find().sort({nombre: 1 }));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "No se pudieron cargar los platos."});
    }
});

module.exports = router;