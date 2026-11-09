import { useState } from "react";
import { API_URL } from "../utils/api";

export default function Recomendador() {
    const [gusto, setGusto] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    async function enviar(evento) {
        evento.preventDefault();
        setCargando(true);
        setMensaje("Buscando tu plato...");

        try {
            const respuesta = await fetch(API_URL + "/api/recomendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gusto }),
            });
            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                setMensaje(resultado.error || "No pudimos generar una recomendación.");
            } else {
                setMensaje(resultado.respuesta);
            }
        } catch (error) {
            setMensaje("No hay conexión con el servidor.");
        }

        setCargando(false);
    }

    return (
        <section id="Recomendador" className="caja">
            <h2>¿Qué se te antoja?</h2>
            <p>Recomendación de platos</p>

            <form onSubmit={enviar}>
                <div>
                    <label htmlFor="gusto">Tu antojo</label>
                    <input
                        type="text"
                        id="gusto"
                        required
                        maxLength={200}
                        placeholder="algo caliente con pollo"
                        value={gusto}
                        onChange={(e) => setGusto(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={cargando}>
                    {cargando ? "Pensando..." : "Recomiéndame un plato"}
                </button>
            </form>

            <p className="mensaje-estado">{mensaje}</p>
        </section>
    );
}