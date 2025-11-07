import * as path from 'path';
import * as fs from 'fs';
import Mocha from 'mocha';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true
    });

    const testsRoot = path.resolve(__dirname, '.');

    return new Promise((c, e) => {
        // Add the test file directly
        mocha.addFile(path.resolve(testsRoot, 'extension.test.js'));

        try {
            // Run the mocha test
            mocha.run(failures => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        } catch (err) {
            e(err);
        }
    });
}