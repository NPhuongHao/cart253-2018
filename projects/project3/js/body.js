var bgIntro;
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


//-----------------------------------------------------//
//-----------------------------------------------------//


function preload() {
  bgIntro = loadImage('../assets/images/bgIntro.jpg');
  globalFont = loadFont('../assets/fonts/SedgwickAve-Regular.ttf');
  titleFont = loadFont('../assets/fonts/Acme-Regular.ttf');
}

function setup() {
    var mgr = new SceneManager();
    mgr.bgIntro = bgIntro;
    mgr.wire();
    mgr.showScene( Intro );
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
