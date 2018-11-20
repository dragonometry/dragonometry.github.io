/* Tom Turkey Graph Activity */

/* The program below plots shapes from the Tom Turkey
   activity over at Math-Aids.com.

   http://www.math-aids.com/cgi/pdf_viewer_4.cgi?script_name=graphing_characters.pl&character=6&answer=1&x=93&y=20

   The "shapes" are converted into an array of arrays and then sent to a 
   function that draws them on the canvas. A helper function is included
   to convert the cartesian coordinates from the activity to canvas
   coordinates. 
*/

// *****************************************************************
// Functions
// *****************************************************************

/* -------------------------------------------------------------- */ 
var convertPointsStringToArray = function(s) {

  // This function converts the string of ordered pairs into an 
  // array of numbers that can be drawn by drawShape().

  var a = "";
  var temp = s.split("");
  for (var i=0; i<temp.length; i++) {
    if (temp[i] !== "(" && temp[i] !== ")" && temp[i] !== " ") {
      a+=temp[i];
    } 
  }
  return a.split(",");
};

/* -------------------------------------------------------------- */ 
var plotLineFromCartesian = function(x1,y1,x2,y2) {

  // This function plots a line from two Cartesian ordered pairs
  // to the canvas.

  // Convert Cartesian points to canvas coordinates
  x1 = (x1*(width/40.0) + width/2.0);
  x2 = (x2*(width/40.0) + width/2.0);
  y1 = (-1*y1*(height/40.0) + height/2.0);
  y2 = (-1*y2*(height/40.0) + height/2.0);

  // Draw a line connecting the two points
  line(x1,y1,x2,y2);
};

/* -------------------------------------------------------------- */ 
var drawShape = function(arrayOfCoordinates) {

  // This function draws the shape made by the array of points
  // passed to it.

  for (var i=0; i<arrayOfCoordinates.length-2; i+=2) {
    plotLineFromCartesian(arrayOfCoordinates[i], arrayOfCoordinates[i+1],
                          arrayOfCoordinates[i+2],arrayOfCoordinates[i+3]);
  }
};

/* -------------------------------------------------------------- */ 
var drawGrid = function() {
  // Add graph paper gridlines to the canvas
  stroke(217, 247, 244);
  for (var x = -20; x<=20; x++) {
    plotLineFromCartesian(x,-20,x,20);
  }

  for (var y=-20; y<=20; y++) {
    plotLineFromCartesian(-20,y,20,y);
  }

  stroke(163, 157, 163);

  // Axes
  plotLineFromCartesian(0,-20,0,20);
  plotLineFromCartesian(-20,0,20,0);

  // Arrows
  plotLineFromCartesian(-20,0,-19.5,0.5);
  plotLineFromCartesian(-20,0,-19.5,-0.5);
  plotLineFromCartesian(20,0,19.5,-0.5);
  plotLineFromCartesian(20,0,19.5,0.5);
  plotLineFromCartesian(0,20,0.5,19.5);
  plotLineFromCartesian(0,20,-0.5,19.5);
  plotLineFromCartesian(0,-20,0.5,-19.5);
  plotLineFromCartesian(0,-20,-0.5,-19.5);

};

/* -------------------------------------------------------------- */ 
var drawTomTurkey = function(shapes) {
  // This fucntion draws the entire assignment by
  // looping through the shapes.

  background(255,255,255);
  drawGrid();
  stroke(232, 113, 23);
  strokeWeight(2);

  // Cycle through the array of "shapes" and draw them as Cartesian segments.
  for (var p=0; p < shapes.length; p++) {
    drawShape(convertPointsStringToArray(shapes[p]));
  }
};

// *****************************************************************
// Main Program
// *****************************************************************


/* Each string in the shapes array is a "shape" from the worksheet.
   The list of ordered pairs is a string enclosed in " " (quotes) and
   separated by commas. 
*/ 

