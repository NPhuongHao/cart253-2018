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
//opacity for movement instruction
var instructionOpacity = 100;
var play = false; //to check if game is being played or not
var titleOpacity = 255;
var winningPoint = 11; //to define at what point the game is over

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
  createCanvas(1000,480);
  // Create a ball
  //x,y,vx,vy,size,speed
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the unknown
  unknownBall = new specialBall(width/2,height/2,5,0,20,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,37,39,10);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,65,68,10);
  noStroke();
}
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  setUpPlayground(); //set up the playground's visual

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  unknownBall.checkGo();


  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  //handle the behavior of specialBall if it appears on screen
  if (unknownBall.go == true) {
    //console.log(unknownBall.go);
    unknownBall.update();
    //Check if unknownBall is off screen
    if (unknownBall.isOffScreen()) {
      console.log('checkpoint');
      unknownBall.reset();
    }
    unknownBall.handleCollision(leftPaddle);
    unknownBall.handleCollision(rightPaddle);
    unknownBall.display();
  }

  displayScore();//show each paddle's score

  //if the game is not being played, show the title panel
  if (play == false) {
    titlePanel();
  }

  //check if the game is over
  checkGameOver();

}

function setUpPlayground() {
  //background(79,118,74);
  background(56,75,71);
  //set up territory limits
  //fill(56,75,71);
  fill(79,118,74);
  rectMode(CORNERS);
  rect(0,0,leftPaddle.playgroundWidthLimit,height);
  rect(width,0,width-rightPaddle.playgroundWidthLimit,height);
  rectMode(CORNER);
  //Paddle's movements instruction
  fill(255, instructionOpacity);
  textFont(mainFont);
  textAlign(CENTER);
  textSize(32);
  instructionOpacity = constrain(instructionOpacity-=1.5, 0,100);//these instrucitons will fade away
  text('W   A   S   D', width/4, height/2);
  textFont('Lato');
  textStyle(BOLD);
  text('⇦   ⇨   ⇧   ⇩', width*3/4, height/2);
  textStyle(NORMAL);
}

function displayScore () {
  //set up score display
  fill(231,240,237);
  textFont(mainFont);
  textAlign(LEFT);
  textSize(20);
  text('SCORE   ' + leftPaddle.score, 40,40);
  textAlign(RIGHT);
  text('SCORE   ' + rightPaddle.score, width-40, 40);
}

//The title panel at the beginning of the game
function titlePanel () {
  background(79,118,74);
  //Start button instruction;
  imageMode(CENTER);
  tint(255, 157);
  image(spaceButton, width/2, height*0.8, 110, 35);
  //text divider
  textAlign(CENTER);
  textFont('Lato');
  textSize(32);
  text('-----------------------', width/2, height*0.5);
  textFont(mainFont);
  //left and right borders
  fill(56,75,71)
  rectMode(CORNERS);
  rect(0,0,100,height);
  rect(width,0,width-100,height);
  rectMode(CORNER);
  //small blocks illustration
  fill(223,52,65);
  //fill(119,81,78);
  rect(150,height*0.5-90,10,50);
  rect(150,height*0.5-25,10,50);
  rect(150,height*0.5+40,10,50);
  rect(185,height*0.5-57.5,10,50);
  rect(185,height*0.5+7.5,10,50);
  rect(220,height*0.5-25,10,50);
  rect(width-150,height*0.5-90,10,50);
  rect(width-150,height*0.5-25,10,50);
  rect(width-150,height*0.5+40,10,50);
  rect(width-185,height*0.5-57.5,10,50);
  rect(width-185,height*0.5+7.5,10,50);
  rect(width-220,height*0.5-25,10,50);
  //stop BG song from playing
  bgSong.pause();
  //text content
  fill(242);
  textSize(54);
  text('BREAKOUT  PONG', width/2,height*0.3);
  textSize(32);
  text('CHRISTMAS  INVASION', width/2, height*0.4);
  fill(242);
  textSize(20);
  text('Hit  balls  and  break  blocks  until  you  win !!', width/2, height*0.6);
  textSize(16);
  text('Best   played   with   a   fellow   player   and   mistletoe',width/2, height*0.65);
  noLoop();
}

function keyPressed() {
  if (keyCode === 32) {//SPACE --> start game
    play = true;
    loop();
    //play BG song
    gameOverSong.stop();
    bgSong.setVolume(0.3);
    bgSong.loop();
  } if (keyCode === 13) {//ENTER ---> replay
    resetGame();
  }
}

function checkGameOver() {
  if (leftPaddle.score == winningPoint || rightPaddle.score == winningPoint) {
    background(56,75,71);
    fill(79,118,74)
    rectMode(CORNERS);
    rect(0,0,leftPaddle.playgroundWidthLimit,height);
    rect(width,0,width-rightPaddle.playgroundWidthLimit,height);
    rectMode(CORNER);
    //text content
    fill(242)
    textAlign(CENTER);
    textSize(40);
    text('GAME  OVER', width / 2, height * 0.4);
    textSize(20);
    if (leftPaddle.score == winningPoint) {
      text('Player  1  won  with  ' + leftPaddle.score + '  points!', width / 2, height * 0.55);
    } else if (rightPaddle.score == winningPoint) {
      text('Player  2  won  with  ' + rightPaddle.score + '  points!', width / 2, height * 0.55);
    }
    text('Press  ENTER  to  replay', width / 2, height * 0.65);
    //play gameOver's song
    bgSong.stop();
    gameOverSong.loop();
    noLoop();
    }
}

function resetGame() {
  play = false;
  leftPaddle.score = 0;
  rightPaddle.score = 0;
  leftPaddle.playgroundWidthLimit = 10;
  rightPaddle.playgroundWidthLimit = 10;
  ball.reset();
  loop();
}
