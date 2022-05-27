const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')
const button = document.querySelector('button');
const score = document.querySelector('.score');
const timeLeft = document.querySelector('.time');

const tileArray = [];

var timeOver = false;
var playerLost = false;
var isGameOver = true;
var remainingTiles = [];
var tileMap = {};
var reset = false;

const resetGame = ()=>{
    for(let i=0;i<16;i++){
        remainingTiles.push(i);
    }
    tileMap = {};
    tileMap[0] = [];
};

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

const isRoundOver = (arr)=>{
    if(arr.length === 0){
        return true;
    }
    return true;
}

const startGame = async ()=>{
    
    let round = 1;
    while(!isGameOver && !reset){


        var count = 0;
        await playQuestion(round);
        let questionArray = tileMap[round].slice();

        tiles.forEach(tile => {
            tile.addEventListener('click', (e)=>{
                let selectedTile = parseInt(e.target.innerHTML);
                if(!tileMap[round].includes(selectedTile)){
                    isGameOver = true;
                    playerLost = true;
                }
                else{
                    questionArray = questionArray.filter(n => n != selectedTile);
                }
            })
        });

        const timer = await timeout(1000*round + 1050*round + 1000);
        if(questionArray.length != 0){
            alert('Time Over')
            isGameOver = true;
        }
        else if(reset){
            reset = false;
            return;
        }
        else if(isGameOver){
            alert('Game Over')
        }
        else{
            score.innerHTML = `Passed : ${round}`
        }
        round++;
    }    
}

button.addEventListener('click', ()=>{
    resetGame();
    startGame();
    
});











 
















