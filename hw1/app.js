let cards = document.querySelectorAll(".memory-card");
let timeText = document.querySelector(".timer h1");
let button = document.querySelectorAll(".timer button")[0];
let pause = document.querySelectorAll(".timer button")[1];
let hasFliped = false;
let firstCard, secondCard;
let lockBoard = false; // for avoiding clicking when one set is not finished or clicing in pause
let matchCount = 0;
for (let i = 0; i < cards.length; i++) {
	let card = cards[i];
	card.addEventListener("click", flipcard);
}

button.addEventListener('click', timerStart);
pause.addEventListener('click', timeStop);

function flipcard(e) {
	if (lockBoard) {
		return;
	}
	if (this == firstCard) {
		return;
	}
	this.classList.toggle("flip");
	if (!hasFliped) {
		//first flip
		firstCard = this;
		hasFliped = true;
	} else {
		//second flp
		secondCard = this;
		hasFliped = false;
		checkMatch();
	}
}
function checkMatch() {
	firstCard.dataset.picture == secondCard.dataset.picture
		? disableCard()
		: flipBackCard();
		
}

function disableCard() {
	firstCard.removeEventListener("click", flipcard);
	secondCard.removeEventListener("click", flipcard);
	matchCount++;
}

function flipBackCard() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		lockBoard = false;
	}, 2000);
	
}

// timer
function timerStart(e){
    timeText.innerText++;
	if (matchCount == 8) {
		clearTimeout(timer);
		alert(`Congradulation \n
		you use ${timeText.innerText} second`)
		return;
	}   
   	timer = setTimeout("timerStart()", 1000);
}

function timeStop()
{
	clearTimeout(timer);
	lockBoard = true;
}

