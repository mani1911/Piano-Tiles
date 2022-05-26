const container = document.getElementsByClassName('container');
const tiles = document.querySelectorAll('.tile')

let isQuestionOver = false;
let gameOver = false;
const tileArray = [];


const selectRandomTile = ()=>{
    let tileNum = Math.floor(Math.random()*16);
    while(true){
        if(tileArray.includes(tileNum)){
            tileNum = Math.floor(Math.random()*16);
        }
        else{
            return tileNum;
        }
    }
};

const displayTile = (n)=>{
     const blink = setTimeout(()=>{
        tiles[n].classList.toggle('dummy')
    },500);
    setTimeout(()=>{
        tiles[n].classList.toggle('dummy')
    },750);
}; 

const playQuestion = (n)=>{
    const question = setInterval(()=>{
        let randTile = selectRandomTile();
        tileArray.push(randTile);
        displayTile(randTile);
    },1500);
    setTimeout(()=>{clearInterval(question)}, n*1500);
}


tiles.forEach(tile => {
    tile.addEventListener('click', (e)=>{
        console.log(e.target.innerHTML);
    })
});

playQuestion(3);





 
















