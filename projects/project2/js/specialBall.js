//Special ball
//A class to define how a special ball behaves
//A special ball can:
//Move toward the latest paddle that gained point
//Get a random category (slowPaddle, reverseBall, manyBall or doublePaddle) and acts accordingly

var triggerReaction = false; //variable to determine when to start special ball effect
var reactionText; //variable for reaction text
var reactionNameOpacity = [255,255]; //variable to determine which text to show when a special effect occurs

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
}

//check if the ball can be displayed on screen. Each hit[] array member is assigned with a paddle's score
//as leftPaddle gains 2 pts or 5 pts, a specialBall will appear. Same goes with rightPaddle.
specialBall.prototype.checkGo = function () {
  this.go = false;
  // console.log(this.hit);
  if (leftPaddle[0].score >= 2 && this.hit[0] == false) {
    this.go = true;
  }
  else if (leftPaddle[0].score >= 7 && this.hit[1] == false) {
    this.go = true;
  }
  if (rightPaddle[0].score >= 2 && this.hit[2] == false) {
    this.go = true;
  }
  else if (rightPaddle[0].score >= 7 && this.hit[3] == false) {
    this.go = true;
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
      // If so, make the ball disappear and attribute their category randomly
      //check if the ball already hit a paddle
      //reset ball
      this.reset(paddle);
      //specialBall gets a random category
      var r = random();
      if (r < 0.25) {
        this.category = 'slowPaddle';
      } else if (r < 0.5) {
        this.category = 'reverseBall';
      } else if (r < 0.75) {
        this.category = 'manyBall';
      } else if (r < 1) {
        this.category = 'doublePaddle';
      }
      //console.log(this.category);
      triggerReaction = true; // Start specialBall's reaction to its category
      hitPaddle = paddle;
      unknownBall.collisionSound(this.category);
      reactionNameOpacity = [255,255];
      console.log(reactionNameOpacity);
    }
  }
}

specialBall.prototype.display = function() {
  image(secretGift,this.x,this.y,this.size,this.size);
}

specialBall.prototype.reset = function(paddle) {
  //after a special ball collides with a paddle, tell the program that it hit successfully
  if (leftPaddle[0].score >= 2) {
    //console.log("hit[0] = true");
    this.hit[0] = true;
  }
  if (leftPaddle[0].score >= 7) {
    //console.log("hit[1] = true");
    this.hit[1] = true;
  }
  if (rightPaddle[0].score >= 2) {
    //console.log("hit[2] = true");
    this.hit[2] = true;
  }
  if (rightPaddle[0].score >= 7) {
    //console.log("hit[3] = true");
    this.hit[3] = true;
  }
  //Reset effectCounter
  if (!unknownBall.isOffScreen()) {
    if (hitPaddle == leftPaddle[0]) {
      leftPaddle[0].effectCounter = [0,0,0,0,0];
      console.log('leftCounterRefreshed');
      console.log(hitPaddle.effectCounter);
    } else if (hitPaddle == rightPaddle[0]) {
      rightPaddle[0].effectCounter = [0,0,0,0,0];
      console.log('rightCounterRefreshed');
    }
  }


  this.x = width/2;
  this.y = height/2;

  this.go = false;
}

//handle ball's sound effect when colliding with a paddle, according to its category
specialBall.prototype.collisionSound = function(category) {
  if (category == 'slowPaddle') {
    slowPaddleSFX.play();
  }
  else if (category == 'reverseBall') {
    reverseBallSFX.play();
  }
  else if (category == 'doublePaddle') {
    doublePaddleSFX.play();
  } else if (category == 'manyBall') {
    manyBallSFX.play();
  }
}

