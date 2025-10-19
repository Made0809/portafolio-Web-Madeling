// ===================== CARRUSEL DE PROYECTOS =====================
const carrusel = document.querySelector(".carrusel");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const cards = document.querySelectorAll(".card");

let index = 0;

function moverCarrusel() {
  const cardStyle = getComputedStyle(cards[0]);
  const cardWidth =
    cards[0].offsetWidth +
    parseInt(cardStyle.marginLeft) +
    parseInt(cardStyle.marginRight);
  carrusel.style.transform = `translateX(${-index * cardWidth}px)`;
}

function cambiarFondo() {
  const card = cards[index];
  const bg = card.getAttribute("data-bg");

  // 🔹 Fija un solo tamaño de imagen y evita que se repita o cambie de posición
  document.body.style.backgroundImage = `url('${bg}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.transition = "background-image 1.5s ease-in-out";
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  moverCarrusel();
  cambiarFondo();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  moverCarrusel();
  cambiarFondo();
});

// Click en tarjeta
cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    index = i;
    moverCarrusel();
    cambiarFondo();
  });
});

// Carrusel automático
setInterval(() => {
  index = (index + 1) % cards.length;
  moverCarrusel();
  cambiarFondo();
}, 4000);

// ===================== MODO OSCURO =====================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeToggle.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.9)" },
        { transform: "scale(1)" },
      ],
      { duration: 200 }
    );
  });
});

// ===================== MENÚ HAMBURGUESA =====================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open");
  menuBtn.classList.toggle("open", !isOpen);
});

// Cerrar al hacer clic fuera del menú
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.remove("open");
    menuBtn.classList.remove("open");
  }
});

// Cerrar automáticamente si se cambia al modo escritorio
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("open");
    menuBtn.classList.remove("open");
  }
});

