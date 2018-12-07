function GameOver() {
  var screenFreeze = 0;
  var oGame;
  var snakeHighScore;
  var snakeSpeed;

    this.setup = function()
    {
        // find a different scene using the SceneManager
        oGame = this.sceneManager.findScene( MainGame ).oScene;
    }

    this.draw = function() {
      bgSong.stop();
      snake.manageHighScore();
      snakeHighScore = snake.highScore;
      snakeSpeed = snake.speedLevel;
      console.log(snakeHighScore);
        if (screenFreeze<30) {
          screenFreeze ++;
          console.log('check' + screenFreeze);
        }
        if (screenFreeze >= 30) {
          background(0,50)
          fill(255,200);
          textSize(60);
          textAlign(CENTER);
          textFont(titleFont);
          text('YOUR SCORE: ' + snake.score,width/2,height*0.4);
          textSize(48);
          text('High score: ' + snake.highScore, width/2, height*0.6);
          textSize(24);
          fill(200);
          textFont(globalFont);
          text('Press → to replay \n Press ENTER to go back to menu', width/2, height*0.8);
        }
        drawBorder();
    }

    this.keyPressed = function() {
      if (keyCode === RIGHT_ARROW) {
        mgr.showScene(MainGame);
        resetPositionAndScore();
      } if (keyCode === ENTER) {
        image(this.sceneManager.bgIntro, 0, 0);
        mgr.showScene(Intro);
        resetEverything();
      }
    }

    function resetPositionAndScore() {
      snake = new Snake(17, 17, 'A', 5, 30, 2);
      //Set up the snake
      snake.updateSnake();
      snake.highScore = snakeHighScore;
      snake.speedLevel = snakeSpeed;
      bgSong.loop();
    }

    function resetEverything() {
      //Create a snake with the Snake class
      //Snake(t,i,type,speed,angle,length)
      snake = new Snake(17, 17, 'A', 5, 30, 2); //Default length of the snake will be 2*2=4. Why? Check drawGrid()
      if (snakeProperties.speedMode === 'Fixed') {
        snake.speedLevel = snakeProperties.speedLevel;
      }

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
      snakeHighScore = snake.highScore;
      bgSong.loop();
    }
}
