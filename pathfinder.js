var numCols = 70*1.5;
var numRows = 70;
var grid = new Array();
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var noSolution = false;
var astar = true;
var run = true;
var buttons = [];
var dijkstra = false;
var canvas;

function setup() {
  canvas = createCanvas(500*1.5,500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);

  dijkstra = false;
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
  start.isStartPlace = true;
  end.wall = false;
  end.isEndPlace = true;

  if (astar){
    astarSetup(grid, numCols, numRows);
  }
}
function draw() {
  canvas.canvas.width  = window.innerWidth;
  canvas.canvas.height = window.innerHeight;

  if (!run){
    //noLoop();
  }
  else{
    //loop();
    if (astar){
      performAstar();

    }
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
  stroke(color(0,255,0));
  strokeWeight(w);
  beginShape();
  for(var i = 0; i < path.length; i++){
    vertex(path[i].i*w + w/2, path[i].j*h + h/2);
  }
  endShape();
}
function runButtonClicked(){
  if (run){
    run = false;
    document.getElementsByClassName("radio").disabled = false;
  }
  else{
    run = true;
    document.getElementById("myRadio").disabled = true;
  }
}
function restartButtonClicked(){

  start.isStartPlace = false;
  end.isEndPlace = false;
  setup();
  openSet = [];
  closedSet = [];
  path = [];

  start = grid[Math.round(Math.floor(Math.random() * numCols)) + 1][Math.floor(Math.random() * numRows) + 1];
  end = grid[Math.round(Math.floor(Math.random() * numCols)) + 1][Math.floor(Math.random() * numRows) + 1];
  start.wall = false;
  start.isStartPlace = true;
  end.wall = false;
  end.isEndPlace = true;
 
  astarSetup(grid, numCols, numRows);
  loop();
}

function handleClick(myRadio) {

  if (myRadio.value == 2){
    restartButtonClicked();
    dijkstra = true;

    console.log('bla');
  }
  else{
    dijsktra = false;
    restartButtonClicked();
    console.log(myRadio.value)
    console.log('dijk = ' +dijkstra);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}