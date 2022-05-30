const normalCont = document.querySelector('.normal-container');
const hackerCont = document.querySelector('.hacker-container');
const normalBtn = document.querySelector('.normal');
const hackerBtn = document.querySelector('.hacker');
const tiles = document.querySelectorAll('.tile');
const tiles1 = document.querySelectorAll('.tile1');

const score = document.querySelector('.score');
const audio = new Audio('click.wav');
const roundProgressAudio = new Audio('round-progress.wav');
const error = new Audio('error.wav');
var isNormalMode = null;
var isGameOver = true;
var remainingTiles = [];
var tileMap = {};
var userInput = [];
var gameOver = false;
var renderingRound = false;
var playerLost = false;


const setMode = async (mode)=>{
    isNormalMode = mode;
    await timeout(10);
    
}

const resetGame = ()=>{   
    remainingTiles=[];
    for(let i=0;i<(isNormalMode?16:36);i++){
        remainingTiles.push(i);
    }
    isNormalMode?renderClick(tiles):renderClick(tiles1);
    tileMap = {};
    tileMap[0] = [];
    gameOver = false;
    updateScore(0);
    renderingRound = false;
};

const updateScore = (points)=>{
    score.innerHTML = `Score : ${points}`;
}


const renderClick = (t)=>{

    t.forEach(tile=>{
        tile.addEventListener("click", ()=>{
            if(!userInput.includes(parseInt(tile.innerHTML))){
                userInput.push(parseInt(tile.innerHTML));
            }
            
        })
    })
}


const selectRandomTile = ()=>{
    console.log(remainingTiles)
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
    let t = isNormalMode?tiles:tiles1;
    audio.play();
    t[n].classList.toggle('dummy');
    await timeout(500);
    t[n].classList.toggle('dummy');
    
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



const readInput = async (n)=>{
    userInput = [];
    while(userInput.length < n){
        await timeout(10);
    };
    return userInput;
}

const playRound = async (n)=>{
    await readQuestion(n); 
    await printOrder(tileMap[n]);
    await readInput(n);
}

const normalEvaluate = (n)=>{
    let checkArray = userInput.slice();
    if(tileMap[n].length != userInput.length){
        return false;
    }
    if(isNormalMode){
        for(let i=0;i<tileMap[n].length; i++){
            if(checkArray.includes(tileMap[n][i])){
                checkArray = checkArray.filter(num => num != tileMap[n][i])
            }
            else{
                return false;
            }
        }
    }
    else{
        for(let i=0; i<tileMap[n].length; i++){
            if(checkArray[i] != tileMap[n][i]){
                return false;
            }
        }
    }
    return true;
}


const credits = async(p)=>{
    await timeout(1500);
    if(playerLost){
        alert(`Game Over - Your Score : ${p}`)
    }
    else{
        alert(`You Won the Round - Your Score : ${p}`)
    }
    
}

const startGame = async ()=>{
    let points = 1;
    while(points <= (isNormalMode?16:36) && !gameOver){
        await playRound(points);
        gameOver = !normalEvaluate(points);
        if(gameOver) {
            playerLost = true;
            await error.play();
            break;
        };
        points ++;
        updateScore(points-1);
        await roundProgressAudio.play();
    }
    await credits(points-1);
}


normalBtn.addEventListener("click", ()=>{
    alert('Order of Tiles is not Mandatory')
    setMode(true);
    tiles1.forEach(tile=>{
        tile.removeEventListener("click", ()=>{
            userInput.push(parseInt(tile.innerHTML));
        })
    })
    resetGame();
    normalCont.style.display = "flex";
    hackerCont.style.display = "none";
    startGame();
})
hackerBtn.addEventListener("click", ()=>{
    alert('Order of tiles is Mandatory')
    setMode(false);
    resetGame();
    normalCont.style.display = "none";
    hackerCont.style.display = "flex";
    startGame();
})
