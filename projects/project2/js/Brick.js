var bricks = [];

function Brick(x,y,w,h,exist) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.exist = true; //Boolean variable to check if the brick has been destroyed or not
  //brick's color RGB
  this.r = 246;
  this.g = 100;
  this.b = 99;

}

Brick.prototype.display = function() {
  fill(bricks[0].r,bricks[0].g,bricks[0].b);
  rect(this.x,this.y,this.w,this.h);
}

Brick.prototype.handleCollision = function (ball) {
  // Check if the ball overlaps the paddle on x axis
  if (ball.x + ball.size > this.x && ball.x < this.x + this.w) {
    // Check if the ball overlaps the paddle on y axis
    if (ball.y + ball.size > this.y && ball.y < this.y + this.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      ball.x -= ball.vx;
      ball.y -= ball.vy;
      // Reverse x velocity to bounce
      ball.vx = -ball.vx;
      //Make the brick disappear
      this.exist = false;
      //Collision sound effect
      beepSFX.stop();
      beepSFX.play();
      if (brickPaddle == leftPaddle[0] || brickPaddle == leftPaddle[1]) {
        leftPaddle[0].updateScore();
      } else if (brickPaddle == rightPaddle[0] || brickPaddle == rightPaddle[1]) {
        rightPaddle[0].updateScore();
      }
    }
  }
}
