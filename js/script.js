/* =========================================================
   NetOS — Script principal
   Todos los comportamientos interactivos del sitio.
   ========================================================= */

'use strict';

/* ------------------------------------------------------------------
   Datos: preguntas del quiz
   ------------------------------------------------------------------ */
const QUIZ_QUESTIONS = [
  {
    question: '¿Qué es un Sistema Operativo de Red (SOR)?',
    options: [
      'Un software para administrar y proporcionar servicios a equipos conectados en una red',
      'Un programa de juegos para computadoras',
      'Un antivirus instalado en cada equipo',
      'Un navegador de Internet'
    ],
    correct: 0
  },
  {
    question: '¿Qué función cumple el servidor en una red?',
    options: [
      'Imprime todos los documentos de la oficina',
      'Proporciona recursos o servicios a otros equipos',
      'Convierte archivos en carpetas',
      'Reemplaza a la computadora portátil'
    ],
    correct: 1
  },
  {
    question: '¿Qué hace el servicio DHCP?',
    options: [
      'Traduce nombres de dominio a direcciones IP',
      'Elimina archivos temporales',
      'Asigna automáticamente direcciones IP a los dispositivos',
      'Bloquea el acceso a Internet'
    ],
    correct: 2
  },
  {
    question: '¿Qué hace el servicio DNS?',
    options: [
      'Permite traducir nombres de dominio a direcciones IP',
      'Cifra las contraseñas de los usuarios',
      'Comparte impresoras en la red',
      'Actualiza el sistema operativo'
    ],
    correct: 0
  },
  {
    question: '¿Qué significa "autenticación"?',
    options: [
      'Determinar qué archivos puede abrir un usuario',
      'Comprobar quién es el usuario',
      'El proceso de apagar el servidor',
      'Compartir una impresora'
    ],
    correct: 1
  },
  {
    question: '¿Qué son los permisos?',
    options: [
      'Reglas que determinan qué puede hacer un usuario con un recurso',
      'Las contraseñas de la red',
      'Equipos conectados a Internet',
      'Servicios de correo electrónico'
    ],
    correct: 0
  },
  {
    question: '¿Para qué sirve un firewall?',
    options: [
      'Para crear nuevas direcciones IP',
      'Para acelerar la conexión de Internet',
      'Para traducir nombres de dominio',
      'Para filtrar el tráfico y bloquear accesos no autorizados'
    ],
    correct: 3
  },
  {
    question: '¿Qué es Active Directory?',
    options: [
      'Un antivirus para servidores',
      'Un servicio de Microsoft para administrar usuarios y equipos en un dominio',
      'Un protocolo de impresión',
      'Un programa para editar imágenes'
    ],
    correct: 1
  },
  {
    question: '¿Cuál es la diferencia entre cliente y servidor?',
    options: [
      'El cliente tiene más potencia que el servidor',
      'El cliente y el servidor son lo mismo',
      'El servidor proporciona servicios y el cliente los utiliza',
      'El cliente siempre está apagado'
    ],
    correct: 2
  },
  {
    question: '¿Cuál es una ventaja de utilizar un SOR?',
    options: [
      'Administración centralizada de usuarios y recursos',
      'No necesita usuarios ni contraseñas',
      'Funciona solo sin conexión de red',
      'Elimina la necesidad de copias de seguridad'
    ],
    correct: 0
  }
];

/* ------------------------------------------------------------------
   Datos: glosario de conceptos
   ------------------------------------------------------------------ */
