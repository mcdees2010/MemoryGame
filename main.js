console.log("linked!");
/*
 * CONSTANTS
 */

const gameArea = document.querySelector("#game");
const cards = document.querySelectorAll('.card');
const btn = document.getElementById("start-game");
const suits = ["c", "d", "h", "s"];
const numbers = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const deck = [];

suits.forEach(function(suit){
    numbers.forEach(function(number){
        deck.push(suit + number);
    })
}) 

shuffleCards();
const memoryCards = deck.slice(0,12);


/*
 * EVENT HANDLERS
 */

 gameArea.addEventListener("click", toggleCard);

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


function shuffleCards() {
    for (let i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        var temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }
}

function toggleCard(evt) {
    let id = parseInt(evt.target.id.split("-")[1]);    
    evt.target.classList.remove('back');
    evt.target.classList.add(memoryCards[id]);
};

// var second = 0;
// var timer = document.querySelector(".timer");
// var interval;
    
// function startTimer(){
//     interval = setInterval(function(){
//         timer.innerHTML = +second+ "secs";
//         if(second == 60){
//             second--;
//         }
//     },1000);
// }


