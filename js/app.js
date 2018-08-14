//Declaring variables

let deck = document.querySelector('ul.deck');
let cards = document.getElementsByClassName('card');
let openCards = [];
let movesCount = 0;
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
let matchedCards = 0;
let modal = document.getElementById("congratsModal")
let closeicon = document.querySelector(".close");
let timerIsRunning = false;


// Starting the game

document.body.onload = startGame();

function startGame(){
    shuffle(d eck);
    clearInterval(interval);
}

//Shuffle cards, function from: https://jsfiddle.net/qEM8B/

function shuffle(){
    for (let i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
    }
}

// Showing cards on click, cheking if it's a match, counting moves, updating star rating

deck.addEventListener('click', event => {
    const clickedCard = event.target;
    checkScore();
    clock();
    if (clickedCard.classList.contains('card') && openCards.length < 2) {
        showCard(clickedCard);
        openSet(clickedCard);
        if (openCards.length === 2) {
            isItaMatch();
        }
}
});

function showCard(clickedCard){
    clickedCard.classList.add('open', 'show');
    clickedCard.style.pointerEvents = "none";
}

function openSet(clickedCard) {
    openCards.push(clickedCard);
}


// Checking if open cards match function

function isItaMatch() {
    moveCounting();
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchedCards++;
        matchedCards++;
        congratulations(matchedCards);
        openCards = [];
    } else {
        setTimeout(() => {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards[0].style.pointerEvents = "auto";
        openCards[1].style.pointerEvents = "auto";
        openCards = [];
        }, 1200);
    }
}

// Move counter function

function moveCounting() {
    if (openCards.length === 2) {
        movesCount++;
        const movesCountText = document.querySelector('.moves');
        movesCountText.innerHTML = movesCount;
    }
}


// Timer function

function clock(){
    if (!timerIsRunning){
            timerIsRunning = true;
            interval = setInterval(function(){
            timer.innerHTML = minute+" mins "+second+" secs";
            second++;
            if(second == 60){
                minute++;
                second = 0;
            }
            if(minute == 60){
                hour++;
                minute = 0;
            }
        },1000);
    }
}

// Star rating function

function checkScore() {
    const stars = document.querySelectorAll('.stars li');
    if (movesCount === 10) {
        for (star of stars) {
                stars[0].innerHTML = '<i class="far fa-star"></i>';
        }} else if (movesCount === 16) {
            for (star of stars) {
               stars[1].innerHTML = '<i class="far fa-star"></i>'; 
            }
        }
    }

// Congratulations modal

function congratulations(){
    console.log(matchedCards);
    if (matchedCards === 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // Display congratulations overlay
        modal.style.display="block";

        // Display moves, star rating and time
        let starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = movesCount;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // Closing the modal
        closeicon.addEventListener("click", function(e){
            modal.style.display="none";
        });
    };
}