/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */
function isPrime(n) {
  if(!isNaN(n)){
    if(n < 2){
      return `Number is Not Prime`
    } else {
      let square = Math.floor(Math.sqrt(n))
      for(let x = 2; x <= square; x++){
        if( n % x === 0){
          return `Number is Not Prime`
        }
      }
      return `Number is Prime`
    }
  } else {
    return "Please Input a Number"
  }
}

console.log(Math.floor(Math.sqrt(43)))
console.log(isPrime(10));
console.log(isPrime(43));

/* function isPrime(n) {
  if(!isNaN(n)){
    if(n < 2){
      return false
    } else {
      let square = Math.floor(Math.sqrt(n))
      for(let x = 2; x <= square; x++){
        if( n % x === 0){
          return false
        }
      }
      return true
    }
  } else {
    return "Please Input a Number"
  }
}

let checkPrime = (number) => {
  for(let x = 1; x <= number; x++){
    if(isPrime(x)){
      console.log(`${x} is a Prime Number`)
      continue
    } else {
      console.log(x)
    }
  }
} */

/* console.log(isPrime(10))
console.log(Math.sqrt(10))
checkPrime(30)
 */
