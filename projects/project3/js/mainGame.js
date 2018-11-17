/*****************

Starry Snake
Nguyen Phuong Hao

Reach the stars and light them up to form beautiful constellations!

******************/

var borderLength = 10;
var hexagonHeight = Math.sqrt(3) * borderLength;

var canvasWidth = 1020;
var canvasHeight = Math.sqrt(3) * borderLength * 34.5;

var gridTypeA = [];
var gridTypeB = [];
var gridcode = {
  t: 0,
  i: 0
};

var snake;

var bgImg;

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  snake = new Snake(17, 17, 'A', 5, 30, 10);
  angleMode(DEGREES);
  background(102);
  drawGrid();
  push();
  fill(0);
  stroke(0);
  rect(0,0,width,20);
  rect(0,0,20,height);
  rect(0,height-20,width,20);
  rect(width-20,0,20,height);
  pop();
}

function draw() {
  snake.update();
  noLoop();
}

function drawGrid() {
  for (var t = 1; t < canvasHeight / (hexagonHeight - 1); t++) {
    for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) {
      var x = borderLength * 3 * i;
      var y = hexagonHeight * (t - 1 / 2);
      var fillColor = 255;
      var strokeColor = 200;
      if (i == 0 || t == 1 || i == 34 || t == 35) {
        fillColor = 50;
        strokeColor = 50;
      } else {
        fillColor = 255;
        strokeColor = 200;
      }
      fill(fillColor);
      stroke(strokeColor)
      if (fillColor == 255) {
        gridcode.t = t;
        gridcode.i = i;
        gridTypeA.push(gridcode);
      }
      polygon(x, y, borderLength, 6);
    }
  }


  for (var t = 0; t < canvasHeight / (hexagonHeight - 1); t++) {
    for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) {
      var x = borderLength * (3 * i + 1.5);
      var y = hexagonHeight * t;
      if (t == 0 || t == 34) {
        fillColor = 150;
        strokeColor = 50;
      } else {
        fillColor = 255;
        strokeColor = 200;
      }
      fill(fillColor);
      stroke(strokeColor);
      if (fillColor == 255) {
        gridcode.t = t;
        gridcode.i = i;
        gridTypeB.push(gridcode);
      }
      polygon(x, y, borderLength, 6);
    }
  }
}

//from p5.js
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
