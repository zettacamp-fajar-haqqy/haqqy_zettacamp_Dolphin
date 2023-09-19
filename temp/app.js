const express = require('express')
const basicAuth = require('express-basic-auth')
const { exec } = require('child_process')
const moment = require('moment')
var fs = require('fs')
const path = require('path')
const app = express()
app.use(express.json())
const port = 4000

let reminder = []
let notes = {}

// let finalTotal = 0

// let finalCredit = 0

let totalAll = 0
let targetMonth = 0
let addTerm = 0

let bookList = [                                // creating an array that contains objects
    {
        id : 1,
        title : "Darling in the Franxx",
        price : 250000,
        genre : ["Romance", "Mecha"],
        author : "Kentaro Yabuki",
        stock : 15,
        purchased : 5
    },
    {
        id : 2,
        title : "Berserk",
        price : 450000,
        genre : ["Dark", "Gore"],
        author : "Kentaro Miura",
        stock : 5,
      purchased : 20
    },  
    {
        id : 3,
        title : "Jujutsu Kaisen",
        price : 300000,
        genre : ["Action", "Fantasy"],
        author : "Gege Akutami",
        stock : 25,
        purchased : 15
    },
    {
        id : 4,
        title : "Kimetsu no Yaiba",
        price : 200000,
        genre : ["Action", "Fantasy"],
        author : "Koyoharu Gotouge",
        stock : 30,
        purchased : 10
    },
    {
        id : 5,
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
    
    for(let x = 0; x < lists.length; x++){  // reading array from lists parameter
        for(let y = 1; y < lists[x].length; y++){ // reading array from array
            let book = lists[x][y-1]
            let reqBuy = lists[x][y]
            let buyProcess = purchaseBook(pickBook(book), reqBuy) // calling purchaseBook function
            message.push(`You have been purchased ${buyProcess[2]} books of ${JSON.stringify(pickBook(book).title)}, and your current bill is ${buyProcess[0].toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n`)
            notification.push(`\n${buyProcess[1]}\n`)
            totalAll += buyProcess[0]
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

            // finalTotal = totalAll
            // finalCredit = creditMonth

            // if ((targetMonth == undefined || targetMonth == null) && (newValue == 'undefined' && newValue == null)) {
            //     newValue = 0
            // }

            let tempArr = []

            let monthlyBill = [];

            let firstMonth = totalAll - ((Math.ceil((totalAll / creditMonth) / 1000) * 1000) * (creditMonth - 1));
            monthlyBill.push(firstMonth);

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

let originalBookList = bookList.map(book => ({...book}))

const username = 'haki'
const password = 'zettacamp'

// FUNGSI UNTUK AUTENTIKASI

app.use(basicAuth({
    users: { [username] : password},
    challenge: true,
    unauthorizedResponse: 'Username atau password salah'
})) 

// FUNGSI UNTUK MELIHAT PROSES MENGGUNAKAN AWAIT

app.get('/message-await', async (req, res) => {
    
    // console.time('loadingMessage')
    // const startTime = Date.now()
    // const message = await loadingMessage()
    // const endTime = Date.now()
    // console.timeEnd('loadingMessage')

    const before = moment()
    const message = await loadingMessage()
    const after = moment()
    console.log(`${after.diff(before)} ms`)

    const executionTime = `Data proceed ${after.diff(before)} ms\n\n`
    // const executionTime = `Data proceed ${endTime - startTime} ms\n\n`

    const file = './await-report.txt'

    message.push(executionTime)

    // console.log(message)

    // fs.writeFileSync(file, showArr.join("\n"), { flag: 'a+' })
    
    res.send(`Data proceed with await`)

    try {

        if(fs.existsSync(file)){

            console.log(`Adding report to existing file`)
            await fs.promises.appendFile(file, message.join('\n'), 'utf8')
            console.log(`Report has been added to ${path.basename(file)}`)
            
        } else {

            console.log(`Writing report to file`)
            await fs.promises.writeFile(file, message.join('\n'), 'utf8')
            console.log(`File has been written`)
            
        }

        exec(path.basename(file), (error, stdout, stderr) => {
            if (error) {
              console.error(`Error opening file in VSCode: ${error}`)
              return
            }
            console.log(`File opened in VSCode`)
          })

    } catch (err){
        console.error(err)
        res.status(500).send(`Internal server error.`)
    }

})

// FUNGSI UNTUK MELIHAT PROSES TANPA MENGGUNAKAN AWAIT

app.get('/message-nonawait', async (req, res) => {

    // console.time('loadingMessage')
    // const startTime = Date.now()
    // const messagePromise = loadingMessage()
    // const endTime = Date.now()
    // console.timeEnd('loadingMessage')

    const before = moment()
    const messagePromise = loadingMessage()
    const after = moment()
    console.log(`${after.diff(before)} ms`)

    // const executionTime = `Data proceed ${endTime - startTime} ms\n\n`
    const executionTime = `Data proceed ${after.diff(before)} ms\n\n`

    const file = './nonawait-report.txt'

    res.send(`Data proceed without await`)  

    messagePromise.then((message) => {

        message.push(executionTime)

        try {

            if(fs.existsSync(file)){
    
                console.log(`Adding report to existing file`)
                fs.promises.appendFile(file, message.join('\n'), 'utf8')
                console.log(`Report has been added to ${path.basename(file)}`)
                
            } else {
    
                console.log(`Writing report to file`)
                fs.promises.writeFile(file, message.join('\n'), 'utf8')
                console.log(`File has been written`)
                
            }
    
            exec(path.basename(file), (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error opening file in VSCode: ${error}`)
                  return
                }
                console.log(`File opened in VSCode`)
              })
    
        } catch (err){
            console.error(err)
            res.status(500).send(`Internal server error.`)
        }

    })
    
})

// FUNGSI UNTUK MENGHAPUS FILE

app.post('/message-delete', (req, res) => {

    try{

        const file = req.body.file

        console.log(file)

        // console.log(`Deleting an ${file} file`)

        // const files = ['await-report.txt', 'nonawait-report.txt']

        fs.unlink(file, err => {
            if(err) return console.error(err)
        })
        console.log(`File ${file} deleted successfully`)
        res.send(`File ${file} deleted successfully`)

        // files.forEach(file => {
        //     fs.unlink(file, err => {
        //         if(err) return console.error(err)
        //     })
        //     console.log(`File ${file} deleted successfully`)
        
        // })

    } catch(err){
        console.error(err)
    }

    
})

// FUNGSI UNTUK MEMBELI BUKU (MENJALANKAN TASK KEMARIN)

app.post('/beli-buku', async (req, res) => {
    const {n_month, lists, payment, newValue} = req.body

    if((!isNaN(n_month)) && (!isNaN(newValue))){

        targetMonth = n_month

        addTerm = newValue

        parseInt(targetMonth)

        if (isNaN(targetMonth) && targetMonth < 0 ) {
            return res.status(400).json({ error: 'Invalid Target Month' })
        }
    
        if (!newValue) {
            return res.status(400).json({ error: 'New value is required' })
        }
    
        // const oldValue = reminder[targetMonth]['The bill value is ']
        
        try {
            const finalResult = await shoppingList(lists, payment)
            
            res.json({ result: finalResult })

            // res.json({ message: 'Bill values updated successfully', reminder: updatedBill })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        try {

        targetMonth = 0

        addTerm = 0

            const finalResult = await shoppingList(lists, payment)
            res.json({ result: finalResult })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }


})

// FUNGSI UNTUK MELIHAT TAGIHAN BUKU

app.get('/tagihan-buku', (req, res) => {
    const reminderArr = reminder.map(item => {
        const lines = []
        for(const key in item){
            lines.push(`${key}: ${item[key]}`)
        }
        return lines.join(". ")
    })

   const reminderObj = {
    bill: reminderArr
   }

    res.send(reminderObj)
})

// FUNGSI UNTUK MENAMBAHKAN BUKU

app.post('/tambah-buku', (req, res) => {
    const newBook = {
        id: bookList.length + 1,
        title: req.body.title,
        price: req.body.price,
        genre: req.body.genre,
        author: req.body.author,
        stock: req.body.stock,
        purchased: req.body.purchased
    }

    bookList.push(newBook)

    res.send('Buku berhasil diubah')

})

// FUNGSI UNTUK MENGEDIT BUKU

app.put('/edit-buku/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const newTitle = req.body.title
    const newPrice = req.body.price
    const newGenre = req.body.genre
    const newAuthor = req.body.author
    const newStock = req.body.stock
    const newPurchased = req.body.purchased

    const book = bookList.find(book => book.id === id)

    if(!book){
        return res.status(404).send('Book not found!')
    }

    book.title = newTitle
    book.price = newPrice
    book.genre = newGenre
    book.author = newAuthor
    book.stock = newStock
    book.purchased = newPurchased

    res.send('Buku berhasil diubah')

})

// FUNGSI UNTUK MENGHAPUS BUKU

app.delete('/hapus-buku/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = bookList.findIndex(book => book.id === id)

    if(index === -1){
        return res.status(404).send(`Buku tidak ditemukan`)
    }

    bookList.splice(index, 1)

    res.send(`Buku berhasil dihapus`)

})

// FUNGSI UNTUK MELIHAT BUKU

app.get('/list-buku', (req, res) => {

    res.json({
        originalBookList: originalBookList,
        updatedBook: bookList
    })
})

// FAIL TASK

app.post('/test-generateMonthlyBill', async(req, res) => {
    const totalAll = req.body.totalAll
    const creditMonth = req.body.creditMonth

    try {
        const monthlyBill = await generateMonthlyBill(totalAll, creditMonth)
        const reminderObj = {
            bill: monthlyBill
        }
        res.json(reminderObj)
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
