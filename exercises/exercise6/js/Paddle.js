// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

/////////////FIXED! Added "//" before each comment
//Paddle constructor

//Sets the properties with the provided arguments or defaults


////////////FIXED! Pladdle --> Paddle. xv --> vx. yv --> vy
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  ////////////FIXED! speeed --> speed
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
////////////FIXED! proto --> prototype
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    ////////////FIXED! this.vy = this.speed
    this.vy = this.speed;
  }  else {
    ////////////FIXED! added else statement to reset paddle's y velocity to 0 when no key is pressed
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ////////////FIXED! constraint() --> constrain(). hight --> height
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
////////////FIXED! disploy --> display. function()) --> function()
Paddle.prototype.display = function() {
  ////////////FIXED! rectangle --> rect. Added fill(255);
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
