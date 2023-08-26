/* TODAY TASK */

let  book1 = "Kimetsu no Yaiba"
const book2 = "Berserk"

book1 = "Attack on Titan "
// book2 = "Darling in the Franxx"
// Commenting book2 above because const value cannot be change

let myFav = book1.concat(book2)
// Concat is a method that combine 2 strings.

let sentence = `I love reading ${book1} and ${book2}`

console.log(book1)
console.log(book2)
console.log(myFav)
console.log(sentence)


/* TRIAL AND ERROR */

// These are boolean type
const right = true
const wrong = false

// These are string type
const planet = "bumi"
let galaxy = "bimasakti"
let numberButString = "10"
const palindrome = "Race Car"


// These are number type
const sepuluh = 10
let angka = 10
let desimal = 5.5
var test1 = 11
var test1 = 11

// This is an array
let arr = ["Eren", "Mikasa", "Armin"]
arr[0] = "Reiner" // Change the value of arr index 0
arr[3] = "Bertholt" // Add new arr index 3 with value
arr.push("Levi") // Another way to add new value in array
arr[7] =  "Erwin"


// This is an object
let buku = {
    title : "Rich Dad Poor Dad",
    price : 75000
}
buku.price += 5000 // Change the value of price
buku.author = "Haki" // Add new property called author

// This is a function
let tambah  = (a, b) => {
    return a + b
}

let palindromCheck = (input) => {
    if(isNaN(input)) {
        input = input.replace(/[^a-zA-Z0-9]/ig, '').toLowerCase()
        const invert = input.split("").reverse().join("")
        if(input === invert){
            return "Word is palindrome"
        } else {
            return "Word is not palindrome"
        }
    } else {
        return "Please input a string"
    }
}

console.log(NaN + false)
console.log(arr)
console.log(typeof(arr + desimal)) // Everything that added to array or object with + will return as string
console.log(palindromCheck(palindrome))
/* console.log(tambah(sepuluh, + numberButString)) // Adding 2 + make the string become number
console.log(tambah(sepuluh, numberButString)) // Adding string to number will return string */