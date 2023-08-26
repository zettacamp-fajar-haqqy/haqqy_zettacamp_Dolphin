let bookList = [                                // creating an array that contains objects
    {
        title : "Darling in the Franxx",
        price : 250000,
        genre : ["Romance", "Mecha"],
        author : "Kentaro Yabuki",
        stock : 15,
        purchased : 5
    },
    {
        title : "Berserk",
        price : 450000,
        genre : ["Dark", "Gore"],
        author : "Kentaro Miura",
        stock : 5,
      purchased : 20
    },  
    {
        title : "Jujutsu Kaisen",
        price : 300000,
        genre : ["Action", "Fantasy"],
        author : "Gege Akutami",
        stock : 25,
        purchased : 15
    },
    {
        title : "Kimetsu no Yaiba",
        price : 200000,
        genre : ["Action", "Fantasy"],
        author : "Koyoharu Gotouge",
        stock : 30,
        purchased : 10
    },
    {
        title : "Shingeki no Kyojin",
        price : 450000,
        genre : ["Gore", "Survival"],
        author : "Hajime Isayama",
        stock : 10,
        purchased : 20
    },
]

let pickBook = (pick) => {          // create a function to select the book to be purchased
    switch(pick){
        case "A" :
            return bookList[0]
        case "B" :
            return bookList[1]
        case "C" :
            return bookList[2]
        case "D" :
            return bookList[3]
        case "E" :
            return bookList[4]
    }
}

let purchaseBook = (book, reqBuy) => {  // create a function to buy a book n times
    const title = book.title
    const price = book.price
    let totalPrice = 0                  // total price for 1 type of book
    let totalItemPurchased = 0          // total item that purchased
    let bookStatus = ""                 // for showing if book still available or no
    for(let x = 0; x < reqBuy; x++){    
        totalPrice += price
        book.stock--
        book.purchased++
        totalItemPurchased++
        if(book.stock < 1){             // if book stock is below 1 then book is sold out
            bookStatus = `${title} books is sold out, come back later.\n${totalItemPurchased} ${title} books sold.`
            break
        }
    }

    if(book.stock > 0) {                // for showing if book still available for purchase
        bookStatus = `${title} books still available for puchase (${book.stock} left).\n${totalItemPurchased} ${title} books sold.`
    }

    return [totalPrice, bookStatus, totalItemPurchased]
}

let shoppingList = (lists) => {         // create a function to buy a multiple books n times
    let totalAll = 0                    // total bill of all books that already purchased
    let message = []                    // for showing message of current bill
    let notification = []               // for showing message of current stock of book
    for(let x = 0; x < lists.length; x++){  // reading array from lists parameter
        for(let y = 1; y < lists[x].length; y++){ // reading array from array
            let book = lists[x][y-1]
            let reqBuy = lists[x][y]
            let buyProcess = purchaseBook(pickBook(book), reqBuy) // calling purchaseBook function
            message.push(`\nYou have been purcased ${buyProcess[2]} books of ${JSON.stringify(pickBook(book).title)}, and your current bill is ${buyProcess[0]}\n`)
            notification.push(`\n${buyProcess[1]}\n`)
            totalAll += buyProcess[0]
        }
    }

    message = message.join("")
    notification = notification.join("")

    return `${message} \n
    Your total bill is ${totalAll}\n
    \t=== NOTIFICATION ===
    ${notification}`
}

let buyBook1 = 20
let buyBook2 = 10
let buyBook3 = 5

// console.log(pickBook("A"))

console.log(`\n Which book do you want to buy?\n
A. Darling in the Franxx\n
B. Berserk\n
C. Jujutsu Kaisen\n
D. Kimetsu no Yaiba\n
E. Shingeki no Kyojin\n`)

console.log(".................................................")
console.log(`\nI want to buy ${buyBook1} books of ${pickBook("A").title}, 
then ${buyBook2} books of ${pickBook("C").title} , and ${buyBook3} books of ${pickBook("E").title}\n`)
console.log(".................................................")
console.log(shoppingList([["A", 20], ["C", 10], ["E", 5]]))
