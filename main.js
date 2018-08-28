console.log("linked!");
/*
 * CONSTANTS
 */

const gameArea = document.querySelector("#game");
const cards = document.querySelectorAll('.card');
const btn = document.getElementById("start-game");
const suits = ["c", "d", "h", "s"];
const numbers = ["J", "Q", "K", "A"];
const deck = [];

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
};

function hideCard(evt) {
    let id = parseInt(evt.target.id.split("-")[1]);    
    evt.target.classList.remove(memoryCards[id]);
    evt.target.classList.add('back');
};
// var checkMatches = function (){
//     if(deck[0] === deck[1]){
//     alert("You found a match!");
// 	} else {
// 	alert("Sorry, try again.");
// 	}