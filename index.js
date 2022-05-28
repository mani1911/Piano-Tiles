const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')
const button = document.querySelector('button');
const score = document.querySelector('.score');
const audio = new Audio('click.wav');
const roundProgressAudio = new Audio('round-progress.wav');
const error = new Audio('error.wav');
const tileArray = [];

var isGameOver = true;
var remainingTiles = [];
var tileMap = {};
var userInput = [];
var gameOver = false;
var renderingRound = false;
const resetGame = ()=>{
    for(let i=0;i<16;i++){
        remainingTiles.push(i);
    }
    tileMap = {};
    tileMap[0] = [];
    gameOver = false;
    updateScore(0);
    renderingRound = false;
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
    audio.play();
    tiles[n].classList.toggle('dummy');
    await timeout(500);
    tiles[n].classList.toggle('dummy');
    audio.stop()
}; 

const printOrder = async (tilesList)=>{
    if(!renderingRound){
        renderingRound = true;
        for(let element of tilesList){
            await timeout(500);
            displayTile(element);
        };
        renderingRound = false;
    }
    
}; 

const readQuestion = async (n)=>{
    let prevOrder = tileMap[n-1];
    let newTile = selectRandomTile();
    let currentOrder = prevOrder.slice();
    currentOrder.push(newTile);
    tileMap[n] = currentOrder;
};

const checkInput = ()=>{
    console.log('Hello')
}

const setUserInput = async ()=>{
    tiles.foreach
}

const readInput = async (n)=>{
    userInput = [];
    while(userInput.length < n){
        await timeout(100);
    };
    return userInput;
}

const playRound = async (n)=>{
    await readQuestion(n); 
    await printOrder(tileMap[n]);
    await readInput(n);
}

const normalEvaluate = (n)=>{
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

const startGame = async ()=>{
    let points = 1;
    while(points <= 16 && !gameOver){
        await playRound(points);
        gameOver = !normalEvaluate(points);
        if(gameOver) {
            await error.play();
            break;
        };
        points ++;
        updateScore(points-1);
        await roundProgressAudio.play();
    }
}


button.addEventListener("click", ()=>{
    resetGame();
    startGame();
})
