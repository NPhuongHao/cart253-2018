// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
///////NEW///////
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.gainScore = false; //check if this paddle gains score
  this.score = 0; //store paddle's score
///////END NEW///////
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
  }
  else {
    this.vy = 0;
  }
  /////NEW/////
  //Paddle's horizontal movement
  if (keyIsDown(this.rightKey)) {
      // Move right
      this.vx += this.speed/5;
    }
    else if (keyIsDown(this.leftKey)) {
      // Move left
      this.vx -= this.speed/5;
    }
    else {
      // Otherwise stop moving
      this.vx = 0;
    }
  /////END NEW/////
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
  /////NEW/////
  //Paddle's horizonal position
  this.x += this.vx;
  //Limit horizontal position of each paddle
  leftPaddle.x = constrain(leftPaddle.x, 0, width/2-leftPaddle.w-divider.size/2);
  rightPaddle.x = constrain(rightPaddle.x, width/2+divider.size/2, width-rightPaddle.w);
  /////END NEW/////
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}

//////NEW////////
//Update paddle's score
Paddle.prototype.updateScore = function() {
    if (this.gainScore === true) {
      this.score++;
      this.gainScore = false;
    }
    textAlign(CENTER);
    textFont(mainFont);
    fill(255);
    textSize(20);
    text('Score    ' + leftPaddle.score, 80, 40);
    text('Score    ' + rightPaddle.score, width-80, 40);
}
//////END NEW////////

//////NEW//////
//Change paddle's size when losing or winning
Paddle.prototype.ballOffScreenUpdate = function() {
  if (this.gainScore === true) {
    this.h += 5;
  } else if (this.gainScore === false) {
    this.h -= 5;
  }
}
//////END NEW//////
