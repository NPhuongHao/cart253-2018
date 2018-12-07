/*****************

This is the main game scene.

******************/

function MainGame() {
  var i =0;
  this.preload = function() {
  }

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

    snake.updateSnake();

    //bgSong.loop();

    console.log('FIRST PROTOTYPE: Build movement grid, create snake and handle keyboard input to move the snake around. Snake cannot bite itself or collide with anything yet.')
    console.log('SECOND PROTOTYPE: Snake can now bite itself. Added bait and special bait. Added score system. Added background and repositioned the canvas.')
  }

  this.draw = function() {
    drawBackground();
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

    snake.display();
    bait.display();

    drawBorder();
  }

  //-----------------------------------------------------//
  //-----------------------------------------------------//

  //Set up the background with short instruction
  function drawBackground() {
    background(0, 50);
    push();
    noStroke();
    fill(255, 50);
    textAlign(CENTER);
    textStyle(BOLD);
    text('Score: ' + snake.score, 80, 50);
    pop();
  }

  this.keyPressed = function() {
    //Change the snake's direction
    snake.keyPressed();

    //Change the snake's speed level
    if (keyIsDown(49)) { //the '1' key is pressed
      snake.speedLevel = 0;
    }
    if (keyIsDown(50)) { //the '2' key is pressed
      snake.speedLevel = 1;
    }
    if (keyIsDown(51)) { //the '3' key is pressed
      snake.speedLevel = 2;
    }
    if (keyCode === ENTER) {
      window.location.reload();
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

}
