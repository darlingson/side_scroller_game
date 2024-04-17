"use strict";
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const playerWidth = 50;
const playerHeight = 50;
const groundLevel = canvas.height - 70;
const markers = [];
const markerWidth = 10;
const markerHeight = 10;
const markerSpacing = 200;
let backgroundSpeed = 2;
let playerSpeed = 5;
let backgroundDirection = 0; // -1 for moving left, 1 for moving right
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
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            backgroundDirection = 1;
            break;
        case 'ArrowLeft':
            backgroundDirection = -1;
            break;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        backgroundDirection = 0;
    }
});
function update() {
    updateBackground();
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
}
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}
generateMarkers(); // Generate initial markers
gameLoop();
