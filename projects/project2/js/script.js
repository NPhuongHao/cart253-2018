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
var balls = [];
var leftPaddle = [];
var rightPaddle = [];
//opacity for movement instruction
var instructionOpacity = 100;
var play = false; //to check if game is being played or not
var titleOpacity = 255;
var winningPoint = 11; //to define at what point the game is over
var hitPaddle; //to define which paddle was hit by the specialBall
var brickPaddle; //to define which paddle launched the ball that hit the brick

function preload() {
  beepSFX = loadSound("assets/sounds/beep.wav");
  thumpSFX = loadSound("assets/sounds/thump.wav");
  bgSong = loadSound("assets/sounds/carols.mp3");
  gameOverSong = loadSound("assets/sounds/jingle.mp3");
  mainFont = loadFont("assets/fonts/ARCADECLASSIC.TTF");
  spaceButton = loadImage("assets/images/space.png");
  secretGift = loadImage("assets/images/box.png");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(1000, 480);
  // Create a ball and its additional ball
  //x,y,vx,vy,size,speed
  balls[0] = new Ball(width / 2 - 2.5, height / 2 - 2.5, 5, 5, 10, 5);
  balls[1] = new Ball(balls[0].x, balls[0].y, balls[0].vx, -balls[0].vy, balls[0].size, balls[0].speed);
  // Create the unknown
  unknownBall = new specialBall(width / 2, height / 2, 7, 0, 20, 7);
  // Create the right paddle & its mirror
  //x,y,w,h,speed,originalSpeed,downKey,upKey,leftKey,rightKey,playgroundWidthLimit
  rightPaddle[0] = new Paddle(width - 10, height / 2, 10, 60, 10, 10, DOWN_ARROW, UP_ARROW, 37, 39, 10);
  rightPaddle[1] = new Paddle(rightPaddle[0].x, height - rightPaddle[0].y, rightPaddle[0].w, rightPaddle[0].h, rightPaddle[0].speed, rightPaddle[0].originalSpeed, UP_ARROW, DOWN_ARROW, 37, 39, 10);
  // Create the left paddle & its mirror
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle[0] = new Paddle(0, height / 2, 10, 60, 10, 10, 83, 87, 65, 68, 10);
  leftPaddle[1] = new Paddle(leftPaddle[0].x, height - leftPaddle[0].y, leftPaddle[0].w, leftPaddle[0].h, leftPaddle[0].speed, leftPaddle[0].originalSpeed, 87, 83, 65, 68, 10);

  for (var t = 0; t < 3; t++) {
    for (var i = 0; i < 3; i++) {
      var brickY = height / 2 - 10 - (i + 1) * 80;
      var brickX = width / 2 - 10 - 40 + t * 30;
      bricks.push(new Brick(brickX, brickY, 15, 60, true));
    }
    for (var i = 3; i < 6; i++) {
      var brickX = width / 2 - 10 - 40 + t * 30;
      var brickY = height / 2 + 10 + (i-3) * 80;
      bricks.push(new Brick(brickX, brickY, 15, 60, true));
    }
  }

  noStroke();


}
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  setUpPlayground(); //set up the playground's visual

  leftPaddle[0].handleInput();
  rightPaddle[0].handleInput();

  balls[0].update();
  leftPaddle[0].update();
  rightPaddle[0].update();
  unknownBall.checkGo();
  console.log(unknownBall.go);


  if (balls[0].isOffScreen()) {
    balls[0].reset();
  }

  balls[0].handleCollision(leftPaddle[0]);
  balls[0].handleCollision(rightPaddle[0]);

  balls[0].display();
  leftPaddle[0].display();
  rightPaddle[0].display();

  brickHandle();

  //handle the behavior of specialBall if it appears on screen
  if (unknownBall.go == true) {
    //console.log(unknownBall.go);
    unknownBall.update();
    //Check if unknownBall is off screen
    if (unknownBall.isOffScreen()) {
      console.log('checkpoint');
      unknownBall.reset();
      //console.log(unknownBall.go);
    }
    unknownBall.handleCollision(leftPaddle[0]);
    unknownBall.handleCollision(rightPaddle[0]);
    unknownBall.display();
    //console.log(unknownBall.go);
  }

  if (triggerReaction == true) {
    unknownBall.handleReaction(unknownBall.category, hitPaddle);
  }

  displayScore(); //show each paddle's score

  //if the game is not being played, show the title panel
  if (play == false) {
    titlePanel();
  }

  //check if the game is over
  checkGameOver();

}

function setUpPlayground() {
  //background(79,118,74);
  background(56, 75, 71);
  //set up territory limits
  //fill(56,75,71);
  fill(79, 118, 74);
  rectMode(CORNERS);
  rect(0, 0, leftPaddle[0].playgroundWidthLimit, height);
  rect(width, 0, width - rightPaddle[0].playgroundWidthLimit, height);
  rectMode(CORNER);
  //Paddle's movements instruction
  fill(255, instructionOpacity);
  textFont(mainFont);
  textAlign(CENTER);
  textSize(32);
  instructionOpacity = constrain(instructionOpacity -= 1.5, 0, 100); //these instrucitons will fade away
  text('W   A   S   D', width / 4, height / 2);
  textFont('Lato');
  textStyle(BOLD);
  text('⇦   ⇨   ⇧   ⇩', width * 3 / 4, height / 2);
  textStyle(NORMAL);
}

