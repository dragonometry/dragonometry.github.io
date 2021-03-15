// Dragonometry Mobile Circle Game
// Based on Circle Game by Shea Barton http://sysach.com/circle-game/
// Requires p5.js

// ************************************************************
// Global Variable Declarations
// ************************************************************
var stillPlaying = false;
var hero;
var circles;
var dfactor = 20;
var gameWidth = window.innerWidth - 10;
var gameHeight = window.innerHeight - 40;


// ************************************************************
// Hero Object Definition
// ************************************************************
var Hero = function(x, y) {
  this.x = x;
  this.y = y;
  this.d = 20;
  this.circles = 0;
};

Hero.prototype.draw = function() {
  // Body
  fill(255, 0, 0);
  ellipse(this.x,this.y,this.d, this.d);
  
  //Stripes
  fill(0,100,100);
  rect(this.x-this.d/2,this.y-2,this.d,4);
  rect(this.x-2,this.y-this.d/2,4,this.d);

};

Hero.prototype.checkForCircleCapture = function(circ) {
  if (dist(this.x,this.y,circ.x,circ.y) < this.d/2 + circ.d/2) {

    if(this.d >= circ.d) {
      circ.renew();
      this.circles++;
      this.d += 1;
      dfactor = this.d;
      return false;
    } else {
      return true;
    }
  }
  return false;
};

// ************************************************************
// Circle Object Definition
// ************************************************************
var Circle = function() {
  // Center and increment
  this.renew();
};

Circle.prototype.draw = function() {
  fill(this.r, this.g, this.b);
  ellipse(this.x, this.y, this.d, this.d);
};

Circle.prototype.checkPosition = function() {
  if(this.x < 0 || this.x > gameWidth) {
    return true;
  } else if(this.y < 0 || this.y > gameHeight) {
    return true;
  } else {  
    return false;
  }
};

Circle.prototype.renew = function() {
  // Random starting coordinates
  if (random(0,2) > 1) {

    // Left or right edge origin.
    if (random(0,2) > 1) {
      this.x = 0;
      this.xinc = random(0.1, 3)- 1.5;
    } else {
      this.x = gameWidth;
      this.xinc = -1 * random(0.1, 3)- 1.5;
    }
    
    this.y = random(15,gameHeight);
    this.yinc = random(0.1, 3) - 1.5;

  } else {

    // Top or bottom edge origin.
    if (random(0,2) > 1) {
      this.y = 0;
      this.yinc = random(0.1, 3);
    } else {
      this.y = gameHeight;
      this.yinc = -1 * random(0.1, 3);
    }
    
    this.x = random(0,gameWidth);
    this.xinc = random(0.1, 3)- 1.5;
  }

  // "Diameter"
  this.d = random(0.3,2*dfactor);

  // Random Color
  this.r = random(0,255);
  this.g = random(0,255);
  this.b = random(0,255);
};

// ************************************************************
// Game Play Functions
// ************************************************************
var startGame = function() {
  background(13, 15, 15);
  
  // Our Hero, controlled by the mouse.
  hero = new Hero(gameWidth/2, gameHeight/2);
  
  // Array of Circles
  circles = [];
  for (var i = 0; i < 25; i++) {
    circles.push(new Circle());
  }
  
  // Game Message
  fill(255, 40, 40);
  text("The Circle Game",gameWidth/2-120,gameHeight/2-200);
  text("Tap Anywhere To Begin",gameWidth/2-170,gameHeight/2-100);
  hero.draw();
  text("Move this guy",gameWidth/2-100,gameHeight/2+50);
  text("with your finger.",gameWidth/2-100,gameHeight/2+90);
  text("Capture smaller circles.",gameWidth/2-165,gameHeight/2+190);

};

// ************************************************************
setup = function() {
  createCanvas(gameWidth,gameHeight);
  noStroke();
  textSize(32);
  startGame();
};

// ************************************************************
draw = function() {
  if(stillPlaying) {

    // Background components.
    background(13, 15, 15);
    fill(255,255,255);
    text("Score " + hero.circles,10,30);

    // Move the Hero.
    hero.x = mouseX;
    hero.y = mouseY-70;
    hero.draw();

    // Move and draw all the circles.
    for (var i = 0; i < circles.length; i++) {

      circles[i].draw();
      circles[i].x += circles[i].xinc;
      circles[i].y += circles[i].yinc;

      // Check for contact.
      if (hero.checkForCircleCapture(circles[i])){
        background(0,0,0);
        fill(255,40,40);
        text("Game Over",20,200);
        text("Score " + hero.circles,20,240);
        text("Tap Anywhere To Replay",20,320);
        stillPlaying = false;
        break;
      }

      // Make sure circles are still on the screen.
      if(circles[i].checkPosition()) {
        circles[i].renew();
      }
    }
  }
};

// ************************************************************
// Mouse Event Handler
// ************************************************************
mouseClicked = function(){
  if (!stillPlaying) {
    
    if (hero.circles > 0) {
      startGame();
    } else {
      startGame();
      stillPlaying = true;
    }
  }
};

// ************************************************************
// Touch Event Handlers
// ************************************************************
touchStarted = function(){
  if (!stillPlaying) {

    if (hero.circles > 0) {
      startGame();
    } else {
      startGame();
      stillPlaying = true;
    }
  }
};

touchMoved = function() {
  return false;
};
