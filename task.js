let buyBook1 = 20
let buyBook2 = 10
let buyBook3 = 5

let creditCust = 7

const process = require('./function')

console.log(`\n Which book do you want to buy?\n
A. Darling in the Franxx\n
B. Berserk\n
C. Jujutsu Kaisen\n
D. Kimetsu no Yaiba\n
E. Shingeki no Kyojin\n`)

console.log(`${JSON.stringify(process.bookList)}`)

console.log(".................................................")
console.log(`\nUser \t: I want to buy ${buyBook1} books of ${process.pickBook("A").title}, 
then ${buyBook2} books of ${process.pickBook("C").title} , and ${buyBook3} books of ${process.pickBook("E").title}\n`)
console.log(".................................................")
console.log(`What method of payment do you prefer to use: cash or credit? (Enjoy a 20% cash payment discount)`)
console.log(".................................................")
console.log(`\nUser \t: I prefer using credit spreading the payments over a ${creditCust}-month period.\n`)
console.log(".................................................")
console.log(process.shoppingList([["A", buyBook1], ["C", buyBook2], ["E", buyBook3]], ["CREDIT", creditCust]))
// console.log(shoppingList([["A", 20], ["C", 10], ["E", 5]], ["CASH"]))
