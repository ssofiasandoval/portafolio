/* ============================================================
   PORTAFOLIO — SOFÍA SANDOVAL — app.js
   ============================================================ */

// 1. CURSOR PERSONALIZADO
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(function(el) {
  el.addEventListener('mouseenter', function() { cursor.classList.add('expand'); });
  el.addEventListener('mouseleave', function() { cursor.classList.remove('expand'); });
});
// Cursor "Ver →" sobre tarjetas de proyecto
document.querySelectorAll('.proyecto-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() { cursor.classList.add('expand-ver'); });
  el.addEventListener('mouseleave', function() { cursor.classList.remove('expand-ver'); });
});

// 2. MENÚ HAMBURGUESA
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// 3. MODALES
function openModal(id) {
  document.getElementById('modal-' + id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBg(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// 4. ANIMACIONES AL SCROLL
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });

// 5. FORMULARIO CON FORMSPREE
// ⚠️ Reemplaza TUCODIGO con el código que te da formspree.io
function enviarMensaje() {
  const btn     = document.querySelector('.btn-send');
  const nombre  = document.querySelector('.contacto-form input[type="text"]');
  const correo  = document.querySelector('.contacto-form input[type="email"]');
  const mensaje = document.querySelector('.contacto-form textarea');

  // Validación
  if (!nombre.value || !correo.value || !mensaje.value) {
    btn.textContent = 'Completa todos los campos';
    btn.style.background = '#e05252';
    setTimeout(function() {
      btn.textContent = 'Enviar mensaje →';
      btn.style.background = '';
    }, 2500);
    return;
  }

  // Enviando...
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  fetch('https://formspree.io/f/xgonrnvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre:  nombre.value,
      email:   correo.value,
      mensaje: mensaje.value
    })
  })
  .then(function(res) {
    if (res.ok) {
      btn.textContent = '¡Enviado! ✓';
      btn.style.background = '#4CAF50';
      nombre.value = ''; correo.value = ''; mensaje.value = '';
    } else {
      btn.textContent = 'Error, intenta de nuevo';
      btn.style.background = '#e05252';
    }
  })
  .catch(function() {
    btn.textContent = 'Error de conexión';
    btn.style.background = '#e05252';
  })
  .finally(function() {
    btn.disabled = false;
    setTimeout(function() {
      btn.textContent = 'Enviar mensaje →';
      btn.style.background = '';
    }, 3000);
  });
}


// 7. PARALLAX SUTIL EN HERO
const hero = document.getElementById('inicio');
const orb1 = document.querySelector('.orb1');
const orb2 = document.querySelector('.orb2');
const heroImg = document.querySelector('.hero-img-wrap');
if (hero) {
  hero.addEventListener('mousemove', function(e) {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.height / 2) / rect.height;
    if (orb1) orb1.style.transform = 'translate(' + (x * 30) + 'px, ' + (y * 30) + 'px)';
    if (orb2) orb2.style.transform = 'translate(' + (x * -25) + 'px, ' + (y * -25) + 'px)';
    if (heroImg) heroImg.style.transform = 'translate(' + (x * 12) + 'px, ' + (y * 12) + 'px)';
  });
  hero.addEventListener('mouseleave', function() {
    if (orb1) orb1.style.transform = '';
    if (orb2) orb2.style.transform = '';
    if (heroImg) heroImg.style.transform = '';
  });
}
window.addEventListener('scroll', function() {
  const sy = window.scrollY;
  if (sy < window.innerHeight) {
    if (orb1) orb1.style.opacity = 1 - (sy / window.innerHeight) * 0.7;
    if (orb2) orb2.style.opacity = 1 - (sy / window.innerHeight) * 0.7;
  }
});

// 8. REVEAL LETRA POR LETRA EN TÍTULOS
function splitText(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const html = el.innerHTML;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const result = [];
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const chars = node.textContent.split('');
      const frag = document.createDocumentFragment();
      chars.forEach(function(c) {
        const span = document.createElement('span');
        span.className = c === ' ' ? 'char space' : 'char';
        span.textContent = c === ' ' ? ' ' : c;
        frag.appendChild(span);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  }
  Array.from(wrapper.childNodes).forEach(walk);
  el.innerHTML = wrapper.innerHTML;
  el.classList.add('char-reveal');
  // Aplicar delay incremental a cada char
  el.querySelectorAll('.char').forEach(function(span, i) {
    span.style.transitionDelay = (i * 0.03) + 's';
  });
}
const titulos = document.querySelectorAll('h1, section > h2');
titulos.forEach(splitText);
const charObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.3 });
titulos.forEach(function(el) { charObserver.observe(el); });

// 9. NAV ACTIVO AL SCROLL
const secciones = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function() {
  let actual = '';
  secciones.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 100) actual = s.getAttribute('id');
  });
  navLinks.forEach(function(link) {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + actual) link.style.color = 'var(--coral)';
  });
});

// 10. FILTRO DE PROYECTOS POR CATEGORÍA
const filtros = document.querySelectorAll('.filtro-pill');
const cards = document.querySelectorAll('.proyecto-card');
filtros.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const filtro = btn.dataset.filtro;
    filtros.forEach(function(b) { b.classList.remove('activo'); });
    btn.classList.add('activo');
    cards.forEach(function(card) {
      const cats = (card.dataset.categorias || '').split(' ');
      const match = filtro === 'todos' || cats.indexOf(filtro) !== -1;
      if (match) {
        card.classList.remove('oculto');
        requestAnimationFrame(function() { card.classList.remove('filtrando-out'); });
      } else {
        card.classList.add('filtrando-out');
        setTimeout(function() {
          if (card.classList.contains('filtrando-out')) card.classList.add('oculto');
        }, 320);
      }
    });
  });
});

// 11. CARRUSEL EN MODALES
const carouselState = {};

function carouselInit(id) {
  const el = document.getElementById('carousel-' + id);
  if (!el) return;
  const slides = el.querySelectorAll('.carousel-slide');
  const dotsContainer = el.querySelector('.carousel-dots');
  carouselState[id] = { index: 0, total: slides.length };

  dotsContainer.innerHTML = '';
  slides.forEach(function(_, i) {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = function() { carouselGoTo(id, i); };
    dotsContainer.appendChild(dot);
  });

  const btns = el.querySelectorAll('.carousel-btn');
  btns.forEach(function(b) { b.style.display = slides.length <= 1 ? 'none' : ''; });

  const track = el.querySelector('.carousel-track');
  let startX = 0;
  track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function(e) {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) carouselMove(id, diff > 0 ? 1 : -1);
  });
}

function carouselUpdate(id) {
  const state = carouselState[id];
  const el = document.getElementById('carousel-' + id);
  el.querySelector('.carousel-track').style.transform = 'translateX(-' + (state.index * 100) + '%)';
  el.querySelectorAll('.carousel-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === state.index);
  });
}

function carouselMove(id, dir) {
  const s = carouselState[id];
  s.index = (s.index + dir + s.total) % s.total;
  carouselUpdate(id);
}

function carouselGoTo(id, idx) {
  carouselState[id].index = idx;
  carouselUpdate(id);
}

document.querySelectorAll('.modal-carousel').forEach(function(el) {
  carouselInit(el.id.replace('carousel-', ''));
});

// 12. BOTONES MAGNÉTICOS
document.querySelectorAll('.btn-coral, .btn-outline, .btn-send').forEach(function(btn) {
  btn.addEventListener('mousemove', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.4) + 'px)';
  });
  btn.addEventListener('mouseleave', function() {
    btn.style.transform = '';
  });
});