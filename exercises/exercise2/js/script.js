/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar cloud
var avatar;
var avatarWin;
var avatarX;
var avatarY;
var avatarHeigth = 60;
var avatarWidth = 90;

// The speed and velocity of our avatar cloud
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The name, position and size of the enemy sun
var enemy;
var enemyX;
var enemyY;
var enemySize = 50;

// The speed and velocity of our enemy sun
var enemySpeed = 5;
var enemyVX = 5;

// How many scores the player has made
var scores = 0;

//The result
var result

//Instruction var name and opacity
var instructionOpacity = 1;

function preload() {
  enemy = loadImage("assets/images/sun.png");
  avatar = loadImage("assets/images/cloud.png");
  avatarWin = loadImage("assets/images/cloudwin.png");

}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(1000,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();

  //Set the image avatar at the CENTER
  imageMode(CENTER);

}

// draw()
//
// Handle moving the avatar and enemy and checking for scores and
// game over situations.
function draw() {
  // A background that slightly becomes darker each time the player scores successfully
  background(180 - scores*5,220 - scores*5,255 - scores*5);


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarWidth/2) {
    // This means the player eated a sun so update its dodge statistic
    scores = scores + 1;
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(10,height-10); //so that it doesn't start too close to the edges
    enemySpeed = random(5,12);
    // Tell them how many scores they have made
    console.log(scores + " scores!");
    //If player successfully ate a sun with velocity > 8.5, avatar becomes big for one turn
    if (enemySpeed > 8.5) {
      avatarWidth = 130;
      avatarHeigth = 100;
    } else {
      avatarWidth = 90;
      avatarHeigth = 60;
    }

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    reset();
    // If they went off the screen they lose.
    console.log("YOU LOSE!");
    result = "YOU LOSE!";
    fill(255);
    text('Press ENTER to restart',width/2,height*0.6);
    //freeze frame
    noLoop();
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    reset();
        // Tell the player they lost
    console.log("YOU LOSE!");
    result = "YOU LOSE!";
    fill(255,255,255);
    text('Press ENTER to restart',width/2,height*0.6);
    //freeze frame
    noLoop();
  }

  //If the background becomes Black then the player wins
  if (scores*5 >= 255) {
    reset();
    console.log("YOU WIN!")
    result = "YOU WIN!";
    fill(255);
    text('The world is now plunged into eternal darkness',width/2,height*0.6);
    text('Press ENTER to restart',width/2,height*0.7);
    noLoop();
  }


  // Display the number of successful scores in the console
  console.log(scores);

  // The player changes color slightly each frame
  fill(0);
  // Draw the player as a cloud
  if (result == "YOU WIN!") {
    image(avatarWin,avatarX,avatarY,avatarWidth,avatarHeigth);
  } else {
    image(avatar,avatarX,avatarY,avatarWidth,avatarHeigth);
  }

  // Draw the enemy as a sun
  image(enemy,enemyX,enemyY,enemySize,enemySize);


  // Instruction text
  instructionOpacity = constrain(instructionOpacity - 0.02,0,1);
  console.log('Opacity = '+ instructionOpacity );
  fill('rgba( 100,140,150,'+instructionOpacity+')');
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(70);
  text('⇦ ⇨ ⇧ ⇩', width/2, height*0.45 );
  textSize(40);
  text('Eat the suns before they burn the sky!', width/2, height*0.55);

  //Display result
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50);
  textFont("Lato");
  text(result,width/2,height*0.38);
  textSize(20);
  textStyle(NORMAL);
  text('Scores = ' + scores,width*0.9,height*0.1);


}


//If player presses ENTER then the game restarts
function keyPressed() {
  if (keyCode == RETURN) {
    loop();
    result = '';

  }
}

function reset() {
  // Reset the enemy and avatar position
  enemyX = 0 - enemySize/2;
  enemyY = random(0,height);
  avatarX = width/2;
  avatarY = height/2;
  scores = 0;
  //Reset avatar size
  avatarWidth = 90;
  avatarHeigth = 60;
}
