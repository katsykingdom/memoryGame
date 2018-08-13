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


// Starting the game

document.body.onload = startGame();

function startGame(){
    // shuffle deck
    shuffle(deck);
    //reset timer
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


/*
 * Suffle cards
 */

//Shuffle function from: https://jsfiddle.net/qEM8B/

function shuffle(){
    for (var i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
    }
}


// Showing cards on clikc

deck.addEventListener('click', event => {
    const clickedCard = event.target;
    moveCounting();
    checkScore();
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
}

function openSet(clickedCard) {
    openCards.push(clickedCard);
}


// Checking if open cards match

function isItaMatch() {
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
        openCards = [];
        }, 1200);
    }
}

// disable matched cards


// Move counter

function moveCounting() {
    movesCount++;
    const movesCountText = document.querySelector('.moves');
    movesCountText.innerHTML = movesCount;
    
    if(movesCount == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        clock();
    }
}

//Timer 

function clock(){
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


function checkScore() {
    const stars = document.querySelectorAll('.stars li');
    if (movesCount === 24) {
        for (star of stars) {
            stars[0].innerHTML = '<i class="far fa-star"></i>';
        }} else if (movesCount === 32) {
            for (star of stars) {
               stars[1].innerHTML = '<i class="far fa-star"></i>'; 
            }
        }
    }


// Congratulations modal

// Congratulations modal
function congratulations(){
    console.log(matchedCards);
    if (matchedCards === 16){
        console.log(matchedCards);
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.style.display="block";

        // declare star rating variable
        let starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = movesCount;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// close congrats modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.style.display="none";
    });
}
