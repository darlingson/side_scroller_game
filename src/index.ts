// Define the interface for game entities
interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    dx: number; // Delta x - change in horizontal position
    dy: number; // Delta y - change in vertical position
  }
  
  // Create a player entity with initial properties
  let player: Entity = {
    x: 50,
    y: 0,
    width: 50,
    height: 50,
    dx: 0,
    dy: 0
  };
  
  // Environment and physics constants
  const gravity = 0.5;
  const groundY = 300; // Fixed ground y-coordinate for simplicity
  let isJumping = false;
  
  // Initialize the canvas and its context
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  canvas.width = 800;
  canvas.height = 600;
  
  // Update function for game logic
  function updatePlayer() {
    // Apply gravity
    player.dy += gravity;
  
    // Update player position based on velocity
    player.x += player.dx;
    player.y += player.dy;
  
    // Collision detection with the ground
    if (player.y > groundY - player.height) {
      player.y = groundY - player.height;
      player.dy = 0;
      isJumping = false;
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
    updatePlayer();
  }
  
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Render player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }
  gameLoop();