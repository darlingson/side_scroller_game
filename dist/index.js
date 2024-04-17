"use strict";
// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;
let player = {
    x: 100,
    y: 0,
    width: 50,
    height: 50,
    dx: 0,
    dy: 0
};
// Constants for game
const gravity = 0.5;
const groundLevel = canvas.height - 70;
// Jumping state
let isJumping = false;
// Update player's position and handle physics
function updatePlayer() {
    player.dy += gravity; // Apply gravity to vertical speed
    player.x += player.dx; // Update horizontal position
    player.y += player.dy; // Update vertical position
    // Collision with ground
    if (player.y > groundLevel - player.height) {
        player.y = groundLevel - player.height;
        player.dy = 0;
        isJumping = false;
    }
}
// Handle key down events
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
// Handle key up events
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        player.dx = 0;
    }
});
// Update game objects
function update() {
    updatePlayer();
}
// Render the game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    // Draw the sky
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw the ground
    ctx.fillStyle = 'green';
    ctx.fillRect(0, groundLevel, canvas.width, 70);
    // Draw the player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
// Main game loop
function gameLoop() {
    update(); // Update game state
    render(); // Render the game state
    requestAnimationFrame(gameLoop); // Schedule the next frame
}
gameLoop(); // Start the game loop
