import { useState } from "react";
import { API_URL } from "../utils/api";

const VACIO = { nombre: "", email: "", mensaje: "" };

export default function Contacto() {
    const [datos, setDatos] = useState(VACIO);
    const [mensaje, setMensaje] = useState("");
    const [enviando, setEnviando] = useState(false);

    function cambiar(evento) {
        setDatos({ ...datos, [evento.target.name]: evento.target.value });
    }

    async function enviar(evento) {
        evento.preventDefault();

        const limpio = {
            nombre: datos.nombre.trim(),
            email: datos.email.trim(),
            mensaje: datos.mensaje.trim(),
        };

        if (!limpio.nombre || !limpio.email || !limpio.mensaje) {
            setMensaje("Por favor, complete todos los campos del formulario.");
            return;
        }

        setEnviando(true);
        try {
            const respuesta = await fetch(API_URL + "/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(limpio),
            });
            const resultado = await respuesta.json();

            if (respuesta.ok) {
                setMensaje("¡Gracias por contactarnos, " + limpio.nombre + "! Hemos recibido tu mensaje.");
                setDatos(VACIO);
            } else {
                setMensaje(resultado.error || "No se pudo enviar el mensaje.");
            }
        } catch (error) {
            setMensaje("No hay conexión con el servidor.");
        }
        setEnviando(false);
    }

    return (
        <section id="Contacto">
            <h2>Contáctanos</h2>
            <p>
                Si tienes alguna pregunta o deseas hacer un pedido, no dudes en
                contactarnos. Estamos aquí para ayudarte.
            </p>

            <form id="formulario-contacto" onSubmit={enviar}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required
                        value={datos.nombre} onChange={cambiar} />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" id="email" name="email" required
                        value={datos.email} onChange={cambiar} />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" required
                        value={datos.mensaje} onChange={cambiar}></textarea>
                </div>
                <button type="submit" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar"}
                </button>
            </form>

            <p className="mensaje-estado">{mensaje}</p>
        </section>
    );
}