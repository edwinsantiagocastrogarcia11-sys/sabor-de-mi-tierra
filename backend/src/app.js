require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());

app.use("/api/platos", require("./routes/platos"));
app.use("/api/contacto", require("./routes/contacto"));
app.use("/api/admin", require("./routes/admin"));

app.use("/api", (req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;