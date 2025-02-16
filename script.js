// object to create user
function createPlayer(name, symbol) {
    
    return {name, symbol};
}

// to create gameboard object 
let createGameboard = (function () {

    // create the gameboard Array
    let gameboardArray = (mark) => {
        let a, m, n, mat = [];
        
        for (m = 0; m < 3; m++) {
            a = [];
            for (n = 0; n < 3; n++) {
                a[n] = mark; 
            }
            mat[m] = a;
        }
        return mat;
    };
 
    let currentClick = {};
    let winner = null;
    let turns = 0; 

    let setWinner = (w) => {winner = w};
    let getWinner = () => {return winner}
    let getTurns = () => {return turns};
    let incTurns = () => {turns++};     // increase no. of turns
    
    let setCurrentClick = (m, n) => {
        currentClick = {m, n};
    };
    let getCurrentClick = () => currentClick;
   
    return {gameboardArray, setWinner, getWinner, getTurns, incTurns, getCurrentClick, setCurrentClick};    // return array as an item of object;
})();

// initialized gameboard object
let gameboard = createGameboard.gameboardArray(' ');

// function to insert marks in array
let playGame = (m, n, mark) => {    // m = row, n = column

    // insert the symbol in the array
    if(isSpotAvailable(m, n)) {
        (createGameboard.getTurns() < 9) ? createGameboard.incTurns() : alert("game is over!");
        gameboard[m][n] = mark;
    }
    else 
        console.log("Try again");

    
        // check for row1 
        for (let i = 0; i < 3; i++) {
            if(gameboard[i][0] === ('X' || 'O') && gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]){
            if(player1.symbol === gameboard[i][1]) {
                createGameboard.setWinner(player1.name);
            }
            else if(player2.symbol === gameboard[i][1])
                createGameboard.setWinner(player2.name);
        }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if(gameboard[0][i] === ('X' || 'O') && gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]){
            if(player1.symbol === gameboard[0][i]) {
                createGameboard.setWinner(player1.name);
            }
            else if(player2.symbol === gameboard[0][i])
                createGameboard.setWinner(player2.name);
            }
        } 
        
        // for diagonal
        if(gameboard[0][0] === ('X' || 'O') && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
            if(player1.symbol === gameboard[0][0]) {
                createGameboard.setWinner(player1.name);
            }
            else if(player2.symbol === gameboard[0][0])
                createGameboard.setWinner(player2.name);
        }
        else if(gameboard[0][2] === ('X' || 'O') && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
            if(player1.symbol === gameboard[0][2]) {
                createGameboard.setWinner(player1.name);
            }
            else if(player2.symbol === gameboard[0][2])
                createGameboard.setWinner(player2.name);
        }

        console.log(createGameboard.getWinner());
        console.log(createGameboard.getTurns());
        if(createGameboard.getWinner() || createGameboard.getTurns() === 9) {
            console.log("Game Over!!")
        }
    }

// check for available spot
function isSpotAvailable(m, n) {
    return (gameboard[m][n] == ' ') ? true : false;
}

let player1;
let player2;
    player1 = createPlayer("p1", 'X');
    player2 = createPlayer("p2", 'O');
    
    let currentPlayer = player1;    



// game flow controller
function gameController() {
    
    // get player name
    // select player symbol
    let m = +createGameboard.getCurrentClick().m;
    let n = +createGameboard.getCurrentClick().n;
     
    if((isSpotAvailable(m, n))) {

        // currentPlayer plays game first

        playGame(m, n, currentPlayer.symbol);
        // switch player 
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        displayController();
    } 
    
}

let p = null, q = null;
 let boardEl = document.querySelector(".board");
    boardEl.addEventListener("click", (e) => {
        const target = e.target;
        p = target.getAttribute("row");
        q = target.getAttribute("column");
        displayController();
    });

// display object
function displayController() {
        createGameboard.setCurrentClick(p, q);
        gameController();

}
