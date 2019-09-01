class Place {
    constructor(i, j) {
      this.i = i,
        this.j = j;
      this.fScore = 0;
      this.gScore = 0;
      this.hScore = 0;
      this.neighbors = [];
      this.previous = undefined;
      this.wall = false;
  
      if (random(1) < 0.5){
        this.wall = true;
      }
  
      this.show = (col) => {
        fill(col);
  
        if (this.wall){
          fill(0);
        }
  
        noStroke();
        
        if (this.wall){
          ellipse(this.i * w + w/2, this.j * h + h/2, w/2, h/2);
        }
        else{
          rect(this.i * w + w/2, this.j*h + h/2, w, h);
        }
      };
      this.addNeighbors = (grid) => {
        var i = this.i;
        var j = this.j;
  
        if (i < numCols - 1){
          this.neighbors.push(grid[i+1][j]);
        }
        if (i > 0){
          this.neighbors.push(grid[i-1][j]);
        }
        if (j < numRows - 1){
          this.neighbors.push(grid[i][j+1]);
        }
        if (j > 0){
          this.neighbors.push(grid[i][j-1]);
        }
        if (i > 0 && j > 0){
          this.neighbors.push(grid[i-1][j-1]);
        }
        if (i < numCols-1 && j > 0){
          this.neighbors.push(grid[i+1][j-1]);
        }   
        if (i > 0 && j < numRows - 1){
          this.neighbors.push(grid[i-1][j+1]);
        } 
        if (i < numCols-1 && j < numRows-1){
          this.neighbors.push(grid[i+1][j+1]);
        }         
      }
    }
  }