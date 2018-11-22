/*****************

  Class for each dot of the snake.

  This class controls how each of the snake's dots moves and collide with each other.

******************/

function SnakeDot(t,i, type, angle, speed) {
  this.type = type;
  this.t = t;
  this.i = i;
  /*this.x = x;
  this.y = y;*/
  if (type == 'A') {
    //if the grid type its head finds itself on upon the start is A, its x and y position is below
    this.x = borderLength * 3 * i;
    this.y = hexagonHeight * (t - 1 / 2);
  } else if (type == 'B') {
    //if the grid type its head finds itself on upon the start is B, its x and y position is below
    this.x = borderLength * (3 * i + 1.5);
    this.y = hexagonHeight * t;
  }
  this.speed = speed;
  this.angle = 30;
}

SnakeDot.prototype.updatePosition = function() {
  if (this.type == 'A') {
    //if the grid type its head finds itself on upon the start is A, its x and y position is below
    this.x = borderLength * 3 * this.i;
    this.y = hexagonHeight * (this.t - 1 / 2);
  } else if (this.type == 'B') {
    //if the grid type its head finds itself on upon the start is B, its x and y position is below
    this.x = borderLength * (3 * this.i + 1.5);
    this.y = hexagonHeight * this.t;
  }
}

SnakeDot.prototype.displayDot = function() {
  push();
  fill(255);
  stroke(255);
  //ellipse(this.x, this.y, hexagonHeight, hexagonHeight);
  polygon(this.x, this.y, borderLength, 6);
  pop();
}