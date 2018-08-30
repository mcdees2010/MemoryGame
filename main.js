/*
 * CACHED DOM ELEMENTS
 */

const gameArea = document.querySelector("#game");
const cards = document.querySelectorAll('.card');
const btn = document.getElementById("start-game");
const score = document.getElementById("score");

/*
 * GAME STATE
 */

const suits = ["c", "d", "h", "s"];
const numbers = ["J", "Q", "K", "A"];
const deck = [];
const setIntervalQueue = [];
const matches = [];
let lastCard; 
let thisCard = null;
let currentPair = [];
let points = 0;

suits.forEach(function(suit){
    numbers.forEach(function(number){
        deck.push(suit + number);
    })
})

const suffledDeck = shuffleCards(deck);
const state = [...suffledDeck.slice(0,3), ...suffledDeck.slice(0,3), ...suffledDeck.slice(3,9)].map(card => ({ clicked: false, value: card }) )
const memoryCards = shuffleCards(state);

/*
 * EVENT HANDLERS
 */

 gameArea.addEventListener("click", showCard, true);
 

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

function hideCard(card, className) {
    card.classList.remove(className);
    card.classList.add('back')
};

function showCard(evt) {

    if (currentPair.length > 1) return;

    let id = parseInt(evt.target.id.split("-")[1]); 
    
    console.log(id);
    console.log(matches);
    if (memoryCards[id].clicked || matches.includes(id)) return;

    // Mark the card as clicked
    memoryCards[id].clicked = true;

    let currentTimeout = window.setTimeout(checkMatch, 3000);
    
    // Pushing event into event queue
    currentPair.push(evt.target);
    setIntervalQueue.push(currentTimeout);
    
    // Show card
    evt.target.classList.remove('back');
    evt.target.classList.add(memoryCards[id].value);

    if (thisCard) {
        lastCard = thisCard;
    }
    thisCard = evt.target.classList[1];
};

function checkMatch() {

    let currentCard = currentPair.shift();
    let id = parseInt(currentCard.id.split("-")[1]);
    memoryCards[id].clicked = false;

    if (thisCard === lastCard) {
        matches.push(thisCard);
        return;
        console.log('Winner');
    }
    hideCard(currentCard, currentCard.classList[1]);
    if (matches.length >= 6){
        gameArea.removeEventListener("click", showCard, true);
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






// function endGame(){
//     if(currentPair === 3){
//        alert("You won the game!")
//     }else {
//        alert("Game Over!, try again.")
//        clearInterval();
// }
// } need to add it within the time limit of the countdown!
//   if timer = 0 && currentPair === 3

// function endGame(){
//     if there are 3 matches then game is over! 
// no more contiunuing to play
//   if(matches > 3){
//    endGame 
//    reset board with reset button
// alert/pop up that the game has been won

    // let lastElem = currentPair[currentPair.length-1];

    // if (currentCard === lastElem) {
    //     points++;
    // }
    // if (currentPair.length === 2) {
    //     let cardOnevalue = currentPair[0].classList[1]
    //     let cardTwovalue = currentPair[1].classList[1]
    //     if (cardOnevalue === cardTwovalue) {
    //         points++;
    //         currentPair = [];
    //         alert("you got a pair!");
    //     } else {
    //         hideCard(currentPair[0], cardOnevalue);
    //         hideCard(currentPair[1], cardTwovalue);
    //         currentPair = [];
    //     }
    // }
