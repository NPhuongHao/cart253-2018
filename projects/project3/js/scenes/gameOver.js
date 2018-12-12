/*****************



  This is the Game Over scene.
  This scene pops up when the snake collides with an obstacle or bites itself



******************/

function GameOver() {
  var oGame;// variable used to retrieve the last frame of the desired scene (check setup())

  var screenFreeze = 0;//count the time (in frames) the losing mainGame scene is displayed on the screen before moving to score announcement


  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene(MainGame).oScene;
  }

  this.draw = function() {

    //stop the BG music
    bgSong.stop();

    //check and store the last highscore into snakeHighScore
    checkHighScore();

    //store the last speed level into snakeSpeed
    snakeSpeed = snake.speedLevel;

    //keep counting screenFreeze frames until it reaches 50
    if (screenFreeze < 50) {
      screenFreeze++;
    }
    //if so, display the score announcement
    if (screenFreeze >= 50) {
      scoreAnnouncement();
    }
    drawBorder();
  }


  //-----------------------------------------------------//
  //--------------OTHER FUNCTIONS------------------------//
  //-----------------------------------------------------//

  this.keyPressed = function() {
    if (keyCode === BACKSPACE) {
      //if player presses BACKSPACE:
      mgr.showScene(MainGame); //call the MainGame scene
      resetPositionAndScore(); //reset snake's position, its length and score
    }
    if (keyCode === ENTER) {
      //if player presses ENTER:
      image(this.sceneManager.bgIntro, 0, 0);//call the bgIntro image
      mgr.showScene(Intro);//call the INtro scene
      resetEverything();//reset everything except the highscores
    }
  }

  function checkHighScore() {
    //update the snake's highscores
    snake.manageHighScore();

    if (snakeProperties.clearSkyMode == true) {//if player played clear sky mode
      snakeHighScore = snake.highScore[0];
    } else if (snakeProperties.clearSkyMode == false) {//if player played cloudy sky mode
      snakeHighScore = snake.highScore[1];
    }
  }

  function scoreAnnouncement() {
    //Display the scores and options
    background(0, 50)
    fill(255, 200);

    //Display 'GAME OVER'
    textSize(60);
    textAlign(CENTER);
    textFont(titleFont);
    text('GAME OVER', width / 2, height * 0.3);

    //Display the play mode
    if (snakeProperties.clearSkyMode == true) {
      snakeMode = 'roamed the clear sky';
    } else if (snakeProperties.clearSkyMode == false) {
      snakeMode = 'striked through the cloudy sky';
    }
    textSize(24);
    textFont(globalFont);
    text('Your snake ' + snakeMode, width/2, height * 0.38);

    //Display the current score and the high score of the same category
    textFont(titleFont);
    text('YOUR SCORE: ' + snake.score, width / 2, height * 0.53);
    textSize(24);
    text('High score: ' + snakeHighScore, width / 2, height * 0.6);

    //Display the options
    textSize(24);
    fill(200);
    textFont(globalFont);
    text('Press BACKSPACE to replay \n Press ENTER to go back to menu', width / 2, height * 0.8);
  }
}
