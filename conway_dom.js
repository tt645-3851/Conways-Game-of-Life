let boardContainer = document.getElementById('board-container');

// Create the initial board
let boardSize = 25;
let board = createBoard(boardSize);
let intervalId;
let checkSimulation = false;

// Render the initial board
renderBoard();

let stepButton = document.getElementById('step-button');
let resetButton = document.getElementById('reset-button');
let goButton = document.getElementById('go-button');
let pauseButton = document.getElementById('pause-button');
let randomButton = document.getElementById('rand-button');

// Function to create the initial board
function createBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push((i + j) % 2 === 0); // Initialize the checkerboard pattern
    }
    board.push(row);
  }
  return board;
}

// Function to render the board
function renderBoard() {
  	// Clear the board container
  	while (boardContainer.firstChild) {
    	boardContainer.firstChild.remove();
  	}
  	let table = document.createElement('table');

  	// Iterate through the board and create table rows and cells
  	for (let i = 0; i < boardSize; i++) {
    	let row = document.createElement('tr');
    	for (let j = 0; j < boardSize; j++) {
      		let cell = document.createElement('td');
      		if (board[i][j]) {
      			cell.className = "alive";
      		} else {
      			cell.className = "dead";
      		}
      		cell.addEventListener('click', () => toggleCell(i, j)); // Add click event listener to toggle cell state
      		row.append(cell);
    	}
    	table.append(row);
  	}

	boardContainer.append(table);
}

// For the Step button
function stepNext() {
	board = stepBoard(board);
	renderBoard();
}

// For the Reset button
function resetBoard(board) {
	setCheckerboardPattern();
	renderBoard();
}

// For the Go button
function runConway() {
	if (!checkSimulation) {
		checkSimulation = true;
		intervalId = setInterval(stepNext, 100);
	}
}

// For the Pause button
function pauseConway() {
	clearInterval(intervalId);
	checkSimulation = false;
}

// For the Random button
function randomConway() {
	pauseConway();
	board = generateRandomBoard();
	renderBoard();
}

// Function to toggle the state of a cell
function toggleCell(row, col) {
  	board[row][col] = !board[row][col]; // Changes the cell state
  	renderBoard();
}

// Function to set the checkerboard pattern
function setCheckerboardPattern() {
	for (let i = 0; i < boardSize; i++) {
    	for (let j = 0; j < boardSize; j++) {
      		board[i][j] = (i + j) % 2 === 0;
    	}
  	}
}

// Function to generate a random board
function generateRandomBoard() {
 	let randomBoard = [];
	for (let i = 0; i < boardSize; i++) {
		let row = [];
    	for (let j = 0; j < boardSize; j++) {
      		row.push(Math.random() < 0.5); // Set random cell state
    	}
    	randomBoard.push(row);
  	}
  return randomBoard;
}

stepButton.addEventListener("click", stepNext);
goButton.addEventListener("click", runConway);
pauseButton.addEventListener("click", pauseConway);
resetButton.addEventListener("click", resetBoard);
randomButton.addEventListener("click", randomConway);
