import { useState, useEffect } from 'react';
import PlatoCard from './PlatoCard';
import { API_URL } from '../utils/api';

export default function Menu() {
    const [platos, setPlatos] = useState([]);
    const [estado, setEstado] = useState("cargando");

    useEffect(() => {
        async function cargarPlatos() {
            try {
                const respuesta = await fetch(API_URL + "/api/platos");
                if (!respuesta.ok) {
                    throw new Error("Error al cargar los platos");
                }
                const datos = await respuesta.json();
                setPlatos(datos);
                setEstado("listo");
            } catch (error) {
                setEstado("error");
            }
        }
        cargarPlatos();
    }, []);

    return (
        <section id="Menu">
            <h2>Nuestro menu</h2>
            <p>Descubre nuestra variedad de platos tipicos colombianos.</p>

            {estado === "cargando" && <p>Cargando platos...</p>}
            {estado === "error" && (
                <p>No pudimos cargar el menu. ¿Esta encendido el servidor?</p>
            )}
            {estado === "listo" &&
                platos.map((plato) => <PlatoCard key={plato._id} plato={plato} />)}
        </section>
    );
}