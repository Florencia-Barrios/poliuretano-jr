document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active"); // Agregamos la clase a nav
    });

    // Cierra el menú cuando se hace clic en un enlace
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
        });
    });
});
