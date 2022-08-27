const array1 = [1, 2, 3, 4, 5];
console.log("Concat --->", array1.concat(array1), [ ...array1, ...array1 ]);

// =============================================================================================

// Function scope --> var
function calculate (){
    for(var i=0; i<5; i++){
        console.log('Value of i is -->', i);
    }
    console.log("Variable out of functional scope -->", i); // Shows output 5
}

calculate();

// Block scope --> let
function calculate (){
    for(let i=0; i<5; i++){
        console.log('Value of i is -->', i);
    }
    // console.log("Variable out of functional scope -->", i); // Shows error
}

calculate();

// =============================================================================================

// Closure 1
console.log("Closure using multiply --->", mul(2)(3)(4));
function mul(x){
    return function(y){
        return function(z){
            return x * y * z;
        }
    }
}

// Closure 2 --> Proper
function getbase(baseNumber){
    return function(n){
        return baseNumber * n;
    }
}
var multiplyNumber = getbase(9);
console.log("Closure 2 --->", multiplyNumber(26));

// ==============================================================================================

// Fizzbuzz Challenge
for(let i=0; i<100; i++){
    let f = i%3 === 0;
    let b = i%5 === 0;

    console.log(f && b ? "FIZZBUZZ" : (f ? "FIZZ" : "BUZZ"));
}

// ==============================================================================================

// If 2 strings are anagrams of each other
const first = "Army";
const second = "Mary";

let a = first.toLowerCase().split("").sort().join("");
let b = second.toLowerCase().split("").sort().join("");
console.log("Is Anagram --->", a === b);

// ==============================================================================================

// Create _counter using closure
function privateCounter(){
    let _counter = 0;
    return {
        add: function(N){
            return _counter += N;
        },
        retrieve: function(){
            console.log("Current _counter is --->", _counter);
        }
    }
}

var getCounter = privateCounter();
getCounter.add(109);
getCounter.retrieve();

// ==============================================================================================

// var, let & const
// Var --> Function scoped
// Let, Const --> Block Scoped
function sayHello(){
    // By using var --> Having function scope --> so, variable can be accessed anywhere inside function
    // for(var i=0; i<5; i++){
    //     if(true){
    //         console.log("I is --->", i);
    //     }
    // }
    // console.log("I outside of for loop accessible --->", i);
    // if(true){
    //     console.log("I inside if block -->", i)
    // }


    // By using let --> Having Block scope --> so, variable can be accessed only inside of for loop
    // for(let i=0; i<5; i++){
    //     if(true){
    //         console.log("I is --->", i);
    //     }
    // }
    // console.log("I outside of for loop accessible --->", i);
    // if(true){// Function scope --> var
function calculate (){
    for(var i=0; i<5; i++){
        console.log('Value of i is -->', i);
    }
    console.log("Variable out of functional scope -->", i);
}

calculate();
    //     console.log("I inside if block -->", i)
    // }
}
sayHello();

// ==============================================================================================

// Callbacks --> Function that will be passed to another one to be called conditionally.
let posts = [
    {title: 'Post One'},
    {title: 'Post Two'}
];

function getPosts(abc){
    setTimeout(() => {
        console.log("POSTS ARE --->",posts, abc);
    });
};

function createPosts(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 1000)
};

createPosts({title: 'Post Three'}, getPosts);

// Promise 1
function createPostsThroughPromise(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            if(posts.length > 0){
                console.log("Promise is getting resolved");
                resolve();
            }else{
                reject();
            }
        },5000)
    })
};

createPostsThroughPromise({title: 'Post Four'}).then(getPosts(1234567)); 

// Promise 2
fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
.then((res) => res.json())
.then((data) => console.log("Data --->", data))
.catch((err) => console.log("Errror --->", err));

// Asyn await 1 --> To get resolve from createPostsThroughPromise
const createPostsThroughAsyncAwait = async(post) =>{
    await createPosts(post);
    getPosts();
}
createPostsThroughAsyncAwait({title: 'Post Five'})


// Async await 2
const fetchPokemonDitto = async() => {
    try {
        const apicall = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        const data = await apicall.json();
        console.log("DATA FOR ASYNC AWAIT --->", data);
    } catch (error) {
        console.log("ASYNC AWAIT EROOR --->", error)
    }
}
fetchPokemonDitto();

// ==============================================================================================

// Object & Array are non-primitive --> Reference based
let person = new Object();
person['firstname'] = "Anirudh";
console.log("PERSON IS --->", person);
person['address'] = new Object();
person['address']['state'] = "MH";

let arr = [1, 2, 3];
console.log("ARR IS --->", arr);
arr.push(7);

// ==============================================================================================

// Call --> To call properties of one object on outer function.
// Do not create a copy --> Just accepts the arguments.
function callMethod(c){
    console.log(this.a + this.b + c);
}
let obj = {
    a: 1,
    b: 2
}
callMethod.call(obj, 3);

// Apply --> To be used for converting Array into arguments.
// Do not create a copy --> Just accepts array.
// e.g, Math.min from JS accepts only arguments not an array.
let applyArr = [1, 2, 4, 6, 7, 9];
const minNum = Math.min.apply(null, applyArr); // Here the args set to null at first.
console.log("MINIMUM -->", minNum);

// Bind --> To bind functionality to an object.
// Creates a copy. So, need to invoke again.
const bindObj = {
    asyncGet: function(cb){
        cb();
    },
    parseGet: function(){
        console.log("PARSE CALLED");
    },
    render: function(){
        this.asyncGet(function(){
            this.parseGet();
        }.bind(this)) // If we donot bind this --> will result in parseGet not defined.
    }
};
bindObj.render();

// ==============================================================================================

// Arrow vs Normal Function
// 1. Arrow function does not have its own functional this. It will make use of global this only.
// 2. Arrow function does not have arguments method in-built. While we can use spread(...) operator.
function noGlobalThis(){
    this.val = 1;
    setTimeout(function () {
    // setTimeout(() => { // do not have its own this so, increments
        this.val++; // Point 1 --> Normal function creates its own this for each function --> So, not incremented.
        console.log("UPDATED VAL --->", this.val);
    }, 1000);
}
noGlobalThis();

function inBuiltArguments(){
// let inBuiltArguments = (...num) => { // Point 2
    console.log("Arguments", arguments);
    // console.log("Arguments with arrow", num);
}
inBuiltArguments(1,2,3,4,5,6,7,8,9)

// ==============================================================================================

// iterators --> Each iterable element have Symbol.iterator() inbuilt function into its __proto__
let myArray = [1, 2, 3];
for(let val of myArray){ // for of --> for iterables
    console.log("ITERABLES --->", val);
}

let myObj = {
    a: 1,
    b: 2,
    c: function (){
        console.log("myObj")
    }
}
for(let key in myObj){ // for in --> for not iterables
    console.log("NOT ITERABLES --->", key)
}

let iterator = myArray[Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: false}

// ==============================================================================================

// Generators --> Provides same value as iterator. But, after each .next generator pauses the execution & maintains the state
function *infiniteGenerator(){
    let i = 0;
    while(true){
        yield i;
        i++;
    }
};
let generatorIterator = infiniteGenerator();
console.log("Generator", generatorIterator.next());
console.log("Generator", generatorIterator.next());
console.log("Generator", generatorIterator.next());
console.log("Generator", generatorIterator.next());