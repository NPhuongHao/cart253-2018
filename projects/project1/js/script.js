/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;
// Track whether the game is won
var gameWin = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 8;

//playerRadius' modificators
var playerRadiusV;
var playerRadiusUp = false; //To check if we're in the process of increasing or decreasing playerRadius

// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 255;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 50;
var preyVX;
var preyVY;
var preyMaxSpeed = 2;
var tx;
var ty;
// Prey health
var preyHealth;
var preyMaxHealth = 200;
// Prey fill color
var preyFill = {x: 30, y: 60, z: 105};

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 30;
// Number of prey eaten during the game
var preyEaten = 0;

// motivationText's style
var opacity = 255;
var motivationText;
var motivationFont;

//Background settings
var backgroundUp = false;
var backgroundV = 1.5;
var backgroundX = 180;
var backgroundY = 220;
var backgroundZ = 255;
var dayCount = 0;


//Introduction
var counter = 0; // Counter code used to change narration accordingly
var introNara;
var go = false; // Run the game or not


// setup()
//

function preload() {
  motivationFont = loadFont('assets/fonts/AllertaStencil-Regular.ttf');
  prey = loadImage('assets/images/skull.png');
  player = loadImage('assets/images/heart.png');
  backgroundImage = loadImage('assets/images/background.jpg');
  introSound = new Audio('assets/sounds/Wadanohara_OST_GameOver.mp3');
  gameOverSound = new Audio('assets/sounds/Ib_OST_Goofball_Extended.mp3');
  gameWinSound = new Audio('assets/sounds/Wadanohara_OST_WadanoharasOcarina.mp3');
  eatSound = new Audio('assets/sounds/MonsterGrunt.mp3');
  clockSound = new Audio('assets/sounds/clock.mp3');
}

// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  background(backgroundX, backgroundY, backgroundZ);
  textAlign(CENTER);

  noStroke();

  setupPrey();
  setupPlayer();
  introSound.play();
  introSound.loop = true;
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

  if (go == true){
    if (!gameOver) {
        // BG color = morning comes and goes
        clockSound.play();
        clockSound.loop = true;
        changeBackgroundColor();
        textAlign(RIGHT);
        textFont('Arial')
        textSize(18);
        textStyle(BOLD);
        fill(255,255);
        text("DAY " + dayCount, width-30, 30);
        textAlign(CENTER);
        textStyle(BOLD);
      handleInput();

      movePlayer();
      movePrey();

      updateHealth();
      checkEating();
      checkDay();

      drawPrey();
      drawPlayer();
    }
    else {
      showGameOver();
    }
    if (gameWin == true) {
      showGameWin();
    }
  }
  //Change narration according to counter code
  if (go == false) {
    instruction(counter);
  }
}

// handleInput()
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

  //Quicken playerMaxSpeed when player holds SHIFT keys
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = 13;
    playerHealth -= 0.8;
  } else {
    playerMaxSpeed = 8;
  }


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
    eatSound.play();
    eatSound.currentTime = 0;
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Change preyRadius randomly
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    //Decrease the playerRadius when it reaches 25px and increase it when it reaches 10px
    modifyPlayerRadius();
    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      preyRadius = random(40,60);
      // Give it full health
      preyHealth = preyMaxHealth;
      console.log(preyHealth);
      console.log(preyX, preyY);
      // Track how many prey were eaten
      preyEaten++;
      //Give back 100% opacity for motivationText as player eats a certain amount of preys
      if (preyEaten == 10 || preyEaten == 15 || preyEaten == 20 || preyEaten == 25 || preyEaten == 30 || dayCount == 8 && counter == 13) {
        opacity = 255;
      }
    }
  }
}

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

if (0 <= preyEaten && preyEaten < 10) {
    displayMotivation('TIK TOK', height/2);
    tx += 0.8;
    ty += 0.8;
  } else if ( 10 <= preyEaten && preyEaten < 15) {
    displayMotivation("I'M IMPRESSED", height/2);
    preyMaxSpeed = 4;
    tx += 0.5;
    ty += 0.5;
  } else if (15 <= preyEaten && preyEaten < 20) {
    displayMotivation("THEY KNOW\n YOU ARE AFTER THEM", height/2);
    tx += 0.1;
    ty += 0.1;
  } else if (20 <= preyEaten && preyEaten < 25) {
    displayMotivation("TRY HARDER", height/2);
    preyMaxSpeed = 8;
    tx += 0.05;
    ty += 0.05;
  } else if (25 <= preyEaten && preyEaten < 30) {
    displayMotivation("CALM \n BEFORE THE STORM", height/2);
    preyMaxSpeed = 2;
    tx += 0.2;
    ty += 0.2;
  } else if (30 <= preyEaten) {
    displayMotivation("STAY DILIGENT", height*0.45);
    displayMotivation("FROM NOW ON", height*0.55);
    preyMaxSpeed = 12;
    tx += 0.07;
    ty += 0.07;
  }

}

