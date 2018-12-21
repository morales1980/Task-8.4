'use strict'

var playerScore = 0;
var compScore = 0;
var score = [];
var output = document.querySelector('#output p');

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
	// roundScore[0] = drawFlag t/f
	// roundScore[1] = playerWinFlag t/f

	var roundScore = new Array(2);

	if(x === 'rock') {
		switch (y) {
			case 'rock': roundScore[0] = true;
			console.log('kamien = kamien = remis');
			break;
			case 'paper': roundScore[1] = false;
			compScore += 1;
			console.log('kamien < papier = przegrana gracza');
			break;
			default: roundScore[1] = true;
			playerScore += 1;
			console.log('kamien > nozyce = wygrana gracza');
		}
	} else if (x === 'paper') {
		switch (y) {
			case 'rock': roundScore[1] = true;
			playerScore += 1;
			console.log('papier > kamien = wygrana gracza');
			break;
			case 'paper': roundScore[0] = true;
			console.log('papier = papier = remis');
			break;
			default: roundScore[1] = false;
			compScore += 1;
			console.log('papier < nozyce = przegrana gracza');
		}
	} else if (x === 'scissors') {
		switch (y) {
			case 'rock': roundScore[1] = false;
			compScore += 1;
			console.log('nozyce < kamien = przegrana gracza');
			break;
			case 'paper': roundScore[1] = true;
			playerScore += 1;
			console.log('nozyce > papier = wygrana gracza');
			break;
			default: roundScore[0] = true;
			console.log('nozyce = nozyce = remis');
		}
	}

	return roundScore;
}

function printRoundScore(x, y) {
	if(score[0]) {
		output.innerHTML = ('DRAW ' + 'you played ' + x + ', computer played ' + y);
	} else {
		output.innerHTML = ('YOU ' + (score[1] ? 'WON ' : 'LOST ') + 'you played ' + x + ', computer played ' + y);
	}
}

function playerMove(event) {
	var move = event.target.name;
	var compMove = drawing();
	score = checkRoundScore(move, compMove);
	printRoundScore(move, compMove);
}

var buttons = document.querySelectorAll('button');
buttons.forEach(function(button) {
	button.addEventListener('click', playerMove);
});
