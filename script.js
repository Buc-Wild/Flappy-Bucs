const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "assets/Back.png";

const buc = new Buc(150, 350);
//plank variables
const planks = [];
let lastSpawnTime = 0;
const spawnDelay = 1500;


// set gravity
const GRAVITY = 0.5;


//gameloop function
function gameLoop(timestamp) 
{
    updateGame(timestamp);    
    // update physics
    buc.update(GRAVITY, canvas.height);
    // draw the game
    drawGame()
    // loop game frames
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function drawGame()
{
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //sets the background image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    for(let plank of planks)
    {
        plank.draw(ctx, canvas.height);
    } 
    buc.draw(ctx);
}

function spawnPlank()
{
    planks.push(new Plank(canvas.width, canvas.height));
}


function updateGame(timestamp) 
{
  if (timestamp - lastSpawnTime > spawnDelay) {
    spawnPlank();
    lastSpawnTime = timestamp;
  }

  for (let plank of planks) {
    plank.update();
  }

  for (let i = planks.length - 1; i >= 0; i--) {
    if (planks[i].isOffScreen()) {
      planks.splice(i, 1);
    }
  }
}