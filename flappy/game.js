// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// Adapted by Allen Murphy

var bird;
var pipes = [];
var score = 0;
var touching = false;

// *********************************************
setup = function() {
  createCanvas(window.innerWidth, window.innerHeight);
  bird = new Bird();
  pipes.push(new Pipe());
  textSize(20);
};

// *********************************************
draw = function() {
  background(0,0,0);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log('HIT');
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  // Move bird with space bar or touch.
  if ((keyIsPressed && key === ' ') || touching) {
    bird.up();
  }

  bird.update();
  bird.show();

  // Add new pipes at regular intervals
  if (frameCount % 125 == 0) {
    pipes.push(new Pipe());
  }
  
  // display the score
  fill(255,255,255);     
  text("Score: "+score,10,25);
};

// ************************************************************
// Touch Event Handlers
// ************************************************************
touchStarted = function(){
  touching = true;
};

touchEnded = function() {
  touching = false;
};

touchMoved = function() {
  return false;
};


