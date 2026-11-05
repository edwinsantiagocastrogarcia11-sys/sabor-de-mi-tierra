const app = require("./app");
const conectarDB = require("./config/db");

const PORT = process.env.PORT || 3000;

conectarDB().then(() => {
    app.listen(PORT, () => {
        console .log("Servidor ejecutandose en http;//localhost:" + PORT);
    });
});