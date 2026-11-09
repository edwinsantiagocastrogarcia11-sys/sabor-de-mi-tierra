import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";

function Admin() {
    return <h1>Panel de administración</h1>;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}