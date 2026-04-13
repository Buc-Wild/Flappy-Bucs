const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const buc = new Buc(150, 350);

// set gravity
const GRAVITY = 0.5;

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // update physics
    buc.update(GRAVITY, canvas.height);
    
    // draw
    buc.draw(ctx);
    
    // loop game frames
    requestAnimationFrame(gameLoop);
}

// Wait for Buc's image to load before drawing
buc.image.onload = () => {
    gameLoop();
};