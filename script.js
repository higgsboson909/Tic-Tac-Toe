// object for player
let Player = (() => {
    let currentPlayer = {};
    let pArray = [
        {
            name: "",
            score: 0,
            symbol: '',
        },
        {
            name: "",
            score: 0,
            symbol: '', 
        }
    ];

    let setPlayer = (name, symbol, score = 0) => {
        if(pArray[0].name === "") {
            pArray[0].name = name;
            pArray[0].symbol = symbol;
            pArray[0].score = score;
        }
        else {
            pArray[1].name = name;
            pArray[1].symbol = symbol;
            pArray[1].score = score;
 
        }
        return {pArray};
    }

    let getPlayer = () => {return pArray};

    let setCurrentPlayer = (player) => {currentPlayer = player}
    let getCurrentPlayer = () => {return currentPlayer};
    
    return {setPlayer, getPlayer, setCurrentPlayer, getCurrentPlayer};
})();



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
    let getCurrentClick = () => {return currentClick};
   
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
            if(((gameboard[i][0] === 'O') || (gameboard[i][0] === 'X')) && gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]){
                if(Player.getPlayer()[0].symbol === gameboard[i][1]) {
                    createGameboard.setWinner(Player.getPlayer()[0].name);
                }
                else if(Player.getPlayer()[1].symbol === gameboard[i][1])
                    createGameboard.setWinner(Player.getPlayer()[1].name);
        }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if(((gameboard[0][i] === 'X')  || (gameboard[0][i] === 'O')) && gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]){
            if(Player.getPlayer()[0].symbol === gameboard[0][i]) {
                createGameboard.setWinner(Player.getPlayer()[0].name);
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][i])
                createGameboard.setWinner(Player.getPlayer()[1].name);
            }
        } 
        
        // for diagonal
        if(((gameboard[0][0] === 'X') || (gameboard[0][0] === 'O')) && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
            if(Player.getPlayer()[0].symbol === gameboard[0][0]) {
                createGameboard.setWinner(Player.getPlayer()[0].name);
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][0])
                createGameboard.setWinner(Player.getPlayer()[1].name);
        }
        else if(((gameboard[0][2] === 'X') || (gameboard[0][2] === 'O')) && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
            if(Player.getPlayer()[0].symbol === gameboard[0][2]) {
                createGameboard.setWinner(Player.getPlayer()[0].name);
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][2])
                createGameboard.setWinner(Player.getPlayer()[1].name);
        }

        console.log(createGameboard.getWinner());
        console.log(createGameboard.getTurns());
        if(createGameboard.getWinner() || createGameboard.getTurns() === 9) {
            console.log("Game Over!!")
        }
    }

// check for available spot
function isSpotAvailable(m, n) {
    return (gameboard[m][n] === ' ') ? true : false;
}
 let currentP = {};
    Player.setCurrentPlayer(Player.getPlayer()[0]);
// game flow controller
function gameController() {
    
    // get player name
    // select player symbol
    let m = +createGameboard.getCurrentClick().m;
    let n = +createGameboard.getCurrentClick().n;
   
    
    console.log(m,n)
    if((isSpotAvailable(m, n))) {

        // currentPlayer plays game first

        playGame(m, n, Player.getCurrentPlayer().symbol);
        // switch player 
        currentP = (Player.getCurrentPlayer() === Player.getPlayer()[0]) ? Player.getPlayer()[1]: Player.getPlayer()[0];
        Player.setCurrentPlayer(currentP);
        // displayController();
    }
    else  
        console.log("hi");
    
}

// display object
let displayController = (() => {

    // click dimensions
    let p = null, q = null;
    
    let boardEl = document.querySelector(".board");

    let setClick = (p, q) => {
        createGameboard.setCurrentClick(p, q);
    }

    // listen to click and pass click
    function PlayOnClick() {

        boardEl.addEventListener("click", (e) => {
            const target = e.target;
            let m = +target.getAttribute("row");
            let n = +target.getAttribute("column");
            setClick(m, n);
            gameController();
        });
    };


        // gameController();
    return {PlayOnClick, setClick};
})();
Player.setPlayer("ali", "X")
Player.setPlayer("Umar", "O")
Player.setCurrentPlayer(Player.getPlayer()[0]);
displayController.PlayOnClick();