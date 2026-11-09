import { useEffect, useState } from "react";
import { pedir } from "../utils/api";

export default function AdminMensajes({ onSesionVencida }) {
    const [mensajes, setMensajes] = useState([]);
    const [estado, setEstado] = useState("cargando");

    useEffect(() => {
        async function cargar() {
            try {
                const datos = await pedir("/api/admin/mensajes");
                setMensajes(datos);
                setEstado("listo");
            } catch (error) {
                if (error.status === 401) {
                    onSesionVencida();
                } else {
                    setEstado("error");
                }
            }
        }
        cargar();
    }, []);

    return (
        <section className="caja">
            <h2>Mensajes de contacto</h2>

            {estado === "cargando" && <p>Cargando mensajes...</p>}
            {estado === "error" && <p>No se pudieron leer los mensajes.</p>}
            {estado === "listo" && mensajes.length === 0 && (
                <p>Todavía no hay mensajes.</p>
            )}

            {estado === "listo" &&
                mensajes.map((m) => (
                    <article key={m._id} className="mensaje-item">
                        <p><strong>{m.nombre}</strong> · {m.email}</p>
                        <p>{m.mensaje}</p>
                        <small>{new Date(m.createdAt).toLocaleString("es-CO")}</small>
                    </article>
                ))}
        </section>
    );
}