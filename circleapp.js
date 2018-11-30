// Click on the canvas to activate the keyboard.
size(400,400);

var x=width/2;
var y = height/2;
var d = 20;

// *****************************************
keyPressed = function() {
  if (keyCode === UP) {
    y-=5;
  } else if (keyCode === DOWN) {
    y +=5;
  } else if (keyCode === RIGHT) {
    x+=5;
  } else if (keyCode === LEFT) {
    x-=5;
  }
};

// ****************************************
draw = function() {
  background(0,0,0);
  fill(255, 0, 0);
  ellipse(x,y,d,d);
};
