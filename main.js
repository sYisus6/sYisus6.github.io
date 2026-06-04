/* ============================================================
   OVA #14 — Teoría de la Información
   main.js
   Jesús David Sarmiento Ortiz · Teoría en Sistemas 2026
   ============================================================ */

/* ══════════════════════════════════════════════
   1. PESTAÑAS DE EJEMPLOS
   ══════════════════════════════════════════════ */
function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

/* ══════════════════════════════════════════════
   2. EJERCICIOS CON RETROALIMENTACIÓN
   ══════════════════════════════════════════════ */
const answers = {
  1: {
    correct: v => Math.abs(parseFloat(v) - 1.0) < 0.05,
    ok:   'Correcto ✓ I(cara) = −log₂(0.5) = 1 bit. La moneda justa aporta exactamente 1 bit de información.',
    fail: 'Incorrecto. Usa la fórmula I(x) = −log₂(P(x)) = −log₂(0.5) = 1 bit.'
  },
  2: {
    correct: v => Math.abs(parseFloat(v) - 2.585) < 0.02,
    ok:   'Correcto ✓ H(X) = −6 × (1/6) × log₂(1/6) = log₂(6) ≈ 2.585 bits.',
    fail: 'Incorrecto. Para eventos equiprobables: H = log₂(n). H = log₂(6) ≈ 2.585 bits.'
  },
  3: {
    correct: v => v.trim().toLowerCase() === 'b',
    ok:   'Correcto ✓ La falta de cobertura celular es el "ruido del canal": perturba la señal entre transmisor y receptor.',
    fail: 'Incorrecto. La respuesta es (b): la falta de cobertura es el ruido que distorsiona la señal en el canal.'
  },
  4: {
    correct: v => parseInt(v) === 30,
    ok:   'Correcto ✓ 30% de 100 módulos = 30 módulos pueden estar dañados y el código QR nivel H aún es legible.',
    fail: 'Incorrecto. 30% × 100 = 30 módulos. El nivel H tolera hasta el 30% de errores.'
  }
};

function checkEx(n) {
  const val = document.getElementById('ex' + n).value;
  const fb  = document.getElementById('fb' + n);
  fb.style.display = 'block';
  if (answers[n].correct(val)) {
    fb.className = 'feedback correct';
    fb.textContent = answers[n].ok;
  } else {
    fb.className = 'feedback wrong';
    fb.textContent = answers[n].fail;
  }
}

/* ══════════════════════════════════════════════
   3. JUEGO 1 — DECODIFICADOR ASCII
   ══════════════════════════════════════════════ */
const g1Questions = [
  { bits: '01001000', options: ["Letra 'H'", "Número 8",   "Letra 'A'",  "Símbolo '$'"], correct: 0, explain: "01001000 = 72 decimal = 'H' en ASCII" },
  { bits: '00110001', options: ["Letra 'a'", "Número '1'", "Letra 'A'",  "Número '3'"], correct: 1, explain: "00110001 = 49 decimal = '1' en ASCII" },
  { bits: '01100001', options: ["Letra 'A'", "Letra 'b'",  "Letra 'a'",  "Símbolo '@'"],correct: 2, explain: "01100001 = 97 decimal = 'a' en ASCII (minúscula)" },
  { bits: '01000001', options: ["Letra 'a'", "Letra 'A'",  "Número '65'","Letra 'B'"],  correct: 1, explain: "01000001 = 65 decimal = 'A' en ASCII (mayúscula)" },
  { bits: '00100000', options: ["Cero binario","Espacio en blanco","Nulo","Tab"],        correct: 1, explain: "00100000 = 32 decimal = espacio en blanco en ASCII" }
];

let g1idx = 0, g1pts = 0, g1answered = false;

function initGame1() {
  g1idx = 0; g1pts = 0; g1answered = false;
  document.getElementById('g1score').textContent = 'Puntos: 0 / 5';
  renderG1();
}

