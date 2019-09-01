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

  if (astar){
    astarSetup(grid, numCols, numRows);
  }

}

function draw() {

  // Use draw as the while loop
  if (openSet.length > 0){

    // Find the lowest fScore index in the open set
    var lowestFScoreIndex = 0;
    for(var i = 0; i < openSet.length; i++){
      if (openSet[i].fScore < openSet[lowestFScoreIndex].fScore){
        lowestFScoreIndex = i;
      }
    }
    var current = openSet[lowestFScoreIndex];
    if (current === end){
      noLoop();
      console.log('dunzo');
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;

    for(var i = 0; i < neighbors.length; i++){
      var neighbor = neighbors[i];

      var newPath = false;
      if (!closedSet.includes(neighbor) && !neighbor.wall){
        var tentativeG = current.gScore + 1;
        if (openSet.includes(neighbor)){
          if (tentativeG < neighbor.gScore){
            neighbor.gScore = tentativeG;
            newPath = true;
          }
        } else {
          neighbor.gScore = tentativeG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath){
          neighbor.hScore = heuristic(neighbor, end);
          neighbor.fScore = neighbor.gScore + neighbor.hScore;
          neighbor.previous = current;
        }
      }
    }
  } else {
    // No solution
    console.log('no solution');
    noLoop();
    return;
  }
  background(color(4,251,255));

  for (var i = 0; i < numCols; i++){
    for(var j = 0; j < numRows; j++){
      grid[i][j].show(color(4,251,255));
    }
  }
  for(var i = 0; i < closedSet.length; i++){
    closedSet[i].show(color(4,4,255));
  }
  for(var i = 0; i < openSet.length; i++){
    openSet[i].show(color(255,5,255));
  }

  if (!noSolution){
      // Add all the previous Places to the final path list
      path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      }

  }
  drawPath(path);
}
function removeFromArray(arr, elt){
  for(var i = arr.length - 1; i >= 0; i--){
    if (arr[i] == elt){
      arr.splice(i, 1);
    }
  }
}
function heuristic(a, b){
  var distance = dist(a.i, a.j, b.i, b.j);
  return distance;
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