import { useState } from "react";
import { Link } from "react-router-dom";
import { irA } from "../utils/irA";

export default function Header() {
    const [abierto, setAbierto] = useState(false);

    function ir(evento, id) {
        irA(evento, id);
        setAbierto(false);
    }

    return (
        <header>
            <h1>Sabor de mi tierra</h1>

            <nav>
                <button
                    className="Menu-toggle"
                    id="Menu-toggle"
                    aria-expanded={abierto}
                    onClick={() => setAbierto(!abierto)}
                >
                    ☰
                </button>

                <ul id="Menu-navegacion" className={abierto ? "abierto" : ""}>
                    <li><a href="#/" onClick={(e) => ir(e, "Inicio")}>Inicio</a></li>
                    <li><a href="#/" onClick={(e) => ir(e, "Nosotros")}>Nosotros</a></li>
                    <li><a href="#/" onClick={(e) => ir(e, "Menu")}>Menu</a></li>
                    <li><a href="#/" onClick={(e) => ir(e, "Recomendador")}>Recomendador</a></li>
                    <li><a href="#/" onClick={(e) => ir(e, "Contacto")}>Contacto</a></li>
                    <li><Link to="/admin">Administrar</Link></li>
                </ul>
            </nav>
        </header>
    );
}