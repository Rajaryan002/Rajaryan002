import { createInitialState, setDirection, stepState, togglePause } from './snakeLogic.js';

const GRID_SIZE = 20;
const TICK_MS = 140;

const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');

let state = createInitialState(GRID_SIZE);

boardEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
boardEl.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;

function render() {
  const snakeSet = new Set(state.snake.map((s) => `${s.x},${s.y}`));
  const foodKey = `${state.food.x},${state.food.y}`;
  const cells = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      let className = 'cell';
      if (snakeSet.has(key)) className += ' snake';
      if (foodKey === key) className += ' food';
      cells.push(`<div class="${className}"></div>`);
    }
  }

  boardEl.innerHTML = cells.join('');
  scoreEl.textContent = String(state.score);

  if (state.gameOver) {
    statusEl.textContent = 'Game over. Press Restart to play again.';
  } else if (state.paused) {
    statusEl.textContent = 'Paused';
  } else {
    statusEl.textContent = 'Use arrow keys or WASD.';
  }

  pauseBtn.textContent = state.paused ? 'Resume' : 'Pause';
}

function tick() {
  state = stepState(state);
  render();
}

document.addEventListener('keydown', (event) => {
  const map = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
  };

  const next = map[event.key];
  if (next) {
    event.preventDefault();
    state = setDirection(state, next);
    return;
  }

  if (event.key === ' ' || event.key === 'p') {
    state = togglePause(state);
    render();
  }
});

document.querySelectorAll('[data-dir]').forEach((btn) => {
  btn.addEventListener('click', () => {
    state = setDirection(state, btn.dataset.dir);
  });
});

pauseBtn.addEventListener('click', () => {
  state = togglePause(state);
  render();
});

restartBtn.addEventListener('click', () => {
  state = createInitialState(GRID_SIZE);
  render();
});

setInterval(tick, TICK_MS);
render();
