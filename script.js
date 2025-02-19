

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
let createGameboard = () => {

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
        
    let resultBoxes = [
    ];       // array of objects
    let setResultBoxes = (b1, b2, b3) => {
        resultBoxes = [b1, b2, b3];
    };
    
    let getResultBoxes = () => {return resultBoxes};

    function highlightResultBoxes() {
        let b1 , b2 , b3;
        let boxesEl = document.querySelectorAll(".box");
        b1 = gameboardCreated.getResultBoxes()[0];
        b2 = gameboardCreated.getResultBoxes()[1];
        b3 = gameboardCreated.getResultBoxes()[2];
        

         

        // Optional: Stop the animation after 10 seconds
        // setTimeout(() => {
        //     clearInterval(intervalId); // Stop the interval
        //     box.style.backgroundColor = "lightblue"; // Reset to the original color
        // }, 10000);

        if(gameboardCreated.getTurns() === 9 && !(gameboardCreated.getWinner())) {

            boxesEl.forEach((box) => {
                box.classList.add("color");
                display.blinkTheBoxes(box);
            })
        }

        if(b1 || b2 || b3) {
            boxesEl.forEach((box) => {
                if(+box.dataset.row === b1.m && +box.dataset.column === b1.i) {
                box.classList.add("color");
                display.blinkTheBoxes(box);
            }
            if(+box.dataset.row === b2.m && +box.dataset.column === b2.i) {
                box.classList.add("color");
                display.blinkTheBoxes(box);
            }
            if(+box.dataset.row === b3.m && +box.dataset.column === b3.i) {
                box.classList.add("color");
                display.blinkTheBoxes(box);
            }
            
        });
        }
    };
 
    return {gameboardArray, setWinner, getWinner, getTurns, incTurns, getCurrentClick, setCurrentClick, setResultBoxes, getResultBoxes, highlightResultBoxes};    // return array as an item of object;
};

let gameboardCreated = createGameboard();


// initialized gameboard object
let gameboard = gameboardCreated.gameboardArray(' ');

// function to insert marks in array
let playGame = (m, n, mark) => {    // m = row, n = column
    let gameOver = () => {
        if(gameboardCreated.getWinner() || gameboardCreated.getTurns() === 9) { 
        let boxesEl = document.querySelectorAll(".box");
        boxesEl.forEach((box) => {
            box.classList.remove("on-hover");
        });
        gameboardCreated.highlightResultBoxes();
        console.log("Game Over!!")
        display.boardEl.removeEventListener('click', display.turnListener);
        }
    };

    // insert the symbol in the array
    if(isSpotAvailable(m, n)) {
        (gameboardCreated.getTurns() < 9) ? gameboardCreated.incTurns() : alert("game is over!");
        gameboard[m][n] = mark;
        display.markBox(mark);
    }
    else 
        console.log("Try again");

    
        // check for row1 
        for (let i = 0; i < 3; i++) {
            if(((gameboard[i][0] === 'O') || (gameboard[i][0] === 'X')) && gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]){
                if(Player.getPlayer()[0].symbol === gameboard[i][1]) {
                    gameboardCreated.setResultBoxes({m: i, i: 0}, {m: i, i: 1}, {m: i, i: 2});
                    gameboardCreated.setWinner(Player.getPlayer()[0].name);
                }
                else if(Player.getPlayer()[1].symbol === gameboard[i][1]){
                    gameboardCreated.setResultBoxes({m: i, i: 0}, {m: i, i: 1}, {m: i, i: 2});
                    gameboardCreated.setWinner(Player.getPlayer()[1].name);
                }
            }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if(((gameboard[0][i] === 'X')  || (gameboard[0][i] === 'O')) && gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]){
            if(Player.getPlayer()[0].symbol === gameboard[0][i]) {
                gameboardCreated.setWinner(Player.getPlayer()[0].name);
                gameboardCreated.setResultBoxes({m: 0, i}, {m: 1, i}, {m: 2, i});
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][i]) {
                gameboardCreated.setWinner(Player.getPlayer()[1].name);
                gameboardCreated.setResultBoxes({m: 0, i}, {m: 1, i}, {m: 2, i});
            }}
        } 
        
        // for diagonal
        if(((gameboard[0][0] === 'X') || (gameboard[0][0] === 'O')) && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
            if(Player.getPlayer()[0].symbol === gameboard[0][0]) {
                gameboardCreated.setWinner(Player.getPlayer()[0].name);
                gameboardCreated.setResultBoxes({m: 0, i: 0}, {m: 1, i: 1}, {m: 2, i: 2});
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][0]) {
                gameboardCreated.setWinner(Player.getPlayer()[1].name);
                gameboardCreated.setResultBoxes({m: 0, i: 0}, {m: 1, i: 1}, {m: 2, i: 2});
            }
        }

        else if(((gameboard[0][2] === 'X') || (gameboard[0][2] === 'O')) && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
            if(Player.getPlayer()[0].symbol === gameboard[0][2]) {
                gameboardCreated.setWinner(Player.getPlayer()[0].name);
                gameboardCreated.setResultBoxes({m: 0, i: 2}, {m: 1, i: 1}, {m: 2, i: 0});
            }
            else if(Player.getPlayer()[1].symbol === gameboard[0][2]) {
                gameboardCreated.setResultBoxes({m: 0, i: 2}, {m: 1, i: 1}, {m: 2, i: 0});
                gameboardCreated.setWinner(Player.getPlayer()[1].name);
            }

            
        }

        gameOver(); 
    }

