import Header from "../components/Header";
import Footer from "../components/Footer";  
import { irA } from "../utils/irA";
import Menu from "../components/Menu";
import Recomendador from "../components/Recomendador";
import Contacto from "../components/Contacto";

export default function Inicio() {
    return (
        <>
            <Header />
            <main>
                <section id="Inicio">
                    <h2>El sabor de colombia en cada plato</h2>
                    <p>Disfruta de nuestra comida tipica colombiana.</p>
                    <a href="#/" onClick={(e) => irA(e, "Menu")}>Ver menu</a>
                </section>

                <section id="Nosotros">
                    <h2>Sobre nosotros</h2>
                    <p>
                        En Sabor de mi tierra celebramos los sabores tradicionales
                        de colombia.
                    </p>
                </section>
                <Menu />
                <Recomendador />
                <Contacto />
            </main>

            <Footer />
        </>
    );
}