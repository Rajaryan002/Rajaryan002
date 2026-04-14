# Classic Snake

Minimal browser-based Snake game.

## Run locally

1. Start a static server from the repo root:
   - `python3 -m http.server 5173`
2. Open `http://localhost:5173`.

## Controls

- Arrow keys or `WASD` to move.
- `P` or Space to pause/resume.
- **Restart** button to start a new game.
- On-screen arrow buttons for touch/mobile controls.

## Manual verification checklist

- Movement works with keyboard and on-screen controls.
- Snake grows by one segment and score increases after eating food.
- Wall or self collision ends the game.
- Pause/resume works and restart resets score/snake state.

## Tests

- `node --test snakeLogic.test.js`
