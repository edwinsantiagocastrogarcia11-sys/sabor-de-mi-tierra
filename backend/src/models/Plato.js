const mongoose = require("mongoose");

const platoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true, maxlength: 100 },
    descripcion: { type: String, required: true, trim: true, maxlength: 500 },
    img: { type:String, default: "" },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, default: "", trim: true },
    disponible: { type: Boolean, default: true }
}, {timestamps: true});

module.exports = mongoose.model("Plato", platoSchema);