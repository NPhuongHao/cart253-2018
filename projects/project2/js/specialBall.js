// specialBall constructor
//
// Sets the properties with the provided arguments
function specialBall(x,y,vx,vy,size,speed) {
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
  //Boolean value to check if it can appear or not
  this.go = false;
  //Boolean value to check if it already collided with a paddle at a score checkpoint
  this.hit = [false, false, false, false];
  //the category of the special Ball
  this.category;
}

specialBall.prototype.update = function () {
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
specialBall.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
specialBall.prototype.handleCollision =function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      // If so, make the ball disappear and attribute their category randomly
      //check if the ball already hit a paddle
      if (leftPaddle.score == 2) {
        this.hit[0] = true;
        if (rightPaddle.score == 2) {
          this.hit[1] = true;
        }
      } else if (leftPaddle.score == 5) {
        this.hit[2] = true;
        if (rightPaddle.score == 5) {
          this.hit[3] = true;
        }
      }
      //reset ball
      this.reset();
      //asset random category
      var r = random();
      if (r < 0.25) {
        this.category = 'snow';
      } else if (r < 0.5) {
        this.category = 'reverse';
      } else if (r < 0.75) {
        this.category = 'doubleBall';
      } else if (r < 1) {
        this.category = 'doublePaddle';
      }
    }
  }
}

specialBall.prototype.display = function() {
  image(secretGift,this.x,this.y,this.size,this.size);
}

specialBall.prototype.reset = function() {
  this.x = width/2;
  this.y = height/2;
  this.vx = -this.vx;
  this.go = false;
}

specialBall.prototype.checkGo = function () {
  //Determine which this.hit array member should be checked out
  if (leftPaddle.score == 2 && this.hit[0] == false) {
    this.checkHit(this.hit[0]);
    if (rightPaddle.score == 2 ) {
      this.checkHit(this.hit[1]);
    }
  } else if (leftPaddle.score == 5) {
    this.checkHit(this.hit[2]);
    if (rightPaddle.score == 5) {
      this.checkHit(this.hit[3]);
    }
  }
  //console.log(this.go)
}

specialBall.prototype.checkHit = function(hitCheck) {
  if (hitCheck == false) {
    this.go = true;
  } else {
    this.go = false;
  }
}
