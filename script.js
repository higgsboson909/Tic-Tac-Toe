

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
            if(pArray[0].symbol == 'X' && pArray[1].symbol == '') {
                pArray[1].symbol = 'O';
            }
            else   
                pArray[1].symbol = 'X';

            pArray[1].name = name;
            pArray[1].score = score;
 
        }
        return {pArray};
    }

    let getPlayer = () => {return pArray};

    let setCurrentPlayer = (player) => {currentPlayer = player}
    let getCurrentPlayer = () => {
        if(currentPlayer == {}) {
            return getPlayer()[0];
        }
        else 
            return currentPlayer;
    };
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
        display.renderTurn();
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
 let currentP = Player.getPlayer()[0];
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
    const startContainerEl = document.querySelector(".start-container");
    function formBehaviourPrevention() {
        let p1Prevention = () => {
            p1FormEl.addEventListener('submit', (event) => {
                event.preventDefault();
            });
        };
        let p2Prevention = () => {
            p2FormEl.addEventListener('submit', (event) => {
                event.preventDefault();
            });
        };

        return {p1Prevention, p2Prevention}
        
    }

    function showDialog() {

        const p1DialogEl = document.querySelector(".player-1");
        const p2DialogEl = document.querySelector(".player-2");
        const p1CloseDialog = document.querySelector(".p1-confirm");
        const p2CloseDialog = document.querySelector(".p2-confirm");
        // let p1name = 
        // let p2name = 


        p1DialogEl.showModal();

        let getForm1Info = (() => {
            formBehaviourPrevention().p1Prevention();
            let p1FormEl = document.querySelector(".p1-form");
            let form1Info = {};

            let markContainerEl = document.querySelector(".mark-container");
            function getP1Mark(event) {
                let target = event.target;
                if(target.classList.contains("cross")) {
                    form1Info.mark = 'X';
                }
                else if(target.classList.contains("check")) {
                    form1Info.mark = 'O';
                }
                console.log(form1Info.mark);
            }
            markContainerEl.addEventListener('click', getP1Mark);

            function confirmForm1() {
                form1Info.p1Name = document.getElementById("p1-name").value;
                p1CloseDialog.removeEventListener('click', confirmForm1);
                markContainerEl.removeEventListener('click', getP1Mark)
                p1DialogEl.close();
                console.log(form1Info);
                p2DialogEl.showModal();
                Player.setPlayer(form1Info.p1Name, form1Info.mark)
            }
            p1CloseDialog.addEventListener("click", confirmForm1);
            return form1Info;
        });
        let form1Info = getForm1Info();
        let getForm2Info = (() => {
            formBehaviourPrevention().p2Prevention();
            let p2FormEl = document.querySelector(".p2-form");
            let mark; 
            let p2Name;
            let setMark2 = () => {
                if(form1Info.mark == 'O') {
                    mark = "X";
                }
                else if(form1Info.mark == "X") {
                    mark = 'O';
                } 
            };

            function confirmForm2() {
                p2Name = document.getElementById("p2-name").value;
                p2CloseDialog.removeEventListener('click', confirmForm2);
                setMark2();
                console.log({p2Name, mark});
                Player.setPlayer(p2Name, mark);
                p2DialogEl.close();

                display.boardEl.classList.remove("hidden");
                display.gameDashboard();
                display.renderTurn();

            }
            p2CloseDialog.addEventListener("click", confirmForm2);
            
            return {p2Name, mark}; 
        });
        getForm2Info();
    }

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
        }, 350);
        return intervalId;  
    }

    function blinkTheStatement() {
        const blinkingStatementEl = document.querySelector(".blinking-statement");
            let fontSizeArr = ["1.32em", "1.35rem", "1.37rem", "1.39rem", "1.41rem", "1.43rem", "1.45rem", "1.43rem", "1.41rem", "1.39rem", "1.37rem", "1.35rem"];
            let currentIndex = 0;
        let blinkOnStatementId = setInterval(() => {
            blinkingStatementEl.style.fontSize = fontSizeArr[currentIndex];
            currentIndex = (currentIndex + 1) % fontSizeArr.length;
        }, 100);
        return blinkOnStatementId;
    }

    function listenStartClick() {

        const htmlEl = document.querySelector("html");
        const bodyEl = document.querySelector("body")
        function openDialog() {
            clearInterval(display.blinkTheStatement());
            bodyEl.style.backgroundColor = "#24b388";
            startContainerEl.classList.add("hidden");
            htmlEl.removeEventListener('click', openDialog);
            display.showDialog();
 
        }
        htmlEl.addEventListener("click", openDialog);
    }

    function getMarkChoice() {
        let selectedChoice = null;
        const markChoiceEl = document.querySelector(".mark-container");
        function getMark() {
            (e) => {
            let target = e.target;
            if(target.classList.contains("cross")) {
                selectedChoice = 'X';
                console.log(selectedChoice);
            }
            else if(target.classList.contains("check")) {
                selectedChoice = 'O';
                console.log(selectedChoice);
            }
        }
        }
        markChoiceEl.addEventListener('click', );
        return selectedChoice;
    }

    let renderTurn = () => {
        let p1Img = document.querySelector(".p1Mark .p1Img");
        let p2Img = document.querySelector(".p2Mark .p2Img");

        if(Player.getCurrentPlayer().symbol == 'X') {
            if((p2Img.classList.contains("cross-img")) && (p2Img.classList.contains("turn"))){

                p2Img.classList.remove("turn");
                p1Img.classList.add("turn");

            }
            else if(p1Img.classList.contains("cross-img")) {
                p2Img.classList.remove("turn");
                p1Img.classList.add("turn");
            }
            else if(p2Img.classList.contains("cross-img")) {
                p1Img.classList.remove("turn");
                p2Img.classList.add("turn");
            }
            // else if(p1Img.classList.contains("check-img turn")) {
            //     p1Img.classList.remove("turn");
            //     p2Img.classList.add("turn");
            // }

        }
        if(Player.getCurrentPlayer().symbol == 'O') {
if((p1Img.classList.contains("check-img")) && (p1Img.classList.contains("turn"))){

                p1Img.classList.remove("turn");
                p2Img.classList.add("turn");

            }
           
else  if(p1Img.classList.contains("check-img")){

                p2Img.classList.remove("turn");
                p1Img.classList.add("turn");

            }
           else if(p2Img.classList.contains("check-img")) {
                p1Img.classList.remove("turn");
                p2Img.classList.add("turn");
            }
        }

        console.log(p1Img, p2Img);
    };

    let gameDashboard = () => {
 
            let p1MarkImg = document.createElement("img");
            let p2MarkImg = document.createElement("img");


            // parent
            let playersEl = document.createElement("div");
            playersEl.classList.add("players");

            // child1 
            let player1El = document.createElement("div");
            player1El.classList.add("p1");

            // child1 name
            let p1NameEl = document.createElement("div");
            p1NameEl.classList.add("p1Name");

            // child1 mark
            let p1MarkEl = document.createElement("div");
            p1MarkEl.classList.add("p1Mark");

            // child1 img
            p1MarkImg.classList.add("p1Img");

            p1MarkEl.appendChild(p1MarkImg);

            player1El.appendChild(p1NameEl);
            player1El.appendChild(p1MarkEl);
            playersEl.appendChild(player1El);

            // child2
            let player2El = document.createElement("div");
            player2El.classList.add("p2");

            // child2 name
            let p2NameEl = document.createElement("div");
            p2NameEl.classList.add("p2Name");
            
            // child2 mark
            let p2MarkEl = document.createElement("div");
            p2MarkEl.classList.add("p2Mark");

            // child2 Img
            p2MarkImg.classList.add("p2Img");

            p2MarkEl.appendChild(p2MarkImg);
            
            player2El.appendChild(p2NameEl);
            player2El.appendChild(p2MarkEl);
            playersEl.appendChild(player2El);

            if(Player.getPlayer()[0].symbol == 'X') {
                p1MarkImg.classList.add("cross-img");
                p2MarkImg.classList.add("check-img");
                p1MarkImg.src = "images/close_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
                p2MarkImg.src = "images/check.svg";
            }
            else if(Player.getPlayer()[0].symbol == 'O') {
                p1MarkImg.classList.add("check-img");
                p2MarkImg.classList.add("cross-img");
                p1MarkImg.src = "images/check.svg";
                p2MarkImg.src = "images/close_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
            }

            p1NameEl.innerText = Player.getPlayer()[0].name;
            p2NameEl.innerText = Player.getPlayer()[1].name;
            // playersEl.appendChild(p1NameEl);
            // playersEl.appendChild(p1MarkEl);
            // playersEl.appendChild(p2NameEl);
            // playersEl.appendChild(p2MarkEl);
            display.boardEl.append(playersEl);
        }

    

        // gameController();
    return {gameDashboard, PlayOnClick, setClick, boardEl, turnListener, markBox, blinkTheBoxes, showDialog, blinkTheStatement, listenStartClick, getMarkChoice, renderTurn};

};
let display = displayController();
display.blinkTheStatement();
display.listenStartClick();
Player.setCurrentPlayer(Player.getPlayer()[0]);
display.PlayOnClick();
