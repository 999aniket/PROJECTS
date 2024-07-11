const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector('.btn')

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// game initialize
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // empty ui
    boxes.forEach((box, index)=>{
        box.innerHTML = ""  
        boxes[index].style.pointerEvents = "all"

        // something is missing
        box.classList.remove("win")
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame();

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
})

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            // check if winner is x
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O"
            }
            // disable pointer events
            boxes.forEach(box => box.style.pointerEvents = "none")
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }else{
             // when no winner
            let fillCount = 0;
            gameGrid.forEach((box)=>{
                if(box != ""){
                    fillCount++;
                }
            })
            if(fillCount === 9){
                gameInfo.innerText = "Game Tied"
                newGameBtn.classList.add("active")
            }
        }
    })
    if(answer !== ""){
        newGameBtn.classList.add("active")
        gameInfo.innerText = `Winner is ${answer}`
    }
   
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        //swap turn 
        swapTurn();
        // check if someone wins
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


newGameBtn.addEventListener("click", initGame)