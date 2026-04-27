class Ground {
    constructor(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = 60;
    this.y = canvasHeight - this.height;
    this.speed = 3;
    this.scrollX = 0;
  
    this.sandImage = new Image();
    this.sandImage.src = "assets/sand.png";
  
    this.crabImage = new Image();
    this.crabImage.src = "assets/crab.png";
  
    this.ballImage = new Image();
    this.ballImage.src = "assets/beachball.png";

    this.castleImage = new Image();
    this.castleImage.src = "assets/sandcastle.png";

    this.starImage = new Image();
    this.starImage.src = "assets/seastar.png";
  
      // only one decoration at a time
      this.decoration = {
        x: canvasWidth + 100,
        type: Math.random() < 0.5 ? 'crab' : 'ball'
      };
    }
  
    update() {
      this.scrollX -= this.speed;
      if (this.scrollX <= -this.width) {
        this.scrollX = 0;
      }
  
      this.decoration.x -= this.speed;
      if (this.decoration.x < -40) {
        // recycle to the right with a random gap before it appears again
        this.decoration.x = this.width + Math.random() * 300 + 100;
        const types = ['crab', 'ball', 'castle', 'star'];
        this.decoration.type = types[Math.floor(Math.random() * types.length)];
      }
    }
  
    draw(ctx) {
      // two tiles for seamless scroll
      ctx.drawImage(this.sandImage, this.scrollX, this.y, this.width, this.height);
      ctx.drawImage(this.sandImage, this.scrollX + this.width, this.y, this.width, this.height);
  
      // single decoration, sits on top of the ground strip
      const images = {
        crab: this.crabImage,
        ball: this.ballImage,
        castle: this.castleImage,
        star: this.starImage
      };
        const img = images[this.decoration.type];
        ctx.drawImage(img, this.decoration.x, this.y - 48, 48, 48);
    }
  }