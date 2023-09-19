const express = require('express')
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
const port = 4000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

let reminder = []

let finalTotal = 0
let finalCredit = 0

let totalAll = 0

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

let shoppingList = (lists, payment) => {         // create a function to buy a multiple books n times
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

        generateMonthlyBill(totalAll, creditMonth).then(() => {
            paymentMessage = ` We are pleased to inform you that we have implemented a credit payment system for your convenience, spanning a duration of ${creditMonth} months.\n To assist in ensuring the payment schedule is adhered to, we have thoughtfully prepared a reminder specifying the designated date and month for your payment starting from next month.`
        }).catch((error) => {
            console.error(error)
        })

    } else {

        let afterDisc = totalAll - ((discount/100) * totalAll)

        paymentMessage = `Congratulations! We are pleased to inform you that you have qualified for a ${discount}% discount. Your total bill now is ${afterDisc.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}.`
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
        notification: notification.join("\n")
    };

    return responseObject

}


const generateMonthlyBill = async (totalAll, creditMonth, targetMonth, newValue) => {
    return new Promise((resolve, reject) => {
        try {

            finalTotal = totalAll;
            finalCredit = creditMonth

            if (typeof newValue == 'undefined' && newValue == null) {
                newValue = 0
            }

            let tempArr = []

            let monthlyBill = [];

            let firstMonth = finalTotal - ((Math.floor((finalTotal / creditMonth) / 1000) * 1000) * (creditMonth - 1));
            monthlyBill.push(firstMonth);

            for (let x = 0; x < creditMonth - 1; x++) {
                if(x === targetMonth - 1){
                    monthlyBill.push(newValue)
                }
                monthlyBill.push(Math.floor(((finalTotal - newValue) / creditMonth) / 1000) * 1000);
            }
        
            

            let incr1 = 1;
            let incr2 = 0;

            for (let x = 0; x < creditMonth; x++) {
                let currentDate = new Date();
                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let cDay = currentDate.getDate();
                let cMonth = month[currentDate.getMonth() + incr1];
                let cYear = currentDate.getFullYear() + incr2;

                let monthlyReminder = {};
                let invoice = `Invoice ${x + 1} due on`;
                let dateInvoice = `${cMonth} ${cDay}, ${cYear}`;
                let monthlyInvoice = `The bill value is `;
                let valueInvoice = (x === targetMonth) ? `${newValue}` : `${monthlyBill[x]}`;

                incr1++;
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

                tempArr.push(monthlyReminder);

                if ((currentDate.getMonth() + incr1) % 12 === 0) {
                    incr1 = -7;
                    incr2++;
                }
            }

            reminder = tempArr

            resolve(reminder);

        } catch (error) {
            reject(error);
        }
    });
};





/* let buyBook1 = 20
let buyBook2 = 10
let buyBook3 = 5

let creditCust = 7

console.log(`\n Which book do you want to buy?\n
A. Darling in the Franxx\n
B. Berserk\n
C. Jujutsu Kaisen\n
D. Kimetsu no Yaiba\n
E. Shingeki no Kyojin\n`)

console.log(`${JSON.stringify(bookList)}`)

console.log(".................................................")
console.log(`\nUser \t: I want to buy ${buyBook1} books of ${pickBook("A").title}, 
then ${buyBook2} books of ${pickBook("C").title} , and ${buyBook3} books of ${pickBook("E").title}\n`)
console.log(".................................................")
console.log(`What method of payment do you prefer to use: cash or credit? (Enjoy a 20% cash payment discount)`)
console.log(".................................................")
console.log(`\nUser \t: I prefer using credit spreading the payments over a ${creditCust}-month period.\n`)
console.log(".................................................")
console.log(shoppingList([["A", buyBook1], ["C", buyBook2], ["E", buyBook3]], ["CREDIT", creditCust])) */


let originalBookList = bookList.map(book => ({...book}))

const username = 'haki'
const password = 'zettacamp'

// const customAuth = (req, res, next) => {
//     const authHeader = req.headers.authorization
//     if(!authHeader){
//         return res.status(401).json({ error: 'Tidak ada Header Authorization'})
//     }

//     const base64Credentials = authHeader.split(' ')[1]
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
//     const [user, pass] = credentials.split(':')

//     if(user === username && pass === password){
//         next()
//     } else {
//         return res.status(401).json({ error: 'Username atau Password salah'})
//     }

// }

// FUNGSI UNTUK AUTENTIKASI

app.use(basicAuth({
    users: { [username] : password},
    challenge: true,
    unauthorizedResponse: 'Username atau password salah'
}))

// FUNGSI UNTUK MEMBELI BUKU (MENJALANKAN TASK KEMARIN)

app.post('/beli-buku', (req, res) => {
    const {lists, payment} = req.body

    const finalResult = shoppingList(lists, payment)

    res.json({ result:finalResult })

})

app.get('/tagihan-buku', (req, res) => {
    const reminderArr = reminder.map(item => {
        const lines = []
        for(const key in item){
            lines.push(`${key}: ${item[key]}`)
        }
        return lines.join(". ")
    });

   const reminderObj = {
    bill: reminderArr
   }

    res.send(reminderObj);
})

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


app.put('/ubah-tagihan/:index', async (req, res) => {
    const index = parseInt(req.params.index);
    // const newDate = req.body.newDate;
    const newValue = req.body.newValue;

    if (isNaN(index) || index < 0 || index >= reminder.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    if (!newValue) {
        return res.status(400).json({ error: 'New value is required' });
    }

    const oldValue = reminder[index]['The bill value is '];
    const newValueFloat = parseFloat(newValue);

    if (!isNaN(oldValue) && !isNaN(newValueFloat)) {
        const diff = newValueFloat - oldValue;

        reminder[index]['The bill value is '] = `${newValueFloat}`;

        try {
            finalTotal = parseInt(finalTotal)

            const updatedBill = await generateMonthlyBill(finalTotal + diff, finalCredit, index, newValueFloat);
            
            res.json({ message: 'Bill values updated successfully', reminder: updatedBill });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(400).json({ error: 'Invalid value format' });
    }
});

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
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
