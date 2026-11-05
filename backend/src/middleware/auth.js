const crypto = require("crypto");

function firmar(texto) {
    return crypto
        .createHmac("sha256", process.env.ADMIN_SECRET)
        .update(texto)
        .digest("hex");
}

function crearToken() {
    const expira = Date.now() + 2 * 60 * 60 * 1000; // dura 2 horas
    return expira + "." + firmar(String(expira));
}

function tokenValido(token) {
    if (!token) return false;
    const [expira, firma] = token.split(".");
    if (!expira || !firma) return false;
    if (Number(expira) < Date.now()) return false;

    const esperada = firmar(expira);
    if (firma.length !== esperada.length) return false;
    return crypto.timingSafeEqual(Buffer.from(firma), Buffer.from(esperada));
}

function requiereAdmin(req, res, next) {
    const cabecera = req.headers.authorization || "";
    const token = cabecera.replace("Bearer ", "");
    if (!tokenValido(token)) {
        return res.status(401).json({ error: "No autorizado." });
    }
    next();
}

module.exports = { crearToken, requiereAdmin };