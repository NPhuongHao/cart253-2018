/*****************

  Class for the snake.

  This class's properties will mostly belong to the snake's head, and its tail will act accordingly.
  This class controls how the snake moves, gains score, collides with itself and with the wall.

******************/

function Snake(t,i,type,speed,angle,length) {
  this.type = type; //the grid type its head finds itself on upon the start
  this.t = t; //its t coordinator that indicates its y position
  this.i = i; //its i coordinator that indicates its x position

  this.speed = speed;//its default speeed
  this.angle = angle;//its default movement's angle
  this.vx = cos(angle)*speed; //its x velocity according to its movement's angle
  this.vy = sin(angle)*speed; //its x velocity according to its movement's angle

  this.length = length;//its length

  this.snakeDots = [];//an array to store each of its dots' positions
  //variables to store the next additions to the t & i parameters of the snake's head (check the update() function)
  this.tNext;
  this.iNext;

  //the speed level of the snake
  this.speedLevel = 0;

  //the snake's score
  this.score = 0;
}

//Set up the snake
Snake.prototype.updateLength = function() {
  for (var i = 0; i<this.length; i++) {
    this.snakeDots.push(new SnakeDot(7+i,7+i, 'A', 30, 5));
    this.snakeDots.push(new SnakeDot(7+i,7+i, 'B', 30, 5));
  }
}

Snake.prototype.update = function() {
  //Assign the last snakeDots[] element's t&i parameters into the head's t&i parameters
  this.t = this.snakeDots[this.length*2-1].t;
  this.i = this.snakeDots[this.length*2-1].i;
  this.type = this.snakeDots[this.length*2-1].type;
}

Snake.prototype.addLength = function() {
  this.length+=1;
  this.snakeDots.unshift(new SnakeDot(this.snakeDots[0].t, this.snakeDots[0].i, this.snakeDots[0].type, this.snakeDots[0].speed));
  this.snakeDots.unshift(new SnakeDot(this.snakeDots[0].t, this.snakeDots[0].i, this.snakeDots[0].type, this.snakeDots[0].speed));
    console.log(snake.snakeDots);
}

Snake.prototype.speedCount = function() {
  if (this.speedLevel == 0) {
    decelerator = 8;
  } if (this.speedLevel == 1) {
    decelerator = 5;
  } if (this.speedLevel == 2) {
    decelerator = 2;
  }
  counter ++;
}

Snake.prototype.keyPressed = function() {
  //this function determines how the snake's movement direction will change based on 2 keyboard input: left or right arrows;
  //LEFT_ARROW and RIGHT_ARROW determines if the snake is going to turn to ITS left or its right
  if (keyCode === RIGHT_ARROW) {//if RIGHT_ARROW is pressed, the snake will turn 60deg to its right
    if (this.angle < 330) {
      this.angle += 60;
    } else if (this.angle == 330) {
      this.angle = 30;
    }
  }
  if (keyCode === LEFT_ARROW) {//if LEFT_ARROW is pressed, the snake will turn 60deg to its left
    if (this.angle > 30) {
      this.angle -= 60;
    } else if (this.angle == 30) {
      this.angle = 330;
    }
  }
}

Snake.prototype.movement = function() {
  /**************MOVEMENT BASED ON VELOCITY, LEFT HERE IN CASE OF REUSE***********/
  //this.x = this.snakeDots[this.length*2-1].x;
  //this.y = this.snakeDots[this.length*2-1].y;

  //console.log(this.i, this.t, this.x, this.y);
  /*console.log(this.speed, hexagonWidth);
  this.vx = cos(this.angle) * (this.speed);
  this.vy = sin(this.angle) * (this.speed);

  this.x += this.vx;
  this.y += this.vy;
  console.log(cos(this.angle)*this.speed+this.x);*/

  /*this.x = this.nextX;
  this.y = this.nextY;*/
  /**************MOVEMENT BASED ON VELOCITY, LEFT HERE IN CASE OF REUSE***********/

  //First, update the head's next position
  this.updateHead();

  //Switch place between 2 consecutive member in the snakeDots[] array.
    //The member with smaller index with inherit the member with the bigger index
  for (var i=0; i<this.length*2-1; i++) {
    this.snakeDots[i].t = this.snakeDots[i+1].t;
    this.snakeDots[i].i = this.snakeDots[i+1].i;
    this.snakeDots[i].type = this.snakeDots[i+1].type;
    this.snakeDots[i].updatePosition();
  }
  //Finally, update the last snakeDots[] element (which is the head) to the next t&i properties
  this.snakeDots[this.length*2-1].t = this.t;
  this.snakeDots[this.length*2-1].i = this.i;
  this.snakeDots[this.length*2-1].type = this.type;
  this.snakeDots[this.length*2-1].updatePosition();
}

