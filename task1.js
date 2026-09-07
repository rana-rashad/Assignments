//part 1


//(1)
let x = "123" ;
let y = Number("123") + 7 ;
console.log(y);


//(2)
let value = 0;

if (!value) {
    console.log("Invalid");
}


//(3)
for (i=0; i<=10;i++){
    if (i%2==0 )
    continue ; 

    else{
        console.log(i);
    }
}


//(4)
let arr = [1,2,3,4,5]

let newarr = arr.filter((index)=> {
   return index % 2 == 0;
});

console.log(newarr);


//(5)
let a = [1,2,3]
let b = [4,5,6]
let result = [...a , ...b];

console.log(result);


//(6)
let daynum = 5;
let dayname ;

switch (daynum){
    case 1:
        dayname = "Sunday";
        break;

    case 2:
        dayname = "Monday";
        break;

    case 3:
        dayname = "Tuesday";
        break;

    case 4:
        dayname = "Wednesday";
        break;

    case 5:
        dayname = "Thursday";
        break;

    case 6:
        dayname = "Friday";
        break;

    case 7:
        dayname = "Saturday";
        break;

    default:
        dayname = "Please enter number from 1 to 7"
}


console.log(dayname);


//(7)
let wordList = ["a","ab","abc"] ;
let lengths = wordList.map ( word=> word.length);
console.log(lengths);



//(8)
 function checkDivison  (v){
    if (v%3 == 0 && v%5 == 0)
        return "Divisible by both";
    else if (v/3 == 0 || v/5 == 0)
        return "Divisible by one of them";
    else 
        return "Divisible by nothing of them";

}

console.log(checkDivison(15));



//(9)
const square = (number) => Math.pow(number,2) ;

console.log(square(5));


//(10)
function formatPerson(person) {
  const { name, age } = person;
  
  return name + ' is ' + age + ' years old';
}

const person = { name: 'John', age: 25 };
console.log(formatPerson(person)); 



//(11)
function sum(a, b, c, d, e) {
    return a + b + c + d + e;
}

console.log(sum(1, 2, 3, 4, 5));



//(12)
function success() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Success");
        }, 3000);
    });
}

success().then(function(message) {
    console.log(message);
});



//(13)
function largestNumber(numbers) {
    let largest = numbers[0];

    for (let number of numbers) {
        if (number > largest) {
            largest = number;
        }
    }

    return largest;
}

console.log(largestNumber([1, 3, 7, 2, 4]));



//(14)
function getKeys(human) {
    return Object.keys(human);
}

const human = {
    name: "John",
    age: 30
};

console.log(getKeys(person));



//(15)

function splitWords(text) {
    return text.split(" ");
}

console.log(splitWords("The quick brown fox"));





//part 2

//(1)
//forEach-> method used to go through all elements in an array 
//for..of-> loop used to go through all values of an array
//We use forEach for simple actions on every element
//We use for..of when we need more control like using break or continue
 
//(2)
//Hoisting means javascript moves variable and function declarations to the top before running the code ex:console.log(x); 
                                                                                                          //var x = 10;
//TDZ is the time before a let or const variable is declared we cannot use the variable during this time ex:console.log(x);
                                                                                                        //let x = 10;


//(3)
// == compares value only 
// === compares value and type

//(4)
//try-catch -> try contains the code that may have error , catch handles error if it happens
//It is important in async operations because errors can happen while waiting for a result it helps us handle these errors without stopping the whole program 


//(5)
// Conversion: the programmer changes the type by himself ex:Number("123");
// Coercion: javascript automatically change the type secretly ex:"1"+2;




