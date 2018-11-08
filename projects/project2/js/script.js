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

function preload() {
  mainFont = loadFont('assets/fonts/ARCADECLASSIC.TTF');
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(windowWidth*0.7,windowHeight*0.7);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,10);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,10);
  noStroke();
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  setUpPlayground();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

function setUpPlayground() {
  background(67,88,105);
  //set up territory limits
  fill(33,42,49);
  rectMode(CORNERS);
  rect(0,0,leftPaddle.playgroundWidthLimit,height);
  rect(width,0,width-rightPaddle.playgroundWidthLimit,height);
  //set up score display
  fill(231,240,237);
  rectMode(CORNER);
  textFont(mainFont);
  textAlign(LEFT);
  textSize(20);
  text('SCORE   ' + leftPaddle.score, 40,40);
  textAlign(RIGHT);
  text('SCORE   ' + rightPaddle.score, width-40, 40)
}