// check for available spot
function isSpotAvailable(m, n) {
    if(!(isNaN(m) || isNaN(n))) {
        return (gameboard[m][n] === ' ') ? true : false;
    }
}
 let currentP = {};
    Player.setCurrentPlayer(Player.getPlayer()[0]);
// game flow controller
function gameController() {
    
    // get player name
    // select player symbol
    let m = gameboardCreated.getCurrentClick().m;
    let n = gameboardCreated.getCurrentClick().n;

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
let displayController = () => {

    const p1FormEl = document.querySelector(".player-1");
    const p2FormEl = document.querySelector(".player-2");
    const p1CloseDialog = document.querySelector(".player-1 .p1-confirm");
    const p2CloseDialog = document.querySelector(".player-2 .p2-confirm");

    function showDialog() {

        p1FormEl.showModal();
        p1CloseDialog.addEventListener('click', () => {
            p1FormEl.close();
            p2FormEl.showModal();
            p2CloseDialog.addEventListener("click", () => {
                p2FormEl.close();
            })
        });
    }
    
    function closeDialog() {
        
    }

    // click dimensions
    let p = null, q = null;
    
    let boardEl = document.querySelector(".board");

    let setClick = (p, q) => {
        gameboardCreated.setCurrentClick(p, q);
    }
    let turnListener = (e) => {

            const target = e.target;
            let m = +target.dataset.row;
            let n = +target.dataset.column;
            setClick(m, n);
            gameController();

        };

    
        // listen to click and pass click
    function PlayOnClick() {
        boardEl.addEventListener("click", turnListener);
    };

    // render the symbol
    let markBox = (mark) => {
        let boxesEl = document.querySelectorAll(".box");
        let click = {};
        let setMark = (mark) => {
            let imgEl = document.createElement("img");
            if(mark == 'X') { 
                imgEl.src = "./images/close_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
            }
            else if(mark == 'O') 
                imgEl.src = "./images/check.svg";
            return imgEl;

        };
        click = gameboardCreated.getCurrentClick();
        console.log(click);
        let symbol = gameboard[click.m][click.n];

        click = gameboardCreated.getCurrentClick();
        boxesEl.forEach((boxEl) => {
            if(click.m == +boxEl.dataset.row && click.n == +boxEl.dataset.column && symbol === 'X') {
                            
                boxEl.append(setMark(symbol));
            }
            else if(click.m == +boxEl.dataset.row && click.n == +boxEl.dataset.column && symbol === 'O') {

                boxEl.append(setMark(symbol));
            }
                        
        });
    }

    let blinkTheBoxes = (box) => {
        let blinkingColor;
        let colors = ["#5ebaa3", "#a3f2d6"];
        let currentIndex = 0;
        let intervalId = setInterval(() => {
            box.style.backgroundColor = colors[currentIndex];

            currentIndex = (currentIndex + 1) % colors.length;
        }, 250);
        return intervalId;  
    }
    

        // gameController();
    return {PlayOnClick, setClick, boardEl, turnListener, markBox, blinkTheBoxes, showDialog};
};
let display = displayController();
display.showDialog();
Player.setPlayer("ali", "X")
Player.setPlayer("Umar", "O")
Player.setCurrentPlayer(Player.getPlayer()[0]);
display.PlayOnClick();
