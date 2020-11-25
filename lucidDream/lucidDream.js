var cX;
var cY;
var cSize;

var locked = false;
var overCircle = false;
var xOffset = 0.0;
var yOffset = 0.0;
var boxSpace;
var wallSpace;
var topSpace;

var egg1;
var egg2;
var hand;
var lizard;

var state1 = false;
var state2 = false;

var alpha1 = 0;
var alpha2 = 0;
var acc = 1.5;
var speed1 = 10;
var speed2 = 10;

var alphaT = 255; //text alpha

function preload() {
  egg2 = loadImage('data/egg2.jpg');
  egg1 = loadImage('data/egg1.png');
  hand = loadImage('data/hand.png');
  lizard = loadImage('data/lizard.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cX = 70;
  cY = 70;
  topSpace = 50;
}

function draw() {
  background(0);

  if(mouseX > cX - cSize && mouseX < cX + cSize && mouseY > cY - cSize && mouseY < cY + cSize){
    overCircle = true;
  }else{
    overCircle = false;
  }

  if(windowWidth > 650){
    wallSpace = windowWidth/14;
    boxSpace = windowWidth/50;
    boxSize = windowWidth/5;

    tint(255, alpha2);
    image(lizard, wallSpace + boxSize + boxSpace, (windowHeight - boxSize)/2 + windowHeight/18, boxSize, boxSize);

    tint(255, 255);
    image(egg1, wallSpace, (windowHeight - boxSize)/2 - windowHeight/18, boxSize, boxSize);
    image(hand, wallSpace + boxSize + boxSpace, (windowHeight - boxSize)/2 + windowHeight/18, boxSize, boxSize);

    tint(255, alpha1);
    image(egg2, wallSpace, (windowHeight - boxSize)/2 - windowHeight/18, boxSize, boxSize);

    //show egg
    if(cX > windowWidth/7.6 && cX < windowWidth/6.4 && cY > windowHeight/2.5 && cY < windowHeight/2.2){
      state1 = true;
    }
    if(state1){
      setTimeout(showEgg2, 1000);
    }

    //show lizard
    if(cX > windowWidth/2.8 && cX < windowWidth/2.3 && cY > windowHeight/2 && cY < windowHeight/1.7){
      state2 = true;
    }
    if(state2){
      setTimeout(showLizard, 1000);
    }

    fill(255, alphaT);
    noStroke();
    textSize(16);
    textFont('Roboto');
    textAlign(CENTER, CENTER);
    text('Drag', 70, 62);
    text('me', 70, 78);

    stroke(255);
    noFill();
    drawBox(wallSpace, (windowHeight - boxSize)/2 - windowHeight/18, boxSize);
    drawBox(wallSpace + boxSize + boxSpace, (windowHeight - boxSize)/2 + windowHeight/18, boxSize);
    drawBox(wallSpace + 2*boxSize + 2*boxSpace, (windowHeight - boxSize)/2 - windowHeight/18, boxSize);
    drawBox(wallSpace + 3*boxSize + 3*boxSpace, (windowHeight - boxSize)/2 + windowHeight/18, boxSize);

    strokeWeight(cSize/25);
    cSize = windowWidth/13;
    ellipse(cX, cY, cSize, cSize);

  }else{
    boxSpace = windowHeight/48;
    boxSize = windowHeight/5;
    stroke(255);
    noFill();
    drawBox((windowWidth - boxSize)/2 - windowWidth/22, topSpace, boxSize);
    drawBox((windowWidth - boxSize)/2 + windowWidth/22, topSpace + boxSize + boxSpace, boxSize);
    drawBox((windowWidth - boxSize)/2 - windowWidth/22, topSpace + 2*boxSize + 2*boxSpace, boxSize);
    drawBox((windowWidth - boxSize)/2 + windowWidth/22, topSpace + 3*boxSize + 3*boxSpace, boxSize);

    strokeWeight(cSize/25);
    cSize = windowHeight/18;
    ellipse(cX, cY, cSize, cSize);
  }

  if(cX > 70 || cX < 70 || cY > 70 || cY < 70){
    if(alphaT > 0){
      alphaT -= 50;
    }
  }

}

function mousePressed() {
  if (overCircle) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - cX;
  yOffset = mouseY - cY;
}

function mouseDragged() {
  if (locked) {
    cX = mouseX - xOffset;
    cY = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}

function showEgg2(){
  if(alpha1 < 255){
    alpha1 += speed1;
    speed1 += acc;
  }
}

function showLizard(){
  if(alpha2 < 255){
    alpha2 += speed2;
    speed2 += acc;
  }
}

function drawBox(bX, bY, bSize){
  strokeWeight(1);
  rect(bX, bY, bSize, bSize);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
