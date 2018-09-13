function setup() {

    // Set up the canvas and give it a nice dark colour
  createCanvas(500,500);
  background(7, 43, 60);

    //Draw the head and body (or is it a chin?) in white and grey
        // No stroke because shapes look nicer without it I think
  noStroke();
        //Ears first
    fill(210);
    ellipse(155,215,30,40);
    ellipse(345,215,30,40);
        // Set the grey
  fill(20, 65, 79);
    ellipseMode(CENTER);
    ellipse(250,420,300,400);
     //Draw the shirt
    fill(30);
    ellipse(250,440,250,400);
    fill(200);
    triangle(175,260,330,260,245,330);
        //ellipsemode
        //set the white
    fill(255,255,255);
    ellipse(250,200,200,200);
        ////Now earrings
    fill(218, 165, 32);
    triangle(152,230,140,270,160,270);
    triangle(347,230,337,270,357,270);
    rect(145,272,10,20);
    rect(342,272,10,20);

    // Draw the white backgrounds of the eyes
  fill(220);
  rect(180,225,50,20);
  rect(270,225,50,20);

    // Draw the black pupils
  fill(0);
  triangle(190, 225, 220, 225, 205, 240);
  triangle(280, 225, 310, 225, 295, 240);

    //Draw the glasses
    fill(30,30,80,80);

  rect(170,230,70,25,0, 0, 10, 10);
  rect(260,230,70,25,0, 0, 10, 10);

    fill(100,100,120);
    rect(240,235,20,5);

    //Draw the mouth
    fill(255,150,150);
    quad(235,280,265,280,275,270,225,270);
    fill(180,100,100);
    quad(230,275,270,275,275,270,225,270);

    //hair?
    fill(30,10,10);
    arc(250, 180, 200, 180, 2.7925268032, 0.6381317008, PIE);
    triangle(148,180,160,200,155,240);
    triangle(310,170,350,170,340,280);


}
