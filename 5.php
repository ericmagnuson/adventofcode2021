<?php


// Filter out all the non-square lines, leaving
// only horizontal and vertical lines
function takeOnlySquareLines($lines) {

    $squareLines = [];

    foreach ($lines as $index => $line) {
        if (
            $line[0][0] == $line[1][0]
            || $line[0][1] == $line[1][1]
        ) {
            $squareLines[] = $line;
        }
    }

    return $squareLines;
}

// Checks to see if the line is vertical or horizontal
function lineIsSquare($startPoint, $endPoint) {
    return $startPoint[0] == $endPoint[0] || $startPoint[1] == $endPoint[1];
}

// Find the biggest y value.
// Graph will go from (0,0) to (0,y)
function discoverGridHeight($lines) {

    $biggestY = 0;

    foreach ($lines as $index => $line) {

        // Check if either Y value is bigger
        // than what we've seen before.
        if ($line[0][1] > $biggestY) {
            $biggestY = $line[0][1];
        }

        if ($line[1][1] > $biggestY) {
            $biggestY = $line[1][1];
        }
    }

    return $biggestY + 1;
}

// Find the biggest x value.
// Graph will go from (0,0) to (x,0)
function discoverGridWidth($lines) {

    $biggestX = 0;

    foreach ($lines as $index => $line) {

        // Check if either Y value is bigger
        // than what we've seen before.
        if ($line[0][0] > $biggestX) {
            $biggestX = $line[0][0];
        }

        if ($line[1][0] > $biggestX) {
            $biggestX = $line[1][0];
        }
    }

    return $biggestX + 1;
}

// Return a 2D array representing a map
// on which to plot our lines
// Note: We are filling the empty board with zeroes instead
// of periods because it will make incrementing each cell easier.
function initializeBoard($width, $height) {
    $board = array_fill(0, $height, array_fill(0, $width, 0));

    return $board;
}


function drawSquareLineOnBoard($board, $startPoint, $endPoint) {

    // Note: we don't handle a case here where $startPoint = $endPoint
    // because that does not make a line — it makes a point.

    // Also note: x and y values of coordinates are swapped when it comes
    // to interacting with the $board array (i.e. [x, y] => $board[y][x])


    if ($startPoint[0] == $endPoint[0]) { // x values are equal
        // Vertical line
        if ($startPoint[1] < $endPoint[1]) {
            // ...drawn downward
            for ($i = $startPoint[1]; $i <= $endPoint[1]; $i++) {
                $board[$i][$startPoint[0]] += 1;
            }
        } else if ($startPoint[1] > $endPoint[1]) {
            // ...drawn upward
            for ($i = $startPoint[1]; $i >= $endPoint[1]; $i--) {
                $board[$i][$startPoint[0]] += 1;
            }
        }
    } else if ($startPoint[1] == $endPoint[1]) { // y values are equal
        // Horizontal line
        if ($startPoint[0] < $endPoint[0]) {
            // ...drawn rightward
            for ($i = $startPoint[0]; $i <= $endPoint[0]; $i++) {
                $board[$startPoint[1]][$i] += 1;
            }
        } else if ($startPoint[0] > $endPoint[0]) {
            // ...drawn leftward
            for ($i = $startPoint[0]; $i >= $endPoint[0]; $i--) {
                $board[$startPoint[1]][$i] += 1;
            }
        }
    }

    return $board;
}

function drawDiagonalLineOnBoard($board, $startPoint, $endPoint) {
    // Diagonal will always be on a 45-degree angle

    // Mark initial spot before moving cursor
    $board[$startPoint[1]][$startPoint[0]] += 1;

    $cursor = $startPoint;

    while ($cursor != $endPoint) {

        // Increment cursor
        if ($startPoint[0] < $endPoint[0]) {
            // Line is moving rightward
            if ($startPoint[1] < $endPoint[1]) {
                // and downward
                $cursor[0] += 1;
                $cursor[1] += 1;
            } else {
                // and upward
                $cursor[0] += 1;
                $cursor[1] -= 1;
            }
        } else {
            // Line is moving leftward
            if ($startPoint[1] < $endPoint[1]) {
                // and downward
                $cursor[0] -= 1;
                $cursor[1] += 1;
            } else {
                // and upward
                $cursor[0] -= 1;
                $cursor[1] -= 1;
            }
        }

        // Mark the board with the cursor point
        $board[$cursor[1]][$cursor[0]] += 1;

        // var_dump($board);
    }

    return $board;
}



function countOverlappingPoints($board) {
    $count = 0;

    foreach ($board as $y => $row) {
        foreach ($row as $x => $cell) {
            if ($cell > 1) {
                $count++;
            }
        }
    }

    return $count;
}


// Load file
$file = fopen('5.txt', 'r');

while (!feof($file))  {
    // Do something with the lines as they are read
    $result = trim(fgets($file));

    if ($result != '') { // Don't parse empty lines (e.g. last line of file)
        $lines[] = [
            explode(',', explode(' -> ', $result)[0]),
            explode(',', explode(' -> ', $result)[1]),
        ];
    }
}

fclose($file);


$board = initializeBoard(discoverGridWidth($lines), discoverGridHeight($lines));

// $squareLines = takeOnlySquareLines($lines); // i.e., no diagonals
//
// foreach ($squareLines as $squareLine) {
//     $board = drawSquareLineOnBoard($board, $squareLine[0], $squareLine[1]);
// }

foreach ($lines as $line) {
    $startPoint = $line[0];
    $endPoint = $line[1];

    if (lineIsSquare($startPoint, $endPoint)) {
        $board = drawSquareLineOnBoard($board, $startPoint, $endPoint);
    } else {
        $board = drawDiagonalLineOnBoard($board, $startPoint, $endPoint);
    }
}

// var_dump($board);

echo countOverlappingPoints($board) . "\n";

// $board = initializeBoard(5, 5);

// drawDiagonalLineOnBoard($board, [0,0], [2,2]);
