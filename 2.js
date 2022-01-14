const fs = require('fs');

// Part A
try {
    // read contents of the file
    const data = fs.readFileSync('2.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    var x = 0;
    var y = 0;

    // print all lines
    lines.forEach((line) => {
        var controls = line.split(' ');
        var direction = controls[0];
        var magnitude = parseInt(controls[1]);

        if (controls.length == 2) {

            switch (direction) {
                case 'forward':
                    x += magnitude;
                    break;

                case 'down':
                    y += magnitude;
                    break;

                case 'up':
                    y += -magnitude;
                    break;

                // no default
            }


            console.log(direction + ' ' + magnitude);
            console.log('x', x);
            console.log('y', y);
        }
    });

    console.log('Result', x * y);

} catch (err) {
    console.error(err);
}

// Part B
try {
    // read contents of the file
    const data = fs.readFileSync('2.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    var x = 0;
    var y = 0;
    var aim = 0;

    // print all lines
    lines.forEach((line) => {
        var controls = line.split(' ');
        var direction = controls[0];
        var magnitude = parseInt(controls[1]);

        if (controls.length == 2) {

            switch (direction) {
                case 'forward':
                    x += magnitude;

                    if (aim != 0) {
                        y += (aim * magnitude);
                    }

                    break;

                case 'down':
                    aim += magnitude;
                    break;

                case 'up':
                    aim += -magnitude;
                    break;

                // no default
            }


            console.log(direction + ' ' + magnitude);
            console.log('x', x);
            console.log('y', y);
            console.log('aim', aim);
        }
    });

    console.log('Result', x * y);

} catch (err) {
    console.error(err);
}
