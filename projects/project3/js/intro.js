function Intro() {

  var buttonW = 150;
  var buttonH = 40;

  this.preload = function() {
  }

  this.setup = function() {
      createCanvas(canvasWidth,canvasHeight);
      image(this.sceneManager.bgIntro, 0, 0);

      setupTitle();

      setupButtons();

  }

  this.draw = function() {
    handleHoverButtons();
  }

  this.mousePressed = function() {
    if (mouseX+buttonW/2>width*0.3 && mouseX-buttonW/2<width*0.3) {
      if (mouseY+buttonH/2>height*0.55 && mouseY-buttonH/2<height*0.55) {
        console.log('GO');
        this.sceneManager.showScene( MainGame );
      } else if (mouseY+buttonH/2>height*0.65 && mouseY-buttonH/2<height*0.65) {
        tutorialBtnHover();
      } else {
        setupButtons();
      }
    } else {
      setupButtons();
    }
  }

  function setupTitle() {
    push();
    fill(255);
    textSize(68);
    textFont(titleFont);
    text('STARRY SNAKE', 95, 280);
    pop();
  }

  function handleHoverButtons() {
    if (mouseX+buttonW/2>width*0.3 && mouseX-buttonW/2<width*0.3) {
      if (mouseY+buttonH/2>height*0.55 && mouseY-buttonH/2<height*0.55) {
        startBtnHover();
      } else if (mouseY+buttonH/2>height*0.65 && mouseY-buttonH/2<height*0.65) {
        tutorialBtnHover();
      } else {
        setupButtons();
      }
    } else {
      setupButtons();
    }
  }

  function setupButtons() {
    push();
    fill(0,200);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.55, buttonW, buttonH);
    rect(width*0.3, height*0.65, buttonW, buttonH);
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Start', width*0.3, height*0.55+buttonH/4);
    text('Tutorial', width*0.3, height*0.65+buttonH/4);
    pop();
  }

  function startBtnHover() {
    push();
    fill(255,50);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.55, buttonW, buttonH);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Start', width*0.3, height*0.55+buttonH/4);
    pop();
  }

  function tutorialBtnHover() {
    push();
    fill(255,50);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width*0.3, height*0.65, buttonW, buttonH);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(20);
    textFont(globalFont);
    text('Tutorial', width*0.3, height*0.65+buttonH/4);
    pop();
  }
}
