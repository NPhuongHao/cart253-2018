/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

//Target's speed
var targetVX = 10;
var targetVY = 15;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// Keep track of whether they've won
var gameOver = false;

// The parameters of the instruction panel
var instructionW = 180;
var instructionH = 180;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  // The number of decoys to show on the screen, randomly
  // chosen from the decoy images
  var numDecoys = random(50,120);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    //Choose a random size for each decoy
    var z = random(50,200);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,z,z);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,z,z);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,z,z);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,z,z);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,z,z);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,z,z);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,z,z);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,z,z);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,z,z);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Set location of the instruction panel on the top left of the screen
  noStroke();
  rectMode(CENTER);
  fill(254,89,88);
  rect(instructionW/2 + 20, instructionH/2 + 20, instructionW, instructionH);
  fill(5,35,46);
  rect(instructionW/2 + 20, instructionH/6 + 20, instructionW, instructionH/3);
  fill(245,214,111);
  textAlign(CENTER,CENTER);
  textFont("Helvetica");
  textSize(16);
  textStyle(BOLD);
  text("HAVE YOU SEEN", instructionW/2 + 20, instructionH/6 + 13);
  text("THIS DOG?",instructionW/2 + 20, instructionH/6 + 30)

  image(targetImage,instructionW/2 + 20,instructionH/3*2 + 20);

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // Reroll if target's location overlaps the instruction panel
  while((targetX <= (instructionW + 20 + targetImage.width/2)) && (targetY <= (instructionH + 20 + targetImage.height/2))) {
  targetX = random(0,width);
  targetY = random(0,height);
    }

}


function draw() {

  // And draw it (this means it will always be on top)
      image(targetImage,targetX,targetY);


  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height*0.4);
    textSize(42);
    fill(254,89,88);
    text("...And filled the world with cute little sausage dogs",width/2,height*0.55);
    fill(254,89,88);
    rect(width/2, height*0.65,500,40);
    textSize(30);
    fill(255,255,0);
    text("Press ENTER to restart",width/2, height*0.65);
    //Question: Why nothing happens when we click on the target image on the instruction panel?

    /*noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);*/
    if (targetX - targetImage.width/2 > width) {
      targetX = 0 - targetImage.width/2;
    }
    if (targetY - targetImage.height/2 > height) {
      targetY = 0 - targetImage.height/2;
    }

//Option 1: Sausage dog move around the screen
    /*if (targetX > width/2) {
      targetImage.width -=0.5;
      targetImage.height -=0.5;
    } else {
      targetImage.width +=0.5;
      targetImage.height +=0.5;
    }
    targetX += targetVX;
    targetY += targetVY;
    */

//Option 2: Sausage dogs randomly fill the screen
      targetX = random(0,width);
      targetY = random(0,height);
        //Set a variable for the avatar's size
      var avatarSizeVar = random(50,200);
      targetImage.width = avatarSizeVar;
      targetImage.height = avatarSizeVar;
      //Don't let it fill up forever
      var counter = 0;
      counter ++;
      if (counter > 500) {
        noLoop();
      }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (keyCode === RETURN) {
    window.location.reload();
  }
}
