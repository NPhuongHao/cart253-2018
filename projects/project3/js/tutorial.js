function Tutorial() {

  var oGame;
  var screenCounter = 0;

  this.preload = function() {}

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( Intro ).oScene;
    bait = new Bait(17, 11, 'A', borderLength, 10); //this is the normal bait
    specialBait = new Bait(17, 23, 'A', borderLength, 30); //this is the special bait with a bigger radius value
  }

  this.draw = function() {
    if (screenCounter == 2) {
      this.sceneManager.showScene( MainGame );//call main game scene
    }
    if (screenCounter < 2) {
      tint(255,100);
      image(tut[screenCounter], 0, 0);
      drawBorder();
      if (screenCounter == 1) {
        bait.updateBait()
        specialBait.updateBait();
        bait.display()
        specialBait.display();
        specialBait.TutorialSpecialBaitTimer();
      }
    }
  }

  this.keyPressed = function() {
    if (keyCode === RIGHT_ARROW) {
      screenCounter = constrain(screenCounter+1,0,2);
    }if (keyCode === LEFT_ARROW) {
      screenCounter = constrain(screenCounter-1,0,2);
    }
  }
}
