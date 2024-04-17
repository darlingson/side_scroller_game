const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = 800;
canvas.height = 600;

interface Marker {
  x: number;
  y: number;
}

interface Projectile {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const playerWidth = 50;
const playerHeight = 50;
const groundLevel = canvas.height - 70;

const markers: Marker[] = [];
const markerWidth = 10;
const markerHeight = 10;
const markerSpacing = 200;

let backgroundSpeed = 2;
let playerSpeed = 5;
let backgroundDirection = 0; // -1 for moving left, 1 for moving right

let projectiles: Projectile[] = [];
const projectileWidth = 5;
const projectileHeight = 5;
const projectileSpeed = 10;

function generateMarkers() {
  markers.length = 0;
  for (let x = markerSpacing; x < canvas.width; x += markerSpacing) {
    const y = Math.random() * canvas.height;
    markers.push({ x, y });
  }
}

function updateBackground() {
  for (const marker of markers) {
    marker.x -= backgroundSpeed * backgroundDirection;
  }
  
  // Check if markers need to wrap around
  const lastMarker = markers[markers.length - 1];
  if (lastMarker.x + markerSpacing < 0) {
    const newY = Math.random() * canvas.height;
    markers.push({ x: canvas.width, y: newY });
    markers.shift();
  }
}

function fireProjectile() {
  projectiles.push({
    x: canvas.width / 2,
    y: groundLevel - playerHeight / 2,
    width: projectileWidth,
    height: projectileHeight,
    speed: projectileSpeed
  });
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      backgroundDirection = 1;
      break;
    case 'ArrowLeft':
      backgroundDirection = -1;
      break;
    case 's':
      fireProjectile();
      break;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    backgroundDirection = 0;
  }
});

function updateProjectiles() {
  for (const projectile of projectiles) {
    projectile.x += projectile.speed;
    // Remove projectiles that have moved off-screen
    if (projectile.x > canvas.width) {
      projectiles = projectiles.filter(p => p !== projectile);
    }
  }
}

function update() {
  updateBackground();
  updateProjectiles();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ground
  ctx.fillStyle = 'green';
  ctx.fillRect(0, groundLevel, canvas.width, 70);

  // Draw markers
  ctx.fillStyle = 'red';
  for (const marker of markers) {
    ctx.fillRect(marker.x, marker.y, markerWidth, markerHeight);
  }

  // Draw the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(canvas.width / 2 - playerWidth / 2, groundLevel - playerHeight, playerWidth, playerHeight);

  // Draw projectiles
  ctx.fillStyle = 'yellow';
  for (const projectile of projectiles) {
    ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

generateMarkers(); // Generate initial markers
gameLoop();
