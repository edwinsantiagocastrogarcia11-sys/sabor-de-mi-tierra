import { useState } from "react";
import { linkWhatsApp } from "../utils/whatsapp";

export default function PlatoCard({ plato }) {
    const [abierto, setAbierto] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState("");

    function restar() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    }

    function ordenar() {
        if (!plato.disponible) {
            setMensaje("Este plato no está disponible en este momento.");
            return;
        }
       window.open(linkWhatsApp(plato, cantidad), "_blank");
       setMensaje("Se ha abierto WhatsApp para realizar el pedido.");
    }

    return (
        <article className="plato">
            <img src={import.meta.env.BASE_URL + "img/" + plato.img} alt={plato.nombre} />
            <h3>{plato.nombre}</h3>

            <button type="button" clasName="btn-ver" onClick={() => setAbierto(!abierto)}>
                {abierto ? "Ocultar plato" : "Ver plato"}
            </button>

            {abierto && (
                <div className="info-plato">
                    <div className="control-cantidad">
                        <span>Cantidad:</span>
                        <button type="button" className="btn-restar" onClick={restar}>-</button>
                        <span className="cantidad">{cantidad}</span>
                        <button type="button" className="btn-sumar" onClick={() => setCantidad(cantidad + 1)}>+</button>
                    </div>

                    <p>{plato.descripcion}</p>
                    <p className="precio">
                        <strong>Precio:</strong> ${Number(plato.precio).toLocaleString("es-CO")} COP
                    </p>

                    <button type="button" className="btn-ordenar" onClick={ordenar}>Ordenar</button>
                    {mensaje && <p className="mensaje-estado">{mensaje}</p>}
                </div>
            )}
        </article>
    );
}