function displayScore() {
  //set up score display
  fill(231, 240, 237);
  textFont(mainFont);
  textAlign(LEFT);
  textSize(20);
  text('SCORE   ' + leftPaddle[0].score, 40, 40);
  textAlign(RIGHT);
  text('SCORE   ' + rightPaddle[0].score, width - 40, 40);
}

//The title panel at the beginning of the game
function titlePanel() {
  background(79, 118, 74);
  //Start button instruction;
  imageMode(CENTER);
  tint(255, 157);
  image(spaceButton, width / 2, height * 0.8, 110, 35);
  //text divider
  textAlign(CENTER);
  textFont('Lato');
  textSize(32);
  text('-----------------------', width / 2, height * 0.5);
  textFont(mainFont);
  //left and right borders
  fill(56, 75, 71)
  rectMode(CORNERS);
  rect(0, 0, 100, height);
  rect(width, 0, width - 100, height);
  rectMode(CORNER);
  //small blocks illustration
  fill(223, 52, 65);
  //fill(119,81,78);
  rect(150, height * 0.5 - 90, 10, 50);
  rect(150, height * 0.5 - 25, 10, 50);
  rect(150, height * 0.5 + 40, 10, 50);
  rect(185, height * 0.5 - 57.5, 10, 50);
  rect(185, height * 0.5 + 7.5, 10, 50);
  rect(220, height * 0.5 - 25, 10, 50);
  rect(width - 150, height * 0.5 - 90, 10, 50);
  rect(width - 150, height * 0.5 - 25, 10, 50);
  rect(width - 150, height * 0.5 + 40, 10, 50);
  rect(width - 185, height * 0.5 - 57.5, 10, 50);
  rect(width - 185, height * 0.5 + 7.5, 10, 50);
  rect(width - 220, height * 0.5 - 25, 10, 50);
  //stop BG song from playing
  bgSong.pause();
  //text content
  fill(242);
  textSize(54);
  text('BREAKOUT  PONG', width / 2, height * 0.3);
  textSize(32);
  text('CHRISTMAS  INVASION', width / 2, height * 0.4);
  fill(242);
  textSize(20);
  text('Hit  balls  and  break  blocks  until  you  win !!', width / 2, height * 0.6);
  textSize(16);
  text('Best   played   with   a   fellow   player   and   mistletoe', width / 2, height * 0.65);
  noLoop();
}

function keyPressed() {
  if (keyCode === 32) { //SPACE --> start game
    play = true;
    loop();
    //play BG song
    gameOverSong.stop();
    bgSong.setVolume(0.3);
    bgSong.loop();
  }
  if (keyCode === 13) { //ENTER ---> replay
    resetGame();
  }
}

function checkGameOver() {
  if (leftPaddle[0].score == winningPoint || rightPaddle[0].score == winningPoint) {
    background(56, 75, 71);
    fill(79, 118, 74)
    rectMode(CORNERS);
    rect(0, 0, leftPaddle[0].playgroundWidthLimit, height);
    rect(width, 0, width - rightPaddle[0].playgroundWidthLimit, height);
    rectMode(CORNER);
    //text content
    fill(242)
    textAlign(CENTER);
    textSize(40);
    text('GAME  OVER', width / 2, height * 0.4);
    textSize(20);
    if (leftPaddle[0].score == winningPoint) {
      text('Player  1  won  with  ' + leftPaddle[0].score + '  points!', width / 2, height * 0.55);
    } else if (rightPaddle[0].score == winningPoint) {
      text('Player  2  won  with  ' + rightPaddle[0].score + '  points!', width / 2, height * 0.55);
    }
    text('Press  ENTER  to  replay', width / 2, height * 0.65);
    //play gameOver's song
    bgSong.stop();
    gameOverSong.loop();
    noLoop();
  }
}

function brickHandle() {
  bricks[0].exist = false;
  bricks[3].exist = false;
  bricks[12].exist = false;
  bricks[15].exist = false;
  for (var i = 0; i < 18; i++) {
    if (bricks[i].exist == true) {
      bricks[i].handleCollision(balls[0]);
      bricks[i].handleCollision(balls[1]);
      bricks[i].display();
    }
  }
}

function resetGame() {
  rightPaddle[0] = new Paddle(width - 10, height / 2, 10, 60, 10, 10, DOWN_ARROW, UP_ARROW, 37, 39, 10);
  rightPaddle[1] = new Paddle(rightPaddle[0].x, height - rightPaddle[0].y, rightPaddle[0].w, rightPaddle[0].h, rightPaddle[0].speed, rightPaddle[0].originalSpeed, UP_ARROW, DOWN_ARROW, 37, 39, 10);
  leftPaddle[0] = new Paddle(0, height / 2, 10, 60, 10, 10, 83, 87, 65, 68, 10);
  leftPaddle[1] = new Paddle(leftPaddle[0].x, height - leftPaddle[0].y, leftPaddle[0].w, leftPaddle[0].h, leftPaddle[0].speed, leftPaddle[0].originalSpeed, 87, 83, 65, 68, 10);
  balls[0].reset();
  balls[1].reset();
  leftPaddle[0].score = 0;
  rightPaddle[0].score = 0;
  play = false;
  for (var i=0; i<18; i++) {
    bricks[i].exist = true;
  }
  loop();
}