// Define our array of "shapes"
var shapes = [

  // Shape 1
  "(-3,-11),(-3.5,-12.5),(-4,-12),(-4.5,-12.5),(-4,-13),(-3,-14),(-2,-15.5),(-1.5,-16) , (-1.5,-15.5) , (-2,-14),(-1,-15) , (0,-15.5) , (-0.5,-14.5) , (-1,-14) , (0,-14.5) , (0,-14) , (-0.5,-13.5) , (-2,-13) , (-2.5,-12.5) , (-1.5,-11.5) , (-3,-11)",

  // Shape 2
  "(-1.5,-11.5),(0,-11.5),(0.5,-12),(0.5,-13),(-0.5,-12.5),(-0.5,-13.5),(0,-14),(1.5,-15) , (2,-16) , (2.5,-15.5) , (2,-15), (3,-15.5) , (3.5,-15.5) , (3.5,-15) , (2,-14.5) , (3,-14.5) , (3.5,-14.5) , (3.5,-14) , (2,-13.5) , (1,-13.5) , (1.5,-12.5) , (0.5,-12)",

  /* You finish here with the rest of the shapes...
       If you are resourceful, you can copy and paste the list of points
       for each shape and avoid typing them. Just be careful. You may
       need to manually type some commas after pasting.

       Make sure each shape's points are enclosed in quotes and all but 
       the last one separated by commas at the end like Shape 1 above/
    */
  // Shape 3
  "(1.5,-12.5) , (2.5,-11.5) , (4.5,-11.5) , (6.5,-10) , (7.5,-8.5) , (9,-7) , (9.5,-5.5) , (10.5,-4),(10.5,-3) , (10,-2.5) , (8.5,-2) , (9.5,-3.5) , (9.5,-5.5)",

  // Shape 4
  "(-3,-11) , (-4,-10) , (-4,-8.5) , (-5.5,-7) , (-4,-8) , (-3,-8) , (-1,-7.5) , (2,-6) , (4.5,-4) , (5.5,-1.5) , (7,-2.5) , (8.5,-2)",

  // Shape 5
  "(-5.5,-7) , (-6.5,-6.5) , (-7,-5.5) , (-8,-5) , (-8,-3.5) , (-9,-3.5) , (-9.5,-3) , (-10.5,-3) , (-10.5,-4), (-10,-5.5) , (-9,-6.5) , (-8,-6.5) , (-7,-5.5)",

  // Shape 6
  "(-10.5,-3) , (-11.5,-2.5) , (-12,-1) , (-11,1) , (-9,1) , (-10.5,0) , (-11,-1) , (-10.5,-2) , (-9.5,-2) , (-9.5,-3)",

  // Shape 7
  "(-9,1) , (-8,1.5) , (-8,0) , (-7,-0.5) , (-7,-1.5) , (-6,-2.5) , (-5,-2.5) , (-5,-3.5) , (-4,-4.5), (-3,-4.5) , (-3.5,-5.5) , (-2,-6) , (-1.5,-7) , (-1,-7.5)",

  // Shape 8
  "(-8,1.5) , (-7,2) , (-6,2.5) , (-3.5,2.5) , (-4,2) , (-4,1) , (-3,0.5) , (-3.5,0) , (-3,-1) , (-2,-1), (-2.5,-2) , (-2,-3) , (-0.5,-3) , (-1,-4) , (0,-5) , (0.5,-4.5) , (1,-5.5) , (2,-6)",

  // Shape 9
  "(-3.5,2.5) , (-1.5,2.5) , (-1.5,2.5) , (0.5,2) , (1.5,1.5) , (2.5,1) , (3.5,0.5) , (5,-1) , (5.5,-1.5)",

  // Shape 10
  "(-11,1) , (-12,2) , (-11.5,4) , (-10.5,5) , (-8.5,4) , (-6,2.5)",

  // Shape 11
  "(-10.5,5) , (-10.5,6) , (-10,7.5) , (-9,8.5) , (-8,8.5) , (-6,6) , (-3.5,2.5)",

  // Shape 12
  "(-8,8.5) , (-7.5,10) , (-6.5,10.5) , (-5.5,11) , (-4.5,10.5) , (-3.5,7.5) , (-2.5,5) , (-1.5,2.5)",

  // Shape 13
  "(-4.5,10.5) , (-4,11.5) , (-3,12) , (-2,12.5) , (-1,12) , (-0.5,11.5) , (-0.5,7) , (-0.5,2.5)",

  // Shape 14
  "(-0.5,11.5) , (0,12.5) , (1,12.5) , (2.5,12) , (3.5,11) , (2.5,8) , (0.5,2)",

  // Shape 15
  "(3.5,11) , (5,11) , (6,10.5) , (7,9) , (4,5) , (1.5,1.5)",

  // Shape 16
  "(7,9) , (8.5,8.5) , (9.5,7) , (8,7.5) , (6.5,6.5) , (6,5) , (6,3.5) , (2.5,1)",

  // Shape 17
  "(6,3.5) , (6,1) , (3.5,0.5)",

  // Shape 18
  "(6,1) , (5.5,0) , (5,-1)",

  // Shape 19
  "(9.5,7) , (10.5,6.5) , (11,5) , (9.5,5) , (8,3) , (7.5,2) , (8,1.5) , (8.5,1.5) , (9,2.5) , (9.5,3.5), (9.5,4.5) , (10.5,4.5) , (11,4) , (11,5)",

  // Shape 20
  "(8.5,-2) , (8,0.5) , (8,1.5)",

  // Shape 21
  "(9.5,3.5) , (10,3) , (11.5,2.5) , (11,4)",

  // Shape 22
  "(9.5,1.5) , (10.5,1.5) , (11.5,2.5) , (10,3) , (9.5,2.5) , (9.5,1.5) , (9,1) , (8,0.5)",

  // Shape 23
  "(10.5,1.5) , (11.5,1) , (11.5,0) , (11,-2) , (10,-2.5)",

  // Shape 24
  "(8.5,6) , (8,5.5) , (8.5,5) , (9,5.5) , (8.5,6)",

  // Shape 25
  "(9,5.5) , (8.5,5.5) , (8.5,5)"
];

// Draw the whole thing
size(500,500);
drawTomTurkey(shapes);
