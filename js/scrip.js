// Aplica el modo oscuro inmediatamente al cargar la página
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    themeToggle.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }],
      { duration: 200 }
    );
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const stage = document.querySelector('.triple-stage');
  const slides = Array.from(document.querySelectorAll('.triple-slide'));
  const dotsContainer = document.querySelector('.triple-dots');

  if (!slides.length) return;

  let current = 0;
  const n = slides.length;
  const AUTOPLAY_DELAY = 4000;
  const TRANSITION_BLOCK_MS = 850;
  let autoplay = null;
  let busy = false;

  // Crear dots si no existen
  if (!dotsContainer.children.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'triple-dot';
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    });
  }
  const dots = Array.from(dotsContainer.children);

  // Eliminar solo clases de estado
  const clearStateClasses = slide => {
    slide.classList.remove('active', 'prev', 'next', 'hidden');
  };

  // === FUNCIÓN CLAVE ACTUALIZADA ===
  const update = targetIndex => {
    slides.forEach((slide, i) => {
      clearStateClasses(slide);

      // distancia entre el slide actual y el slide objetivo
      let diff = (i - targetIndex + n) % n;

      // Aplicar clases según la posición relativa
      if (diff === 0) {
        slide.classList.add('active');
      } else if (diff === 1) {
        slide.classList.add('next');
      } else if (diff === n - 1) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('hidden');
      }
    });

    // Actualizar los dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[targetIndex]) dots[targetIndex].classList.add('active');
  };

  const goTo = i => {
    if (busy) return;
    busy = true;
    current = (i + n) % n;
    update(current);
    setTimeout(() => (busy = false), TRANSITION_BLOCK_MS);
  };

  const next = () => goTo(current + 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplay = setInterval(next, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplay) {
      clearInterval(autoplay);
      autoplay = null;
    }
  };

  // Al hacer click en un dot → va al slide correspondiente
  dotsContainer.addEventListener('click', e => {
    const dot = e.target.closest('.triple-dot');
    if (!dot) return;
    const index = Number(dot.dataset.index);
    if (Number.isNaN(index)) return;
    if (index === current) return;
    goTo(index);
    stopAutoplay();
    startAutoplay();
  });

  // Hover pausa autoplay
  stage.addEventListener('mouseenter', stopAutoplay);
  stage.addEventListener('mouseleave', startAutoplay);

  // Inicialización
  update(current);
  startAutoplay();
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".triple-slide"));
  const dots = Array.from(document.querySelectorAll(".triple-dot"));
  let current = 0;

  if (!slides.length || !dots.length) return;

  // 🔹 Función para actualizar los estados visuales
  const updateSlides = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev", "next", "hidden");

      if (i === index) {
        slide.classList.add("active");
      } else if (i === (index - 1 + slides.length) % slides.length) {
        slide.classList.add("prev");
      } else if (i === (index + 1) % slides.length) {
        slide.classList.add("next");
      } else {
        slide.classList.add("hidden");
      }
    });

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  };

  // 🔹 Escuchar clics en los dots
  document.querySelector(".triple-dots").addEventListener("click", (e) => {
    const dot = e.target.closest(".triple-dot");
    if (!dot) return;
    const index = dots.indexOf(dot);
    if (index === -1) return;
    current = index;
    updateSlides(current);
  });

  // 🔹 Inicializar correctamente
  updateSlides(current);
}); //fin del carrousel

//menú hamburguesa
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', !isOpen);
});

// Cerrar al hacer clic fuera del menú
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
  }
});

// 🔹 Cerrar automáticamente si se cambia al modo escritorio
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío inicial

    // Expresión regular para validar el formato del correo
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones
    if (nombre.value.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      nombre.focus();
      return;
    }

    if (correo.value.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico.');
      correo.focus();
      return;
    }

    if (!emailValido.test(correo.value.trim())) {
      alert('Por favor, ingresa un correo electrónico válido.');
      correo.focus();
      return;
    }

    if (mensaje.value.trim() === '') {
      alert('Por favor, escribe un mensaje.');
      mensaje.focus();
      return;
    }

    // Si todo está correcto
    alert('¡Gracias! Tu mensaje se ha enviado correctamente.');
    form.reset();
  });
});








