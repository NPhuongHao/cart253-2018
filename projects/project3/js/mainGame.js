/*****************

This is the main game scene.

******************/

function MainGame() {
  var i =0;
  this.preload = function() {
  }

  this.setup = function() {
    bgSong.loop();
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( Intro ).oScene;

    //Create a snake with the Snake class
    //Snake(t,i,type,speed,angle,length)
    snake = new Snake(17, 17, 'A', 5, 30, 2); //Default length of the snake will be 2*2=4. Why? Check drawGrid()

    //Bait(t,i,type,size,radius)
    bait = new Bait(floor(random(2, 32)), floor(random(2, 32)), 'A', borderLength, 10); //this is the normal bait
    specialBait = new Bait(floor(random(2, 32)), floor(random(2, 32)), 'A', borderLength, 30); //this is the special bait with a bigger radius value
    drawGrid();

    //obstacle
    if (snakeProperties.clearSkyMode == false) {
      obstacle = new Obstacle(0);
      obstacle.setup();
    }

    snake.updateSnake();
  }

  this.draw = function() {
    drawBackground();
    if (snakeProperties.speedMode === 'Fixed') {
      snake.speedLevel = snakeProperties.speedLevel;
    } if (snakeProperties.speedMode === 'Flexible') {
      snake.speedLevel = 0;
    }

    snake.speedCount();

    bait.updateBait();
    snake.update();

    //check if the special bait is good to go
    if (specialBaitgo == true) {
      handleSpecialBait();
    }

    if (counter % decelerator == 0) { //the bigger the decelerator , the slower the snake
      handleSnake();
    }

    if(snakeProperties.clearSkyMode == false) {
      handleObstacle();
    }

    snake.display();
    bait.display();

    drawBorder();
  }

  //-----------------------------------------------------//
  //-----------------------------------------------------//

  //Set up the background
  function drawBackground() {
    background(0, 50);
    push();
    noStroke();
    fill(255, 50);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont(globalFont);
    text('Score: ' + snake.score, 80, 50);
    pop();
  }

  this.keyPressed = function() {
    //Change the snake's direction
    snake.keyPressed();

    //Change the snake's speed level
    if (snakeProperties.speedMode === 'Flexible') {
      if (keyIsDown(49)) { //the '1' key is pressed
        snake.speedLevel = 0;
      }
      if (keyIsDown(50)) { //the '2' key is pressed
        snake.speedLevel = 1;
      }
      if (keyIsDown(51)) { //the '3' key is pressed
        snake.speedLevel = 2;
      }
    }

    if (keyCode === ENTER) {
      noLoop();
    }
    if (keyCode === SHIFT) {
      loop();
    }
  }

  //handle the special bait's behavior
  function handleSpecialBait() {
    specialBait.updateBait();
    specialBait.display();
    specialBait.handleSnakeCollision();
    specialBait.specialBaitTimer();
  }

  //handle the snake's behavior
  function handleSnake() {
    snake.handleWallCollision();
    bait.handleSnakeCollision();
    snake.movement();
    snake.handleSelfCollision();
  }

  function handleObstacle() {
    obstacle.handleCollision();
    obstacle.display();
  }


}
