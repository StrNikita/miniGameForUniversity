/*jshint esversion: 6 */
const table = document.getElementById('table');
const move = document.getElementById('move');
const widthNext = document.getElementById('width-next');
const heightNext = document.getElementById('height-next');


const widthTable = 9;
const heightTable = 9;

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

console.log(tableArray);

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
}

changeInfo();


function put(index) {
	let position = Number(index);
	let positionX =  position%10;
	let positionY = Math.floor(position/10);

	if (player === 1) {
		for (let i = positionY; i < positionY + height; i++) {
			for (let j = positionX; j < positionX + width; j++) {
				tableArray[i][j].style.background = 'green';
				tableArray[i][j].innerHTML = 'O';
			}
		}
	} else if (player === 2) {
		for (let i = positionY; i > positionY - height; i--) {
			for (let j = positionX; j > positionX - width; j--) {
				tableArray[i][j].style.background = 'red';
				tableArray[i][j].innerHTML = 'X';
			}
		}
	}
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
		if (player === 1) {
			target.style.background = 'green';
			target.innerHTML = 'O';
		} else {
			target.style.background = 'red';
			target.innerHTML = 'X';
		}
		put(index[1]);
		changeInfo();
	}
});









