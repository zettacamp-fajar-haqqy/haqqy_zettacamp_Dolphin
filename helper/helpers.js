const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('../model/book')
const Counter = require('../model/counter')

const secretKey = process.env.API_KEY


let reminder = []
let notes = {}

let totalAll = 0
let targetMonth = 0
let addTerm = 0

let bookList = [                                // creating an array that contains objects
    {
        type : "65092c87f49a6acd383db30f",
        title : "Darling in the Franxx",
        price : 250000,
        genre : ["Romance", "Mecha"],
        author : "Kentaro Yabuki",
        stock : 15,
        purchased : 5
    },
    {
        type : "65092c87f49a6acd383db30f",
        title : "Berserk",
        price : 450000,
        genre : ["Dark", "Gore"],
        author : "Kentaro Miura",
        stock : 5,
        purchased : 20
    },  
    {
        type : "65092c87f49a6acd383db30f",
        title : "Jujutsu Kaisen",
        price : 300000,
        genre : ["Action", "Fantasy"],
        author : "Gege Akutami",
        stock : 25,
        purchased : 15
    },
    {
        type : "65092c87f49a6acd383db30f",
        title : "Kimetsu no Yaiba",
        price : 200000,
        genre : ["Action", "Fantasy"],
        author : "Koyoharu Gotouge",
        stock : 30,
        purchased : 10
    },
    {
        type : "65092c87f49a6acd383db30f",
        title : "Shingeki no Kyojin",
        price : 450000,
        genre : ["Gore", "Survival"],
        author : "Hajime Isayama",
        stock : 10,
        purchased : 20
    },
]

let manwhaList = [
    {
        type: "65094d2905296e1850610711",
        title: "Solo Leveling",
        price: 300000,
        genre: ["Action", "Fantasy"],
        author: "Chugong",
        stock: 20,
        purchased: 10
    },
    {
        type: "65094d2905296e1850610711",
        title: "Tower of God",
        price: 270000,
        genre: ["Action", "Adventure", "Fantasy"],
        author: "SIU",
        stock: 18,
        purchased: 8
    },
    {
        type: "65094d2905296e1850610711",
        title: "The God of High School",
        price: 260000,
        genre: ["Action", "Supernatural"],
        author: "Yongje Park",
        stock: 17,
        purchased: 7
    },
    {
        type: "65094d2905296e1850610711",
        title: "Unordinary",
        price: 240000,
        genre: ["Action", "Fantasy"],
        author: "Uru-Chan",
        stock: 22,
        purchased: 12
    },
    {
        type: "65094d2905296e1850610711",
        title: "True Beauty",
        price: 230000,
        genre: ["Romance", "Comedy", "Drama"],
        author: "Yaongyi",
        stock: 25,
        purchased: 15
    }
]

let manhuaList = [
    {
        title: "Tales of Demons and Gods",
        price: 250000,
        genre: ["Action", "Adventure", "Fantasy"],
        author: "Mad Snail",
        stock: 15,
        purchased: 5
    },
    {
        title: "The King's Avatar",
        price: 260000,
        genre: ["Action", "Adventure", "Fantasy"],
        author: "Butterfly Blue",
        stock: 18,
        purchased: 8
    },
    {
        title: "Douluo Dalu",
        price: 240000,
        genre: ["Action", "Adventure", "Fantasy"],
        author: "Tang Jia San Shao",
        stock: 17,
        purchased: 7
    },
    {
        title: "Apotheosis",
        price: 270000,
        genre: ["Action", "Fantasy"],
        author: "Ranzai Studio",
        stock: 16,
        purchased: 6
    },
    {
        title: "Martial Peak",
        price: 230000,
        genre: ["Action", "Adventure", "Fantasy"],
        author: "Momo",
        stock: 20,
        purchased: 10
    }
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
        if(book.stock < 1){             // if book stock is below 1 then book is sold out
            bookStatus = `${title} books is sold out, come back later.\n${totalItemPurchased} ${title} books sold.`
            break
        }
        totalPrice += price
        book.stock--
        book.purchased++
        totalItemPurchased++
    }

    if(book.stock > 0) {                // for showing if book still available for purchase
        bookStatus = `${title} books still available for puchase (${book.stock} left).\n${totalItemPurchased} ${title} books sold.`
    }

    return [totalPrice, bookStatus, totalItemPurchased]
}

