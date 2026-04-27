class UIManager {

  constructor(canvas) {
    this.canvas = canvas;
    this.startButton = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      width: 120,
      height: 50
    };
  }

  // check if user is clicking the start button
  isButtonClicked(clickX, clickY) {
    return (
      clickX > this.startButton.x - this.startButton.width / 2 &&
      clickX < this.startButton.x + this.startButton.width / 2 &&
      clickY > this.startButton.y - this.startButton.height / 2 &&
      clickY < this.startButton.y + this.startButton.height / 2
    );
  }

  // Renders the main menu screen.
  drawMenuUI(ctx, highScore) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FLAPPY BUCS", this.canvas.width / 2, this.canvas.height / 2 - 100);
    ctx.font = "24px Arial";
    ctx.fillText("Session High Score: " + highScore, this.canvas.width / 2, this.canvas.height / 2 - 50);
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(
      this.startButton.x - this.startButton.width / 2,
      this.startButton.y - this.startButton.height / 2,
      this.startButton.width,
      this.startButton.height
    );
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("START", this.startButton.x, this.startButton.y + 8);
    ctx.textAlign = "left";
  }


  // Renders the game over screen.
  drawGameOverUI(ctx, score, highScore) {
    const centerX = this.canvas.width / 2;
    const titleY = this.canvas.height / 2 - 120;
    const scoreY = this.canvas.height / 2 - 65;
    const highScoreY = this.canvas.height / 2 - 40;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", centerX, titleY);
    ctx.font = "28px Arial";
    ctx.fillText("Score: " + score, centerX, scoreY);
    ctx.fillText("Session High Score: " + highScore, centerX, highScoreY);
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(
      this.startButton.x - this.startButton.width / 2,
      this.startButton.y - this.startButton.height / 2,
      this.startButton.width,
      this.startButton.height
    );
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("RESTART", this.startButton.x, this.startButton.y + 8);
    ctx.textAlign = "left";
  }

  // Renders the in-game UI
  drawPlayingUI(ctx, score, highScore) {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, this.canvas.width / 2, 50);
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("High Score: " + highScore, 20, 40);
  }

  drawPausedUI(ctx, score, highScore) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height / 2 - 40);
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, this.canvas.width / 2, this.canvas.height / 2);
    ctx.fillText("High Score: " + highScore, this.canvas.width / 2, this.canvas.height / 2 + 35);
    ctx.textAlign = "left";
  }
  
  //  Renders UI elements based on the current game state.
  draw(ctx, gameState, score, highScore) {
    if (gameState === "menu") {
      this.drawMenuUI(ctx, highScore);
    } else if (gameState === "gameOver") {
      this.drawGameOverUI(ctx, score, highScore);
    } else if (gameState === "playing") {
      this.drawPlayingUI(ctx, score, highScore);
    } else if (gameState === "paused") {
      this.drawPausedUI(ctx, score, highScore);
    }
  }

}