const GLOSSARY = {
  sor: {
    title: 'SOR',
    definition: 'Sistema Operativo de Red: software que administra equipos conectados en red, sus usuarios, archivos, permisos y servicios.'
  },
  servidor: {
    title: 'Servidor',
    definition: 'Equipo que proporciona recursos o servicios a otros equipos de la red, como archivos, impresión o páginas web.'
  },
  cliente: {
    title: 'Cliente',
    definition: 'Equipo que utiliza los recursos o servicios proporcionados por el servidor.'
  },
  ip: {
    title: 'IP',
    definition: 'Identificador numérico único que recibe cada dispositivo dentro de una red para poder encontrarse y comunicarse.'
  },
  dns: {
    title: 'DNS',
    definition: 'Servicio que traduce nombres de dominio (como netos.com) a direcciones IP para que los equipos puedan comunicarse.'
  },
  dhcp: {
    title: 'DHCP',
    definition: 'Servicio que asigna automáticamente direcciones IP a los dispositivos que se conectan a la red.'
  },
  usuario: {
    title: 'Usuario',
    definition: 'Cuenta que identifica a una persona o proceso en la red. Cada usuario suele tener un nombre y una contraseña.'
  },
  grupo: {
    title: 'Grupo',
    definition: 'Conjunto de usuarios que comparten los mismos permisos. Facilita administrar muchos usuarios a la vez.'
  },
  permiso: {
    title: 'Permiso',
    definition: 'Regla que indica qué acciones puede realizar un usuario sobre un recurso, como leer, escribir o ejecutar.'
  },
  firewall: {
    title: 'Firewall',
    definition: 'Medida de seguridad que filtra el tráfico de red y bloquea accesos no autorizados hacia o desde el sistema.'
  },
  dominio: {
    title: 'Dominio',
    definition: 'Grupo de equipos y usuarios administrados de forma centralizada bajo las mismas políticas de seguridad.'
  },
  recurso: {
    title: 'Recurso compartido',
    definition: 'Elemento de la red (carpeta, archivo, impresora) que se pone a disposición de varios usuarios o equipos.'
  },
  protocolo: {
    title: 'Protocolo',
    definition: 'Conjunto de reglas que define cómo se comunican los equipos en una red para intercambiar información.'
  },
  autenticacion: {
    title: 'Autenticación',
    definition: 'Proceso de comprobar quién es el usuario, normalmente mediante usuario y contraseña.'
  },
  autorizacion: {
    title: 'Autorización',
    definition: 'Proceso de determinar qué puede hacer un usuario, es decir, qué permisos tiene sobre los recursos.'
  }
};

/* ------------------------------------------------------------------
   Utilidades
   ------------------------------------------------------------------ */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/* ------------------------------------------------------------------
   Menú hamburguesa (responsive)
   ------------------------------------------------------------------ */
function initMenu() {
  const toggle = $('#menuToggle');
  const menu = $('#navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar el menú al elegir una opción
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }
  });

  // Cerrar el menú con la tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ------------------------------------------------------------------
   Modo oscuro / claro con localStorage
   ------------------------------------------------------------------ */
function initTheme() {
  const toggle = $('#themeToggle');
  const icons = { dark: '🌙', light: '☀️' };

  if (!toggle) return;

  // Cargar preferencia guardada o usar oscuro por defecto
  const savedTheme = localStorage.getItem('netos-theme');
  const theme = savedTheme === 'light' ? 'light' : 'dark';
  applyTheme(theme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('netos-theme', theme);
    const iconEl = $('.theme-toggle__icon', toggle);
    if (iconEl) {
      iconEl.textContent = icons[theme];
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  }
}

/* ------------------------------------------------------------------
   Botón "volver arriba"
   ------------------------------------------------------------------ */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ------------------------------------------------------------------
   Animaciones al hacer scroll (IntersectionObserver)
   ------------------------------------------------------------------ */
function initReveal() {
  const items = $$('.card, .mini-card, .featured-card, .schema, .alert, .componente, .quiz-question');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('is-visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

/* ------------------------------------------------------------------
   Glosario interactivo
   ------------------------------------------------------------------ */
function initGlossary() {
  const terms = $$('.glosario__term');
  const definitionBox = $('#glossaryDefinition');
  if (!terms.length || !definitionBox) return;

  terms.forEach((term) => {
    term.addEventListener('click', () => {
      const key = term.dataset.term;
      const data = GLOSSARY[key];
      if (!data) return;

      terms.forEach((t) => t.classList.remove('is-active'));
      term.classList.add('is-active');
      definitionBox.innerHTML =
        '<h3>' + escapeHtml(data.title) + '</h3>' +
        '<p>' + escapeHtml(data.definition) + '</p>';
    });
  });
}

/* ------------------------------------------------------------------
   Buscador interno
   Filtra términos del glosario y tarjetas buscables.
   ------------------------------------------------------------------ */
function initSearch() {
  const input = $('#buscador');
  const message = $('#searchMessage');
  if (!input || !message) return;

  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    const results = [];

    // Filtrar términos del glosario
    terms.forEach((term) => {
      const key = term.dataset.term;
      const data = GLOSSARY[key];
      const text = normalize(key + ' ' + data.title + ' ' + data.definition);
      const visible = query === '' || text.includes(query);
      term.classList.toggle('is-hidden', !visible);
      if (visible && query !== '') results.push(term);
    });

    // Filtrar tarjetas principales
    searchableGroups.forEach((group) => {
      const text = normalize(group.textContent);
      const visible = query === '' || text.includes(query);
      group.classList.toggle('is-hidden', !visible);
      if (visible && query !== '') results.push(group);
    });

    // Mensaje de resultados
    if (query === '') {
      message.textContent = '';
      message.classList.remove('is-error');
    } else if (results.length === 0) {
      message.textContent = 'No se encontraron resultados.';
      message.classList.add('is-error');
    } else {
      message.textContent = 'Se encontraron ' + results.length + ' resultado(s).';
      message.classList.remove('is-error');
    }
  });
}

let terms = [];
let searchableGroups = [];

function prepareSearchable() {
  terms = $$('.glosario__term');
  searchableGroups = $$('[data-search-group]');
}

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (match) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[match]));
}

