/*****************

  Class for each dot display on screen.

  This class controls:
  - How each of the snake's dots behaves and collide with each other.
  - How each of the obstacle's dots behaves and collide with the snake.

******************/

function Dot(t,i, type, angle, speed) {
  this.type = type;
  this.t = t;
  this.i = i;
  /*this.x = x;
  this.y = y;*/
  if (type == 'A') {
    //if the grid type its head finds itself on upon the start is A, its x and y position is below
    this.x = borderLength * 3 * i;
    this.y = hexagonWidth * (t - 1 / 2);
  } else if (type == 'B') {
    //if the grid type its head finds itself on upon the start is B, its x and y position is below
    this.x = borderLength * (3 * i + 1.5);
    this.y = hexagonWidth * t;
  }
}

Dot.prototype.updatePosition = function() {
  if (this.type == 'A') {
    //if the grid type its head finds itself on upon the start is A, its x and y position is below
    this.x = borderLength * 3 * this.i;
    this.y = hexagonWidth * (this.t - 1 / 2);
  } else if (this.type == 'B') {
    //if the grid type its head finds itself on upon the start is B, its x and y position is below
    this.x = borderLength * (3 * this.i + 1.5);
    this.y = hexagonWidth * this.t;
  }
}

Dot.prototype.displayDot = function() {
  polygon(this.x, this.y, borderLength, 6);
}
