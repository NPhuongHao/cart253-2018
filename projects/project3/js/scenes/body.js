/*****************

  NGUYEN Phuong Hao
  Pippin Barr
  CART 253 A
  Concordia University

  PROJECT NAME: STAR EATER
  Eat as much star as possible to maintain your celestial beauty. Go, starry snake!

  -----------------------------

  This is the body scene, the global javascript file.
  It stores global variables, global functions and initiates the website.

******************/

//-----------------------------------------------------//
//--------------GLOBAL VARIABLES-----------------------//
//-----------------------------------------------------//

var mgr;//variable for the sceneManager() function

//variables for each hexagon in the grid
var borderLength = 10;
var hexagonWidth = Math.sqrt(3) * borderLength;

//variables for the canvas's width and height
var canvasWidth = 1020;
var canvasHeight = hexagonWidth * 34.5; //this canvas's height won't get bigger than the combined height of 34.5 hexagons

//two arrays to store the hexagons of type A and type A in the grid (see the drawGrid() function)
var gridTypeA = [];
var gridTypeB = [];
//variable to store the t & i parameters of each hexagon
var gridcode = {
  t: 0,
  i: 0
};

//variable to store the snake object and the snake's global properties
var snake;
var snakeProperties = {
  speedMode: 'Fixed', // Fixed or Flexible (check Mode.js)
  speedLevel: 0,      // Relaxed(0), Dutiful(1) or Starving(2) (check Mode.js)
  clearSkyMode: true, // Clear Sky mode (true) or Cloudy SKy mode (false) (check Mode.js)
}

//variable to store the obstacle object
var obstacle;

//variables to monitor the snake's speed (see the speedCount() function in Snake class)
var counter = 0;
var decelerator = 0;

//variables to control the time limit of the special bait (check specialBaitTimer() in Bait.js)
var specialBaitCounter = 0;//Counter that goes up each time a new special bait pops up
var timerW = 0;//the width of the timer

//variable to control when the special bait will pop up
var counterToSpecialBait = 0;
//variable to control if the special bait is on screen
var specialBaitgo = false;

//array to store the tutorial scenes' code
var tut = [];



//-----------------------------------------------------//
//-----------------------------------------------------//
//-----------------------------------------------------//


function preload() {
  //load BG image of the main menu
  bgIntro = loadImage('assets/images/bgIntro.jpg');

  //load images of the tutorial
  tut[0] = loadImage('assets/images/bgTut01.jpg');
  tut[1] = loadImage('assets/images/bgTut02.jpg');

  //load fonts
  globalFont = 'Dancing Script';
  titleFont = 'Kaushan Script';

  //load sounds
  soundFormats('mp3', 'wav');
  bgSong = loadSound('assets/sounds/Ib_Puppet.mp3');
  twinkle = loadSound('assets/sounds/twinkle.mp3'); //effect when the snake eats a bait
}

function setup() {
    mgr = new SceneManager();
    mgr.bgIntro = bgIntro;
    mgr.wire();

    mgr.showScene( Intro );//call the Intro scene
}


//-----------------------------------------------------//
//--------------GLOBAL FUNCTIONS-----------------------//
//-----------------------------------------------------//

//Set up the borders of the playground
function drawBorder() {
  push();
  fill(22, 24, 39);
  noStroke();
  rect(0, 0, width, 20);
  rect(0, 0, 20, height);
  rect(0, height - 20, width, 20);
  rect(width - 20, 0, 20, height);
  pop();
}

//Set up the hexagonal grid
//This grid will be divided into 2 types A and B, each hexagon will have a t parameter and i parameter.
//One group of hexagons with the same t and i parameter consists of two hexagons, one of type A and the other of type B
//How type A and type B are positioned will be calculated below
function drawGrid() {
  //draw the type A hexagons
  for (var t = 1; t < canvasHeight / (hexagonWidth - 1); t++) { //t parameter to determine its y position
    for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) { //i parameter to determine its x position
      var x = borderLength * 3 * i; //x position of a type A hexagon based on its t parameter
      var y = hexagonWidth * (t - 1 / 2); //y position of a type A hexagon based on its y parameter
      fill(255, 0);
      stroke(200, 0);
      //enter the hexagon's t & i parameters to the gridTypeA[] array
      gridcode.t = t;
      gridcode.i = i;
      gridTypeA.push(gridcode);
      //draw the hexagon
      polygon(x, y, borderLength, 6);
    }
  }

  //draw the type B hexagons. Same mechanics with type A are applied.
  for (var t = 0; t < canvasHeight / (hexagonWidth - 1); t++) {
    for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) {
      var x = borderLength * (3 * i + 1.5);
      var y = hexagonWidth * t;
      if (t == 0 || t == 34) {
        fillColor = 150;
        strokeColor = 50;
      } else {
        fillColor = 255;
        strokeColor = 200;
      }
      fill(255, 0);
      stroke(200, 0);
      gridcode.t = t;
      gridcode.i = i;
      gridTypeB.push(gridcode);
      polygon(x, y, borderLength, 6);
    }
  }
}

//reset snake's position, its length and score
function resetPositionAndScore() {
  //Store a new Snake object into the snake variable
  snake = new Snake(17, 17, 'A', 5, 30, 2);

  //Set up the new snake
  snake.updateSnake();

  //Store the current snakeHighScore value back into its respective highscore category
  if (snakeProperties.clearSkyMode == true) {
    snake.highScore[0] = snakeHighScore;
  } else if (snakeProperties.clearSkyMode == false) {
    snake.highScore[1] = snakeHighScore;
  }

  //Store the snakeSpeed value back into the the new snake's speed level
  snake.speedLevel = snakeSpeed;

  //Reset the special Bait if it was on screen when the player lost
  specialBaitgo = false;
  counterToSpecialBait = 0;

  //Replay the BG song
  bgSong.loop();
}

//reset everything except the highscores
function resetEverything() {
  //Store a new Snake object into the snake variable
  snake = new Snake(17, 17, 'A', 5, 30, 2);

  //store a new Bait onject into the bait variable and the specialBait variable
  bait = new Bait(floor(random(2, 32)), floor(random(2, 32)), 'A', borderLength, 10); //this is the normal bait
  specialBait = new Bait(floor(random(2, 32)), floor(random(2, 32)), 'A', borderLength, 30); //this is the special bait with a bigger radius value

  //Reset the special Bait if it was on screen when the player lost
  specialBaitgo = false;
  counterToSpecialBait = 0;

  //Set up the new snake
  snake.updateSnake();

  //Store the current snakeHighScore value back into its respective highscore category
  if (snakeProperties.clearSkyMode == true) {
    snake.highScore[0] = snakeHighScore;
  } else if (snakeProperties.clearSkyMode == false) {
    snake.highScore[1] = snakeHighScore;
  }
}

//from p5.js. function used to draw polygons
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
