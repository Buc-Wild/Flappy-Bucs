class Buc {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.dead = false;
    this.width = 50;
    this.height = 50;

    // Load Buc's sprite
    this.image = new Image();
    this.image.src = "assets/Buc.png";
  }

  flap() {
    this.velocity = -9;
  }

  // Called every frame — applies gravity and checks if Buc hit the ground
  update(gravity, canvasHeight) {
    this.velocity += gravity;
    this.y += this.velocity;

    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2;
      this.velocity = 0;
    }

    if (this.y + this.height / 2 > canvasHeight) {
      this.y = canvasHeight - this.height / 2;
      this.dead = true;
    }
  }

  // Renders Buc sprite to the canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}
