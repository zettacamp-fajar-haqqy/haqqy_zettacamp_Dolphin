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
    let totalAll = 0                    // total bill of all books that already purchased
    const message = []                    // for showing message of current bill
    const notification = []               // for showing message of current stock of book
    let monthlyBill = []
    const paymentStatus = payment[0]
    const creditMonth = payment[1]
    let paymentMessage = ""
    const reminder = []
    for(let x = 0; x < lists.length; x++){  // reading array from lists parameter
        for(let y = 1; y < lists[x].length; y++){ // reading array from array
            let book = lists[x][y-1]
            let reqBuy = lists[x][y]
            let buyProcess = purchaseBook(pickBook(book), reqBuy) // calling purchaseBook function
            message.push(`\nYou have been purcased ${buyProcess[2]} books of ${JSON.stringify(pickBook(book).title)}, and your current bill is ${buyProcess[0].toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n`)
            notification.push(`\n${buyProcess[1]}\n`)
            totalAll += buyProcess[0]
        }
    }

    if(paymentStatus.toLowerCase() === "credit"){

        // let downPayment = (20/100) * totalAll

        let firstMonth = totalAll - ((Math.floor((totalAll/creditMonth)/1000) * 1000) * (creditMonth - 1))

        monthlyBill.push(firstMonth)

        for(let x = 0; x < creditMonth - 1; x++){
            monthlyBill.push(Math.floor((totalAll/creditMonth)/1000) * 1000)
        }

        let incr1 = 1
        let incr2 = 0

        

        for(let x = 0; x < creditMonth; x++){

            let currentDate = new Date();
            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let cDay = currentDate.getDate()
            let cMonth = month[currentDate.getMonth() + incr1]
            let cYear = currentDate.getFullYear() + incr2

            // let reminder = `\nKindly settle the payment amounting to ${monthlyBill.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} by ${cMonth} ${cDay}, ${cYear}.\n`


            /* PERUBAHAN UNTUK TASK JS DAY 6 */

            // Memmbuat objek baru untuk menyimpan tanggal dan biaya tagihan

            let monthlyReminder = {}
            
            // Variabel baru untuk menandakan tagihan ke x
            let invoice = `Invoice ${x + 1} due on`
            
            // Variabel untuk menyimpan tanggal tagihan
            let dateInvoice = `${cMonth} ${cDay}, ${cYear}`
            
            // Variabel untuk menyimpan keterangan tagihan
            let monthlyInvoice = `The bill value is `

            // Variabel untuk menyimpan jumlah tagihan bulanan dalam bentuk IDR
            let valueInvoice = `${monthlyBill[x].toLocaleString('id-ID', { style:'currency', currency: 'IDR'})}`

            incr1++     // Increment supaya bulan yang ditampilkan berubah

            // Memasukkan 2 properti (invoice, dan monthlyInvoice) beserta valuenya (dateInvoice, dan valueInvoice) ke dalam variabel objek yaitu monthlyReminder

            Object.defineProperties(monthlyReminder, {
                [invoice]: {
                    value: dateInvoice,
                    enumerable: true,
                    writable: true
                },
                [monthlyInvoice]: {
                    value: valueInvoice,
                    enumerable: true,
                    writable:true
                }
            })

            // Memasukkan objek monthlyReminder ke Array reminder

            reminder.push(monthlyReminder)

            // Untuk mereset kembali index bulan (kembali ke Januari setelah Desember) dan menambahkan tahun
            if((currentDate.getMonth() + incr1) % 12 === 0 ){
                incr1 = -7
                incr2++
            }            
        }

        paymentMessage = ` We are pleased to inform you that we have implemented a credit payment system for your convenience, spanning a duration of ${creditMonth} months.\n To assist in ensuring the payment schedule is adhered to, we have thoughtfully prepared a reminder specifying the designated date and month for your payment starting from next month.`

    } else {

        let afterDisc = totalAll - ((discount/100) * totalAll)

        paymentMessage = `Congratulations! We are pleased to inform you that you have qualified for a ${discount}% discount. Your total bill now is ${afterDisc.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}.`
    }

    // console.log yang akan menampilkan reminder dengan tipe data aslinya (objek di dalam array)

    /* console.log(`${message.join("")} \n
    Your total bill is ${totalAll.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n\n${paymentMessage}\n`)
    console.log(reminder)
    return `\t=== NOTIFICATION ===
    ${notification.join("")}` */

    // console.log yang akan menampilkan reminder menjadi bentuk string

    const reminderString = reminder.map(item => {
        const lines = []
        for(const key in item){
            lines.push(`${key}: ${item[key]}`)
        }
        return lines.join(". ")
    })

    return `${message.join("")} \n
    Your total bill is ${totalAll.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n\n${paymentMessage}\n\n${reminderString.join("\n")}\n
    \t=== NOTIFICATION ===
    ${notification.join("")}`

}

let buyBook1 = 20
let buyBook2 = 10
let buyBook3 = 5

let creditCust = 7

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
