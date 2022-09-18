// Palindrome
const palindromeText = "12321";
const palindromeChecker = (val) => {
  let splitted = val.split("");
  let reverseSplitted = [];
  for (let i = splitted.length - 1; i >= 0; i--) {
    reverseSplitted = [...reverseSplitted, splitted[i]];
  }
  console.log("REVERSE SPLITTED --->", reverseSplitted);
  let joinReverseSplitted = reverseSplitted.join("");

  if (palindromeText === joinReverseSplitted) {
    console.log("Is Palindrome!");
  } else {
    console.log("Is not a Palindrome!");
  }
};
palindromeChecker(palindromeText);

// Fibbonacci Series - 0 1 2 3 5 8 13
let n1 = 0;
let n2 = 1;
let nextNumber;

const fibbonacciSeries = () => {
  nextNumber = n1 + n2;
  n1 = n2;
  n2 = nextNumber;
  console.log("Next number in F --->", n2);
};
fibbonacciSeries();
fibbonacciSeries();
fibbonacciSeries();
fibbonacciSeries();
fibbonacciSeries();
fibbonacciSeries();

// Multiple function can call with same name.
let m;
a();
console.log("M Is --->", m);
function a() {
  return (m = "x");
}
console.log("M Is --->", m);
function a() {
  return (m = "y");
}
console.log("M Is --->", m);

// Duplicate Array
const array1 = [1, 2, 3, 4, 5];
console.log("Concat --->", array1.concat(array1), [...array1, ...array1]);

// FIZBUZZ Challenge
for (let i = 0; i < 100; i++) {
  let f = i % 3 === 0;
  let b = i % 5 === 0;
  console.log("fizzbuzz --->", f && b ? "FIZZBUZZ" : f ? "FIZZ" : "BUZZ");
}

// Anagrams
let str1 = "Army";
let str2 = "Malode";
let str1Converted = str1.toLowerCase().split("").sort().join("");
let str2Converted = str2.toLowerCase().split("").sort().join("");
console.log(
  "ANAGRAMSS -->",
  str1Converted === str2Converted ? "Anagram" : "Not Anagram"
);

// Counter using closure
function closureCounter(n) {
  let counter = 0;
  return {
    increment: function () {
      return (counter = counter + n);
    },
    renderCounter: function () {
      console.log("COUNT --->", counter);
    },
  };
}

let addCounter = closureCounter(9);
addCounter.increment();
addCounter.renderCounter();

// Hoisting in functions
var x = 31;
function a() {
  console.log("HOISTED X IN INNER FUNCTION --->", x);
  var x = 20;
}
a();

// Check if the give no. is prime
let isPrime = true;
const primeChecker = (num) => {
  if (num === 1) {
    console.log("No prime!");
  } else if (num > 1) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      console.log("Yes! prime");
    } else {
      console.log("No! Not Prime");
    }
  } else {
    console.log("No! Not prime");
  }
};
primeChecker(23);

// Call multiple api's at once using promise all.
const getUsers = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const response = await res.json();
  return response;
};

const getPhotos = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const response = await res.json();
  return response;
};

const getPosts = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const response = await res.json();
  return response;
};

const getContent = async () => {
  try {
    const response = await Promise.all(getUsers(), getPhotos(), getPosts());
    console.log("ALL CONTENT --->", response);
  } catch (error) {
    console.log("Error while resolving!");
  }
};

// getContent();

// Missing no. in the series
const input = "12356";
const lastNo = parseInt(input[input.length - 1]);
const splittedInput = input.split("");
const getSum = () => {
  return splittedInput.reduce((acc, no) => {
    return acc + parseInt(no);
  }, 0);
};
const highestSum = (lastNo * (lastNo + 1)) / 2;
const missingNo = highestSum - getSum();
console.log("Missing No -->", missingNo);

// Count of requested character in string
const text = `Hello I am Anirudh Namdevrao Malode. I am working as Senior Software Engineer at Altezzasys`;
const getCountofChar = (ch) => {
  let count = text.toLowerCase().split(ch).length - 1;
  console.log("Charater count is --->", count);
};
getCountofChar("l");

// Occurances of each character in string
const getOccurenceOfEachCharacter = () => {
  let chCount = {};
  let splittedText = text.toLowerCase().split("");
  for (let i = 0; i < splittedText.length; i++) {
    chCount[splittedText[i]] = !!chCount[splittedText[i]]
      ? chCount[splittedText[i]] + 1
      : 1;
  }
  console.log("COUNT OF EACH CHARACTER --->", chCount);
};
getOccurenceOfEachCharacter();

// Reverse string
const splitText = text.split(" ").reverse().join(" ");
console.log("SPLITTED TEXT --->", splitText);

// Remove duplicates from array
const mixArray = ["a", 1, 3, 6, 7, "b", "c", "e", "c", "b", 1, 6];
const removeDuplicated = mixArray.filter((e, i) => mixArray.indexOf(e) === i);
console.log("Remove Duplicates --->", removeDuplicated);

// Check if object is array
const arrrs = 5;
console.log("Is a array --->", Array.isArray(arrrs));

// Check if the number is integer
const isInteger = (n) => n % 1 === 0;
console.log("Is a Integer -->", isInteger(5));

// Largest sum pair in array
const ascOrderedArray = [25, 3, 58, 2, 4, 3, 7];
let temp;
for (let x = 0; x < ascOrderedArray.length; x++) {
  for (let y = x + 1; y < ascOrderedArray.length; y++) {
    if (ascOrderedArray[x] > ascOrderedArray[y]) {
      temp = ascOrderedArray[x];
      ascOrderedArray[x] = ascOrderedArray[y];
      ascOrderedArray[y] = temp;
    }
  }
}
let temp1 = ascOrderedArray.sort((a,b) => a - b);
console.log("Ascending --->", temp1);
console.log("Largest sum pair --->", ascOrderedArray[ascOrderedArray.length - 2], ascOrderedArray[ascOrderedArray.length - 1])
