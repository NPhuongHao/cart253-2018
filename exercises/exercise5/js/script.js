// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

var divider = {
  x: 0,
  y: 0,
  size: 10,
}

function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  mainFont = loadFont("assets/fonts/ARCADECLASSIC.TTF");
}


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(860,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,15,5);
  /////NEW/////
  // Create the right paddle with UP, DOWN, LEFT, RIGHT as controls
  rightPaddle = new Paddle(width-10,height/2,10,70,10,DOWN_ARROW,UP_ARROW,37,39);
  // Create the left paddle with W, S, A, D as controls
  // Keycodes 83 and 87 are W and S respectively, 65 and 68 are A and D respectively
  leftPaddle = new Paddle(0,height/2,10,70,10,83,87,65,68);
  noStroke();
  /////END NEW/////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  setupDividerAndInstruction();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
    leftPaddle.ballOffScreenUpdate();
    rightPaddle.ballOffScreenUpdate();
    console.log(leftPaddle.score, rightPaddle.score);
  }

  //////NEW////////
  leftPaddle.updateScore();
  rightPaddle.updateScore();
  //////END NEW////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}


//////NEW////////
//Style divider and instruction
function setupDividerAndInstruction() {
  divider.y = 65;
  divider.x = width/2 - divider.size/2;
  fill(255,100);
  while (divider.y < height) {
    rect(divider.x, divider.y, divider.size, divider.size);
    divider.y += 20;
  }
  textSize(14);
  text('BACKSPACE to pause \n SHIFT to resume', width/2, 30);
}
//////END NEW////////
//////NEW////////
//Reload when player presses ENTER, pause when presses BACKSPACE, return when presses SHIFT
function keyPressed() {
  if (keyCode === RETURN) {
    window.location.reload();
  } if (keyCode === BACKSPACE) {
    noLoop();
  } if (keyCode === SHIFT) {
    loop();
  }
}
//////END NEW////////
