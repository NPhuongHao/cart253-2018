// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
////////////FIXED! bal --> ball
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  ////////////FIXED! crateCanvas --> createCanvas
  createCanvas(640,480);
  noStroke();
  // Create a ball
  ////////////FIXED! modified ball's x & y velocity, size and speed
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  ////////////FIXED! 600 --> 60. Switch place of DOWN_ARROW with UP_ARROW
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  ////////////FIXED! new Paddle( --> new Paddle()
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
////////////FIXED! Added }
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ////////////FIXED! ball.update --> ball.update()
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ////////////FIXED! added {. ball.isOffTheScreen --> ball.isOffScreen
  if (ball.isOffScreen()) {
    ////////////FIXED! reset() --> ball.reset()
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  ////////////FIXED! display( --> display()
  rightPaddle.display();
}
