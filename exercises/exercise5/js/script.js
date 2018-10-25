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

////NEW/////
//Divider line between 2 playground
var divider = {
  x: 0,
  y: 0,
  size: 10,
}
//opacity for movement instruction
var instructionOpacity = 100;
/////END NEW/////

function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  mainFont = loadFont("assets/fonts/ARCADECLASSIC.TTF");
}


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(860, 480);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 15, 5);
  /////NEW/////
  // Create the right paddle with UP, DOWN, LEFT, RIGHT as controls
  rightPaddle = new Paddle(width - 10, height / 2 - 35, 10, 70, 10, DOWN_ARROW, UP_ARROW, 37, 39);
  // Create the left paddle with W, S, A, D as controls
  // Keycodes 83 and 87 are W and S respectively, 65 and 68 are A and D respectively
  leftPaddle = new Paddle(0, height / 2 - 35, 10, 70, 10, 83, 87, 65, 68);
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

  /////NEW/////
  checkGameOver();
  /////END NEW////
}


//////NEW////////
//Style divider and instruction
function setupDividerAndInstruction() {
  divider.y = 65;
  divider.x = width / 2 - divider.size / 2;
  fill(255, 100);
  while (divider.y < height - 35) {
    rect(divider.x, divider.y, divider.size, divider.size);
    divider.y += 20;
  }
  textFont(mainFont);
  textSize(14);
  text('BACKSPACE to pause \n SHIFT to resume', width / 2, 30);
  text('Gain 5 points superior to your opponent to win!', width / 2, height - 20);
  //Paddle's movements instruction
  fill(255, instructionOpacity);
  textSize(32);
  instructionOpacity = constrain(instructionOpacity-=3, 0,100);//these instrucitons will fade away
  text('W   A   S   D', width/4, height/2);
  textFont('Lato');
  textStyle(BOLD);
  text('⇦   ⇨   ⇧   ⇩', width*3/4, height/2);
  textStyle(NORMAL);

}
//////END NEW////////
//////NEW////////
//Reload when player presses ENTER, pause when presses BACKSPACE, return when presses SHIFT
function keyPressed() {
  if (keyCode === RETURN) {
    window.location.reload();
  }
  if (keyCode === BACKSPACE) {
    noLoop();
  }
  if (keyCode === SHIFT) {
    loop();
  }
}
//////END NEW////////
//////NEW//////
//CHeck if game is over
function checkGameOver() {
  var scoreDistance = leftPaddle.score - rightPaddle.score;
  if (scoreDistance >= 5 || scoreDistance <= -5) {
    background(0);
    textAlign(CENTER);
    textSize(40);
    text('GAME  OVER', width / 2, height * 0.4);
    textSize(20);
    if (scoreDistance >= 5) {
      text('Player  1  win  with  ' + leftPaddle.score + '  points!', width / 2, height * 0.55);
    } else if (scoreDistance <= -5) {
      text('Player  2  win  with  ' + leftPaddle.score + '  points!', width / 2, height * 0.55);
    }
    text('Press  ENTER  to  replay', width / 2, height * 0.65);
    noLoop();
  }
}
//////END NEW//////
