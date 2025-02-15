// object to create user
function createPlayer(name, symbol) {
    return {name, symbol};
}

let player1 = createPlayer("ali", 'O');
let player2 = createPlayer("umar", 'X');

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

    return {gameboardArray};    // return array as an item of object;
})();

// initialized gameboard object
let gameboard = createGameboard.gameboardArray(' ');