/* ------------------------------------------------------------------
   Modales "Ver más"
   ------------------------------------------------------------------ */
function initModals() {
  // Abrir modal
  $$('.btn--ver-mas').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const id = btn.dataset.modal;
      openModal($('#' + id));
    });
  });

  // Cerrar modal: botón ✕, overlay o tecla Escape
  $$('.modal').forEach((modal) => {
    $$('[data-close]', modal).forEach((el) => {
      el.addEventListener('click', () => closeModal(modal));
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.hidden = false;
  const trigger = $('.btn--ver-mas[data-modal="' + modal.id + '"]');
  const box = $('.modal__box', modal);
  box.focus();
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleModalKey);
  modal._trigger = trigger;
}

function closeModal(modal) {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalKey);
  if (modal._trigger) modal._trigger.focus();
}

function handleModalKey(event) {
  if (event.key === 'Escape') {
    $$('.modal').forEach((modal) => {
      if (!modal.hidden) closeModal(modal);
    });
  }
}

/* ------------------------------------------------------------------
   Simulación de solicitudes de red (demo interactiva)
   ------------------------------------------------------------------ */
const DEMO_ACTIONS = {
  archivo: {
    client: 'PC 1',
    steps: ['PC 1 solicita archivo', 'Servidor verifica permisos', 'Servidor entrega archivo'],
    ok: true
  },
  login: {
    client: 'PC 2',
    steps: ['PC 2 envía usuario y contraseña', 'Servidor comprueba credenciales', 'Acceso autorizado'],
    ok: true
  },
  impresora: {
    client: 'PC 3',
    steps: ['PC 3 envía documento a imprimir', 'Servidor de impresión recibe la tarea', 'Impresora imprime el documento'],
    ok: true
  },
  ip: {
    client: 'PC 1',
    steps: ['PC 1 solicita una dirección IP', 'Servidor DHCP asigna una IP disponible', 'PC 1 queda conectada a la red'],
    ok: true
  }
};

function initDemo() {
  const output = $('#demoOutput');
  if (!output) return;

  $$('#demo .demo__controls [data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = DEMO_ACTIONS[btn.dataset.demo];
      if (!action) return;

      // Reiniciar paquetes
      $$('.demo__packet').forEach((p) => p.classList.remove('is-active'));

      // Mostrar pasos de la simulación
      output.innerHTML = '';
      const packets = $$('.demo__packet');
      const packetIndex = action.client === 'PC 3' ? 2 : action.client === 'PC 2' ? 1 : 0;
      const packet = packets[packetIndex];

      if (packet) {
        packet.classList.remove('is-active');
        void packet.offsetWidth;
        packet.classList.add('is-active');
      }

      action.steps.forEach((step, i) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'step step--' + (action.ok ? 'ok' : 'denied');
          div.textContent = step;
          output.appendChild(div);
        }, 350 * i);
      });
    });
  });
}

