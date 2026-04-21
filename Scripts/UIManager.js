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
  drawMenuUI(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FLAPPY BUCS", this.canvas.width / 2, this.canvas.height / 2 - 100);
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
  drawGameOverUI(ctx, score) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2 - 40);
    ctx.fillText("Score: " + score, this.canvas.width / 2, this.canvas.height / 2 - 80);
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
  drawPlayingUI(ctx, score) {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, this.canvas.width / 2, 50);
    ctx.textAlign = "left";
  }
  
  //  Renders UI elements based on the current game state.
  draw(ctx, gameState, score) {
    if (gameState === "menu") {
      this.drawMenuUI(ctx);
    } else if (gameState === "gameOver") {
      this.drawGameOverUI(ctx, score);
    } else if (gameState === "playing") {
      this.drawPlayingUI(ctx, score);
    }
  }

}
