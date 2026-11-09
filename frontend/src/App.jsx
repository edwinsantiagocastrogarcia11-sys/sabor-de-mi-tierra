import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}
