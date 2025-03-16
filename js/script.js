document.addEventListener("DOMContentLoaded", function () {

    // Inicializar funciones de navegación
    menuHamburguesita();
    navegacionFija();
    scrollNav();
    gestionarPreguntas();
    iniciarGaleria();
});

// Menu toggle desplegable en mobile
function menuHamburguesita() {
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
}

// Header fijo al hacer scroll
function navegacionFija() {
    const header = document.querySelector(".header");
    const seccionHero = document.querySelector(".hero"); // Sección de referencia
    const body = document.body;

    window.addEventListener("scroll", function () {
        if (seccionHero.getBoundingClientRect().bottom < 0) {
            header.classList.add("fijo");
            body.classList.add("body-scroll");
        } else {
            header.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }
    });
}

// Scroll suave en navegación
function scrollNav() {
    document.querySelectorAll("nav ul li a").forEach((enlace) => {
        enlace.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const seccionDestino = document.querySelector(this.getAttribute("href"));
                if (seccionDestino) {
                    seccionDestino.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}

// Gestionar preguntas frecuentes
function gestionarPreguntas() {
    const detalles = document.querySelectorAll("#preguntas details");

    detalles.forEach((detalle) => {
        detalle.addEventListener("click", function () {
            detalles.forEach((otroDetalle) => {
                if (otroDetalle !== detalle) {
                    otroDetalle.removeAttribute("open");
                }
            });
        });
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest("#preguntas details")) {
            detalles.forEach((detalle) => {
                detalle.removeAttribute("open");
            });
        }
    });
}

// Lightbox para el grid de miniaturas
function iniciarGaleria() {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const closeLightbox = document.querySelector(".close");
    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentIndex = thumbnails.length - 1;
        } else if (index >= thumbnails.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        lightboxImg.src = thumbnails[currentIndex].src;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            lightbox.style.display = "flex";
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });
}
