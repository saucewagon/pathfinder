function astarSetup(grid, numCols, numRows){
    console.log('A*');

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
    openSet.push(start);
}