const fs = require('fs');

try {
    var file = fs.readFileSync('6.txt', 'UTF-8');
} catch (error) {
    console.error(error);
}

let lines = file.split(/\r?\n/).slice(0, -1); // Removing the last empty line
let initialSchool = lines[0].split(',');


// Part A
// @todo  This is horribly inefficient with large sets.
//        Need to find O(n) solution (or at least not O(n^2))
class School {
    school: Array<number>;
    daysPassed: number;

    constructor(initialSchool: Array<number>) {
        this.school = initialSchool;
        this.daysPassed = 0;
    }

    spawnNewFish() {
        this.school = [...this.school, 8];
    }

    getSchoolSize() {
        return this.school.length;
    }

    passADay() {
        this.school.forEach((internalTimer, indexOfFish) => {
            // console.log(indexOfFish + ': ' + internalTimer);
            if (internalTimer == 0) {
                // Internal timer is over, so spawn a new fish and reset timer
                this.school[indexOfFish] = 6;
                this.spawnNewFish();
            } else {
                this.school[indexOfFish] = this.school[indexOfFish] - 1;
            }

        });
    }

    passDays(numberOfDays: number): void {
        for (let i = 0; i < numberOfDays; i++) {
            this.passADay();
            console.log(i + ': ' + this.getSchoolSize(), this.school);
        }
    }
}

// const lanternfish = new School(initialSchool);
// lanternfish.passDays(80);
// console.log(lanternfish.getSchoolSize());



// Part B

// Need to do this in linear or logrythmic time instead of exponential.
// Strategy:
// - Store the amount of fish in each state instead of storing
//   the state of each fish

class BetterSchool {

    amountOfFishAtGivenLifecycle: Array<number>;

    constructor(initialSchool: Array<number>) {
        this.amountOfFishAtGivenLifecycle = Array(9).fill(0);

        initialSchool.forEach(initialFish => {
            this.amountOfFishAtGivenLifecycle[initialFish] += 1;
        });

        // console.log('Initial school', this.amountOfFishAtGivenLifecycle);
    }

    passADay() {
        var amountOfFishSpawning: number = this.amountOfFishAtGivenLifecycle.shift() || 0;
        this.amountOfFishAtGivenLifecycle[6] += amountOfFishSpawning;
        this.amountOfFishAtGivenLifecycle = [...this.amountOfFishAtGivenLifecycle, amountOfFishSpawning];

        // console.log('After a day', this.amountOfFishAtGivenLifecycle);
    }

    passDays(numberOfDays: number): void {
        for (let i = 0; i < numberOfDays; i++) {
            this.passADay();
        }
    }

    getSchoolSize(): number {
        return this.amountOfFishAtGivenLifecycle.reduce((a, b) => a + b, 0);
    }
}

const betterSchool = new BetterSchool(initialSchool);

betterSchool.passDays(256);
console.log('ARRAY', betterSchool.amountOfFishAtGivenLifecycle);
console.log('SIZE', betterSchool.getSchoolSize());
