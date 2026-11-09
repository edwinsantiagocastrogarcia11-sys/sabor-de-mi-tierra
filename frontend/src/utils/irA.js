export function irA(evento, id) {
    evento.preventDefault();
    const seccion = document.getElementByid(id);
    if (seccion) {
        seccion.scrollIntoView({ behavisor: "smooth" });
    }
}