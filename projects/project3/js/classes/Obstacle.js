function Obstacle(level) {
  this.level = level;

  this.type; //the grid type its head finds itself on upon the start
  this.t; //its t coordinator that indicates its y position
  this.i; //its i coordinator that indicates its x position

  this.dots = [];

}

Obstacle.prototype.setup = function() {
  if (this.level == 0) {
    this.setupLevel0();
  }
}

Obstacle.prototype.setupLevel0 = function() {
  for (var i = 0; i<10; i++) {
    this.dots.push(new SnakeDot(10,7+i, 'A', 30, 5));
    this.dots.push(new SnakeDot(10,7+i, 'B', 30, 5));
    this.dots.push(new SnakeDot(10,19+i, 'A', 30, 5));
    this.dots.push(new SnakeDot(10,19+i, 'B', 30, 5));
    this.dots.push(new SnakeDot(25,7+i, 'A', 30, 5));
    this.dots.push(new SnakeDot(25,7+i, 'B', 30, 5));
    this.dots.push(new SnakeDot(25,19+i, 'A', 30, 5));
    this.dots.push(new SnakeDot(25,19+i, 'B', 30, 5));
  }
}

Obstacle.prototype.handleCollision = function() {
  for (var i = 0; i<79; i++) {
    if (snake.snakeDots[snake.length*2-1].t == this.dots[i].t) {
      if (snake.snakeDots[snake.length*2-1].i == this.dots[i].i) {
        if(snake.snakeDots[snake.length*2-1].type == this.dots[i].type) {
          mgr.showScene( GameOver );
        }
      }
    }
  }
}

Obstacle.prototype.display = function() {
  push();
  fill(200);
  stroke(200);
    for (var i=0; i<79; i++) {
      this.dots[i].displayDot();
    }
  pop();
}
