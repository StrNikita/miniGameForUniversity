/*jshint esversion: 6 */
const table = document.getElementById('table');
const move = document.getElementById('move');
const widthNext = document.getElementById('width-next');
const heightNext = document.getElementById('height-next');
const alert = document.getElementById('alert');

const widthTable = 9;
const heightTable = 9;

const numberCellsToWin = widthTable * heightTable;

let numberMarkedCells = 0;
let numberMarkedCellsPLayer1 = 0;
let numberMarkedCellsPLayer2 = 0;
let width = 0;
let height = 0;
let step = 0;
let player = 2;



function createTable() {
	let tableArray = [];

	table.style.width = widthTable * 34 + 'px';

	for (let i = 0; i < widthTable; i++) {
		tableArray[i] = [];
	}


	for (let i = 0; i < widthTable; i++){
		for (let j = 0; j < heightTable; j++){
			tableArray[i][j] = document.createElement('div');
			tableArray[i][j].className = `cell ${i}${j}`;
			table.append(tableArray[i][j]);
		}
	}
}

createTable();

const cell = document.querySelectorAll('.cell');
let tableArray = [];

for (let i = 0; i < widthTable; i++) {
	tableArray[i] = [];
}

let count = 0;
for (let i = 0; i < widthTable; i++){
	for (let j = 0; j < heightTable; j++){
		tableArray[i][j] = cell[count];
		count++;
	}
}


function changeInfo() {
	if (player === 1) {
		player++;
	} else {
		player--;
	}
	move.innerHTML = 'Next player: Player ' + player;
	width = Math.floor(Math.random() * 3) + 1 ;
	height = Math.floor(Math.random() * 3) + 1;
	widthNext.innerHTML = 'Next width: ' + width;
	heightNext.innerHTML = 'Next height: ' + height;
	let isCheckPossibilityToPut;
}

changeInfo();


function put(index) {
	let position = Number(index);
	let positionX =  position%10;
	let positionY = Math.floor(position/10);

	let isValidationTrue = validation(positionX,positionY);
	let isCheckPossibility = checkPossibility(positionX,positionY);
	if (isValidationTrue && isCheckPossibility){
		if (player === 1) {
			for (let i = positionY; i < positionY + height; i++) {
				for (let j = positionX; j < positionX + width; j++) {
					tableArray[i][j].style.background = 'green';
					tableArray[i][j].innerHTML = 'O';
				}
			}
			numberMarkedCells += height*width;
			numberMarkedCellsPLayer1 += height*width;
		} else if (player === 2) {
			for (let i = positionY; i > positionY - height; i--) {
				for (let j = positionX; j > positionX - width; j--) {
					tableArray[i][j].style.background = 'red';
					tableArray[i][j].innerHTML = 'X';
				}
			}
			numberMarkedCells += height*width;
			numberMarkedCellsPLayer2 += height*width;
		}
		if (numberCellsToWin === numberMarkedCells) {
			if (numberMarkedCellsPLayer1 > numberMarkedCellsPLayer2) {
				showAlert('Game over! Player 1 win!');
			} else {
				showAlert('Game over! Player 2 win!');
			}
		}
		changeInfo();
		step++;
	}
}


function validation(x,y) {

	// first steps validation

	if (step === 0) {
		if (player === 1 && x !== 0 || y!== 0) {
			showAlert('First step must be at the top left angle');
			return false;
		} else {
			return true;
		}
	}
	else if (step === 1) {
		if (player === 2 && x !== widthTable-1 || y !== heightTable-1) {
			showAlert('First step must be at the bottom right angle');
			return false;
		} else {
			return true;
		}
	} 


	// other steps validation

	if (step > 0 && player === 1) {
		if (x === 0 && tableArray[y-1][x].style.background === 'green') {
			return true;
		}
		else if (y === 0 &&  tableArray[y][x-1].style.background === 'green') {
			return true;
		}
		else if (tableArray[y-1][x].style.background === 'green' || tableArray[y][x-1].style.background === 'green') {
			return true;
		} else {
			showAlert('Need to put closely with the green cell');
			return false;
		}
	}
	else if (step > 1 && player === 2) {
		if (x === widthTable-1 && tableArray[y+1][x].style.background === 'red') {
			return true;
		}
		else if (y === heightTable-1 &&  tableArray[y][x+1].style.background === 'red') {
			return true;
		}
		else if (tableArray[y+1][x].style.background === 'red' || tableArray[y][x+1].style.background === 'red') {
			return true;
		} else {
			showAlert('Need to put closely with the red cell');
			return false;
		}
	}
}


function checkPossibility(x,y) {
	if (player === 1) {
		// check limits
		if (x + width > widthTable || y + height > heightTable) {
			showAlert('Out of table');
			return false;
		}
		// check alredy employed cells
		else {
			for (let i = y; i < y + height; i++) {
				for (let j = x; j < x + width; j++) {
					if (tableArray[i][j].style.background === 'green' || tableArray[i][j].style.background === 'red') {
						showAlert('One of the cells is already employed'); 
						return false;
					}
				}
			}
		}
	} else if (player === 2) {
		// check limits
		if (x+1 - width < 0 || y+1 - height < 0) {
			showAlert('Out of table'); 
			return false;
		}
		// check alredy employed cells
		else {
			for (let i = y; i > y - height; i--) {
				for (let j = x; j > x - width; j--) {
					if (tableArray[i][j].style.background === 'green' || tableArray[i][j].style.background === 'red') {
						showAlert('One of the cells is already employed'); 
						return false;
					}
				}
			}
		}
	}

	return true;
}


function showAlert(text) {
	alert.innerHTML = text;
	alert.style.opacity = 1;
	setTimeout(() => {
		alert.style.opacity = 0;
	}, 2500);
}

table.addEventListener('mouseover', (e) => {
	target = e.target;

	if (target.className !== '') {
		if (player === 1) {
			target.style.borderColor = 'green';	
		} else {
			target.style.borderColor = 'red';
		}
	}
});
table.addEventListener('mouseout', (e) => {
	target = e.target;

	if (target.className !== '') {
		target.style.borderColor = 'black';		
	}
});


table.addEventListener('click', (e) => {
	target = e.target;

	let index = target.classList.value;
	index = index.split(' ');

	if (target.className !== '' && target.style.background === '') {
		put(index[1]);
	}
});

document.getElementById('skipMove').addEventListener('click',() => {
	changeInfo();
});









