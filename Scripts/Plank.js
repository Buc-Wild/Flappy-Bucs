class Plank 
{
  constructor(canvasWidth, canvasHeight) 
  {
    this.width = 80;
    this.gap = 140;
    this.speed = 3;
    this.x = canvasWidth;

    const minTop = 50;
    const maxTop = canvasHeight - this.gap - 50;

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
    const bottomHeight = canvasHeight - bottomY;

    ctx.fillRect(this.x, bottomY, this.width, bottomHeight);
  }//draw()

  isOffScreen()
  {
    return this.x + this.width < 0;
  }//isOffScreen()

  collidesWith(buc)
  {
    const bucLeft = buc.x - buc.width / 2;
    const bucRight = buc.x + buc.width / 2;
    const bucTop = buc.y - buc.height / 2;
    const bucBottom = buc.y + buc.height / 2;

    if (bucRight <= this.x || bucLeft >= this.x + this.width) return false;
    return bucTop <= this.topHeight || bucBottom >= this.topHeight + this.gap;
  }//collidesWith()

}