function renderG1() {
  if (g1idx >= g1Questions.length) {
    document.getElementById('g1-display').textContent = '¡Terminado!';
    document.getElementById('g1-opts').innerHTML = '';
    document.getElementById('g1-msg').textContent = `Puntuación final: ${g1pts}/5`;
    document.getElementById('g1-instruction').textContent = '¡Juego completado!';
    return;
  }
  g1answered = false;
  const q = g1Questions[g1idx];
  document.getElementById('g1-display').textContent = q.bits;
  document.getElementById('g1-instruction').textContent = '¿Qué valor representa esta secuencia binaria?';
  document.getElementById('g1-msg').textContent = '';

  const opts = document.getElementById('g1-opts');
  opts.innerHTML = '';
  q.options.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    btn.textContent = o;
    btn.onclick = () => {
      if (g1answered) return;
      g1answered = true;
      document.querySelectorAll('#g1-opts .game-opt').forEach(b => b.style.pointerEvents = 'none');
      if (i === q.correct) {
        btn.classList.add('correct-anim');
        g1pts++;
        document.getElementById('g1-msg').innerHTML = `✓ Correcto! ${q.explain}`;
        document.getElementById('g1score').textContent = `Puntos: ${g1pts} / 5`;
      } else {
        btn.classList.add('wrong-anim');
        document.getElementById('g1-opts').querySelectorAll('.game-opt')[q.correct].classList.add('correct-anim');
        document.getElementById('g1-msg').innerHTML = `✗ Incorrecto. ${q.explain}`;
      }
      setTimeout(() => { g1idx++; renderG1(); }, 1800);
    };
    opts.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════
   4. JUEGO 2 — DRAG & DROP MODELO DE SHANNON
   ══════════════════════════════════════════════ */
const g2items = ['Fuente', 'Transmisor', 'Receptor', 'Destino'];

function initGame2() {
  const bank = document.getElementById('g2-bank');
  bank.innerHTML = '';
  g2items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'drag-item';
    el.draggable = true;
    el.textContent = item;
    el.id = 'drag-' + item;
    el.addEventListener('dragstart', e => { e.dataTransfer.setData('text', item); });
    bank.appendChild(el);
  });
  ['slot0', 'slot1', 'slot2', 'slot3'].forEach(id => {
    const el = document.getElementById(id);
    el.innerHTML = `<span style="color:var(--text3)">${parseInt(id.slice(-1)) + 1}. ?</span>`;
    delete el.dataset.filled;
  });
  document.getElementById('g2-feedback').style.display = 'none';
}

function allowDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function dropItem(e, slotId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const item = e.dataTransfer.getData('text');
  const slot = document.getElementById(slotId);
  if (slot.dataset.filled) {
    document.getElementById('g2-bank').appendChild(document.getElementById('drag-' + slot.dataset.filled));
  }
  slot.innerHTML = '';
  const el = document.getElementById('drag-' + item);
  el.style.cursor = 'default';
  el.draggable = false;
  slot.appendChild(el);
  slot.dataset.filled = item;
}

function checkGame2() {
  const slots = ['slot0', 'slot1', 'slot2', 'slot3'];
  let ok = true;
  slots.forEach(id => {
    const slot = document.getElementById(id);
    if (slot.dataset.filled !== slot.dataset.correct) ok = false;
  });
  const fb = document.getElementById('g2-feedback');
  fb.style.display = 'block';
  if (ok) {
    fb.className = 'feedback correct';
    fb.textContent = '¡Correcto! El orden es: Fuente → Transmisor → [ruido] → Receptor → Destino. ¡Modelo de Shannon completado!';
    document.getElementById('g2-status').textContent = '✓ Completado';
  } else {
    fb.className = 'feedback wrong';
    fb.textContent = 'Algunas posiciones son incorrectas. Recuerda: la fuente origina el mensaje, el transmisor lo codifica, el receptor lo decodifica y el destino lo recibe.';
  }
}

/* ══════════════════════════════════════════════
   5. JUEGO 3 — CANAL CON RUIDO
   ══════════════════════════════════════════════ */
let g3round = 0, g3pts3 = 0;

function initGame3() {
  g3round = 0;
  g3pts3 = 0;
  document.getElementById('g3-score').textContent = 'Ronda 1 / 5';
  nextRound3();
}

