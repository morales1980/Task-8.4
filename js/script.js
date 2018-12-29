"use strict";

var roundScore = [],
playerWinCounter = 0,
computerWinCounter = 0,
rounds = 0,
output = document.querySelector('#output p'),
winInfoOutput = document.querySelector('#output p:nth-child(2)'),
winConditionInfo = document.querySelector('#result p:nth-child(2)'),
resultInfoOutput = document.querySelector('#result p:nth-child(1)'),
controlButtons = document.querySelectorAll('.game-button'),
newGameButton = document.querySelector('#new-game');

newGameButton.addEventListener('click', newGame);

function newGame() {
	reset();
	getRounds();
	printRounds(rounds);
	swapEvents(true);
}

function swapEvents(x) {
	if(x) {
		controlButtons.forEach(function(button) {
			button.removeEventListener('click', gameOver);
			button.addEventListener('click', playerMove);
		});
	} else {
		controlButtons.forEach(function(button) {
			button.removeEventListener('click', playerMove);
			button.addEventListener('click', gameOver);
		});
	}
}

// function swapEvents(x) {
// 	switch (x) {
// 		case true:	controlButtons.forEach(function(button) {
// 									button.removeEventListener('click', gameOver);
// 									button.addEventListener('click', playerMove);
// 								};
// 		break;
// 		default:		controlButtons.forEach(function(button) {
// 									button.removeEventListener('click', playerMove);
// 									button.addEventListener('click', gameOver);
// 								};
// 	}
// }


function reset() {
	playerWinCounter = 0;
	computerWinCounter = 0;
	rounds = 0;
	roundScore = [];
	output.innerHTML = '';
	winInfoOutput.innerHTML = '';
	resultInfoOutput.innerHTML = '';
}

function getRounds() {
	rounds = parseInt(window.prompt('Please enter number of rounds required to win game:'));

	while((isNaN(rounds)) || (rounds <= 0)) {
		rounds = parseInt(window.prompt('Only positive numbers accepted!'));
	}
}

function printRounds(x) {
	winConditionInfo.innerHTML = ('Win ' + x + (rounds > 1 ? ' rounds ' : ' round ') + 'to win entire game.');
}

function gameOver() {
	winInfoOutput.insertAdjacentHTML('beforeend', '<br><span>Game over, please press the new game button!</span>');
}

function playerMove(event) {
	var humanMove = event.target.name;
	var computerMove = drawing();
	roundScore = checkRoundScore(humanMove, computerMove);
	printRoundScore(humanMove, computerMove);
	countWinRounds(roundScore[1]);
	if((playerWinCounter === rounds) || (computerWinCounter === rounds)) {
		printWinInfo();
		swapEvents(false);
	}
}

function drawing() {
	var result;
	switch (Math.round((Math.random()*2)+1)) {
		case 1: result = 'rock';
		break;
		case 2: result = 'paper';
		break;
		default: result = 'scissors';
	}

	return result;
}

function checkRoundScore(x, y) {
	// x - playerMove
	// y - computerMove
	// oneRoundScore[0] = drawFlag t/f
	// oneRoundScore[1] = playerWinFlag t/f

	var oneRoundScore = new Array(2);

	if(x === 'rock') {
		switch (y) {
			case 'rock': oneRoundScore[0] = true;
			console.log('kamien = kamien = remis');
			break;
			case 'paper': oneRoundScore[1] = false;
			console.log('kamien < papier = przegrana gracza');
			break;
			default: oneRoundScore[1] = true;
			console.log('kamien > nozyce = wygrana gracza');
		}
	} else if (x === 'paper') {
		switch (y) {
			case 'rock': oneRoundScore[1] = true;
			console.log('papier > kamien = wygrana gracza');
			break;
			case 'paper': oneRoundScore[0] = true;
			console.log('papier = papier = remis');
			break;
			default: oneRoundScore[1] = false;
			console.log('papier < nozyce = przegrana gracza');
		}
	} else if (x === 'scissors') {
		switch (y) {
			case 'rock': oneRoundScore[1] = false;
			console.log('nozyce < kamien = przegrana gracza');
			break;
			case 'paper': oneRoundScore[1] = true;
			console.log('nozyce > papier = wygrana gracza');
			break;
			default: oneRoundScore[0] = true;
			console.log('nozyce = nozyce = remis');
		}
	}

	return oneRoundScore;
}

function printRoundScore(x, y) {
	if(roundScore[0]) {
		output.innerHTML = ('DRAW ' + 'you played ' + x + ', computer played ' + y + ' too.');
	} else {
		output.innerHTML = ('YOU ' + (roundScore[1] ? 'WON ' : 'LOST ') + 'you played ' + x + ', computer played ' + y + '.');
	}
}

function countWinRounds(x) {
	if(x) {
		playerWinCounter += 1;
	} else if(x === false) {
		computerWinCounter += 1;
	}
	printRoundResult();
}

function printRoundResult() {
	resultInfoOutput.innerHTML = ('<h2>Player ' + playerWinCounter + ' vs ' + computerWinCounter + ' Computer</h2>' );
}

function printWinInfo() {
	winInfoOutput.innerHTML = ('YOU ' + (roundScore[1] ? 'WON ' : 'LOST ') + 'THE ENTIRE GAME!!!');
}
