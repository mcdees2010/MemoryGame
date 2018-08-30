/*
 * CACHED DOM ELEMENTS
 */

const gameArea = document.querySelector("#game");
const cards = document.querySelectorAll('.card');
const btn = document.getElementById("start-game");


/*
 * GAME STATE
 */

const suits = ["c", "d", "h", "s"];
const numbers = ["J", "Q", "K", "A"];
let matches = [];
let currentPair = [];
let intervalId, memoryCards, deck;


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
    setMessage("Game Over! Try again.");
    resetGame();
}

function checkMatch() {
    if (currentPair.length < 2) return;
    let card1 = currentPair[0].classList[1];
    let card2 = currentPair[1].classList[1];
    if (card1 === card2) {
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