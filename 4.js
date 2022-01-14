console.log('======================== LET\'S GO ========================');

const fs = require('fs');

try {
    var file = fs.readFileSync('4.txt', 'UTF-8');
} catch (error) {
    console.error(error);
}

var lines = file.split(/\r?\n/).slice(0, -1); // Removing the last empty line


// Parse input
var numbers = lines.shift().split(',');
lines = lines.filter(line => line != '');

if (lines.length % 5 != 0) {
    console.log('Wrong amount of input lines');
}

// Break each line up by number, removing empties along the way
lines = lines.map(line => line.split(/\s+/).filter(line => line != ''));

// Chunk lines into boards
var boards = Array();
while (lines.length > 0) {
    boards.push(lines.splice(0, 5));
}

// console.log('numbers', numbers);
// console.log('boards', boards);

function boardHasBingo(board) {
    return boardHasHorizontalBingo(board) || boardHasVerticalBingo(board);
}

function boardHasHorizontalBingo(board) {

    // For each row, check and see if all values are
    // the same. If so, return true.
    var hasBingo = false;
    var bingoedRow = Array(board.length).fill('x');

    board.forEach((row, i) => {
        if (JSON.stringify(row) == JSON.stringify(bingoedRow)) {
            hasBingo = true;
        }
    });

    return hasBingo;
}

function boardHasVerticalBingo(board) {

    // For each column, see if there is one equal to ['x', 'x', 'x', 'x', 'x']
    var hasBingo = false;
    var bingoedColumn = Array(board.length).fill('x');
    var column;

    for (var columnIndex = 0; columnIndex < board.length; columnIndex++) {
        column = [
            board[0][columnIndex],
            board[1][columnIndex],
            board[2][columnIndex],
            board[3][columnIndex],
            board[4][columnIndex]
        ];

        if (JSON.stringify(column) == JSON.stringify(bingoedColumn)) {
            hasBingo = true;
        }

    }

    return hasBingo;
}

function markBoard(board, number) {
    return board.map(row => row.map(column => column == number ? 'x' : column));
}

function calculateBoardSum(board) {
    return board.reduce((previousRow, currentRow) => {
        return previousRow + currentRow.reduce((previousColumn, currentColumn) => {
            return currentColumn == 'x' ? previousColumn : previousColumn + parseInt(currentColumn);
        }, 0);
    }, 0);
}

function findAmountOfPicksToGetBingo(board, numbers, currentPick = 0) {

    if (numbers.length == 0) {
        // There are no more remaining numbers, so
        // board does not win.
        return false;
    }

    // Pick a number!
    var currentNumber = numbers.shift();
    var markedBoard = markBoard(board, currentNumber);
    currentPick += 1;

1
    if (boardHasBingo(markedBoard)) {
        // console.log('BINGO!');
        return {
            'currentPick': currentPick,
            'currentNumber': currentNumber,
            'boardSum': calculateBoardSum(markedBoard),
            'score': calculateBoardSum(markedBoard) * currentNumber
        };
    } else {
        return findAmountOfPicksToGetBingo(markedBoard, [...numbers], currentPick);
    }
}

//
// Init
//

// Get results for each board
var boardResults = [];
boards.forEach((board, i) => {
    boardResults.push(findAmountOfPicksToGetBingo(board, [...numbers]));
});


// Part A: Get the board that wins first
boardResults.sort((a, b) => {
    return a.currentPick - b.currentPick
});

console.log('Winning score', parseInt(boardResults[0].currentNumber) * boardResults[0].boardSum);

// Part B: Get the board that wins last
boardResults.sort((a, b) => {
    return b.currentPick - a.currentPick
});

console.log('Last winning score', parseInt(boardResults[0].currentNumber) * boardResults[0].boardSum);
