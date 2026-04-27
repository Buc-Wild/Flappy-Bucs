const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "assets/Back.png";
const ground = new Ground(canvas.width, canvas.height);


// Initialize core game objects.
// - Buc: the player character
// - GameManager: controls game state and logic
// - UIManager: handles rendering of UI elements and interactions
const buc = new Buc(150, 350);
const gameManager = new GameManager(buc, canvas);
const uiManager = new UIManager(canvas);


// Handles input.
// Determines if a UI button was clicked, then forwards the result
// to the GameManager for state-specific handling.
function handleInput(clickX, clickY) {
  const isButtonClicked = uiManager.isButtonClicked(clickX, clickY);
  gameManager.handleInput('click', isButtonClicked);
}



// Handles desktop click input on canvas
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  handleInput(
    (event.clientX - rect.left) * scaleX,
    (event.clientY - rect.top) * scaleY
  );
});



// Handles mobile touch input on the canvas.
canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const touch = event.touches[0];
  handleInput(
    (touch.clientX - rect.left) * scaleX,
    (touch.clientY - rect.top) * scaleY
  );
}, { passive: false });



// Handles keyboard input for the Space key.
// Behavior depends on the current game state:
// - MENU: start the game
// - PLAYING: make the player flap
// - GAME_OVER: restart the game
document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.code === "Space") {
    event.preventDefault();
    if (gameManager.currentGameState === gameManager.GAME_STATE.MENU) {
      gameManager.handleInput('space', true);
    } else if (gameManager.currentGameState === gameManager.GAME_STATE.PLAYING) {
      gameManager.handleInput('flap');
    } else if (gameManager.currentGameState === gameManager.GAME_STATE.GAME_OVER) {
      gameManager.handleInput('space', true);
    }
  }
});



// Render callback - handles drawing of all game elements each frame
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  for (let plank of gameManager.planks) {
    plank.draw(ctx, canvas.height);
  }
  ground.draw(ctx);
  buc.draw(ctx);
  uiManager.draw(ctx, gameManager.currentGameState, gameManager.score);
}

// Initializes the game loop by passing in the render function.
gameManager.start(drawGame);
