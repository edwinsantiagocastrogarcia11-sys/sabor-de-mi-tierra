require("dotenv").config();
const fs = require("fs");
const path = require("path");
const conectarDB = require("./config/db");
const Plato = require("./models/Plato");

(async () => {
    await conectarDB();

    if ((await Plato.countDocuments()) > 0) {
        console.log("Los platos ya han sido cargados en la base de datos.");
        process.exit(0);
    }

    const datos = JSON.parse(
        fs.readFileSync(path.join(__dirname, "data/platos.json"), "utf-8")
    );

    await Plato.insertMany(
        datos.map(({ nombre, descripcion, precio, img, categoria, disponible }) => ({
            nombre, descripcion, precio, img, categoria, disponible: disponible !== false,
        }))
    );

    console.log("Platos importados: " + datos.length);
    process.exit(0);
})();