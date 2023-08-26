/* ============= YESTERDAY TASK ============= */
let  book1 = "Kimetsu no Yaiba"
const book2 = "Berserk"

book1 = "Attack on Titan "
// book2 = "Darling in the Franxx"
// Commenting book2 above because const value cannot be change

let myFav = book1.concat(book2)
// Concat is a method that combine 2 strings.

let sentence = `I love reading ${book1} and ${book2}`

/* console.log(book1)
console.log(book2)
console.log(myFav)
console.log(sentence) */

/* ============= TODAY TASK ============= */

/* Task 1 */

console.log(`\t \t TASK 1 \n`)

// book1 = "Berserk"
// Using comparison to compare 2 string with return true if same, false if different 

const isSame = (book1 === book2) // Using new variable for comparing
// console.log(book1 == book2) // Comparing 2 string straight in console.log
console.log(`Is book 1 and book 2 same? ${isSame}`)

// Using comparison to compare 2 string with return true if different, false if same 

const isNotSame = (book1 !== book2) //
console.log(`Is book 1 and book 2 different? ${isNotSame}`)

/* Task 2 */
console.log(`\n \t \t TASK 2 \n`)

const book1Price = 750000
const book2Price = 400000

// Task A
console.log(`\n TASK 2A`)
const higherPice = book1Price > book2Price ? `Book 1 has higher price, which is ${book1Price}` : `Book 2 has higher price, which is ${book2Price}`
console.log(higherPice)

// Task B
console.log(`\n TASK 2B`)
const averagePrice = (book1Price + book2Price) / 2 // Using new variable to find average price
// console.log((book1Price + book2Price) / 2) // Find average price straign in console.log
console.log(`The average price of book 1 and book 2 is ${averagePrice}`)

// Task C
console.log(`\n TASK 2C`)
const isWorth = averagePrice > 500000 ? "Expensive" : "Cheap"
console.log(isWorth)

/* Logic Test */
console.log(`\n \t \t Logic Test \n`)

// Maximum of two numbers

let max_of_two = (a, b) => {
    return a > b ?  a : b > a ? b : "Number value is same"
}

console.log(max_of_two(7, 7))
console.log(max_of_two(10, 5))
console.log(max_of_two(45, 66))


/* Curriculum Achivement Goals */
console.log(`\n \t Curriculum Achivement Goals \n`)

// Able to assign new key into object
console.log(`\nAble to assign new key into object`)

let manga = {
    title : "Chainsaw Man",
    price : 75000,
    author : "Tatsuki Fujimoto",
    genre : ["Action", "Fantasy"],
}

// console.log before adding new key
console.log(manga)

// console.log(`This is manga before adding new key \n ${JSON.stringify(manga)}`)
// console.log("This is manga before adding new key \n " + manga)
// console.log(typeof JSON.stringify(manga))

// Adding new key into object (mange)
manga.studio = "MAPPA"
// console.log after adding new key
console.log(manga)

// Able to push an object into existing array
console.log(`\nAble to push an object into existing array`)

let mangaStore = []

// Adding previous manga to array named mangaStore
mangaStore.push(manga)

// Creating new object named manga2
let manga2 = {
    title : "Jujutsu Kaisen",
    price : 90000,
    author : "Gege Akutami",
    genre : ["Action", "Fantasy"],
    studio : "MAPPA"
}

// Adding manga2 to mangaStore
mangaStore.push(manga2)

console.log(mangaStore)

// Able to do mathematics operation
console.log(`\nAble to do mathematics operation \n`)

let number1 = Math.floor(Math.random() * 10)
let number2 = Math.floor(Math.random() * 10)

console.log(`Nilai dari variabel number1 adalah ${number1}`)
console.log(`Nilai dari variabel number2 adalah ${number2}`)
console.log("Hasil number1 ditambah number2 adalah ", + (number1 + number2))
console.log("Hasil number1 dikurangi number2 adalah ", + (number1 - number2))
console.log("Hasil number1 dikali number2 adalah ", + (number1 * number2))
console.log("Hasil number1 dibagi number2 adalah ", + (number1 / number2))

console.log(`\n Contoh penggunaan increment`)

let printNumber = (a) => {
    let final = []
    for(let x = 0; x <= a; x++){
        final.push(x)
    }
    return final
}

console.log(printNumber(10))

/* Thing that I want to ask */

// 1. When I want to console.log an object with template literal or +, it will show [object Object], does an object is in JSON format? Because its need JSON.stringify to make it look like string.

/* let bookStore = {
    title : "Chainsaw Man",
    price : 75000,
    author : "Tatsuki Fujimoto",
    genre : ["Action", "Fantasy"],
    manga2 : {
        title : "Jujutsu Kaisen",
        price : 90000,
        author : "Gege Akutami",
        genre : ["Action", "Fantasy"],
        studio : "MAPPA",
        manga2 : {
            title : "Jujutsu Kaisen",
            price : 90000,
            author : "Gege Akutami",
            genre : ["Action", "Fantasy"],
            studio : "MAPPA"
        }
    }
}

console.log(bookStore) */
