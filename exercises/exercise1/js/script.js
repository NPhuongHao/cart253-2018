// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;
//current position of rect
var rectX;
var rectY;

// The added image
var imgAdded;

//current position of added image 1
var imgAddedX;
var imgAddedY;

// The added image 2 and its postion
var imgAdded2;
var imgAdded2X;
var imgAdded2Y;

//The sin image and its position
var imgSin;
var imgSinX;
var imgSinY;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  imgAdded = loadImage("assets/images/bloobros2(1).png");
  imgAdded2 = loadImage("assets/images/doggo.png");
  imgSin = loadImage("assets/images/grumpycat.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the rect off screen to the left
  rectX = 0 - width/5;
  rectY = 0;

  //Start the added img 2 exactly where the mouse is
  imgAdded2X = mouseX;
  imgAdded2Y = mouseY;
  imgAdded2.height = 120;
  imgAdded2.width = 120;


  // Start the sin img off screen to the left
  imgSin.height = 100;
  imgSin.width = 100;
  imgSinX = 0 - imgSin.width/2;
  imgSinY = height/2;


  // We'll use imageMode CENTER for this script
  imageMode(CENTER);


}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
  rectX += 1.5;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  //Display the moving rect
  fill(255,255,255,50);
  stroke(0,0,0,50);
  rect(rectX,rectY,width/5,height);

  // Start the added img exactly where the mouse is
  imgAddedX = mouseX;
  imgAddedY = mouseY;
  imgAdded.height = 50;
  imgAdded.width = 50;
  // Display the added image 1
  image(imgAdded,imgAddedX,imgAddedY);


  //Setting up and display added img 2
  xDistance = mouseX - imgAdded2X;
  yDistance = mouseY - imgAdded2Y;
  //Add 1/30th of the x and y distance to the clown's current (x,y) location
  imgAdded2X = imgAdded2X + xDistance/30;
  imgAdded2Y = imgAdded2Y + yDistance/30;

  //Display added img 2
  image(imgAdded2,imgAdded2X,imgAdded2Y);

  // Move the Sin img according to the sin wave
  imgSinX += 0.75;
  imgSinY = height/2 + 200 * Math.sin(imgSinX / 10);

  //Display sin img
  image(imgSin,imgSinX,imgSinY);
}
