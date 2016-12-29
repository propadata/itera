# itera

[![npm version](https://badge.fury.io/js/itera.svg)](http://badge.fury.io/js/itera)
[![Build Status](https://travis-ci.org/zoe-1/itera.svg?branch=master)](https://travis-ci.org/zoe-1/itera)


itera for promise iteration needs.
Mix generators and promises for better control flow.
Made this for my personal workflow. Most likely [co](https://www.npmjs.com/package/co) will 
be a better solution for you.

If you do not understand JavaScript generators see:
* [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
* [Chapter 6 of this book](https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition)


### Example

#### NOTE: below step1() step2() step3() functions all return promises.

see tests for code that matches the README.  

```


const Generator = function * () {

    // ERRORS AND YIELDING PROMISES
    // if a promise executes and resolves with an error.
    // The value of the error resolution "reject()" is placed in the
    // variable associated with the yield.

    const result1 = yield step1();

    if (result1 instanceof Error) {

        // console.log(typeof result1);
        // console.log(result1.message);
        // console.log(result1.name);
        // console.log('ERROR');
        return callback(result1, null);
    }


    // result1 yield SUCCESS DO STUFF with result1  

    console.log(result1);

    const result2 = yield step2();

    if ( (result2.name !== undefined) && (result2.name === 'Error')) {

        // HANDLE THE ERROR
        // console.log(result2.message);
        // console.log(result2.name);
        console.log('ERROR');
        return; // exit the generator.
    }

    console.log(result2);
    // return; exits generator early if error exists.


    const result3 = yield step3();

    if ( (result3.name !== undefined) && (result3.name === 'Error')) {

        // console.log(typeof result3);
        // console.log(result3.message);
        // console.log(result3.name);
        // console.log(result3);
        console.log('ERROR');
    }

    console.log(result3);

    return;
};

const callback = function (err, result) {

    // do stuff after generator is complete.

};

Itera(Generator, callback);
```


#### Credits
JavaScript Ninja Second Edition p. 159 listing-6.19.html 
* reworked the async() to implement my preferences on error handling
  and to get the code ready for use in my projects.
* Authors: John Resig, Bear Bibeault, Josip Maras

[co](https://www.npmjs.com/package/co)
* some inspiration came from co too.
* Authors: @tjholowaychuk & @jonathanong 

;-)

