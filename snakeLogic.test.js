import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, placeFood, setDirection, stepState } from './snakeLogic.js';

test('snake moves one cell per step', () => {
  const state = createInitialState(10);
  const next = stepState(state);
  assert.deepEqual(next.snake[0], { x: state.snake[0].x + 1, y: state.snake[0].y });
  assert.equal(next.snake.length, state.snake.length);
});

test('snake grows and score increments when eating food', () => {
  const state = createInitialState(10);
  state.food = { x: state.snake[0].x + 1, y: state.snake[0].y };

  const next = stepState(state);
  assert.equal(next.score, 1);
  assert.equal(next.snake.length, state.snake.length + 1);
});

test('cannot reverse directly into opposite direction', () => {
  const state = createInitialState(10);
  const next = setDirection(state, 'left');
  assert.equal(next.nextDirection, 'right');
});

test('wall collision triggers game over', () => {
  const state = {
    ...createInitialState(5),
    snake: [{ x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }],
    direction: 'right',
    nextDirection: 'right',
    food: { x: 0, y: 0 },
  };

  const next = stepState(state);
  assert.equal(next.gameOver, true);
});

test('food placement avoids snake body', () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];

  const food = placeFood(4, snake, () => 0);
  assert.equal(food.x === 0 && food.y === 0, false);
  assert.equal(food.x === 1 && food.y === 0, false);
  assert.equal(food.x === 2 && food.y === 0, false);
});
