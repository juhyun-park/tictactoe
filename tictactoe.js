let body = document.body;
let table = document.createElement('table');
let rows = [];
let squares = [];
let turn = 'X';
let result = document.createElement('div');
let win;

function checkWin(whichRow, whichSquare) {
    win = false;
    //horizontal test
    if (squares[whichRow][0].textContent === turn && squares[whichRow][1].textContent === turn && squares[whichRow][2].textContent === turn) {
        win = true;
    }
    //vertical test
    if (squares[0][whichSquare].textContent === turn && squares[1][whichSquare].textContent === turn && squares[2][whichSquare].textContent === turn) {
        win = true;
    }
    //diagonal test
    if (squares[0][0].textContent === turn && squares[1][1].textContent === turn && squares[2][2].textContent === turn) {
        win = true;
    }
    if (squares[0][2].textContent === turn && squares[1][1].textContent === turn && squares[2][0].textContent === turn) {
        win = true;
    }
    return win;
}

function initial(tie) {
    if (tie) {
        result.textContent = "It's a tie.";
    } else {
        result.textContent = turn + ' won!';
    }
    setTimeout(function () {
        result.textContent = '';
        squares.forEach(function (row) {
            row.forEach(function (square) {
                square.textContent = '';
            });
        });
        turn = 'X';
    }, 1000);
}

let asyncCallback = function (event) {
    if (turn === 'O') { //not letting the user click while it's computer's turn
        return;
    }
    let whichRow = rows.indexOf(event.target.parentNode);
    let whichSquare = squares[whichRow].indexOf(event.target);

    if (squares[whichRow][whichSquare].textContent !== '') { //is the square filled?
        console.log('the square is not empty.')
    } else {
        console.log('the square is empty.');
        squares[whichRow][whichSquare].textContent = turn;
        let win = checkWin(whichRow, whichSquare);

        //check if all boxes are filled
        let emptySquares = [];
        squares.forEach(function (row) {
            row.forEach(function (square) {
                emptySquares.push(square);
            });
        });
        emptySquares = emptySquares.filter(function (square) {
            return !square.textContent
        });
        if (win === true) {
            initial();
        } else if (emptySquares.length === 0) { //all boxes are filled
            initial(true);
        } else { //if not
            if (turn === 'X') {
                turn = 'O';
            }
            setTimeout(function () {
                console.log("Computer's Turn");
                //computer selects one box
                let selectSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]; //choose an empty square at random
                selectSquare.textContent = turn;
                //Check if computer has won
                let whichRow = rows.indexOf(selectSquare.parentNode);
                let whichSquare = squares[whichRow].indexOf(selectSquare);
                let win = checkWin(whichRow, whichSquare);
                //if it has won
                if (win === true) {
                    initial();
                }
                //turn to me
                turn = 'X';
            }, 1000);
        }
    }
};

for (let i = 1; i <= 3; i++) {
    let row = document.createElement('tr');
    rows.push(row);
    squares.push([]);
    for (let j = 1; j <= 3; j++) {
        let square = document.createElement('td');
        square.addEventListener('click', asyncCallback);
        squares[i - 1].push(square);
        row.appendChild(square);
    }
    table.appendChild(row);
}
body.appendChild(table);
body.appendChild(result);