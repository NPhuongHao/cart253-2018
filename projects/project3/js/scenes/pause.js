/*****************



  This is the Pause scene.
  This scene pops up after player chooses pause the current game.
  From here, player can choose to resume, restart or go to the main menu.



******************/

function Pause() {
  this.preload = function() {}

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( MainGame ).oScene;
    background(0, 200);
  }

  this.draw = function() {
    //display the options
    push();
    fill(255);
    textFont(titleFont);
    textSize(32);
    text('PAUSED', width/2, height * 0.4);
    textFont(globalFont);
    textSize(20);
    text('Press ENTER to resume \n \n Press SHIFT to restart \n \n Press BACKSPACE for main menu', width/2, height * 0.6);
    pop();
  }

  this.keyPressed = function() {
    if (keyCode === ENTER) {
      this.sceneManager.showScene( MainGame );//call main game scene
    } if (keyCode === SHIFT) {
      this.sceneManager.showScene( MainGame );
      resetPositionAndScore();
    } if (keyCode === BACKSPACE) {
      this.scenemanager.showScene ( Intro );
      resetEverything();
    }
  }
}
