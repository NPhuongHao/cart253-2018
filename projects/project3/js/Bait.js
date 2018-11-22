var angle = 0;
var radius = 10;
var growth;

function Bait(t,i,type,size) {
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
  this.onScreen = false;
}

Bait.prototype.updateBait = function() {
  if (this.onScreen == false) {
    this.generateBait();
    this.onScreen = true;
  }
  growth = sin(angle) * (radius/2);
  angle += 0.15;
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

Bait.prototype.displayBait = function() {
  push();
  fill(255);
  noStroke();
  //ellipse(this.x, this.y, hexagonWidth, hexagonWidth);
  polygon(this.x, this.y, this.size + growth, 6);
  pop();
}