Snake.prototype.updateHead = function() {
  //The snake head can move in 6 different directions, each of them creates an angle with the horizontal line (f(x) = 0)
  //Its movement can be based on the hexagonal grid which is divided into 2 types A & B
  //Hexagon with the same t and i parameters will be positioned as below:
  //Hexagon type A(t,i) is adjacent to hexagon type B(t,i) on the top left

  //This position results in the following situation:
  //A hexagon type A(t,i) will be surrounded by 4 hexagons of type B and 2 of type A with the following t&i parameters (from top to top right and so on):
  //A(t-1,i); B(t-1,i); B(t,i); A(t+1,i); B(t,i-1); B(t-1,i-1)
  //The same mechanic goes with B, whose surrounding hexagons (from top to top right and so on) will be:
  //B(t-1,i); A(t,i+1); A(t+1,i+1); B(t+1,i); A(t+1,i); A(t+1,i)

  //With that said, depending on its current movement's direction (determined by its angle with the Ox axe (f(x) = 0)),
  //we can plan which hexagon its gonna fall on nextX
  if (this.angle == 90) {//if the head is moving down
    this.tNext = 1;
    this.iNext = 0;
  } else if (this.angle == 270) {//if the head is moving up
    this.tNext = -1;
    this.iNext = 0;
  } else if (this.angle == 30) {//if the head is moving diagonally down, on the right side
    if (this.type == 'A') {//if it's falling on a hexagon type A, switch it to hexagon type B with the same t & i parameters
      this.tNext = 0;
      this.iNext = 0;
      this.type = 'B';
    } else if (this.type == 'B') {//if it's falling on a hexagon type B, move it to hexagon type A with a bigger t & i parameters
      this.tNext = 1;
      this.iNext = 1;
      this.type = 'A';
    }
  } else if (this.angle == 150) {//if the head is moving diagonally down, on the left side
    if (this.type == 'A') {//if it's falling on a hexagon type A, move it to a hexagon type B with smaller i parameter
      this.tNext = 0;
      this.iNext = -1;
      this.type = 'B';
    } else if (this.type == 'B') {//same mechanic goes with the rest
      this.tNext = +1;
      this.iNext = 0;
      this.type = 'A';
    }
  } else if (this.angle == 210) {//if the head is moving diagonally up,  on the left side
    if (this.type == 'A') {
      this.tNext = -1;
      this.iNext = -1;
      this.type = 'B';
    } else if (this.type == 'B') {
      this.tNext = 0;
      this.iNext = 0;
      this.type = 'A';
    }
  } else if (this.angle == 330) {//if the head is moving diagonally up, on the right side
    if (this.type == 'A') {
      this.tNext = -1;
      this.iNext = 0;
      this.type = 'B';
    } else if (this.type == 'B') {
      this.tNext = 0;
      this.iNext = 1;
      this.type = 'A';
    }
  }

  //Next, we update the t and i parameters given its changements
  this.t += this.tNext;
  this.i += this.iNext;
}

Snake.prototype.handleSelfCollision = function() {
  for (var i = this.length*2-2; i>=0; i--) {
    //console.log(this.snakeDots[this.length*2-1], this.snakeDots[i]);
    if (this.snakeDots[this.length*2-1].t == this.snakeDots[i].t && this.snakeDots[this.length*2-1].i == this.snakeDots[i].i && this.snakeDots[this.length*2-1].type == this.snakeDots[i].type) {
      noLoop();
      push();
      fill(255);
      textAlign(CENTER);
      text('PRESS ENTER TO RESTART', width/2, 100);
      pop();
    }
  }
}


Snake.prototype.handleWallCollision = function() {
  if (this.snakeDots[this.length*2-1].t<1) {
    if (this.type == 'A') {
      this.t = 35;
    } else if (this.type =='B') {
      this.t = 34;
    }
  } else if (this.snakeDots[this.length*2-1].t>34) {
    if (this.type == 'A') {
      this.t = 1;
    } else if (this.type == 'B') {
      this.t = 1;
    }
  } else if (this.snakeDots[this.length*2-1].i<0) {
    this.i = 34;
  } else if (this.snakeDots[this.length*2-1].i>34) {
    this.i = 0;
  }
}

Snake.prototype.display = function() {
  for (var i=0; i<this.length*2; i++) {
    this.snakeDots[i].displayDot();
  }
}
