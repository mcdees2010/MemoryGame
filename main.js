console.log("linked!");
/*
 * CONSTANTS
 */

const gameArea = document.querySelector("#game");
const cards = document.querySelectorAll('.card');
const btn = document.getElementById("start-game");
const score = document.getElementById("score");
const suits = ["c", "d", "h", "s"];
const numbers = ["J", "Q", "K", "A"];
const deck = [];
let currentPair = [];
let points = 0;

suits.forEach(function(suit){
    numbers.forEach(function(number){
        deck.push(suit + number);
    })
})

const suffledDeck = shuffleCards(deck);
const memoryCards = shuffleCards([...suffledDeck.slice(0,3), ...suffledDeck.slice(0,3), ...suffledDeck.slice(3,9)]);



/*
 * EVENT HANDLERS
 */

 let lastClick;
 let currentClick;

 gameArea.addEventListener("click", showCard);

 btn.addEventListener('click', function(){
     var i = 60;
     var intervalId = setInterval(function(){
     var timer =  document.getElementById("timer").innerHTML = i + " " + "secs remaining";
        if (i === 0){
            clearInterval(intervalId);
        }else {
            i--;
        }
        btn.disabled = true;
    }, 1000);
 })

/*
 * RENDER
 */

console.log(deck);

function hideCard(card, className) {
    card.classList.remove(className);
    card.classList.add('back')
};

function checkMatch() {
    let cardOnevalue = currentPair[0].classList[1]
    let cardTwovalue = currentPair[1].classList[1]
    if (cardOnevalue === cardTwovalue) {
        points++;
        currentPair = [];
    } else {
        hideCard(currentPair[0], cardOnevalue);
        hideCard(currentPair[1], cardTwovalue);
        currentPair = [];
    }
}

function shuffleCards(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        var temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }
    return deck;
}

function showCard(evt) {
    let id = parseInt(evt.target.id.split("-")[1]);    
    evt.target.classList.remove('back');
    evt.target.classList.add(memoryCards[id]);
    currentPair.push(evt.target);
    setTimeout(checkMatch, 2000)
};

// var checkMatches = function (){
//     if(deck[0] === deck[1]){
//     alert("You found a match!");
// 	} else {
// 	alert("Sorry, try again.");
// 	}