function checkDay() {
//Another day comes when the sky is fully lightened
  if (backgroundZ == 255) {
    dayCount += 1;
  }
//At night the prey's health decrease making it harder to see
if (backgroundUp == false) {
  if (backgroundX < 80) {
    preyHealth -= 0.5;
  }
} else if (backgroundUp == true) {
  if (backgroundX < 80) {
    preyHealth += 0.5;
  }
}
if (dayCount == 8) {
  displayMotivation('ALMOST THERE', height/2);
  counter += 1;
}
//If the player survive pass day 13, the game is won
if (dayCount == 11) {
  gameWin = true;
}
}


// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(preyFill.x,preyFill.y,preyFill.z,preyHealth);
  image(prey,preyX,preyY,preyRadius,preyRadius);
  push();
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(250,20,50,playerHealth);
  ellipse(playerX,playerY,playerRadius*2,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  clockSound.pause();
  gameOverSound.play();
  gameOverSound.loop = true;
  background(0);
  fill(255,0,0);
  textSize(32);
  textAlign(CENTER,CENTER);
  textFont(motivationFont);
  var gameOverText = "WELCOME\n";
  var result = constrain(dayCount - 1,0,dayCount);
  gameOverText += "You survived " + result + " days\n";
  text(gameOverText,width/2,height/2);
  noLoop();
}

function showGameWin(){
  gameWinSound.play();
  gameWinSound.loop = true;
  changeBackgroundColor();
  fill(255);
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER,CENTER);
  playerHealth = 0;
  textFont(motivationFont);
  text("GOOD HUMAN",width/2,height*0.45);
  textSize(26);
  text("You have completed your task\n Now, go back to your life", width/2, height*0.55);
}

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
  }


function displayMotivation(m,h) {
    motivationText = m;
    opacity -= 5;
    opacity = constrain(opacity,0,255);
    fill(255,0,0,opacity);
    textSize(38);
    textFont(motivationFont);
    text(motivationText, width/2, h);
  }

function changeBackgroundColor() {
    if (backgroundUp == true) {
      //Check if background color has reached max ceilling
      if (backgroundZ < 255) {
        backgroundX = constrain(backgroundX += backgroundV, 0, 180);
        backgroundY = constrain(backgroundY += backgroundV, 10, 220);
        backgroundZ = constrain(backgroundZ += backgroundV, 65, 255);
        tint(backgroundX, backgroundY, backgroundZ,200);
        image(backgroundImage,0,0,500,500);
      } else {
        backgroundUp = false;
      }
    }
    if (backgroundUp == false) {
      ////Check if playerRadius has reached min ceilling
      if (backgroundX > 0) {
        backgroundX = constrain(backgroundX -= backgroundV, 0, 180);
        backgroundY = constrain(backgroundY -= backgroundV, 10, 220);
        backgroundZ = constrain(backgroundZ -= backgroundV, 65, 260);
        tint(backgroundX, backgroundY, backgroundZ,200);
        image(backgroundImage,0,0,500,500);
      } else {
        backgroundUp = true;
      }
        }
  }

function instruction(n) {
  background(0,5,35);
  fill(255);
  textFont(motivationFont);
  textSize(18);
  //Display narration based on counter code
  if (n == 0) {
    introNara = 'Greetings, human.';
    } if (n == 1) {
    introNara = 'My name is Death.'
    } if (n == 2) {
    introNara = 'Your heart has weakened,\n';
    introNara += 'and you are dying.';
    }  if (n == 3) {
    introNara = 'You asked for my help\n';
    introNara += 'to restore your life...';
    }  if (n == 4) {
    fill(255,0,0);
    introNara = 'But my power is not for granted.';
    }  if (n == 5) {
    introNara = 'However';
    }  if (n == 6) {
    introNara = 'Considering the good deeds\n';
    introNara += 'that you have done...';
    }  if (n == 7) {
    introNara = 'I shall grant you your wish,\n';
    introNara += 'with a small condition.';
    }  if (n == 8) {
    introNara = 'You will have to hunt down\n the demons that escaped my jail.';
    }  if (n == 9) {
    fill(21, 254, 203);
    introNara = 'They are countless, and you are alone.\n But do not be afraid.';
    }  if (n == 10) {
    introNara = 'Catch them before your life fades away,\n and after 10 days, you shall earn my blessing.'
    }  if (n == 11) {
    introNara = 'Be careful, \n it will be hard to catch them at night...';
    }  if (n == 12) {
    fill(255,0,0);
    textSize(24);
    introNara = 'Hurry up, and do not die.';
    }
  text(introNara, width/2, height/2);
  fill(255,100);
  textSize(12)
  text('Press ENTER to proceed\n Press Backspace to skip', width/2, height*0.9);
  }

function keyPressed() {
  if (keyCode===RETURN) {
    counter ++;
    if (counter <= 12) {
      instruction(counter);
    }
    else {
      go = true;
      introSound.pause();
    }
  } else if (keyCode === BACKSPACE) {
    go = true;
    introSound.pause();
  }
}
