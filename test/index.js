'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;

const Itera = require('../lib/index');

const internals = {
    errorStatus: null
};

const step1 = function () {

    return new Promise((resolve, reject) => {

        if (internals.errorStatus === 'step1') {
            reject(new Error('step1 failed'));
        }


        resolve('SUCCESS: Get Path');
    });
};

const step2 = function () {

    return new Promise((resolve, reject) => {

        if (internals.errorStatus === 'step2') {
            reject(new Error('step2 failed'));
        }

        resolve('SUCCESS: Get FileName');

    });
};

const step3 = function (test) {

    return new Promise((resolve, reject) => {

        if (internals.errorStatus === 'step3') {
            internals.errorStatus = null;
            reject(new Error('step3 failed'));
        }
        // console.log('entered step3');
        // reject('boom');

        // reject(new Error('step3 failed'));
        resolve('SUCCESS: yielded all promises');
        // reject("An error occurred. Go to Camden.");
    });
};


const Generator = function * (callback) {

    // ERRORS AND YIELDING PROMISES
    // if a promise executes and resolves with an error.
    // The value of the error resolution "reject()" is place in the
    // variable associated with the yield at the execution of the next
    // promise.


    const path = yield step1(internals.errorStatus);

    if (path instanceof Error) {

        // console.log(typeof path);
        // console.log(path.message);
        // console.log(path.name);
        // console.log('ERROR');
        return callback(path, null);
    }

    // console.log(path);

    const fileName = yield step2(internals.errorStatus);

    if ( (fileName.name !== undefined) && (fileName.name === 'Error')) {

        // console.log(typeof fileName);
        // console.log(fileName.message);
        // console.log(fileName.name);
        // console.log('ERROR');
        return callback(fileName, null); // return stops generator & callback executes.
    }

    // console.log(fileName);
    // return; exits generator early if error exists.


    const read = yield step3(internals.errorStatus);

    if ( (read.name !== undefined) && (read.name === 'Error')) {

        // console.log(fileName.message);
        // console.log(fileName.name);
        // console.log(read);
        // console.log('ERROR');
        return callback(read, null); // return stops generator & callback executes.
    }

    // console.log(read);

    return callback(null, read);
};

const Generator2 = function * (callback) {

    // ERRORS AND YIELDING PROMISES
    // if a promise executes and resolves with an error.
    // The value of the error resolution "reject()" is place in the
    // variable associated with the yield at the execution of the next
    // promise.


    const path = yield step1(internals.errorStatus);

    if (path instanceof Error) {

        // console.log(typeof path);
        // console.log(path.message);
        // console.log(path.name);
        // console.log('ERROR');
        return callback(path, null);
    }

    // console.log(path);

    const boom = yield 'string to fail';
    // console.log(read);
    console.log(boom);

    return callback(null, read);
};

lab.experiment('proof', () => {

    lab.test('SUCCESS: yielded all promises', (done) => {

        const callback = function (err, result) {

            expect(err).to.not.exist();
            expect(result).to.equal('SUCCESS: yielded all promises');
            done();
        };

        Itera(Generator, callback);
    });

    lab.test('step1 failed', (done) => {

        internals.errorStatus = 'step1';

        const callback = function (err, result) {

            internals.errorStatus = null;

            expect(err).to.exist();
            expect(err.name).to.equal('Error');
            expect(err.message).to.equal('step1 failed');
            done();
        };

        Itera(Generator, callback);
    });

    lab.test('step2 failed', (done) => {

        internals.errorStatus = 'step2';

        const callback = function (err, result) {

            internals.errorStatus = null;

            expect(err).to.exist();
            expect(err.name).to.equal('Error');
            expect(err.message).to.equal('step2 failed');
            // console.log('done: ' + err + ' ' + result);

            done();
        };

        Itera(Generator, callback);
    });

    lab.test('step3 failed', (done) => {

        internals.errorStatus = 'step3';

        const callback = function (err, result) {

            internals.errorStatus = null;

            expect(err).to.exist();
            expect(err.name).to.equal('Error');
            expect(err.message).to.equal('step3 failed');
            done();
        };

        Itera(Generator, callback);
    });


    lab.test('abort itera must have callback set', (done) => {

        const callback = 'string to caused validation failure';


        const env = process.env.NODE_ENV;
        const write = process.stdout.write;
        const exit = process.exit;
        let output = '';

        process.exit = function () { };
        process.env.NODE_ENV = '';
        process.stdout.write = function (message) {

            output = message;
        };

        Itera(Generator, callback);

        process.env.NODE_ENV = env;
        process.stdout.write = write;
        process.exit = exit;

        expect(output).to.equal('ABORT: callback function must be set.\n\t\n');

        done();
    });

    lab.test('abort2 yielded functions must return promises', (done) => {

        const callback = function (err, result) {

            expect(err).to.equal('ABORT: yielded values must be functions that return promise.\n\t');
            done();

        };

        Itera(Generator2, callback);
    });
});


