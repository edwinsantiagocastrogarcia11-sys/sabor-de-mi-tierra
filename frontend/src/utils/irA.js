export function irA(evento, id) {
    evento.preventDefault();
    const seccion = document.getElementById(id);
    if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" });
    }
}