// Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

// Game colors
var bgColor = 0;
var fgColor = 255;

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  sizeOriginal: 20,
  vx: 0,
  vy: 0,
  speed: 6,
}

var ballTrail = {
  no1: {
    x: 0,
    y: 0
  },
  no2: {
    x: 0,
    y: 0
  },
  no3: {
    x: 0,
    y: 0
  },
  no4: {
    x: 0,
    y: 0
  },
  no5: {
    x: 0,
    y: 0
  }
}
var n = 1;

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 15,
  hOriginal: 70,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 6,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  leftKeyCode: 65,
  rightKeyCode: 68,
  score: 0,
  color: 255
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 15,
  hOriginal: 70,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 6,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  leftKeyCode: 37,
  rightKeyCode: 39,
  score: 0,
  color: {
    r: 255,
    b: 255,
    g: 255
  }
}

//Distance between 2 paddles' score
var scoreDistance;

// A variable to hold the beep sound we will play on bouncing
var beepSFX;

var divider = {
  x: 0,
  y: 0,
  size: 10,
}

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  fontScore = loadFont('assets/fonts/ARCADECLASSIC.TTF')
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(860,480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}


// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor);
  leftPaddle.color = {r:255, b:255, g:255};
  rightPaddle.color = {r:255, b: 255, g:255};
  setupDividerAndInstruction();

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePositionBall();

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  //Update Score
  updateScore(leftPaddle.score, 80);
  updateScore(rightPaddle.score, width-80);
  updatePaddle();

  //Check game over
  checkGameOver();
}


function setupDividerAndInstruction() {
  divider.y = 65;
  divider.x = width/2;
  fill(255,100);
  while (divider.y < height) {
    rect(divider.x, divider.y, divider.size, divider.size);
    divider.y += 20;
  }
  textSize(14);
  text('BACKSPACE to pause \n SHIFT to resume', width/2, 30);
}

// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }

  if (keyIsDown(paddle.rightKeyCode)) {
    // Move up
    paddle.vx = + paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.leftKeyCode)) {
    // Move down
    paddle.vx = -paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vx = 0;
  }
}

//update ball's trail
function updatePositionBall() {
  ballTrail.no1.x = ballTrail.no2.x;
  ballTrail.no1.y = ballTrail.no2.y;
  ballTrail.no2.x = ballTrail.no3.x;
  ballTrail.no2.y = ballTrail.no3.y;
  ballTrail.no3.x = ballTrail.no4.x;
  ballTrail.no3.y = ballTrail.no4.y;
  ballTrail.no4.x = ballTrail.no5.x;
  ballTrail.no4.y = ballTrail.no5.y;
  ballTrail.no5.x = ball.x;
  ballTrail.no5.y = ball.y;
  ball.x += ball.vx;
  ball.y = ball.y + ball.vy;

}



// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
  ////NEW////limit the paddle's movement inside the canvas
  object.y = constrain(object.y, 0 + object.h/2, height - object.h/2);
  if (object = leftPaddle) {
    object.x = constrain(object.x, 0 + object.w/2, width/2 - object.w/2);
  } else if (object = rightPaddle) {
    object.x = constrain(object.x, width/2 + object.w/2, width - object.w/2);
  }

  ///////ENDNEW////////
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
      ball.size = ball.sizeOriginal + random(0, 20);
      paddle.color = {
        r: 255,
        b: 70,
        g: 0
      };
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball going off the sides
  if (ballRight < 0 || ballLeft > width) {
    reset();
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!

    ///////NEW////////
    //Display score for each paddle.
    if (ballLeft > width) {
      //if ball goes off the right side, add 1 point for left paddle
      leftPaddle.score += 1;
    } else {
      //if ball goes off the left side, add 1 point for right paddle
      rightPaddle.score += 1;
    }


    //Increase difficulty as score adds up
    if (leftPaddle.score == 10 || rightPaddle.score == 10) {
      updateSpeed();
    } else if (leftPaddle.score == 30 || rightPaddle.score == 20) {
      updateSpeed();
    } else if (leftPaddle.score == 50 || rightPaddle.score == 30) {
      updateSpeed();
    }
  }
}

function updateSpeed() {
  ball.speed += 1;
  leftPaddle.speed += 2;
  rightPaddle.speed += 2;
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  fill(255,70,0,20);
  ellipse(ballTrail.no1.x,ballTrail.no1.y,ball.size,ball.size);
  fill(255,91,6,50);
  ellipse(ballTrail.no2.x,ballTrail.no2.y,ball.size,ball.size);
  fill(254,126,16,100);
  ellipse(ballTrail.no3.x,ballTrail.no3.y,ball.size,ball.size);
  fill(254,112,104,150);
  ellipse(ballTrail.no4.x,ballTrail.no4.y,ball.size,ball.size);
  fill(253,254,152,200);
  ellipse(ballTrail.no5.x,ballTrail.no5.y,ball.size,ball.size);
  fill(255,255,142);
  ellipse(ball.x,ball.y,ball.size,ball.size);
}

    //////ENDNEW///////

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  fill(paddle.color.r, paddle.color.b, paddle.color.g);
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
}

//////NEW///////
function updateScore(paddleScore, scorePosition) {
  textAlign(CENTER);
  textFont(fontScore);
  fill(255);
  textSize(20);
  text('Score    ' + paddleScore, scorePosition, 40);
}

function updatePaddle() {
  //Calculate the distance between each paddle's score
  scoreDistance = leftPaddle.score - rightPaddle.score;
  //Change each paddle's size depending on its score comparing one to the other
  leftPaddle.h = leftPaddle.hOriginal + scoreDistance*10;
  rightPaddle.h = rightPaddle.hOriginal - scoreDistance*10;
}

function reset() {
  // If it went off either side, reset it to the centre
  ball.x = width/2;
  ball.y = height/2;
  //the ball launch toward the paddle that won the most recent point with a random y velocity
  ball.vx = -ball.vx;
  ball.vy = random(ball.speed-3, ball.speed+3);
}

function checkGameOver() {
  if (scoreDistance > 5 || scoreDistance < -5) {
    background(0);
    textAlign(CENTER);
    textSize(40);
    text('GAME  OVER', width/2, height*0.4);
    textSize(20);
    if (scoreDistance > 5) {
      text('Player  1  win  with  ' + leftPaddle.score + '  points!', width/2, height*0.55);
    } else if (scoreDistance < -5) {
      text('Player  2  win  with  ' + leftPaddle.score + '  points!', width/2, height*0.55);
    }
    text('Press  ENTER  to  replay', width/2, height*0.65);
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === RETURN) {
    window.location.reload();
  } if (keyCode === BACKSPACE) {
    noLoop();
  } if (keyCode === SHIFT) {
    loop();
  }
}
//////ENDNEW//////
