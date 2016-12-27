'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;

const Itera = require('../lib/index');

const internals = {
    errorStatus: null
};

const getPath = function () {

    return new Promise((resolve, reject) => {

        // reject(new Error("path does not exist"));

        resolve('SUCCESS: Get Path');
    });
};

const getFileName = function () {

    return new Promise((resolve, reject) => {

        if (internals.errorStatus === 'getFileName') {
            internals.errorStatus = null;
            reject(new Error('getFileName failed'));
        }

        resolve('SUCCESS: Get FileName');

    });
};

const readFile = function (test) {

    return new Promise((resolve, reject) => {

        if (internals.errorStatus === 'readFile') {
            internals.errorStatus = null;
            reject(new Error('readFile failed'));
        }
        // console.log('entered readFile');
        // reject('boom');

        // reject(new Error('readFile failed'));
        resolve('SUCCESS: readFile');
        // reject("An error occurred. Go to Camden.");
    });
};


const Generator = function * () {

    // ERRORS AND YIELDING PROMISES
    // if a promise executes and resolves with an error.
    // The value of the error resolution "reject()" is place in the
    // variable associated with the yield at the execution of the next
    // promise.


    const path = yield getPath(internals.errorStatus);

    if (path instanceof Error) {

        // console.log(typeof path);
        // console.log(path.message);
        // console.log(path.name);
        console.log('ERROR');
    }


    lab.experiment('path', () => {

        lab.test('yielded path value success', (done) => {

            expect(path).to.exist();
            expect(path).to.equal('SUCCESS: Get Path');
            done();
        });
    });


    console.log(path);

    const fileName = yield getFileName(internals.errorStatus);

    if ( (fileName.name !== undefined) && (fileName.name === 'Error')) {

        // console.log(typeof fileName);
        // console.log(fileName.message);
        // console.log(fileName.name);
        console.log('ERROR');
    }

    lab.experiment('getFileName error', () => {

        lab.test('yielded path value on error', (done) => {

            expect(fileName).to.exist();
            expect(fileName.message).to.equal('getFileName failed');
            done();
        });
    });


    console.log(fileName);
    // return; exits generator early if error exists.


    const read = yield readFile(internals.errorStatus);

    if ( (read.name !== undefined) && (read.name === 'Error')) {

        // console.log(typeof fileName);
        // console.log(fileName.message);
        // console.log(fileName.name);
        // console.log(read);
        console.log('ERROR');
    }

    console.log(read);

    return;
};

lab.experiment('proof', () => {

    lab.beforeEach((done) => {

        // Wait 1 second
        setTimeout(() => {

            internals.errorStatus = 'getFileName';
            Itera(Generator);
            done();
        }, 1000);
    });

    lab.test('test proof dev', (done) => {

        console.log('inside test');
        expect('inside test').to.exist('inside test');
        done();
    });
});
