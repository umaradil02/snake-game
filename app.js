// variable
let inputdirr = {x:0, y:0};
const MoveSound = new Audio("/music/move.mp3");
const foodsound = new Audio("/music/food.mp3");
const gameover = new Audio("/music/gameover.mp3");
const music = new Audio("/music/music.mp3");
console.log(MoveSound)
let popup = document.getElementById("popup");
let popupText = document.getElementById("text");
let yourscore = document.getElementById("score");
let speed = 2;
let lastPTime = 0;
let score = 0;
let snakeArr = [
    {x:12, y:16}
];
food = {x:5, y:7};


// function

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPTime) / 1000 < 1/speed) {
        return;
    }
    lastPTime = ctime;
    gameRun();
}
function iscollapse(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true;
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameRun(){
    // update snake
if(iscollapse(snakeArr)){
    inputdirr = {x:0, y:0}
    music.pause();
    gameover.play();
    yourscore.innerHTML = `your:score ${score}`;
    openpopup("press any key for start!");
    snakeArr = [{x:12, y:16}];
    score = 0;
    speed = 2;
    updatescore();
}

if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    speed++;
    score++;
    foodsound.play();
    updatescore(); 
    snakeArr.unshift({x: snakeArr[0].x + inputdirr.x, y: snakeArr[0].y + inputdirr.y})
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b -a)* Math.random()), y: Math.round(a + (b -a)* Math.random())}
}
function updatescore(){
    point.innerHTML = ` score: ${score}`;

}
for (let i = snakeArr.length - 2; i >=0; i--) {
    snakeArr[i+1] = {...snakeArr[i]}  
}
snakeArr[0].x += inputdirr.x;
snakeArr[0].y += inputdirr.y;
// display snake
board.innerHTML = "";
snakeArr.forEach(function(e,index){
snakeElement = document.createElement("div");
snakeElement.style.gridRowStart = e.y;
snakeElement.style.gridColumnStart = e.x;
if(index === 0){
    snakeElement.classList.add("head");
}
else{
    snakeElement.classList.add("snake")
}
board.appendChild(snakeElement);
});
// display food
foodElement = document.createElement("img");
foodElement.src = "apple.svg"
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
// foodElement.classList.add("food")
board.appendChild(foodElement);

}



// main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown",function(e){
    inputdirr = {x:0, y:1};     // start game 
    music.play();
    MoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputdirr.x = 0;
            inputdirr.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputdirr.x = 0;
            inputdirr.y = 1;
            
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputdirr.x = -1;
            inputdirr.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputdirr.x = 1;
            inputdirr.y = 0;
            break;
    
        default:
            break;
    }
})
function openpopup(message){
    popupText.textContent = message;
    popup.classList.add("popup_show");
      setTimeout(() => {
    popup.classList.remove("popup_show");
                
            }, 5000);
  }
  function closepopup(){
    popup.classList.remove("popup_show");
  }