var numCols = 150;
var numRows = 100;
var grid = new Array();
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var noSolution = false;
var astar = true;

function setup() {
  var cnv = createCanvas(700*1.5,700);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  w = width / numCols;
  h = height / numRows;

  for(var i = 0; i < numCols; i++){
    grid[i] = new Array(numRows);
  }
  // Init new 2D array of Places
  for(var i = 0; i < numCols; i++){
    for(var j = 0; j < numRows; j++){
      grid[i][j] = new Place(i, j);
    }
  }
   for(var i = 0; i < numCols; i++){
    for(var j = 0; j < numRows; j++){
      grid[i][j].addNeighbors(grid);
    }
  } 

  start = grid[0][0];
  end = grid[numCols-1][numRows-1];
  start.wall = false;
  end.wall = false;

  if (astar){
    astarSetup(grid, numCols, numRows);
  }

}

function draw() {

  if (astar){
    performAstar();
  }
}
function removeFromArray(arr, elt){
  for(var i = arr.length - 1; i >= 0; i--){
    if (arr[i] == elt){
      arr.splice(i, 1);
    }
  }
}

function drawPath(path){
  noFill();
  stroke(color(4,255,12));
  strokeWeight(w/2);
  beginShape();
  for(var i = 0; i < path.length; i++){
    vertex(path[i].i*w + w/2, path[i].j*h + h/2);
  }
  endShape();
}