function nextRound3() {
  if (g3round >= 5) {
    document.getElementById('g3-original').innerHTML = '';
    document.getElementById('g3-received').innerHTML = '';
    document.getElementById('g3-opts').innerHTML = '';
    document.getElementById('g3-msg').textContent = `¡Juego terminado! Respuestas correctas: ${g3pts3}/5`;
    return;
  }

  const len = 8;
  const original  = Array.from({ length: len }, () => Math.random() > 0.5 ? 1 : 0);
  const errors    = Math.floor(Math.random() * 4);
  const received  = [...original];
  const positions = [];

  while (positions.length < errors) {
    const p = Math.floor(Math.random() * len);
    if (!positions.includes(p)) {
      positions.push(p);
      received[p] = 1 - received[p];
    }
  }

  renderBits('g3-original', original, []);
  renderBits('g3-received', received, positions);

  const opts = document.getElementById('g3-opts');
  opts.innerHTML = '';
  const choices = [...new Set([errors, (errors + 1) % 5, (errors + 2) % 5, Math.abs(errors - 1)])].slice(0, 4);
  choices.sort(() => Math.random() - 0.5);

  choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    btn.textContent = c + ' bit' + (c !== 1 ? 's' : '');
    btn.onclick = () => {
      document.querySelectorAll('#g3-opts .game-opt').forEach(b => b.style.pointerEvents = 'none');
      if (c === errors) {
        btn.classList.add('correct-anim');
        g3pts3++;
        document.getElementById('g3-msg').textContent = `✓ Correcto! ${errors} bit${errors !== 1 ? 's' : ''} corrompido${errors !== 1 ? 's' : ''}.`;
      } else {
        btn.classList.add('wrong-anim');
        document.getElementById('g3-msg').textContent = `✗ Eran ${errors} bits corrompidos.`;
      }
      g3round++;
      document.getElementById('g3-score').textContent = `Ronda ${Math.min(g3round + 1, 5)} / 5`;
      setTimeout(nextRound3, 1800);
    };
    opts.appendChild(btn);
  });
}

function renderBits(containerId, bits, errorPositions) {
  const c = document.getElementById(containerId);
  c.innerHTML = '';
  bits.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'channel-bit ' + (errorPositions.includes(i) ? 'noise' : (b ? 'set-1' : 'set-0'));
    el.textContent = b;
    c.appendChild(el);
  });
}

/* ══════════════════════════════════════════════
   6. QUIZ INTERACTIVO
   ══════════════════════════════════════════════ */
let quizScore = 0;
let questionAnswered = {};

function selectAnswer(el, qid, isCorrect, type) {
  if (questionAnswered[qid]) return;
  questionAnswered[qid] = true;

  const allOpts = el.closest('.quiz-options').querySelectorAll('.quiz-opt');
  allOpts.forEach(o => o.classList.add('disabled'));

  if (isCorrect) {
    el.classList.add('selected-correct');
    quizScore++;
  } else {
    el.classList.add('selected-wrong');
    allOpts.forEach(o => {
      if (o.onclick && o.onclick.toString().includes('true')) {
        o.classList.add('reveal-correct');
      }
    });
  }
  document.getElementById('exp-' + qid).style.display = 'block';
}

function nextQuestion(current, next) {
  document.getElementById(current).classList.remove('active');
  document.getElementById(next).classList.add('active');
  const qNum = parseInt(next.replace('q', ''));
  document.getElementById('quiz-progress').style.width = (qNum * 10) + '%';
}

function finishQuiz() {
  document.getElementById('q10').classList.remove('active');
  const res = document.getElementById('quiz-result');
  res.style.display = 'block';
  document.getElementById('result-score').textContent = quizScore + '/10';
  document.getElementById('quiz-progress').style.width = '100%';

  const pct = quizScore * 10;
  setTimeout(() => { document.getElementById('result-bar').style.width = pct + '%'; }, 100);

  const msgs = [
    [0, 3, 'Sigue estudiando los fundamentos de la Teoría de la Información. ¡Puedes mejorar!'],
    [4, 6, 'Buen intento. Repasa los conceptos de entropía y el modelo de Shannon.'],
    [7, 8, '¡Bien! Tienes una comprensión sólida de la Teoría de la Información.'],
    [9, 10, '¡Excelente! Dominas los conceptos fundamentales de Shannon. ¡Resultado perfecto!']
  ];
  for (const [lo, hi, msg] of msgs) {
    if (quizScore >= lo && quizScore <= hi) {
      document.getElementById('result-msg').textContent = msg;
      break;
    }
  }
}

function resetQuiz() {
  quizScore = 0;
  questionAnswered = {};
  document.getElementById('quiz-result').style.display = 'none';
  document.querySelectorAll('.question-block').forEach(q => q.classList.remove('active'));
  document.getElementById('q1').classList.add('active');
  document.querySelectorAll('.quiz-opt').forEach(o => {
    o.classList.remove('selected-correct', 'selected-wrong', 'reveal-correct', 'disabled');
  });
  document.querySelectorAll('.quiz-explanation').forEach(e => e.style.display = 'none');
  document.getElementById('quiz-progress').style.width = '10%';
}

/* ══════════════════════════════════════════════
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ══════════════════════════════════════════════ */
initGame1();
initGame2();
initGame3();
