const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "assets/Back.png";

const buc = new Buc(150, 350);
//plank variables
const planks = [];
let lastSpawnTime = 0;
let score = 0;
const spawnDelay = 1500;

// set gravity
const GRAVITY = 0.3;

// Game state management
const GAME_STATE = {
  MENU: "menu",
  PLAYING: "playing",
  GAME_OVER: "gameOver",
  PAUSED: "paused"
};

let currentGameState = GAME_STATE.MENU;

// Start button definition
const startButton = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 120,
  height: 50
};

function handleInput(clickX, clickY) {
  if (currentGameState === GAME_STATE.MENU) {
    if (
      clickX > startButton.x - startButton.width / 2 &&
      clickX < startButton.x + startButton.width / 2 &&
      clickY > startButton.y - startButton.height / 2 &&
      clickY < startButton.y + startButton.height / 2
    ) {
      startGame();
    }
  } else if (currentGameState === GAME_STATE.PLAYING) {
    buc.flap();
  } else if (currentGameState === GAME_STATE.GAME_OVER) {
    if (
      clickX > startButton.x - startButton.width / 2 &&
      clickX < startButton.x + startButton.width / 2 &&
      clickY > startButton.y - startButton.height / 2 &&
      clickY < startButton.y + startButton.height / 2
    ) {
      resetGame();
    }
  }
}

// Desktop click
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  handleInput(
    (event.clientX - rect.left) * scaleX,
    (event.clientY - rect.top) * scaleY
  );
});

// Mobile touch
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

// Keyboard
document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.code === "Space") {
    event.preventDefault();
    if (currentGameState === GAME_STATE.MENU) {
      startGame();
    } else if (currentGameState === GAME_STATE.PLAYING) {
      buc.flap();
    } else if (currentGameState === GAME_STATE.GAME_OVER) {
      resetGame();
    }
  }
});

//gameloop function
function gameLoop(timestamp) {
  updateGame(timestamp);
  if (currentGameState === GAME_STATE.PLAYING) {
    buc.update(GRAVITY, canvas.height);
  }
  checkGameState();
  drawGame();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function checkGameState() {
  if (currentGameState === GAME_STATE.PLAYING) {
    if (buc.dead) {
      currentGameState = GAME_STATE.GAME_OVER;
    }
  }
}

function resetGame() {
  buc.x = 150;
  buc.y = 350;
  buc.velocity = 0;
  buc.dead = false;
  planks.length = 0;
  lastSpawnTime = 0;
  score = 0;
  currentGameState = GAME_STATE.PLAYING;
}

function startGame() {
  buc.x = 150;
  buc.y = 350;
  buc.velocity = 0;
  buc.dead = false;
  planks.length = 0;
  lastSpawnTime = 0;
  score = 0;
  currentGameState = GAME_STATE.PLAYING;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  for (let plank of planks) {
    plank.draw(ctx, canvas.height);
  }
  buc.draw(ctx);
  drawUI();
}

function drawUI() {
  if (currentGameState === GAME_STATE.MENU) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FLAPPY BUCS", canvas.width / 2, canvas.height / 2 - 100);
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(
      startButton.x - startButton.width / 2,
      startButton.y - startButton.height / 2,
      startButton.width,
      startButton.height
    );
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("START", startButton.x, startButton.y + 8);
    ctx.textAlign = "left";
  } else if (currentGameState === GAME_STATE.GAME_OVER) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 - 80);
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(
      startButton.x - startButton.width / 2,
      startButton.y - startButton.height / 2,
      startButton.width,
      startButton.height
    );
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("RESTART", startButton.x, startButton.y + 8);
    ctx.textAlign = "left";
  } else if (currentGameState === GAME_STATE.PLAYING) {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, canvas.width / 2, 50);
    ctx.textAlign = "left";
  }
}

function spawnPlank() {
  planks.push(new Plank(canvas.width, canvas.height));
}

function updateGame(timestamp) {
  if (currentGameState === GAME_STATE.PLAYING) {
    if (timestamp - lastSpawnTime > spawnDelay) {
      spawnPlank();
      lastSpawnTime = timestamp;
    }
    for (let plank of planks) {
      plank.update();
      if (!plank.scored && buc.x > plank.x + plank.width) {
        plank.scored = true;
        score++;
      }
      if (plank.collidesWith(buc)) {
        buc.dead = true;
      }
    }
    for (let i = planks.length - 1; i >= 0; i--) {
      if (planks[i].isOffScreen()) {
        planks.splice(i, 1);
      }
    }
  }
}
