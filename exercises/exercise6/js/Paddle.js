// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

/////////////FIXED! Added "//" before each comment
//Paddle constructor

//Sets the properties with the provided arguments or defaults


////////////FIXED! Pladdle --> Paddle
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
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
  if (keyDown(upKey)) {
    ////////////FIXED! -this.speed --> +this.speed
    this.vy = +this.speed;
  }
  else if (keyDown(downKey)) {
    this.vy = -this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
////////////FIXED! disploy --> display. function()) --> function()
Paddle.prototype.display = function() {
  rectangle(this.x,this.y,this.w,this.h);
}
