import { useState } from "react";
import { Link } from "react-router-dom";
import { pedir } from "../utils/api";
import AdminPlatos from "../components/AdminPlatos";

export default function Admin() {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    async function iniciarSesion(evento) {
        evento.preventDefault();
        setMensaje("Entrando...");
        try {
            const datos = await pedir("/api/admin/login", {
                method: "POST",
                body: JSON.stringify({ usuario, password }),
            });
            sessionStorage.setItem("token", datos.token);
            setToken(datos.token);
            setPassword("");
            setMensaje("");
        } catch (error) {
            setMensaje(error.message);
        }
    }

    function cerrarSesion() {
        sessionStorage.removeItem("token");
        setToken(null);
    }

    return (
        <>
            <header>
                <h1>Panel de administración</h1>
                <nav>
                    <ul id="Menu-navegacion" style={{ display: "flex" }}>
                        <li><Link to="/">Ver sitio</Link></li>
                        {token && (
                            <li><a href="#/admin" onClick={cerrarSesion}>Cerrar sesión</a></li>
                        )}
                    </ul>
                </nav>
            </header>

            <main>
                {!token ? (
                    <section className="caja">
                        <h2>Iniciar sesión</h2>
                        <form onSubmit={iniciarSesion}>
                            <div>
                                <label htmlFor="usuario">Usuario</label>
                                <input id="usuario" type="text" required
                                    value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <input id="password" type="password" required
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit">Entrar</button>
                        </form>
                        <p className="mensaje-estado">{mensaje}</p>
                    </section>
                ) : (
                    <AdminPlatos onSesionVencida={cerrarSesion} />
                )}
            </main>
        </>
    );
}