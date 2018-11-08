// Ball
//
// A class to define how a ball that player should avoid behaves.
// Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// avoidBall constructor
//
// Sets the properties with the provided arguments
function avoidBall(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  //Ball's color RGB
  this.r = 20;
  this.g = 51;
  this.b = 42
}

avoidBall.prototype.update = function () {}

avoidBall.prototype.handleCollision =function() {}

avoidBall.prototype.isOffScreen = function() {}

avoidBall.prototype.display = function() {}

avoidBall.prototype.reset = function() {}
