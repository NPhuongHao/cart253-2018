/*****************



  This is the Tutorial scene.
  This scene pops up after player chooses to read it.
  From here, player can choose to switch between tutorial slides or start game.



******************/


function Tutorial() {

  var oGame;//variable to find a different scene using the SceneManager

  //to identify which tutorial slide the player wants to look at
  var screenCounter = 0;

  this.preload = function() {}

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( Intro ).oScene;

    //set up a new Bait objects for bait and special bait (just for the sake of presentation)
    bait = new Bait(17, 11, 'A', borderLength, 10); //this is the normal bait
    specialBait = new Bait(17, 23, 'A', borderLength, 30); //this is the special bait with a bigger radius value
  }

  this.draw = function() {
    if (screenCounter < 2) {
      push();
      tint(255,100);
      //display the tutorial slide according to the current screen counter
      image(tut[screenCounter], 0, 0);

      //if player click on the left arrow the first time
      if (screenCounter == 1) { //Display the bait and special bait for presentation
        displayPresentation();
      }

      drawBorder();
      pop();
    }

    //if player click on the right arrow the second time
    if (screenCounter == 2) {
      this.sceneManager.showScene( Mode );//call mode scene
      screenCounter = 0;
    }
  }

  this.keyPressed = function() {
    if (keyCode === RIGHT_ARROW) {//go to the next slide
      screenCounter = constrain(screenCounter+1,0,2);
    }if (keyCode === LEFT_ARROW) {//go to the previous slide
      if (screenCounter == 0) {//if the current slide is the first slide
        this.sceneManager.showScene( Intro );//call Intro scene
        createCanvas(canvasWidth,canvasHeight);
        image(this.sceneManager.bgIntro, 0, 0);//set up the Intro's BG image
      }
      screenCounter = constrain(screenCounter-1,0,2);
    }
  }

  function displayPresentation() {
    snakeProperties.clearSkyMode = true;
    bait.t = 17;
    bait.i = 11;
    bait.type = 'A';
    specialBait.t = 17;
    specialBait.i = 23;
    specialBait.type = 'A';
    bait.updateBait()
    specialBait.updateBait();
    bait.display()
    specialBait.display();
    specialBait.TutorialSpecialBaitTimer();
  }
}
