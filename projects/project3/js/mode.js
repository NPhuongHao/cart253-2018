function Mode() {
  var marginLeft = 300;
  var marginTop = 150;
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
    handleHover();
    handleClick();
    drawBorder();
  }

  function setupTitle() {
    fill(255);
    textFont(titleFont);
    textAlign(CENTER);
    textSize(32);
    text('Choose speed', marginLeft, marginTop);
    text('Choose mode', width-marginLeft, marginTop);
  }

  function setupMode() {
    fill(100);
    textFont(globalFont);
    textSize(20);

    text('Relaxed snake', marginLeft,marginTop+90);
    text('Dutiful snake', marginLeft,marginTop+140);
    text('Starving snake', marginLeft,marginTop+190);
    text('Flexible snake', marginLeft,marginTop+240);

    text('Clear sky', width-marginLeft,marginTop+140);
    text('Clouded sky', width-marginLeft,marginTop+190);
  }

  function handleHover() {
    if (mouseX>marginLeft-50 && mouseX<marginLeft+50){
      if (mouseY>marginTop+75 && mouseY<marginTop+100){
        push();
        fill(255);
          text('Relaxed snake', marginLeft,marginTop+90);
        pop();
      } else if (mouseY>marginTop+125 && mouseY<marginTop+150) {
        push();
        fill(255);
          text('Dutiful snake', marginLeft,marginTop+140);
        pop();
      } else if (mouseY>marginTop+175 && mouseY<marginTop+200) {
        push();
        fill(255);
          text('Starving snake', marginLeft,marginTop+190);
        pop();
      } else if (mouseY>marginTop+225 && mouseY<marginTop+250) {
        push();
        fill(255);
          text('Flexible snake', marginLeft,marginTop+240);
          textSize(16);
          fill(150,150);
          text('Press 1, 2, 3 \n to monitor the speed\n whenever you want', marginLeft,marginTop+270);
        pop();
      }
    } else if (mouseX>width-marginLeft-50 && mouseX<width-marginLeft+50) {
      if (mouseY>marginTop+125 && mouseY<marginTop+150) {
        push();
        fill(255);
          text('Clear sky', width-marginLeft,marginTop+140);
          fill(150,150);
          textSize(16);
          text('Roam freely \n without any obstacle\n but yourself', width-marginLeft,marginTop+50);
        pop();
      } else if (mouseY>marginTop+175 && mouseY<marginTop+200) {
        push();
        fill(255);
          text('Clouded sky', width-marginLeft,marginTop+190);
          fill(150,150);
          textSize(16);
          text('Conquer clouded skies \n by evading\n obstacles', width-marginLeft,marginTop+240);
        pop();
      }
    }
  }

  this.mousePressed = function() {
    if (mouseX>marginLeft-50 && mouseX<marginLeft+50){
      if (mouseY>marginTop+75 && mouseY<marginTop+100){
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 0;
        speedChosen = true;
      } else if (mouseY>marginTop+125 && mouseY<marginTop+150) {
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 1;
        speedChosen = true;
      } else if (mouseY>marginTop+175 && mouseY<marginTop+200) {
        snakeProperties.speedMode = 'Fixed';
        snakeProperties.speedLevel = 2;
        speedChosen = true;
      } else if (mouseY>marginTop+225 && mouseY<marginTop+250) {
        snakeProperties.speedMode = 'Flexible';
        snakeProperties.speedLevel = 3; //this is bad coding, but if(snakeProperties.speedMode === 'Flexible'){} doesn't work in handleClick(), so I have to make do
        speedChosen = true;
      }
    }

    if (mouseX>width-marginLeft-50 && mouseX<width-marginLeft+50) {
      if (mouseY>marginTop+125 && mouseY<marginTop+150) {
        snakeProperties.clearSkyMode = true;
        modeChosen = true;
      } else if (mouseY>marginTop+175 && mouseY<marginTop+200) {
        snakeProperties.clearSkyMode = false;
        modeChosen = true;
      }
    }

  }

  function handleClick() {
    if (speedChosen == true) {
      if (snakeProperties.speedLevel == 0) {
        push();
        fill(255);
          text('Relaxed snake', marginLeft,marginTop+90);
        pop();
      } else if (snakeProperties.speedLevel == 1) {
        push();
        fill(255);
          text('Dutiful snake', marginLeft,marginTop+140);
        pop();
      } else if (snakeProperties.speedLevel == 2) {
        push();
        fill(255);
          text('Starving snake', marginLeft,marginTop+190);
        pop();
      } else if (snakeProperties.speedLevel == 3) {
        push();
        fill(255);
          text('Flexible snake', marginLeft,marginTop+240);
        pop();
      }
    }
    if (modeChosen == true) {
      if (snakeProperties.clearSkyMode == true) {
        push();
        fill(255);
          text('Clear sky', width-marginLeft,marginTop+140);
        pop();
      } else if (snakeProperties.clearSkyMode == false) {
        push();
        fill(255);
          text('Clouded sky', width-marginLeft,marginTop+190);
        pop();
      }
    }
    if (speedChosen == true && modeChosen == true) {
      push();
      fill(255);
      textFont(globalFont);
      textAlign(CENTER);
      text('Press → to start', width/2, height - 80);
      pop();
      console.log(snakeProperties.speedLevel, snakeProperties.clearSkyMode);
    }
  }

  this.keyPressed = function() {
    if (keyCode === RIGHT_ARROW) {
      if (speedChosen == true && modeChosen == true) {
        this.sceneManager.showScene( MainGame );//call main game scene
      }
    }
  }
}
