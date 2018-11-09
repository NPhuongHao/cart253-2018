// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,originalSpeed,downKey,upKey,leftKey,rightKey,playgroundWidthLimit) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.originalSpeed = originalSpeed;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  //paddle's color RGB
  this.r = 223;
  this.g = 52;
  this.b = 65;
  this.score = 0;
  this.playgroundWidthLimit = 10;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  } else if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
  } else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;
  }
  else {
    this.vy = 0;
    this.vx = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
  this.x += this.vx;
  leftPaddle[0].x = constrain(leftPaddle[0].x,0,leftPaddle[0].playgroundWidthLimit-leftPaddle[0].w);
  rightPaddle[0].x = constrain(rightPaddle[0].x,width-rightPaddle[0].playgroundWidthLimit,width-rightPaddle[0].w);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(this.r,this.g,this.b);
  rect(this.x,this.y,this.w,this.h);
}

Paddle.prototype.updateScore = function() {
  this.score += 1;
  //if paddle gains score, increase its playground limit
  this.playgroundWidthLimit += 50;
  this.playgroundWidthLimit = constrain(this.playgroundWidthLimit,10,width/2);
  if (this.x < width/2) {//if the current paddle that gained point is leftPaddle, then unknown Ball will swing left
    unknownBall.vx = -unknownBall.speed;
    console.log('left');
  } else if (this.x > width/2) {//if the current paddle that gained point is rightPaddle, then unknown Ball will swing rightKey
    unknownBall.vx = unknownBall.speed;
    console.log('right');
  }
  thumpSFX.stop();
  thumpSFX.play();
}
