// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.sizeOriginal = size;
  this.speed = speed;
/////NEW/////
  this.trail = [[0,0], [0,0], [0,0], [0,0], [0,0]] //Each array member = a trailing ball's position
/////END NEW/////
}


// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  /////NEW/////
  //Update trail's position
  this.trail[0] = this.trail[1];
  this.trail[1] = this.trail[2];
  this.trail[2] = this.trail[3];
  this.trail[3] = this.trail[4];
  this.trail[4] = [this.x, this.y];
  /////END NEW/////
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
//////NEW/////
//Define which paddle gains score
  if (this.x + this.size < 0 || this.x > width) {
    if (this.x + this.size < 0) {
      leftPaddle.gainScore = false;
      rightPaddle.gainScore = true;
    } else {
      rightPaddle.gainScore = false;
      leftPaddle.gainScore = true;
    }
//////END NEW/////
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  /////NEW/////
  //Display trail balls
  fill(255,70,0,20);
  rect(this.trail[0][0],this.trail[0][1],this.size,this.size);
  fill(255,91,6,50);
  rect(this.trail[1][0],this.trail[1][1],this.size,this.size);
  fill(254,126,16,100);
  rect(this.trail[2][0],this.trail[2][1],this.size,this.size);
  fill(254,112,104,150);
  rect(this.trail[3][0],this.trail[3][1],this.size,this.size);
  fill(253,254,152,200);
  rect(this.trail[4][0],this.trail[4][1],this.size,this.size);
  /////END NEW/////
  fill(255,255,142);
  rect(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
      this.size = this.sizeOriginal + random(0, 20);
      console.log(this.size);
      paddle.color = {
        r: 255,
        b: 70,
        g: 0
      }
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  //the ball launch toward the paddle that won the most recent point with a random y velocity
  this.vx = -this.vx;
  this.vy = random(this.speed-2, this.speed+4);
  console.log(this.vy);
}
