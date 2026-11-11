// Número del restaurante: código de país + número, sin + ni espacios
const NUMERO = "573104746942";

export function linkWhatsApp(plato, cantidad) {
    const total = plato.precio * cantidad;
    const mensaje =
        "Hola, quiero pedir " +
        cantidad + " x " + plato.nombre +
        " (" + total.toLocaleString("es-CO") + " COP). ¿Está disponible?";

    return "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(mensaje);
}