let shoppingList = async (lists, payment) => {         // create a function to buy a multiple books n times
    let discount = 20                    
    const message = []                    // for showing message of current bill
    const notification = []               // for showing message of current stock of book
    const paymentStatus = payment[0]
    const creditMonth = payment[1]
    let paymentMessage = ""
    let allBookLog = []
    
    for(let x = 0; x < lists.length; x++){  // reading array from lists parameter
        for(let y = 1; y < lists[x].length; y++){ // reading array from array
            let book = lists[x][y-1]
            let reqBuy = lists[x][y]
            let buyProcess = purchaseBook(pickBook(book), reqBuy) // calling purchaseBook function
            message.push(`You have been purchased ${buyProcess[2]} books of ${JSON.stringify(pickBook(book).title)}, and your current bill is ${buyProcess[0].toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n`)
            notification.push(`\n${buyProcess[1]}\n`)
            totalAll += buyProcess[0]

            let bookLog = {}

            Object.assign(bookLog, {'title': pickBook(book).title, 'quantity': buyProcess[2], 'totalPrice' : buyProcess[0], 'totalBill' : totalAll})

            allBookLog.push(bookLog)
        }
    }

    if(paymentStatus.toLowerCase() === "credit"){

        try {
            const {reminder: reminderResult, taskFormat} = await generateMonthlyBill(totalAll, creditMonth, targetMonth, addTerm)
            reminder = reminderResult
            notes = taskFormat
            paymentMessage = ` We are pleased to inform you that we have implemented a credit payment system for your convenience, spanning a duration of ${creditMonth} months.\n To assist in ensuring the payment schedule is adhered to, we have thoughtfully prepared a reminder specifying the designated date and month for your payment starting from next month.`
        } catch (error){
            console.error(error)
        }

    } else {

        let afterDisc = totalAll - ((discount/100) * totalAll)

        paymentMessage = `Congratulations! We are pleased to inform you that you have qualified for a ${discount}% discount. Your total bill now is ${afterDisc}.`
    }

    // console.log(allBookLog)

    const reminderString = reminder.map(item => {
        const lines = []
        for(const key in item){
            lines.push(`${key}: ${item[key]}`)
        }
        return lines.join(". ")
    })

    const responseObject = {
        message: message.join("\n"),
        totalBill: totalAll.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
        paymentMessage: paymentMessage,
        reminder: reminderString.join("\n"),
        notification: notification.join("\n"),
        notes: notes
    }

    return responseObject

}

