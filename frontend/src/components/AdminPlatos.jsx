import { useEffect, useState } from "react";
import { pedir } from "../utils/api";

const VACIO = {
    nombre: "",
    descripcion: "",
    precio: "",
    img: "",
    categoria: "",
    disponible: true,
};

export default function AdminPlatos({ onSesionVencida }) {
    const [platos, setPlatos] = useState([]);
    const [form, setForm] = useState(VACIO);
    const [editandoId, setEditandoId] = useState(null);
    const [mensaje, setMensaje] = useState("");

    function manejarError(error) {
        if (error.status === 401) {
            onSesionVencida();
        } else {
            setMensaje(error.message);
        }
    }

    async function cargar() {
        try {
            setPlatos(await pedir("/api/platos"));
        } catch (error) {
            manejarError(error);
        }
    }

    useEffect(() => {
        cargar();
    }, []);

    function cambiar(evento) {
        const { name, value, type, checked } = evento.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }

    async function guardar(evento) {
        evento.preventDefault();
        const datos = { ...form, precio: Number(form.precio) };

        try {
            if (editandoId) {
                await pedir("/api/platos/" + editandoId, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                });
                setMensaje("Plato actualizado.");
            } else {
                await pedir("/api/platos", {
                    method: "POST",
                    body: JSON.stringify(datos),
                });
                setMensaje("Plato creado.");
            }
            setForm(VACIO);
            setEditandoId(null);
            cargar();
        } catch (error) {
            manejarError(error);
        }
    }

    function editar(plato) {
        setForm({
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: plato.precio,
            img: plato.img,
            categoria: plato.categoria,
            disponible: plato.disponible,
        });
        setEditandoId(plato._id);
        setMensaje("Editando: " + plato.nombre);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function cancelar() {
        setForm(VACIO);
        setEditandoId(null);
        setMensaje("");
    }

    async function borrar(plato) {
        if (!window.confirm("¿Borrar el plato " + plato.nombre + "?")) {
            return;
        }
        try {
            await pedir("/api/platos/" + plato._id, { method: "DELETE" });
            setMensaje("Plato borrado.");
            cargar();
        } catch (error) {
            manejarError(error);
        }
    }

    return (
        <section className="caja">
            <h2>{editandoId ? "Editar plato" : "Nuevo plato"}</h2>

            <form onSubmit={guardar}>
                <div>
                    <label htmlFor="p-nombre">Nombre</label>
                    <input id="p-nombre" name="nombre" required maxLength={100}
                        value={form.nombre} onChange={cambiar} />
                </div>
                <div>
                    <label htmlFor="p-descripcion">Descripción</label>
                    <textarea id="p-descripcion" name="descripcion" required maxLength={500}
                        value={form.descripcion} onChange={cambiar}></textarea>
                </div>
                <div>
                    <label htmlFor="p-precio">Precio (COP)</label>
                    <input id="p-precio" name="precio" type="number" min="0" required
                        value={form.precio} onChange={cambiar} />
                </div>
                <div>
                    <label htmlFor="p-img">Imagen (nombre del archivo en public/img)</label>
                    <input id="p-img" name="img" placeholder="bandeja-paisa.webp"
                        value={form.img} onChange={cambiar} />
                </div>
                <div>
                    <label htmlFor="p-categoria">Categoría</label>
                    <input id="p-categoria" name="categoria"
                        value={form.categoria} onChange={cambiar} />
                </div>
                <div className="check">
                    <input id="p-disponible" name="disponible" type="checkbox"
                        checked={form.disponible} onChange={cambiar} />
                    <label htmlFor="p-disponible">Disponible</label>
                </div>

                <button type="submit">{editandoId ? "Guardar cambios" : "Crear plato"}</button>
                {editandoId && (
                    <button type="button" className="btn-secundario" onClick={cancelar}>
                        Cancelar
                    </button>
                )}
            </form>

            <p className="mensaje-estado">{mensaje}</p>

            <h3>Platos del menú</h3>
            <ul>
                {platos.map((plato) => (
                    <li key={plato._id}>
                        <span>
                            {plato.nombre} · ${Number(plato.precio).toLocaleString("es-CO")}
                            {!plato.disponible && " (no disponible)"}
                        </span>
                        <span className="acciones">
                            <button type="button" onClick={() => editar(plato)}>Editar</button>
                            <button type="button" className="btn-peligro" onClick={() => borrar(plato)}>
                                Borrar
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}