/* ------------------------------------------------------------------
   Quiz interactivo
   ------------------------------------------------------------------ */
function initQuiz() {
  const list = $('#quizList');
  const form = $('#quizForm');
  const finishBtn = $('#finishQuiz');
  const resetBtn = $('#resetQuiz');
  const resultBox = $('#quizResult');
  if (!list || !form || !finishBtn || !resetBtn || !resultBox) return;

  buildQuiz();

  finishBtn.addEventListener('click', () => {
    if (!validateQuiz()) return;
    const score = computeScore();
    renderResult(score);
  });

  resetBtn.addEventListener('click', () => {
    buildQuiz();
    resultBox.hidden = true;
    finishBtn.disabled = false;
  });

  function buildQuiz() {
    list.innerHTML = '';

    QUIZ_QUESTIONS.forEach((q, index) => {
      const article = document.createElement('article');
      article.className = 'quiz-question';

      const title = document.createElement('p');
      title.className = 'quiz-question__text';
      title.innerHTML = '<span class="qnum">' + (index + 1) + '.</span> ' + escapeHtml(q.question);

      const optionsWrap = document.createElement('div');
      optionsWrap.className = 'quiz-options';

      q.options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.className = 'quiz-option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz-q' + index;
        radio.value = optionIndex;
        radio.setAttribute('aria-label', (index + 1) + ') ' + escapeHtml(option).replace(/"/g, '&quot;'));

        const span = document.createElement('span');
        span.textContent = option;

        label.appendChild(radio);
        label.appendChild(span);

        // Al cambiar la selección, marcar la pregunta como respondida
        radio.addEventListener('change', () => {
          article.dataset.answered = 'true';
        });

        optionsWrap.appendChild(label);
      });

      article.appendChild(title);
      article.appendChild(optionsWrap);
      list.appendChild(article);
    });
  }

  function validateQuiz() {
    const unanswered = $$('.quiz-question', list).filter((q) => q.dataset.answered !== 'true').length;
    if (unanswered > 0) {
      alert('Te quedaron ' + unanswered + ' pregunta(s) sin responder.');
      return false;
    }
    return true;
  }

  function computeScore() {
    let correct = 0;

    QUIZ_QUESTIONS.forEach((q, index) => {
      const chosen = $('input[name="quiz-q' + index + '"]:checked', list);
      const article = $$('.quiz-question', list)[index];
      const labels = $$('.quiz-option', article);

      labels.forEach((label, optionIndex) => {
        if (optionIndex === q.correct) label.classList.add('is-correct');
      });

      if (chosen && Number(chosen.value) === q.correct) {
        correct++;
        article.classList.add('correct');
      } else {
        if (chosen) {
          chosen.closest('.quiz-option').classList.add('is-wrong');
        }
        article.classList.add('incorrect');
      }
    });

    return correct;
  }

  function renderResult(score) {
    const total = QUIZ_QUESTIONS.length;
    const incorrect = total - score;
    const percent = Math.round((score / total) * 100);

    let message;
    if (percent === 100) message = '¡Excelente! Respuesta perfecta.';
    else if (percent >= 80) message = '¡Muy bien! Dominás los conceptos.';
    else if (percent >= 60) message = '¡Buen trabajo! Revisá algunos conceptos.';
    else message = 'Seguí estudiando y volvé a intentarlo.';

    resultBox.innerHTML =
      '<p class="quiz__result-title">' + score + '/' + total + ' correctas</p>' +
      '<p class="quiz__result-stats">Correctas: ' + score + ' · Incorrectas: ' + incorrect + ' · ' + percent + '%</p>' +
      '<div class="quiz__result-bar" role="presentation"><div class="quiz__result-fill" style="width:' + percent + '%"></div></div>' +
      '<p class="quiz__result-message">' + message + '</p>';

    resultBox.hidden = false;
    finishBtn.disabled = true;
    resultBox.focus();
  }
}

/* ------------------------------------------------------------------
   Inicialización general
   ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  prepareSearchable();
  initMenu();
  initTheme();
  initBackToTop();
  initReveal();
  initGlossary();
  initSearch();
  initModals();
  initDemo();
  initQuiz();
});