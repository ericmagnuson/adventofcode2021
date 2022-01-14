const fs = require('fs');

try {
    var file = fs.readFileSync('3.txt', 'UTF-8');
} catch (error) {
    console.error(error);
}

var lines = file.split(/\r?\n/).slice(0, -1); // Removing the last empty line

//  Part A
var gammaCount = [];
var epsilonCount = [];
var zeroBitCounts = Array(lines[0].length).fill(0); //12

lines.forEach((line, index) => {
    // console.log('Parsing line', line);

    line.split('').forEach((bit, index) => {
        if (bit == '0') {
            zeroBitCounts[index] += 1;
        }
    });
});

zeroBitCounts.forEach((zeroBitCount, index) => {
    if (zeroBitCount > (lines.length / 2)) {
        // More zeroes than ones for this bit
        // console.log('More zeroes');
        gammaCount[index] = 1;
        epsilonCount[index] = 0;
    } else {
        // console.log('More ones');
        gammaCount[index] = 0;
        epsilonCount[index] = 1;
    }
});

console.log('part a: gamma', parseInt(gammaCount.join(''), 2));
console.log('part a: epsilon', parseInt(epsilonCount.join(''), 2));

// Part B
function findRating(bitToCheck, lines, ratingType) { // ratingType == 'co2' or 'o2'

    // Debug
    // console.log('Checking lines for', ratingType);
    // console.log('Parsing lines', lines);
    // console.log('Checking bit at index', bitToCheck);

    // Break case
    if (lines.length == 1) {
        // Solution found!
        console.log('Found the ' + ratingType + ' rating', parseInt(lines[0], 2));
        return parseInt(lines[0], 2);
    }
    // Prevent fall-off
    if (bitToCheck >= lines[0].length) {
        return 'fallen off';
    }

    // Recursive case
    else {
        // Need to filter out lines we don't need
        // before checking against next bit in line

        var hasZeroes = Array();
        var hasOnes = Array();

        lines.forEach((line, index) => {
            // console.log('Sorting line', line);
            // console.log('Current bit', line[bitToCheck]);

            if (line[bitToCheck] == '0') {
                hasZeroes.push(line);
            } else {
                hasOnes.push(line);
            }
        });

        // console.log('hasZeroes', hasZeroes);
        // console.log('hasOnes', hasOnes);

        // For o2, take most common
        // For co2, take least common
        //
        // Note: we could simplifiy the if statements below, but I'm not going to
        // at the moment for the sake of readability.
        if (hasZeroes.length == hasOnes.length) {
            // If zeroes and ones are seen the same amount of time,
            // keep the ones for the oxygenGenerator rating
            // and the zeroes for the CO2Scrubber rating

            if (ratingType == 'o2') {
                return findRating(bitToCheck + 1, hasOnes, 'o2');
            } else {
                return findRating(bitToCheck + 1, hasZeroes, 'co2');
            }
        } else if (hasZeroes.length > hasOnes.length) {
            // zeroes are more common
            // ones are less common

            if (ratingType == 'o2') {
                return findRating(bitToCheck + 1, hasZeroes, 'o2');
            } else {
                return findRating(bitToCheck + 1, hasOnes, 'co2');
            }

        } else {
            // ones are more common
            // zeroes are less common

            if (ratingType == 'o2') {
                return findRating(bitToCheck + 1, hasOnes, 'o2');
            } else {
                return findRating(bitToCheck + 1, hasZeroes, 'co2');
            }
        }
    }
}

// findRating(0, lines, 'o2');
// findRating(0, lines, 'co2');

console.log('Life support rating', findRating(0, lines, 'o2') * findRating(0, lines, 'co2'));
