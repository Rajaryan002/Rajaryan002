export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export function createInitialState(gridSize = 20) {
  const mid = Math.floor(gridSize / 2);
  const snake = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];

  return {
    gridSize,
    snake,
    direction: 'right',
    nextDirection: 'right',
    food: placeFood(gridSize, snake, () => 0.5),
    score: 0,
    gameOver: false,
    paused: false,
  };
}

export function setDirection(state, requested) {
  if (!DIRECTIONS[requested]) return state;
  if (OPPOSITES[state.direction] === requested) return state;
  return { ...state, nextDirection: requested };
}

export function stepState(state) {
  if (state.gameOver || state.paused) return state;

  const direction = state.nextDirection;
  const delta = DIRECTIONS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const collisionBody = ateFood ? state.snake : state.snake.slice(0, -1);

  if (isOutOfBounds(nextHead, state.gridSize) || isOnSnake(nextHead, collisionBody)) {
    return { ...state, direction, gameOver: true };
  }

  const nextSnake = [nextHead, ...state.snake];
  if (!ateFood) nextSnake.pop();

  return {
    ...state,
    direction,
    snake: nextSnake,
    food: ateFood ? placeFood(state.gridSize, nextSnake) : state.food,
    score: ateFood ? state.score + 1 : state.score,
  };
}

export function togglePause(state) {
  if (state.gameOver) return state;
  return { ...state, paused: !state.paused };
}

export function placeFood(gridSize, snake, rand = Math.random) {
  const freeCells = [];
  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      if (!isOnSnake({ x, y }, snake)) freeCells.push({ x, y });
    }
  }

  if (freeCells.length === 0) {
    return { x: -1, y: -1 };
  }

  const idx = Math.floor(rand() * freeCells.length);
  return freeCells[Math.min(idx, freeCells.length - 1)];
}

function isOutOfBounds(point, gridSize) {
  return point.x < 0 || point.y < 0 || point.x >= gridSize || point.y >= gridSize;
}

function isOnSnake(point, snake) {
  return snake.some((segment) => segment.x === point.x && segment.y === point.y);
}
