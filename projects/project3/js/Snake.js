/*****************

  Class for the snake.

  This class's properties will mostly belong to the snake's head, and its tail will act accordingly.
  This class controls how the snake moves, gains score, collides with itself and with the wall.

******************/

function Snake(t,i,type,speed,angle,length) {
  this.type = type; //the grid type its head finds itself on upon the start
  this.t = t; //its t coordinator that indicates its y position
  this.i = i; //its i coordinator that indicates its x position
  if (type == 'A') {
    //if the grid type its head finds itself on upon the start is A, its x and y position is below
    this.x = borderLength * 3 * i;
    this.y = hexagonHeight * (t - 1 / 2);
  } else if (type == 'B') {
    //if the grid type its head finds itself on upon the start is B, its x and y position is below
    this.x = borderLength * (3 * i + 1.5);
    this.y = hexagonHeight * t;
  }
  //the future x and y position for its head after each update
  this.nextX;
  this.nextY;
  this.speed = speed;//its default speeed
  this.angle = angle;//its default movement's angle
  this.vx = cos(angle)*speed; //its x velocity according to its movement's angle
  this.vy = sin(angle)*speed; //its x velocity according to its movement's angle
  this.length = length;//its length
  this.snake = [];//an array to store each of its dots
}

Snake.prototype.update = function() {
  for (var i=0; i<this.length; i++) {
    this.snake[i] = this.snake[i+1];
    console.log(this.length, i);
  }
}
