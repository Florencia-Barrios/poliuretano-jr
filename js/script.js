document.addEventListener("DOMContentLoaded", function () {
    // Menu toggle desplegable en mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active"); // Agregamos la clase a nav
    });

    // Cierra el menú cuando se hace clic en un enlace
    document.querySelectorAll("nav ul li a").forEach((link) => {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
        });
    });

    // Inicializar funciones de navegación
    navegacionFija();
    scrollNav();
    gestionarPreguntas();
});

// Header fijo al hacer scroll
function navegacionFija() {
    const header = document.querySelector(".header");
    const seccionHero = document.querySelector(".hero"); // Sección de referencia
    const body = document.body;

    window.addEventListener("scroll", function () { // detectamos el desplazamiento del scroll
        if (seccionHero.getBoundingClientRect().bottom < 0) { // obtenemos la posicion del bottom de .hero si es menor que 0 ya lo pasamos y agregamos la clase fijo
            header.classList.add("fijo");
            body.classList.add("body-scroll");
        } else { // Si .hero vuelve a ser visible removemos clases
            header.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }
    });
}

// Scroll suave en navegación
function scrollNav() {
    document.querySelectorAll("nav ul li a").forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) { // this.getAttribute("href") obtiene el atributo href del enlace. (#)
                e.preventDefault(); // evita que el navegador realice el salto brusco predeterminado hacia la sección.
                const seccionDestino = document.querySelector(this.getAttribute("href"));
                if (seccionDestino) { // Si la sección existe, se usa .scrollIntoView({ behavior: "smooth" }) para hacer un scroll suave hasta ella
                    seccionDestino.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}

// Gestionar preguntas frecuentes (solo una abierta a la vez y cerrar al hacer clic fuera)
function gestionarPreguntas() {
    const detalles = document.querySelectorAll("#preguntas details");

    detalles.forEach((detalle) => {
        detalle.addEventListener("click", function () {
            // Cierra todos los <details> excepto el actual
            detalles.forEach((otroDetalle) => {
                if (otroDetalle !== detalle) {
                    otroDetalle.removeAttribute("open");
                }
            });
        });
    });

    // Cierra todas las preguntas si el usuario hace clic fuera
    document.addEventListener("click", function (e) {
        if (!e.target.closest("#preguntas details")) { //verifica si el clic ocurrió dentro de una pregunta <details>.Si el clic NO fue dentro de la pregunta, se cierran todas las preguntas abiertas
            detalles.forEach((detalle) => {
                detalle.removeAttribute("open");
            });
        }
    });
}
