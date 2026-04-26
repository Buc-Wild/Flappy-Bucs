class GameManager {

  constructor(buc, canvas) {
    this.buc = buc;
    this.canvas = canvas;

    //plank variables
    this.planks = [];
    this.lastSpawnTime = 0;
    this.score = 0;
    this.spawnDelay = 1500;

    // set gravity
    this.GRAVITY = 0.5;

    // Game state management
    this.GAME_STATE = {
      MENU: "menu",
      PLAYING: "playing",
      GAME_OVER: "gameOver",
      PAUSED: "paused"
    };

    this.currentGameState = this.GAME_STATE.MENU;
    this.isRunning = false;
    this.renderCallback = null;
  }

  // Starts the game loop
  start(renderCallback) {
    this.renderCallback = renderCallback;
    this.isRunning = true;
    this.gameLoop();
  }

  // Stops the game loop.
  stop() {
    this.isRunning = false;
  }
  
  // Main game loop executed each frame.
  gameLoop = (timestamp) => {
    if (!this.isRunning) return;

    this.updateGame(timestamp);
    if (this.currentGameState === this.GAME_STATE.PLAYING) {
      this.buc.update(this.GRAVITY, this.canvas.height);
    }
    this.checkGameState();
    this.renderCallback();
    requestAnimationFrame(this.gameLoop);
  };


  // Evaluates and updates the current game state.
  // Switches from PLAYING to GAME_OVER if the player has died. 
  checkGameState() {
    if (this.currentGameState === this.GAME_STATE.PLAYING) {
      if (this.buc.dead) {
        this.currentGameState = this.GAME_STATE.GAME_OVER;
      }
    }
  }

  // Resets the game to its initial state.
  // Repositions the Buc, clears pipes, and resets score. 
  resetGame() {
    this.buc.x = 150;
    this.buc.y = 350;
    this.buc.velocity = 0;
    this.buc.dead = false;
    this.planks.length = 0;
    this.lastSpawnTime = 0;
    this.score = 0;
    this.currentGameState = this.GAME_STATE.PLAYING;
  }

  // starts a new game session and sets the state to PLAYING
  startGame() {
    this.buc.x = 150;
    this.buc.y = 350;
    this.buc.velocity = 0;
    this.buc.dead = false;
    this.planks.length = 0;
    this.lastSpawnTime = 0;
    this.score = 0;
    this.currentGameState = this.GAME_STATE.PLAYING;
  }

  flap() {
    this.buc.flap();
  }

  handleInput(inputType, isButtonClicked = false) {
    if (this.currentGameState === this.GAME_STATE.MENU) {
      if (isButtonClicked) {
        this.startGame();
      }
    } else if (this.currentGameState === this.GAME_STATE.PLAYING) {
      if (inputType === 'flap' || inputType === 'click') {
        this.flap();
      }
    } else if (this.currentGameState === this.GAME_STATE.GAME_OVER) {
      if (isButtonClicked) {
        this.resetGame();
      }
    }
  }

  spawnPlank() {
    this.planks.push(new Plank(this.canvas.width, this.canvas.height));
  }

  
  updateGame(timestamp) {
    if (this.currentGameState === this.GAME_STATE.PLAYING) {
      if (timestamp - this.lastSpawnTime > this.spawnDelay) {
        this.spawnPlank();
        this.lastSpawnTime = timestamp;
      }
      for (let plank of this.planks) {
        plank.update();
        if (!plank.scored && this.buc.x > plank.x + plank.width) {
          plank.scored = true;
          this.score++;
        }
        if (plank.collidesWith(this.buc)) {
          this.buc.dead = true;
        }
      }
      for (let i = this.planks.length - 1; i >= 0; i--) {
        if (this.planks[i].isOffScreen()) {
          this.planks.splice(i, 1);
        }
      }
    }
  }
}
