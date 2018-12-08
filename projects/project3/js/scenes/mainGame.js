/*****************



  This is the Game Over scene.
  This scene pops up after player chooses a mode or choose to restart a game of the same mode.
  From here, player can control the snake and play the game.



******************/

function MainGame() {

  this.preload = function() {}

  this.setup = function() {
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
    obstacle = new Obstacle(0);

    //update the snake's original length and position
    snake.updateSnake();
  }

  this.draw = function() {

    drawBackground();

    //setup the snake's speed level and decelerator's value
    setupSpeed();
    snake.speedCount();

    //update on the status of the snake and the bait
    bait.updateBait();
    snake.update();

    //check if the special bait is good to go
    if (specialBaitgo == true) {
      handleSpecialBait();
    }

    if (counter % decelerator == 0) { //the bigger the decelerator , the slower the snake
      handleSnake();
    }

    if(snakeProperties.clearSkyMode == false) {//if the player is playing Cloudy Sky mode, handle the obstacle
      handleObstacle();
    }

    //display the snake and the bait
    snake.display();
    bait.display();

    //draw border of the playground (for aesthetic purposes)
    drawBorder();
  }

  //-----------------------------------------------------//
  //--------------OTHER FUNCTIONS------------------------//
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
    textSize(16);
    text('Press ENTER to pause', width/2, height - 50);
    pop();
  }

  function setupSpeed() {
    if (snakeProperties.speedMode === 'Fixed') {
      snake.speedLevel = snakeProperties.speedLevel; // if the player is playing Fixed speed mode (0, 1, or 2), assign the fixed speedlevel value to snake.speedlevel
    } if (snakeProperties.speedMode === 'Flexible') {
      snake.speedLevel = 0;//if the player is playing Flexible speed mode, the snake always starts with a level 0 speed
    }
  }

  this.keyPressed = function() {
    //Change the snake's direction
    snake.keyPressed();

    //Change the snake's speed level during gameplay if the player is playing Flexible speed mode
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
      this.sceneManager.showScene( Pause );//show Pause scene
    }
  }

  //handle the special bait's behaviors
  function handleSpecialBait() {
    specialBait.updateBait();
    specialBait.display();
    specialBait.handleSnakeCollision();
    specialBait.specialBaitTimer();
  }

  //handle the snake's behaviors
  function handleSnake() {
    snake.handleWallCollision();
    bait.handleSnakeCollision();
    snake.movement();
    snake.handleSelfCollision();
  }

  //handle the obstacle's behaviors
  function handleObstacle() {
    obstacle.setup();
    obstacle.handleCollision();
    obstacle.display();
  }


}
