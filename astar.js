function astarSetup(grid, numCols, numRows){
    console.log('A*');
    openSet.push(start);
}
function performAstar(){
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
      //noLoop();
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
            if (dijkstra){
                neighbor.hScore = 0;
            }
            else{
                neighbor.hScore = heuristic(neighbor, end);
            }
          neighbor.fScore = neighbor.gScore + neighbor.hScore;
          neighbor.previous = current;
        }
      }
    }
  } else {
    // No solution
    console.log('no solution');
    //noLoop();
    return;
  }
  background(color(179,0,0));

  for (var i = 0; i < numCols; i++){
    for(var j = 0; j < numRows; j++){
        if (grid[i][j].isStartPlace || grid[i][j].isEndPlace){
            grid[i][j].show(color(0,255,0));
        }
        else{
            grid[i][j].show(color(0,0,0));
        }
    }
  }
  for(var i = 0; i < closedSet.length; i++){
    closedSet[i].show(color(4,4,255));
  }
  for(var i = 0; i < openSet.length; i++){
    openSet[i].show(color(204, 253, 255));
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
function heuristic(a, b){
    var distance = dist(a.i, a.j, b.i, b.j);
    return distance;
}