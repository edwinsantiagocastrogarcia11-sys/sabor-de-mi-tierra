export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Hace una petición al backend y manda el token si hay sesión iniciada
export async function pedir(ruta, opciones = {}) {
    const token = sessionStorage.getItem("token");

    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = "Bearer " + token;
    }

    const respuesta = await fetch(API_URL + ruta, { ...opciones, headers });
    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        const error = new Error(datos.error || "Error en la solicitud");
        error.status = respuesta.status;
        throw error;
    }
    return datos;
}