const generateMonthlyBill = async (totalAll, creditMonth, targetMonth, newValue) => {
    return new Promise((resolve, reject) => {
        try {

            let tempArr = []

            let monthlyBill = []

            let firstMonth = totalAll - ((Math.ceil((totalAll / creditMonth) / 1000) * 1000) * (creditMonth - 1))
            monthlyBill.push(firstMonth)

            for (let x = 0; x < creditMonth - 1; x++) {
                if(x === targetMonth - 1){
                    monthlyBill.push(parseInt(Math.ceil((totalAll / creditMonth) / 1000) * 1000) + parseInt(newValue))
                }
                monthlyBill.push(Math.ceil((totalAll / creditMonth) / 1000) * 1000);
            }

            let incr1 = 1
            let incr2 = 0

            for (let x = 0; x < creditMonth; x++) {
                let currentDate = new Date();
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                let cDay = currentDate.getDate()
                let cMonth = month[currentDate.getMonth() + incr1]
                let cYear = currentDate.getFullYear() + incr2

                let monthlyReminder = {}
                let invoice = `Invoice ${x + 1} due on`
                let dateInvoice = `${cDay} ${cMonth} ${cYear}`
                let monthlyInvoice = `The bill value is `
                let valueInvoice = `${monthlyBill[x]}`

                incr1++
                Object.defineProperties(monthlyReminder, {
                    [invoice]: {
                        value: dateInvoice,
                        enumerable: true,
                        writable: true
                    },
                    [monthlyInvoice]: {
                        value: valueInvoice,
                        enumerable: true,
                        writable: true
                    }
                });

                tempArr.push(monthlyReminder)

                if ((currentDate.getMonth() + incr1) % 12 === 0) {
                    incr1 = -7
                    incr2++
                }
            }

            reminder = tempArr

            // ========== TODAY TASK ==========

            const distinctTerm = []     // FOR STORE THE UNIQUE TERM AMOUNT
            const groupTerm = new Set()

            for(let x = 0; x < monthlyBill.length; x ++){
                if(!(groupTerm.has(monthlyBill[x]))){
                    groupTerm.add(monthlyBill[x])
                    distinctTerm.push(monthlyBill[x])
                }
            }

            let keyArr = []         // FOR STORE KEY OF FROM MAP
            let listTerm = {}       // FOR STORE LIST OF TERM FROM MAP
            let dateToPay = {}      // FOR STORE A RANDOM DATE TO PAY
            let taskFormat = {}     // FOR STORE AN OBJECT IN FORMAT LIKE THE EXAMPLE

            const invoiceMap = new Map()

            reminder.forEach((invoice) => {
                const key1 = Object.keys(invoice)[0]
                const value1 = Object.values(invoice)[0]    // DATE TERM

                const key2 = Object.keys(invoice)[1]
                const value2 = Object.values(invoice)[1]    // TERM AMOUNT

                const newKey = key1 + " " + value1
                const newValue = key2 + " " + value2

                keyArr.push(`${newKey}`)

                Object.assign(listTerm, { [value1] : {"term_amount" : value2, "date" : value1 }})

                invoiceMap.set(newKey, newValue)

            })

            let randomNumber = Math.floor(Math.random() * invoiceMap.size)

            Object.assign(dateToPay, {"term_amount" : invoiceMap.get(keyArr[randomNumber]), "date" : keyArr[randomNumber]})

            Object.assign(taskFormat, { "list_term_amount" : distinctTerm, "list_term" : listTerm, "date_to_pay" : dateToPay})

            // console.log(distinctTerm)
            // console.log(listTerm)
            // console.log(dateToPay)

            console.log(taskFormat)

            resolve({reminder, taskFormat})

        } catch (error) {
            reject(error)
        }
    })
}

const loadingMessage = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            let messageArr = []
    
            for(let x = 1; x <= 5; x++){
                messageArr.push(`Processing Data ${x}`)
                console.log(`Processing Data ${x}`)
                await new Promise(resolve => setTimeout(resolve, 2000))
                console.log(`Data ${x} has been proceed`)
                messageArr.push(`Data ${x} has been proceed`)
            }
            
            resolve(messageArr)
    
        } catch (error){
            reject(error)
        }
    })    
}

function countdown(second){
    const countdownInterval = setInterval(() => {
        console.log(`Sisa waktu token ${second} detik`)

        if(second < 1 ){
            clearInterval(countdownInterval)
            console.log(`Token expired`)
        }

        second--

    }, 1000)
}

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

//   console.log(token)

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  if(token.startsWith('Bearer ')){
    const modified = token.split(' ')[1]
    token = modified
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({ message: 'Token expired.' });
        } else {
          return res.status(401).send({ message: 'Invalid token.' });
        }
    }
    req.userId = decoded.id;
    next();
  });
}

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 }},
        { new:true, upsert:true}
    )

    return sequenceDocument.sequence_value

}

const addBook = async (typeBook) => {
    return new Promise(async (resolve, reject) => {
        try{
            for(const book of typeBook){
                const newBook = new Book({
                    type: book.type,
                    title: book.title,
                    price: book.price,
                    genre: book.genre,
                    author: book.author,
                    stock: book.stock,
                    purchased: book.purchased
                })

                await newBook.save()

            }

            resolve(`All books added successfully`)

        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    bookList,
    manwhaList,
    manhuaList,
    shoppingList,
    loadingMessage,
    generateMonthlyBill,
    countdown, 
    verifyToken,
    getNextSequenceValue,
    addBook
  }