specialBall.prototype.reactionText = function(category) {
  var reactionTextX; //the X position of the reactionText
  var i; // to define which side of the playground should the text be displayed
  if (hitPaddle == leftPaddle[0] || hitPaddle == leftPaddle[1]) {
    i = 0;
    reactionTextX = width/4;
  } else if (hitPaddle == rightPaddle[0] || hitPaddle == rightPaddle[1]) {
    i = 1;
    reactionTextX = width*3/4;
  }
  if (category == 'slowPaddle') {
    //console.log(category);
    reactionText = 'Freeze!';
  } else if (category == 'reverseBall') {
    //console.log(category);
    reactionText = 'Ball  reversed!';
  } else if (category == 'manyBall') {
    //console.log(category);
    reactionText = 'More  ball   more  fun!';
  } else if (category == 'doublePaddle') {
    //console.log(category);
    reactionText = 'Mirror  paddle!';
  }
  fill(255, reactionNameOpacity[i]);
  textFont(mainFont);
  textAlign(CENTER);
  textSize(19);
  text(reactionText, reactionTextX, height/2);
  reactionNameOpacity[i] = constrain(reactionNameOpacity[i] - 2.5, 0, 255);
  console.log(reactionText);
}

//handle ball's reaction according to its category
specialBall.prototype.handleReaction = function(category,hitPaddle) {
  this.reactionText(this.category);
  if (category == 'slowPaddle' && hitPaddle.effectCounter[0] < 500) {
    //console.log('checkpointslow');
    //if ball's category is 'slowPaddle', slow down Paddle's speed by 1/2 for 800 frames
    hitPaddle.speed = hitPaddle.originalSpeed * 0.5;
    //set color effect for paddle
    hitPaddle.r = 158;
    hitPaddle.g = 243;
    hitPaddle.b = 240;
    hitPaddle.effectCounter[0]++;
  } else { //after 800 frames are processed, return the original color and speed to the paddle
    hitPaddle.r = 223;
    hitPaddle.g = 52;
    hitPaddle.b = 65;
    hitPaddle.speed = hitPaddle.originalSpeed;
  }

  if (category == 'reverseBall' && hitPaddle.effectCounter[1] < 1) {
    //if ball's category is 'reverseBall', reverse the ball's velocity x and y
      balls[0].vx = -balls[0].vx;
      console.log('checkpointreverse');
      hitPaddle.effectCounter[1]++;

  } else if (category == 'manyBall' && hitPaddle.effectCounter[2] < 500) {
      //if ball's category is 'manyBall', add one more ball to the screen.
      //console.log('checkpointmany');
      balls[1].update();
      balls[1].handleCollision(leftPaddle[0]);
      balls[1].handleCollision(rightPaddle[0]);
      balls[1].handleCollision(leftPaddle[1]);
      balls[1].handleCollision(rightPaddle[1]);
      if (balls[1].isOffScreen()) {
        balls[1].reset();
      }
        if (!balls[1].vx == 0 && !balls[1].vy == 0) {
          //Display the additional ball only when it's moving
          balls[1].display();
          //console.log(balls[1]);
        }
      hitPaddle.effectCounter[2]++;
      console.log(hitPaddle.effectCounter[2]);
  }

  if (category == 'doublePaddle') {
    //if ball's category is 'doublePaddle', add another paddle that mirrors the original paddle's movement vertically
      if (hitPaddle == leftPaddle[0] && hitPaddle.effectCounter[3] < 500) {
        console.log('checkpointdoubleleft');
        leftPaddle[1].handleInput();
        leftPaddle[1].update();
        balls[0].handleCollision(leftPaddle[1]);
        unknownBall.handleCollision(leftPaddle[1]);
        leftPaddle
        [1].display();
        hitPaddle.effectCounter[3]++;

      } else if (hitPaddle == rightPaddle[0] && hitPaddle.effectCounter[4] < 800) {
        console.log('checkpointdoubleright');
        rightPaddle[1].handleInput();
        rightPaddle[1].update();
        balls[0].handleCollision(rightPaddle[1]);
        unknownBall.handleCollision(rightPaddle[1]);
        rightPaddle[1].display();
        hitPaddle.effectCounter[4]++;
      }
  }
}
