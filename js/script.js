"use strict";

(function(){

	var roundScore = [],		//tablica przyjmujaca wartosci boolean z flagami t/f: roundScore[0] oznacza draw (t/f); roundScore[1] oznacza wygraną gracza (true) lub komputera (false)
	playerWinCounter = 0,		// licznik zwyciestw gracza
	computerWinCounter = 0,	//licznik zwyciest komputera
	rounds = 0,							//liczba rund podana przez gracza po wcisnieciu buttona new game
	output = document.querySelector('#output p'),
	winInfoOutput = document.querySelector('#output p:nth-child(2)'),
	winConditionInfo = document.querySelector('#result p:nth-child(2)'),
	resultInfoOutput = document.querySelector('#result p:nth-child(1)'),
	controlButtons = document.querySelectorAll('.game-button'),
	newGameButton = document.querySelector('#new-game');

	newGameButton.addEventListener('click', newGame);

	function newGame() {
		reset();							//resetuje zawartosc zmiennych uzywanych przez logike gry
		getRounds();					//pobiera liczbe rund
		printRounds(rounds);	//wyswietla podaną przez gracza liczbe rund na ekranie
		swapEvents(true);			//w zaleznosci od flagi (t/f) zmienia event podpiety pod buttony "kamien", "papier", "nozyce" pomiedzy playerMove() i gameOver()
	}

	function swapEvents(flag) {
		if(flag) {
			controlButtons.forEach(function(button) {
				button.removeEventListener('click', gameOver);
				button.addEventListener('click', playerMove);
				debugger;
			});
		} else {
			controlButtons.forEach(function(button) {
				button.removeEventListener('click', playerMove);
				button.addEventListener('click', gameOver);
			});
		}
	}

	function reset() { //resetuje zawartosc zmiennych uzywanych przez logike gry
		playerWinCounter = 0;
		computerWinCounter = 0;
		rounds = 0;
		roundScore = [];
		output.innerHTML = '';
		winInfoOutput.innerHTML = '';
		resultInfoOutput.innerHTML = '';
	}

	function getRounds() { //pobiera liczbe rund
		rounds = parseInt(window.prompt('Please enter number of rounds required to win game:'));

		while((isNaN(rounds)) || (rounds <= 0)) { // i weryfikuje czy input spelnia warunki
			rounds = parseInt(window.prompt('Only positive numbers accepted!'));
		}
	}

	function printRounds(roundsNumber) { //wyswietla podaną przez gracza liczbe rund na ekranie
		winConditionInfo.innerHTML = ('Win ' + roundsNumber + (rounds > 1 ? ' rounds ' : ' round ') + 'to win entire game.');
	}

	function gameOver() {  //wyswietla komunikat o zakonczeniu gry
		winInfoOutput.insertAdjacentHTML('beforeend', '<br><span>Game over, please press the new game button!</span>');
	}

	function playerMove(event) {  //funkcja odpowiadajaca za rozgrywke
		var humanMove = event.target.name;	//pobiera informace o ruchu gracza
		var computerMove = compMove();				//"losuje" ruch kopmutera
		roundScore = checkRoundScore(humanMove, computerMove); //ustala wynik rundy i zapisuje go do tablicy w formacie boolean z flagami t/f: roundScore[0] oznacza draw (t/f); roundScore[1] oznacza wygraną gracza (true) lub komputera (false)
		printRoundScore(humanMove, computerMove);	//wyswietla komunikat kto wygral/remis i wyswietla kto zrobil jaki ruch w danej rundzie
		countWinRounds(roundScore[1]); //zlicza wygrane i odpowiada za wyswietlenie ich na ekranie
		if((playerWinCounter === rounds) || (computerWinCounter === rounds)) { //sprawdza czy spelniony jest win condition
			printWinInfo(); //jesli tak to wyswietla odpowiedni komunikat na ekranie
			swapEvents(false); // odpina od buttonow "kamien", "papier", "nozyce" event umowliwiajacy granie a w zamian przypina event wyswietlajacy komuniakt game over
		}
	}

	function compMove() { //"losuje" ruch komputera
		var result;
		switch (Math.round((Math.random()*2)+1)) { //konwertuje wylosowana liczbe do odpowiedniego stringa
			case 1: result = 'rock';
			break;
			case 2: result = 'paper';
			break;
			default: result = 'scissors';
		}

		return result;
	}

	function checkRoundScore(playerMove, computerMove) { //porownuje ruch gracza i komputera i ustala wynik rundy
		// oneRoundScore[0] = drawFlag t/f
		// oneRoundScore[1] = playerWinFlag t/f

		var oneRoundScore = new Array(2);

		if(playerMove === 'rock') {
			switch (computerMove) {
				case 'rock': oneRoundScore[0] = true;
				break;
				case 'paper': oneRoundScore[1] = false;
				break;
				default: oneRoundScore[1] = true;
			}
		} else if (playerMove === 'paper') {
			switch (computerMove) {
				case 'rock': oneRoundScore[1] = true;
				break;
				case 'paper': oneRoundScore[0] = true;
				break;
				default: oneRoundScore[1] = false;
			}
		} else if (playerMove === 'scissors') {
			switch (computerMove) {
				case 'rock': oneRoundScore[1] = false;
				break;
				case 'paper': oneRoundScore[1] = true;
				break;
				default: oneRoundScore[0] = true;
			}
		}

		return oneRoundScore;
	}

	function printRoundScore(playerMove, computerMove) { //wyswietla komunikat kto wygral/remis i wyswietla kto zrobil jaki ruch w danej rundzie
		// roundScore[0] = drawFlag t/f
		// roundScore[1] = playerWinFlag t/f
		if(roundScore[0]) {
			output.innerHTML = ('DRAW ' + 'you played ' + playerMove + ', computer played ' + computerMove + ' too.');
		} else {
			output.innerHTML = ('YOU ' + (roundScore[1] ? 'WON ' : 'LOST ') + 'you played ' + playerMove + ', computer played ' + computerMove + '.');
		}
	}

	function countWinRounds(flag) { //zlicza wygrane rundy
		if(flag) {
			playerWinCounter += 1;
		} else if(flag === false) {
			computerWinCounter += 1;
		}
		printRoundResult();	//i wyswietla biezacy wynik rozgrywki
	}

	function printRoundResult() {
		resultInfoOutput.innerHTML = ('Player ' + playerWinCounter + ' vs ' + computerWinCounter + ' Computer' );
	}

	function printWinInfo() { // wyswietla komunikat o zwyciestwie
		winInfoOutput.innerHTML = ('YOU ' + (roundScore[1] ? 'WON ' : 'LOST ') + 'THE ENTIRE GAME!!!');
	}
})();
