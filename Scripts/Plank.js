class Plank 
{
  constructor(canvasWidth, canvasHeight) 
  {
    this.width = 80;
    this.gap = 140;
    this.speed = 3;
    this.plankInsetX = 2;
    this.x = canvasWidth;
    this.scored = false;
    const minTop = 50;
    const maxTop = canvasHeight - this.gap - 80;

    this.topHeight =
      Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
  }//end constructor

  update() 
  {
    this.x -= this.speed;
  }//end update()

  //draw the pipes
  draw(ctx, canvasHeight) 
  {
    ctx.fillStyle = "brown";

    // top plank
    ctx.fillRect(this.x, 0, this.width, this.topHeight);

    // bottom plank
    const bottomY = this.topHeight + this.gap;
    const bottomHeight = canvasHeight - 60 - bottomY;

    ctx.fillRect(this.x, bottomY, this.width, bottomHeight);

    // debug hitbox
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.x + this.plankInsetX, 0, this.width - this.plankInsetX * 2, this.topHeight);
    ctx.strokeRect(this.x + this.plankInsetX, bottomY, this.width - this.plankInsetX * 2, bottomHeight);
  }//draw()

  isOffScreen()
  {
    return this.x + this.width < 0;
  }//isOffScreen()

  collidesWith(buc)
  {
    const hitW = buc.width  * 0.5;
    const hitH = buc.height * 0.5;

    const bucLeft   = buc.x - hitW / 2;
    const bucRight  = buc.x + hitW / 2;
    const bucTop    = buc.y - hitH / 2;
    const bucBottom = buc.y + hitH / 2;

    if (bucRight <= this.x + this.plankInsetX || bucLeft >= this.x + this.width - this.plankInsetX) return false;
    return bucTop <= this.topHeight || bucBottom >= this.topHeight + this.gap;
  }//collidesWith()
}
