/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 4;

///////NEW/////////
//playerRadius' modificators
var playerRadiusV;
var playerRadiusUp = false; //To check if we're in the process of increasing or decreasing playerRadius
///////ENDNEW/////////

// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
///////////NEW//////////////
var preyMaxSpeed = 2;
//////////ENDNEW////////////
var tx;
var ty;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 20;
// Number of prey eaten during the game
var preyEaten = 0;

// motivationText's style
var opacity = 255;
var motivationText;
var motivationFont;
// setup()
//

///////////NEW//////////////
function preload() {
  motivationFont = loadFont('assets/fonts/AllertaStencil-Regular.ttf');
}
//////////ENDNEW////////////

// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  tx = random(0,1000);
  ty = random(0,1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

/////////////NEW////////////
  background(100,100,200);
  textAlign(RIGHT);
  textFont('Arial')
  textSize(18);
  textStyle(BOLD);
  fill(255,255);
  text("PREYS EATEN: " + preyEaten, width-30, 30);
  fill(0,255);
  textAlign(CENTER);
  textStyle(BOLD);
//////////ENDNEW////////////

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {

  ///////NEW/////////
  //Quicken playerMaxSpeed when player holds SHIFT keys
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = 8;
    playerHealth -= 0.8;
  } else {
    playerMaxSpeed = 4;
  }
  ///////ENDNEW/////////


  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
/////////////NEW//////////////
    // Change preyRadius randomly
    preyRadius = random(15,30);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    //Decrease the playerRadius when it reaches 25px and increase it when it reaches 10px
    modifyPlayerRadius();
    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
////////NEW////////////
//Give back 100% opacity for motivationText as player eats a certain amount of preys
      if (preyEaten == 15 || preyEaten == 20 || preyEaten == 25 || preyEaten == 30) {
        opacity = 255;
////////ENDNEW/////////
      }
    }
  }
}

///////NEW/////////
// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }

  if (preyEaten < 10) {
    tx += 0.8;
    ty += 0.8;
  } else if ( 10 <= preyEaten && preyEaten < 15) {
    displayMotivation("I'M IMPRESSED", height/2);
    preyMaxSpeed = 4;
    tx += 0.5;
    ty += 0.5;
  } else if (15 <= preyEaten && preyEaten < 20) {
    displayMotivation("HOW ABOUT THIS?", height/2);
    tx += 0.1;
    ty += 0.1;
  } else if (20 <= preyEaten && preyEaten < 25) {
    displayMotivation("TRY HARDER", height/2);
    preyMaxSpeed = 6;
    tx += 0.05;
    ty += 0.05;
  } else if (25 <= preyEaten && preyEaten < 30) {
    displayMotivation("RELAX A BIT", height/2);
    preyMaxSpeed = 2;
    tx += 0.2;
    ty += 0.2;
  } else if (30 <= preyEaten) {
    displayMotivation("STAY DILIGENT", height*0.47);
    displayMotivation("FROM NOW ON", height*0.53);
    preyMaxSpeed = 8;
    tx += 0.01;
    ty += 0.01;
  }

}

///////ENDNEW/////////

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
  push();
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}

///////NEW/////////

function modifyPlayerRadius() {
  playerRadiusV = 0.2;
  //Check if we're in the process of adding or taking away values
  if (playerRadiusUp == true) {
    //Check if playerRadius has reached max ceilling
    if (playerRadius <=25) {
      playerRadius += playerRadiusV;
    } else {
      playerRadiusUp = false;
    }
  } else {
    ////Check if playerRadius has reached min ceilling
    if (playerRadius >= 10) {
      playerRadius -= playerRadiusV;
    } else {
      playerRadiusUp = true;
    }
      }
    console.log ("playerRadiusUp = " + playerRadiusUp + " playerRadius = " + playerRadius);
  }

  function displayMotivation(m,h) {
    motivationText = m;
    opacity -= 5;
    opacity = constrain(opacity,0,255);
    console.log ("opacity " + opacity);
    fill(0,opacity);
    textSize(38);
    textFont(motivationFont);
    text(motivationText, width/2, h);
  }

  ///////ENDNEW/////////
