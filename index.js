const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')


let gameOver = false;
const tileArray = [1,2,4];
let round = 1;

const selectRandomTile = ()=>{
    let tileNum = Math.floor(Math.random()*16);
    if(tileArray.includes(tileNum)){
        selectRandomTile();
    }
    else{
        tileArray.push(tileNum);
        console.log(tileArray);
    }
}

const displayTile = (n)=>{
     const blink = setTimeout(()=>{
        tiles[n].classList.toggle('dummy')
    },500);
    setTimeout(()=>{
        tiles[n].classList.toggle('dummy')
    },750);
}; 


tiles.forEach(tile => {
    tile.addEventListener('click', (e)=>{
        console.log(e.target.innerHTML);
    })
});

displayTile(0);








