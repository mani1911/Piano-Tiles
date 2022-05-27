const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')
const button = document.querySelector('button');
const score = document.querySelector('.score');


const tileArray = [];

var isGameOver = true;
var remainingTiles = [];
var tileMap = {};
var userInput = [];
var gameOver = false;

const resetGame = ()=>{
    for(let i=0;i<16;i++){
        remainingTiles.push(i);
    }
    tileMap = {};
    tileMap[0] = [];
    gameOver = false;
    updateScore(0);
};

const updateScore = (points)=>{
    score.innerHTML = `Score : ${points}`;
}

const renderClick = ()=>{
    tiles.forEach(tile=>{
        tile.addEventListener("click", ()=>{
            userInput.push(parseInt(tile.innerHTML));
        })
    })
}


const selectRandomTile = ()=>{
    let size = remainingTiles.length;
    if(size==0) return -1;
    let tilePosition = Math.floor(Math.random()*size);
    let tileNum = remainingTiles[tilePosition];
    remainingTiles = remainingTiles.filter(i => i!= tileNum)
    return tileNum;
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const displayTile = async (n)=>{
    tiles[n].classList.toggle('dummy');
    await timeout(500);
    tiles[n].classList.toggle('dummy');
}; 

const printOrder = async (tilesList)=>{
    for(let element of tilesList){
        await timeout(500);
        displayTile(element);
    };
}; 

const playQuestion = async (n)=>{
    let prevOrder = tileMap[n-1];
    let newTile = selectRandomTile();
    let currentOrder = prevOrder.slice();
    currentOrder.push(newTile);
    tileMap[n] = currentOrder;
    await printOrder(tileMap[n]);
};

var round = 1;
var clickCount = 1;
const checkInput = ()=>{
    console.log('Hello')
}

const setUserInput = async ()=>{
    tiles.foreach
}

const readInput = async (n)=>{
    userInput = [];
    while(userInput.length < n){
        await timeout(1000);
    };
    return userInput;
}

const playRound = async (n)=>{
    await playQuestion(n); 
    await readInput(n);
}

const evaluate = (n)=>{
    if(tileMap[n].length != userInput.length){
        return false;
    }
    for(let i=0;i<tileMap[n].length; i++){
        if(tileMap[n][i] != userInput[i]){
            return false;
        }
    }
    return true;
}

renderClick();
resetGame();

const startGame = async ()=>{
    let points = 1;
    while(points <= 16 && !gameOver){
        await playRound(points);
        gameOver = !evaluate(points);
        if(gameOver) break;
        points ++;
        updateScore(points-1);
    }
}


button.addEventListener("click", ()=>{
    if(button.innerHTML == "Start"){
        resetGame();
        startGame();
        button.innerHTML = "Reset";
    }else{
        resetGame();
        button.innerHTML = "Start";
    }
})












 
















