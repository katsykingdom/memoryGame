/*
 * Suffle cards
 */

//Shuffle function from: https://jsfiddle.net/qEM8B/

var deck = document.querySelector('ul.deck');
for (var i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
}

console.log(deck);


const cards = document.getElementsByClassName("card");
const openCards = document.getElementsByClassName("show");

console.log(cards);
console.log(openCards);

// Flip cards on click

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function(event){
    this.classList.add("open", "show");
    console.log("A card was opened!");
})};



if (openCards.length === 2) {
    console.log("2 cards opened!");
};