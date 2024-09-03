// counts the number of alive neighboring cells
// to determine if cell lives or is dead

function countLiveNeighbors(board, row, col) {
	let numRows = board.length;
  	if (numRows > 0) {
		numCols = board[0].length;
	} else {
		numCols = 0;
	}
 	let count = 0;
	
	/* For every iteration, the current cell will be checked
	   of any living cells around them.
	   -1 is set so that it starts at the top-left cell, and progresses 
	   for every cell.
	*/
 	for (let i = -1; i <= 1; i++) {
    		for (let j = -1; j <= 1; j++) {
      			let neighborRow = row + i;
      			let neighborCol = col + j;

      		if (
        		i === 0 && j === 0 || 
        		neighborRow < 0 || neighborRow >= numRows ||
        		neighborCol < 0 || neighborCol >= numCols) {
        			
				continue;
      		}

      		if (board[neighborRow][neighborCol]) {
        		
			count++;
      		}
    	}
  }

  return count;
}

// checks a cell's current state and change according to the 3 rules

function stepCell(board, row, col) {
	let numLiveNeighbors = countLiveNeighbors(board, row, col);
	let isCellAlive = board[row][col];

	// Cell stays alive if 2 or 3 neighboring cells is alive
	if (isCellAlive && (numLiveNeighbors === 2 || numLiveNeighbors === 3)) {
    		return true; 
  	}

	// Cell turns alive if 3 of it's neighbors is alive
  	if (!isCellAlive && numLiveNeighbors === 3) {
    		return true; 
  	}

	// Cell dies or remains dead if none apply
  	return false; 
}

function stepBoard(board) {
	let numRows = board.length;
  	if (numRows === 0) { // Return the board if there are no rows
    		return board;
  	}

  	let numCols = board[0].length;
  	let newBoard = [];

  	for (let row = 0; row < numRows; row++) {
    		let newRow = [];
    		for (let col = 0; col < numCols; col++) {
      			newRow.push(stepCell(board, row, col));
    		}
    		newBoard.push(newRow);
  	}
  	return newBoard;
}

