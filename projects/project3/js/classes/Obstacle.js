/*****************

  Class for the bait.

  This class controls how the obstacle in the Cloudy Sky mode behaves.

******************/


function Obstacle() {
  this.dots = [];//the array to store the dots that form the obstacles
}


Obstacle.prototype.setup = function() {
  //Obstacle is made of many Dot objects
  for (var i = 0; i<10; i++) {//each obstacle bar has a length of 10*2=20 hexagon units
    //First row, left
    this.dots.push(new Dot(10,7+i, 'A', 30, 5));
    this.dots.push(new Dot(10,7+i, 'B', 30, 5));
    //First row, right
    this.dots.push(new Dot(10,19+i, 'A', 30, 5));
    this.dots.push(new Dot(10,19+i, 'B', 30, 5));
    //Last row, left
    this.dots.push(new Dot(25,7+i, 'A', 30, 5));
    this.dots.push(new Dot(25,7+i, 'B', 30, 5));
    //Last row, right
    this.dots.push(new Dot(25,19+i, 'A', 30, 5));
    this.dots.push(new Dot(25,19+i, 'B', 30, 5));
  }
}

Obstacle.prototype.handleCollision = function() {
  //this function sends the player to the GameOver scene if the snake colides with the obstacle
  for (var i = 0; i<79; i++) {//an obstacle array has 80 elements in total
    if (snake.snakeDots[snake.length*2-1].t == this.dots[i].t) {//check if it collides vertically
      if (snake.snakeDots[snake.length*2-1].i == this.dots[i].i) {//check if it collides horizontally
        if(snake.snakeDots[snake.length*2-1].type == this.dots[i].type) {//check if it's of the same type with the snake's head
          mgr.showScene( GameOver );//show GameOver scene
        }
      }
    }
  }
}

Obstacle.prototype.display = function() {
  //Display the obstacle
  push();
  fill(200);
  stroke(200);
    for (var i=0; i<79; i++) {
      this.dots[i].displayDot();
    }
  pop();
}
