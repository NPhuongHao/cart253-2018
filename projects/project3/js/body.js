var mgr;
var titleFont;

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

var snake;

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

var tut = [];

//-----------------------------------------------------//
//-----------------------------------------------------//




function preload() {
  bgIntro = loadImage('assets/images/bgIntro.jpg');
  tut[0] = loadImage('assets/images/bgTut01.jpg');
  tut[1] = loadImage('assets/images/bgTut02.jpg')
  globalFont = loadFont('../assets/fonts/SedgwickAve-Regular.ttf');
  titleFont = loadFont('../assets/fonts/Acme-Regular.ttf');

  soundFormats('mp3', 'wav');
  //bgSong = loadSound('assets/sounds/Ib_Puppet.mp3');
  twinkle = loadSound('assets/sounds/twinkle.mp3');
}

function setup() {
    mgr = new SceneManager();
    mgr.bgIntro = bgIntro;
    mgr.wire();

    mgr.addScene ( GameOver );

    mgr.showScene( Intro );
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
