# itera

itera for promise iteration needs.

Mix generators and promises for better control flow.
Made this for my personal workflow. \n  Most likely [co](https://www.npmjs.com/package/co) will 
probably be a better solution for you.

If you do not understand JavaScript generators see:
* [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
* [Chapter 6 of this book](https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition)


### Example

```
const Generator = function * () {

    // ERRORS AND YIELDING PROMISES
    // if a promise executes and resolves with an error.
    // The value of the error resolution "reject()" is placed in the
    // variable associated with the yield.


    const path = yield getPath();

    if (path instanceof Error) {

        // HANDLE THE ERROR
        // console.log(path.message);
        // console.log(path.name);
        return; // exits the generator.
    }


    // path yield SUCCESS DO STUFF with path  

    console.log(path);

    const fileName = yield getFileName();

    if ( (fileName.name !== undefined) && (fileName.name === 'Error')) {

        // HANDLE THE ERROR
        // console.log(fileName.message);
        // console.log(fileName.name);
        console.log('ERROR');
        return; // exit the generator.
    }

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

Itera(Generator);
```


#### Credits
JavaScript Ninja Second Edition p. 159 listing-6.19.html 
* reworked the async() to implement my preferences on error handling
  and to get the code ready for use in my projects.
* Authors: John Resig, Bear Bibeault, Josip Maras

[co](https://www.npmjs.com/package/co)
* some inspiration came from co too.
* Authors: John Resig, Bear Bibeault, Josip Maras

;-)

