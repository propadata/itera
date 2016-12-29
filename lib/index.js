'use strict';

// ERRORS AND YIELDING PROMISES
// If a promise executes and resolves with an error explicity or implicitly, the resolved
// error value of the "reject()" method is yielded only when the next method of the following item
// is called.  Said another way, the next method of a iterator does not yield value until the
// following next() is executed.
//
// When the iterator throws an error, an error value is not immediately passed to the
// variable assigned to the yield expression of the promise in the generator. Hence, when an error
// in a promise is caught, we do not immediately throw an error but we signal an error
// by setting error.open value to "true" and call iterator.next. Executing iterator.next following
// an error causes the error message to be yielded to the variable assigned to the yield
// expression in the generator function.  When the next method is called, the program
// observes an error is open (error.open), then the iterator throws (iterator.throw) an error
// while beginning to process the next item of the iterator. The item after the error.
// This causes the generator function to stop executing but allow the error message to be
// yielded to the variable assigned to the promise in the generator.
//
// Did this because I prefer yielded values from promises in generator functions to be
// yielded regardless if it was resolved with or without errors. The JavaScript
// design yields resolved values when no errors exist. But, does not yield values when error
// messages are retruned explicitly or implicitly by a promise.
//
// console.log('ERROR -- moving to next PROMISE');
//
// iterator.throw(err)
// console.log(err);
// return err;
// iterator.throw(err);

const internals = {
    abort: false
};

internals.root = function (generator, callback) {

    internals.process = process;

    if (typeof callback !== 'function') {

        console.log('ABORT: callback function must be set.\n\t');
        process.exit(1);
    }

    const iterator = generator(callback);

    const error = {
        open: false,
        count: 0
    };

    const handle = function (iteratorResult) {

        if (iteratorResult.done) {
            return;
        }

        const iteratorValue = iteratorResult.value;

        if ((iteratorValue instanceof Promise) === false) {

            const errorMessage = 'ABORT: yielded values must be functions that return promise.\n\t';
            return callback(errorMessage, null);
        }

        iteratorValue.then((res) => {

            handle(iterator.next(res));


        }).catch((err) => {

            error.open = true;
            ++error.count;
            handle(iterator.next(err));
        });
    };

    handle(iterator.next());
};

module.exports = internals.root;
