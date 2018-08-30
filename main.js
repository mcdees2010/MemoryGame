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
let matches = [];
let currentPair = [];
let intervalId, memoryCards, deck;
let points = 0;


function createDeck() {
    suits.forEach(function(suit){
        numbers.forEach(function(number){
            deck.push(suit + number);
        })
    })
}

function createCards() {
    deck = [];
    createDeck()
    const suffledDeck = shuffleCards(deck);
    const state = [...suffledDeck.slice(0,3), ...suffledDeck.slice(0,3), ...suffledDeck.slice(3,9)].map(card => ({ clicked: false, value: card }) )
    memoryCards = shuffleCards(state);
    memoryCards.forEach(card => card.clicked = false);
}

createCards();

function setMessage(message) {
    document.getElementById("GameResult").innerHTML = message;
}

/*
 * EVENT HANDLERS
 */
 

 btn.addEventListener('click', function(){
    btn.disabled = true;
    gameArea.addEventListener("click", showCard);
    setMessage("Good Luck!");
     var i = 60;
     intervalId = setInterval(function(){
     var timer =  document.getElementById("timer").innerHTML = i + " " + "secs remaining";
        if (i === 0){
            clearInterval(intervalId);
            loseGame();
        }else {
            i--;
        }
    }, 1000);
 })

/*
 * RENDER
 */

function hideCards(cards) {
    setTimeout(function() {
        cards.forEach(function(card) {
            let className = card.classList[1];
            let id = parseInt(card.getAttribute('key'));
            memoryCards[id].clicked = false;
            card.classList.remove(className);
            card.classList.add('back')
        })
    }, 1000);
};

function showCard(evt) {

    if (currentPair.length > 1) return;
    let id = parseInt(evt.target.getAttribute('key'));    
    console.log(id);
    console.log(matches);
    if (memoryCards[id].clicked || matches.includes(id)) return;

    // Mark the card as clicked
    memoryCards[id].clicked = true;
    
    // Pushing event into event queue
    currentPair.push(evt.target);
    
    // Show card
    evt.target.classList.remove('back');

    // Match Card with Memory Card List.
    evt.target.classList.add(memoryCards[id].value);
    checkMatch();
    checkWin();
};

function checkWin(){
    if (matches.length === 6){
        setMessage("You won the game!")
        resetGame();
    }
}

function loseGame() {
    setMessage("LOSER! Try again!");
    resetGame();
}

function checkMatch() {
    // Check if current pair is greater than 2.
    if (currentPair.length < 2) return;
    
    let card1 = currentPair[0].classList[1];
    let card2 = currentPair[1].classList[1];
    if (card1 === card2) {
        points++;
        matches.push(currentPair[0]);
        matches.push(currentPair[1]);
    } else {
        hideCards(currentPair);
    }

    currentPair = [];
}

function resetGame(){
    btn.disabled = false;
    clearInterval(intervalId);
    gameArea.removeEventListener("click", showCard);
    hideCards(matches);
    matches = [];
    createCards();
    // setTimeout(function() {
    //     setMessage("Ready to Play!");
    // }, 3000);
    //reshuffle cards
    // reset the state
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




//reset game variables on win/lose

// function checkMatch() {
//     let currentCard = currentPair.shift();
//     let id = parseInt(currentCard.id.split("-")[1]);
//     memoryCards[id].clicked = false;
//     if (thisCard === lastCard) {
//         matches.push(thisCard);
//         return;
//         console.log('Winner');
//     }
//     hideCard(currentCard, currentCard.classList[1]);
//     if (matches.length === 6){
//         alert('WON GAME')

//     }
// }



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
