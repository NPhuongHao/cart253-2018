var specialBaitCounter = 0;
var timerW = 0;

function Bait(t,i,type,size,radius) {
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
  this.onScreen = true;

  this.specialBait = false;
  this.counterToSpecialBait = 0;

  this.angle = 0;
  this.radius = radius;
  this.growth;
}

Bait.prototype.updateBait = function() {
  if (this.onScreen == false) {
    this.generateBait();
    this.onScreen = true;
  }
  //console.log(this.radius);
  if (this.type == 'A') {
    this.x = borderLength * 3 * this.i;
    this.y = hexagonWidth * (this.t - 1 / 2);
  } else if (this.type == 'B') {
    this.x = borderLength * (3 * this.i + 1.5);
    this.y = hexagonWidth * this.t;
  }
  this.growth = sin(this.angle) * (this.radius/2);
  this.angle += 0.15;
}

Bait.prototype.generateBait = function() {
  this.t = floor(random(2,32));
  this.i = floor(random(2,32));
  var r = random();
  if (r < 0.5) {
    this.type = 'A';
  } else if (r < 1) {
    this.type = 'B';
  }
  console.log(this.t, this.i, this.type);
}

Bait.prototype.handleSnakeCollision = function() {
  //console.log(snake.snakeDots[snake.length*2-1],this.t,this.i,this.type);
  if (snake.snakeDots[snake.length*2-1].t == this.t && snake.snakeDots[snake.length*2-1].i == this.i && snake.snakeDots[snake.length*2-1].type == this.type) {
    console.log('ATE!');
    this.onScreen = false;
    if(specialBait.specialBait == true && this.radius == 30) {
      snake.score += 3;
    } else {
      snake.score += 1;
    }
    snake.addLength();
    if (snake.score%5 == 0) {
      specialBait.specialBait = true;
    } else if (this.radius == 30) {
      specialBait.specialBait = false;
    }
  }
}

Bait.prototype.specialBaitTimer = function() {
  timerW = map(specialBaitCounter,0,200,0,200);
  push();
  fill(255);
  rectMode(CORNER);
  rect(width*0.5-100,60,timerW,20);
  pop();
  specialBaitCounter = constrain(specialBaitCounter + 1, 0, 200);
    console.log(specialBaitCounter);
  if (timerW == 200) {
    specialBait.specialBait = false;
    specialBaitCounter = 0;
  }
    console.log(specialBaitCounter);
}

Bait.prototype.display = function() {
  push();
  fill(255);
  noStroke();
  //ellipse(this.x, this.y, hexagonWidth, hexagonWidth);
  polygon(this.x, this.y, this.size+this.growth, 6);
  pop();
}
