/*****************



  This is the Game Over scene.
  This scene pops up when the website is opened, or when the player chooses to restart a new game.
  From here, player can whether choose to read the tutorial or start a game.



******************/

function Intro() {

  //width and height of the buttons
  var buttonW = 150;
  var buttonH = 40;

  this.preload = function() {}

  this.setup = function() {
      createCanvas(canvasWidth,canvasHeight);
      image(this.sceneManager.bgIntro, 0, 0);//set up the Intro's BG image
  }

  this.draw = function() {
    //Display the title
    setupTitle();
    //Handle how the buttons behave
    handleButtons();
  }

  //-----------------------------------------------------//
  //--------------OTHER FUNCTIONS------------------------//
  //-----------------------------------------------------//

  this.mousePressed = function() {
    if (mouseX+buttonW/2>width*0.3 && mouseX-buttonW/2<width*0.3) {//If mouse's X position overlapses with button's width
      if (mouseY+buttonH/2>height*0.55 && mouseY-buttonH/2<height*0.55) {//If mouse's Y position overlapses with button1's height
        this.sceneManager.showScene( Mode );//call main game scene
      } else if (mouseY+buttonH/2>height*0.65 && mouseY-buttonH/2<height*0.65) {//If mouse's Y position overlapses with button2's height
        this.sceneManager.showScene( Tutorial );//call tutorial scene
      }
    }
  }

  function setupTitle() {
    push();
    fill(255);
    textSize(68);
    textFont(titleFont);
    textAlign(LEFT);
    text('STAR EATER', 130, 280);
    pop();
  }

  function handleButtons() {
    if (mouseX+buttonW/2>width*0.3 && mouseX-buttonW/2<width*0.3) {//if mouse's X position coincides with the buttons' horizontal range
      if (mouseY+buttonH/2>height*0.55 && mouseY-buttonH/2<height*0.55) {//if mouse's Y position coincides with the start button's vertical range
        startBtnHover();//start start button's hover effect
      } else if (mouseY+buttonH/2>height*0.65 && mouseY-buttonH/2<height*0.65) {//if mouse's Y position coincides with the tutorial button's vertical range
        tutorialBtnHover();//start tutorial button's hover effect
      } else {
        setupButtons();//else, set up the buttons' visual as they are originally
      }
    } else {
      setupButtons();//else, set up the buttons' visual as they are originally
    }
  }

  function setupButtons() {
    //this function sets up the buttons' visual as they are originally
    push();

    //draw the outlines
    fill(0,200);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.55, buttonW, buttonH);
    rect(width*0.3, height*0.65, buttonW, buttonH);
    noStroke();

    //display the button's names
    fill(255);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Start', width*0.3, height*0.55+buttonH/4);
    text('Tutorial', width*0.3, height*0.65+buttonH/4);
    fill(50);
    text("BG music: Puppet (Mary's Theme) from Ib OST, music box cover by Musicbox cover", width/2, height - 50);

    pop();
  }

  function startBtnHover() {
    push();

    //fill the start button with white
    fill(255,50);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.55, buttonW, buttonH);
    noStroke();

    //display the button's name in black
    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Start', width*0.3, height*0.55+buttonH/4);
    pop();

    //set up the tutorial button normally
    push();
    fill(0,200);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.65, buttonW, buttonH);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Tutorial', width*0.3, height*0.65+buttonH/4);
    pop();
  }

  function tutorialBtnHover() {
    push();

    //fill the tutorial button with white
    fill(255,50);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.65, buttonW, buttonH);
    noStroke();

    //display the button's name in black
    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Tutorial', width*0.3, height*0.65+buttonH/4);
    pop();

    //display the start button normally
    push();
    fill(0,200);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.55, buttonW, buttonH);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Start', width*0.3, height*0.55+buttonH/4);
    pop();
  }
}
