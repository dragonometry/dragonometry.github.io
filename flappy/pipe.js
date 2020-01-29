// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// adapted by Allen Murphy

// *********************************************
var Pipe = function() {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 3 ;

  this.highlight = false;
  
  this.value = 1;
  
};

// *********************************************
Pipe.prototype.show = function() {
  fill(255,255,190);
  if (this.highlight) {
    fill(255, 0, 0);
  }
  rect(this.x, 0, this.w, this.top);
  rect(this.x, height - this.bottom, this.w, this.bottom);
};

// *********************************************
Pipe.prototype.update = function() {
  this.x -= this.speed;
};

// *********************************************
Pipe.prototype.offscreen = function() {
  if (this.x < -this.w) {
    score += this.value;
    return true;
  } else {
    return false;
  }
};

// *********************************************
Pipe.prototype.hits = function(bird) {
  console.log(score);
  if (bird.y < this.top || bird.y > height - this.bottom) {
    if (bird.x > this.x && bird.x < this.x + this.w) {
      this.highlight = true;
      this.value = 0;
      return true;
    }
  }
  this.highlight = false;
  return false;
};
