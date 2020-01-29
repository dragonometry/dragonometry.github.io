// Adapted by Allen Murphy from:
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// *********************************************
var Bird = function() {
  this.y = height / 2;
  this.x = 64;
  this.gravity = 0.9;
  this.lift = -1.2 ;
  this.velocity = 0;
  this.size = 30;
};

// *********************************************
Bird.prototype.show = function() {
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
  fill(23,25,180);
  ellipse(this.x+5, this.y-5, this.size*0.4,this.size*0.4);
};

// *********************************************
Bird.prototype.up = function() {
  this.velocity += this.lift;
};

// *********************************************
Bird.prototype.update = function() {
  this.velocity += this.gravity;
  // this.velocity *= 0.9;
  this.y += this.velocity;

  if (this.y > height-this.size) {
    this.y = height-this.size;
    this.velocity = 0;
  }

  if (this.y < 0) {
    this.y = 0;
    this.velocity = 0;
  }
};
