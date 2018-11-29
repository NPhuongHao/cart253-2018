/*****************

Starry Snake
Nguyen Phuong Hao

Reach the stars and light them up to form beautiful constellations!

FIRST PROTOTYPE: Build movement grid, create snake and handle keyboard input to move the snake around. Snake cannot bite itself or collide with anything yet.

******************/

function MainGame() {
  this.preload = function() {}

  this.setup = function() {
    createCanvas(canvasWidth,canvasHeight);

    //Create a snake with the Snake class
    //Snake(t,i,type,speed,angle,length)
    snake = new Snake(17, 17, 'A', 5, 30, 2);//Default length of the snake will be 2*2=4. Why? Check drawGrid()

    //Bait(t,i,type,size,radius)
    bait = new Bait(floor(random(2,32)),floor(random(2,32)),'A',borderLength,10);//this is the normal bait
    specialBait = new Bait(floor(random(2,32)),floor(random(2,32)),'A',borderLength,30);//this is the special bait with a bigger radius value
    drawGrid();

    snake.updateSnake();

    console.log('FIRST PROTOTYPE: Build movement grid, create snake and handle keyboard input to move the snake around. Snake cannot bite itself or collide with anything yet.')
    console.log('SECOND PROTOTYPE: Snake can now bite itself. Added bait and special bait. Added score system. Added background and repositioned the canvas.')
  }

  this.draw = function() {
    drawBackground();
    snake.speedCount();

    bait.updateBait();
    snake.update();

    //check if the special bait is good to go
    if(specialBaitgo == true) {
      handleSpecialBait();
    }

    if(counter%decelerator == 0) {//the bigger the decelerator , the slower the snake
      handleSnake();
    }

    snake.display();
    bait.display();

    drawBorder();

    /******TO TEST HOW THE GAME BEHAVES IN A LIMITED FRAME RANGE. LEFT IN CASE OF REUSE
    i++;
    if (i==20) {
      noLoop();
    }
    ****************************************/
  }

  //-----------------------------------------------------//
  //-----------------------------------------------------//


  //Set up the background with short instruction
  function drawBackground() {
    background(0,50);
    push();
    noStroke();
    fill(255,50);
    textAlign(CENTER);
    textStyle(BOLD);
    text('Score: '+ snake.score, 80, 50);
    pop();
  }

  //Set up the borders of the playground
  function drawBorder() {
    push();
    fill(22,24,39);
    noStroke();
    rect(0,0,width,20);
    rect(0,0,20,height);
    rect(0,height-20,width,20);
    rect(width-20,0,20,height);
    pop();
  }

  //Set up the hexagonal grid
  //This grid will be divided into 2 types A and B, each hexagon will have a t parameter and i parameter.
  //One group of hexagons with the same t and i parameter consists of two hexagons, one of type A and the other of type B
  //How type A and type B are positioned will be calculated below
  function drawGrid() {
    //draw the type A hexagons
    for (var t = 1; t < canvasHeight / (hexagonWidth - 1); t++) {//t parameter to determine its y position
      for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) {//i parameter to determine its x position
        var x = borderLength * 3 * i;//x position of a type A hexagon based on its t parameter
        var y = hexagonWidth * (t - 1 / 2);//y position of a type A hexagon based on its y parameter
        fill(255,0);
        stroke(200,0);
        //enter the hexagon's t & i parameters to the gridTypeA[] array
        gridcode.t = t;
        gridcode.i = i;
        gridTypeA.push(gridcode);
        //draw the hexagon
        polygon(x, y, borderLength, 6);
      }
    }

    //draw the type B hexagons. Same mechanics with type A are applied.
    for (var t = 0; t < canvasHeight / (hexagonWidth - 1); t++) {
      for (var i = 0; i < canvasWidth / (borderLength * 3 - 1); i++) {
        var x = borderLength * (3 * i + 1.5);
        var y = hexagonWidth * t;
        if (t == 0 || t == 34) {
          fillColor = 150;
          strokeColor = 50;
        } else {
          fillColor = 255;
          strokeColor = 200;
        }
        fill(255,0);
        stroke(200,0);
        gridcode.t = t;
        gridcode.i = i;
        gridTypeB.push(gridcode);
        polygon(x, y, borderLength, 6);
      }
    }
  }

  this.keyPressed = function() {
    //Change the snake's direction
    snake.keyPressed();

    //Change the snake's speed level
    if (keyIsDown(49)) {//the '1' key is pressed
      snake.speedLevel = 0;
    }
    if (keyIsDown(50)) {//the '2' key is pressed
      snake.speedLevel = 1;
    }
    if (keyIsDown(51)) {//the '3' key is pressed
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
