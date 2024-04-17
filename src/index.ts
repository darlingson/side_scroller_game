const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = 800;
canvas.height = 600;

interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
}

let player: Entity = {
  x: 100,
  y: canvas.height - 120,
  width: 50,
  height: 50,
  dx: 0,
  dy: 0
};

const gravity = 0.5;
const groundLevel = canvas.height - 70;

let isJumping = false;

let backgroundX = 0;
const backgroundSpeed = 2;

function updatePlayer() {
  player.dy += gravity;
  player.y += player.dy;

  if (player.y > groundLevel - player.height) {
    player.y = groundLevel - player.height;
    player.dy = 0;
    isJumping = false;
  }
}

function updateBackground() {
  backgroundX -= backgroundSpeed;

  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      player.dx = 5;
      break;
    case 'ArrowLeft':
      player.dx = -5;
      break;
    case 'ArrowUp':
      if (!isJumping) {
        player.dy = -10;
        isJumping = true;
      }
      break;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    player.dx = 0;
  }
});

function update() {
  updateBackground();
  updatePlayer();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ground
  ctx.fillStyle = 'green';
  ctx.fillRect(0, groundLevel, canvas.width, 70);

  // Draw the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
