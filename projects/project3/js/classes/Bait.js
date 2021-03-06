/*****************

  Class for the bait.

  This class controls how the normal bait and the special bait behave.

******************/

function Bait(t,i,type,size,radius) {
  //t,i,type,size of Bait class behave the same way with t,i,type,size of Dot class
  this.type = type;
  this.t = t;
  this.i = i;
  if (type == 'A') {
    this.x = borderLength * 3 * i;
    this.y = hexagonWidth * (t - 1 / 2);
  } else if (type == 'B') {
    this.x = borderLength * (3 * i + 1.5);
    this.y = hexagonWidth * t;
  }
  this.size = size;

  //variable to check if a bait is currently on screen
  this.onScreen = true;

  //variables to create an oscillating bait (check updateBait())
  this.OscillatorAngle = 0; //this will change bait's oscillating speed
  this.OscillatorRadius = radius; //this will change bait's oscillating size
  this.SizeGrowth;
}

//This function handles the size and the position of the bait
Bait.prototype.updateBait = function() {
  if (this.onScreen == false) {
    //if a bait is eaten, generate another bait
    this.generateBait();
    this.onScreen = true;
  }

  //if generated Bait's position coincides with or stays too close to the obstacles' position, generate a new Bait
  if (snakeProperties.clearSkyMode == false) {
    for (var i = 0; i<79; i++) {
      if(this.t > obstacle.dots[i].t-1 || this.t <obstacle.dots[i].t+1 && this.i > obstacle.dots[i].i || this.i > obstacle.dots[i].i && !this.type == obstacle.dots[i].type) {
            this.generateBait();
      }
    }
  }

  //set bait's position based on its type
  if (this.type == 'A') {
    this.x = borderLength * 3 * this.i;
    this.y = hexagonWidth * (this.t - 1 / 2);
  } else if (this.type == 'B') {
    this.x = borderLength * (3 * this.i + 1.5);
    this.y = hexagonWidth * this.t;
  }

  //set the bait's size using trigonometry
  this.SizeGrowth = sin(this.OscillatorAngle) * (this.OscillatorRadius/2);
  this.OscillatorAngle += 0.15;
}

//this function will set the position of the new bait
Bait.prototype.generateBait = function() {
  //random t & i parameters
  this.t = floor(random(2,32));
  this.i = floor(random(2,32));
  //random type
  var r = random();
  if (r < 0.5) {
    this.type = 'A';
  } else if (r < 1) {
    this.type = 'B';
  }
}

//this function defines what happen if the snake's head collides with the bait's position
Bait.prototype.handleSnakeCollision = function() {
  if (snake.snakeDots[snake.length*2-1].t == this.t && snake.snakeDots[snake.length*2-1].i == this.i && snake.snakeDots[snake.length*2-1].type == this.type) {
    //play the sound effect
    twinkle.stop();
    twinkle.setVolume(0.3);
    twinkle.play();

    this.onScreen = false;//the bait disappears

    //add score to the snake
    if(this.OscillatorRadius == 30) {//ifthe eaten bait if the special bait
      snake.score += 3;
      specialBaitCounter = 0;//reset the specialBait's time counter
    } else {//if the eaten bait is the normal bait
      snake.score += 1;
    }

    snake.addLength();//add length to the snake

    counterToSpecialBait++;//add one point to the counter

    //Determine if the special Bait is good to go
    if (counterToSpecialBait%5 == 0) {//if 5 baits have bean eaten since the last special bait
      specialBaitgo = true;//if so, a new special bait is good to go
    } else {
      specialBaitgo = false;//if not, a new special bait won't appear
    }

  }
}

//this function defines the time limit of the special bait
Bait.prototype.specialBaitTimer = function() {
  //the width of the timer according to the special bait's time counter
  timerW = map(specialBaitCounter,0,300,0,200);
  push();
  fill(255);
  rectMode(CORNER);
  rect(width*0.5-100,60,timerW,20);//display the timer
  pop();

  //add 1 unit to the special bait's time counter until it reaches 300
  //as the frame rate (check MainGame.js) depends on the snake's speed level, reduce the counter's adding unit if the snake gets faster (so that the counter wont' become too fast)
  if (snake.speedLevel == 0) {
    specialBaitCounter = constrain(specialBaitCounter + 1.5, 0, 300);
  } else if (snake.speedLevel == 1) {
    specialBaitCounter = constrain(specialBaitCounter + 1, 0, 300);
  } else if (snake.speedLevel == 2) {
    specialBaitCounter = constrain(specialBaitCounter + 0.7, 0, 300);
  }

  //if the width of the timer reaches 200, the special bait disappears and the counter is reset
  if (timerW == 200) {
    specialBaitgo = false;
    specialBaitCounter = 0;
  }
}

Bait.prototype.TutorialSpecialBaitTimer = function() {
  //the width of the timer according to the special bait's time counter. Tutorial version
  timerW = map(specialBaitCounter,0,150,0,150);
  push();
  fill(255);
  rectMode(CORNER);
  rect(width*0.6,height*0.35,timerW,20);//display the timer
  pop();

  //add 1 unit to the special bait's time counter until it reaches 300
  specialBaitCounter = constrain(specialBaitCounter + 3, 0, 150);

  //if the width of the timer reaches 200, the special bait disappears and the counter is reset
  if (timerW == 150) {
    specialBaitgo = false;
    specialBaitCounter = 0;
  }
}


//Display the bait
Bait.prototype.display = function() {
  push();
  fill(255);
  noStroke();
  polygon(this.x, this.y, this.size+this.SizeGrowth, 6);//update the bait's growth to its original size
  pop();
}
