const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')

const tileArray = [];
var remainingTiles = [];
var tileMap = {};

const restartGame = ()=>{
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
    await timeout(1000);
    tiles[n].classList.toggle('dummy');
}; 

const printOrder = async (tilesList)=>{
    for(let element of tilesList){
        await timeout(1000);
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

const startGame = async ()=>{
    restartGame();
    await playQuestion(1);
    
    await timeout(1000);
    await playQuestion(2);
    await timeout(1000);
    await playQuestion(3);
    await timeout(1000);
    await playQuestion(4);
    
}

startGame();




/*tiles.forEach(tile => {
    tile.addEventListener('click', (e)=>{
        console.log(e.target.innerHTML);
    })
}); */





 
















