/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

function hasUniqueCharacters(str) {
  // Your logic here
  str = str.toLowerCase().split('')     // Using str.lowercase to make it lowercase aphabets, 
  console.log(str)                      // and split to convert string to array
  const check = new Set()               // creating new javascript set for check unique character
  console.log(check)
  for(let x = 0; x < str.length; x++){  // read str array
    if(check.has(str[x])){              // checking if an array index x already in set or no
      return false                      // return false means, character or array index x is already
    }                                   // on set which is not unique anymore
    
    check.add(str[x])                   // adding new character to set
    console.log(check)

  }
  return true                           
}

// console.log(hasUniqueCharacters("abcdefg"));
console.log(hasUniqueCharacters("hello"))