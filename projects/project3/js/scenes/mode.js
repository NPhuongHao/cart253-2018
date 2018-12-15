/*****************



  This is the Mode scene.
  This scene pops up after player chooses to start a new game.
  From here, player can choose the difficulty and mode of the new game.



******************/

function Mode() {

  //variables to ground the position of the obstacles (check setupMode())
  var marginHorizontal = 300;
  var marginVertical = 150;

  //variables to check if player has chose both the speed level and the mode (check handleClick())
  var speedChosen = false;
  var modeChosen = false;

  this.preload = function() {}

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene( Intro ).oScene;
  }

  this.draw = function() {
    background(0,70);

    setupTitle();
    setupMode();

    //handle the reaction of each options according to mouse input
    handleHover();
    handleClick();

    drawBorder();
  }

  function setupTitle() {
    fill(255);
    textFont(titleFont);
    textAlign(CENTER);
    textSize(32);
    text('Choose speed', marginHorizontal, marginVertical);
    text('Choose mode', width-marginHorizontal, marginVertical);
  }

  function setupMode() {
    fill(100);
    textFont(globalFont);
    textSize(24);

    text('Relaxed snake', marginHorizontal, marginVertical+90);
    text('Dutiful snake', marginHorizontal, marginVertical+140);
    text('Starving snake', marginHorizontal, marginVertical+190);
    text('Flexible snake', marginHorizontal, marginVertical+240);

    text('Clear sky', width-marginHorizontal, marginVertical+140);
    text('Cloudy sky', width-marginHorizontal, marginVertical+190);

    push();
    fill(255);
    text('Press BACKSPACE to go back to the main menu', width/2, height - 120);
    pop();
  }

  function handleHover() {
    if (mouseX > marginHorizontal - 50 && mouseX < marginHorizontal + 50){//if mouse's X position coincides with the horizontal range of the speed options
      if (mouseY > marginVertical + 75 && mouseY < marginVertical + 100){//if mouse's Y position coincides with the vertical range of the Relaxed option
        push();
        fill(255);//color the option with white
          text('Relaxed snake', marginHorizontal, marginVertical+90);
        pop();
      } else if (mouseY > marginVertical+125 && mouseY<marginVertical+150) {//if mouse's Y position coincides with the vertical range of the Dutiful option
        push();
        fill(255);
          text('Dutiful snake', marginHorizontal,marginVertical+140);
        pop();
      } else if (mouseY>marginVertical+175 && mouseY<marginVertical+200) {//if mouse's Y position coincides with the vertical range of the Starving option
        push();
        fill(255);
          text('Starving snake', marginHorizontal,marginVertical+190);
        pop();
      } else if (mouseY>marginVertical+225 && mouseY<marginVertical+250) {//if mouse's Y position coincides with the vertical range of the Flexible option
        push();
        fill(255);
          text('Flexible snake', marginHorizontal,marginVertical+240);
          //display description of Flexible mode
          textSize(16);
          fill(150,150);
          text('Press 1, 2, 3 \n to monitor the speed\n whenever you want', marginHorizontal,marginVertical+270);
        pop();
      }
    }

    //if mouse's X position coincides with the horizontal range of the speed options
    else if (mouseX>width-marginHorizontal-50 && mouseX<width-marginHorizontal+50) {
      if (mouseY>marginVertical+125 && mouseY<marginVertical+150) {//if mouse's Y position coincides with the vertical range of the Clear sky option
        push();
        fill(255);
          text('Clear sky', width-marginHorizontal,marginVertical+140);
          //display description of Clear Sky mode
          fill(150,150);
          textSize(16);
          text('Roam freely \n without any obstacle\n but yourself', width-marginHorizontal,marginVertical+50);
        pop();
      } else if (mouseY>marginVertical+175 && mouseY<marginVertical+200) {//if mouse's Y position coincides with the vertical range of the Clear sky option
        push();
        fill(255);
          text('Cloudy sky', width-marginHorizontal,marginVertical+190);
          //display description of Cloudy Sky mode
          fill(150,150);
          textSize(16);
          text('Conquer cloudy sky \n by evading\n obstacles', width-marginHorizontal,marginVertical+240);
        pop();
      }
    }
  }

  this.mousePressed = function() {
    //this function has the same if conditions with the handleHover function
    if (mouseX>marginHorizontal-50 && mouseX<marginHorizontal+50){
      if (mouseY>marginVertical+75 && mouseY<marginVertical+100){//Relaxed mode
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 0;
        speedChosen = true;
      } else if (mouseY>marginVertical+125 && mouseY<marginVertical+150) {//Dutiful mode
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 1;
        speedChosen = true;
      } else if (mouseY>marginVertical+175 && mouseY<marginVertical+200) {//Starving mode
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 2;
        speedChosen = true;
      } else if (mouseY>marginVertical+225 && mouseY<marginVertical+250) {//Flexible mode
        snakeProperties.speedMode = 'Flexible';
        snakeProperties.speedLevel = 3; //this is bad coding, but if(snakeProperties.speedMode === 'Flexible'){} doesn't work in handleClick(), so I have to make do
        speedChosen = true;
      }
    }

    if (mouseX>width-marginHorizontal-50 && mouseX<width-marginHorizontal+50) {
      if (mouseY>marginVertical+125 && mouseY<marginVertical+150) {//clear sky mode
        snakeProperties.clearSkyMode = true;
        modeChosen = true;
      } else if (mouseY>marginVertical+175 && mouseY<marginVertical+200) {//cloudy sky mode
        snakeProperties.clearSkyMode = false;
        modeChosen = true;
      }
    }

  }

  function handleClick() {
    //this function handle the options' visual behaviors when the mouse clicks on them
    if (speedChosen == true) {
      if (snakeProperties.speedLevel == 0) {//relaxed mode
        push();
        fill(255);//color the option in white
          text('Relaxed snake', marginHorizontal,marginVertical+90);
        pop();
      } else if (snakeProperties.speedLevel == 1) {//dutiful
        push();
        fill(255);
          text('Dutiful snake', marginHorizontal,marginVertical+140);
        pop();
      } else if (snakeProperties.speedLevel == 2) {//starving
        push();
        fill(255);
          text('Starving snake', marginHorizontal,marginVertical+190);
        pop();
      } else if (snakeProperties.speedLevel == 3) {//flexible
        push();
        fill(255);
          text('Flexible snake', marginHorizontal,marginVertical+240);
        pop();
      }
    }

    if (modeChosen == true) {
      if (snakeProperties.clearSkyMode == true) {//clear sky
        push();
        fill(255);
          text('Clear sky', width-marginHorizontal,marginVertical+140);
        pop();
      } else if (snakeProperties.clearSkyMode == false) {//cloudy sky
        push();
        fill(255);
          text('Cloudy sky', width-marginHorizontal,marginVertical+190);
        pop();
      }
    }
    if (speedChosen == true && modeChosen == true) {//if both speed and mode are chosen, player is given the choice to start the game
      push();
      fill(255);
      textFont(globalFont);
      textAlign(CENTER);
      text('Press → to start', width/2, height - 80);
      pop();
    }
  }

  this.keyPressed = function() {
    if (keyCode === RIGHT_ARROW) {
      if (speedChosen == true && modeChosen == true) {//player can only proceed if both speed and mode are chosen
        bgSong.loop();//start BG song
        this.sceneManager.showScene( MainGame );//call main game scene
      }
    }
    if (keyCode === BACKSPACE) {
      this.sceneManager.showScene( Intro );//call Intro scene
      createCanvas(canvasWidth,canvasHeight);
      image(this.sceneManager.bgIntro, 0, 0);//set up the Intro's BG image
    }
  }
}
