const express = require('express')
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const { bookList, loadingMessage, shoppingList, generateMonthlyBill } = require('./helpers'); // Assuming helper functions are in helpers.js

const router = express.Router()

let originalBookList = bookList.map(book => ({...book}))

const storage = './books.txt'

fs.writeFile(storage, JSON.stringify(bookList), 'utf-8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File has been saved!');
  }
});

// FUNGSI UNTUK MELIHAT PROSES MENGGUNAKAN AWAIT

router.get('/message-await', async (req, res) => {

    const before = moment()
    const message = await loadingMessage()
    const after = moment()
    console.log(`${after.diff(before)} ms`)

    const executionTime = `Data proceed ${after.diff(before)} ms\n\n`

    const file = './await-report.txt'

    message.push(executionTime)

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

router.get('/message-nonawait', async (req, res) => {

    const before = moment()
    const messagePromise = loadingMessage()
    const after = moment()
    console.log(`${after.diff(before)} ms`)

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

router.post('/message-delete', (req, res) => {

    try{

        const file = req.body.file

        console.log(file)

        fs.unlink(file, err => {
            if(err) return console.error(err)
        })
        console.log(`File ${file} deleted successfully`)
        res.send(`File ${file} deleted successfully`)

    } catch(err){
        console.error(err)
    }

    
})

// FUNGSI UNTUK MEMBELI BUKU (MENJALANKAN TASK KEMARIN)

router.post('/beli-buku', async (req, res) => {
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

        try {
            const finalResult = await shoppingList(lists, payment)
            
            fs.writeFile(storage, JSON.stringify(bookList), 'utf-8', (err) => {
                if (err) {
                  console.error('Error writing to file:', err);
                } else {
                  console.log('File has been saved!');
                }
            });

            exec(path.basename(storage), (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error opening file: ${error}`)
                  return
                }
                console.log(`File Opened`)
            })

            res.json({ result: finalResult })

        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    } else {
        try {

        targetMonth = 0

        addTerm = 0

            const finalResult = await shoppingList(lists, payment)

            fs.writeFile(storage, JSON.stringify(bookList), 'utf-8', (err) => {
                if (err) {
                  console.error('Error writing to file:', err);
                } else {
                  console.log('File has been saved!');
                }
            });

            exec(path.basename(storage), (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error opening file: ${error}`)
                  return
                }
                console.log(`File Opened`)
            })

            res.json({ result: finalResult })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }


})

// FUNGSI UNTUK MELIHAT TAGIHAN BUKU

router.get('/tagihan-buku', (req, res) => {
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

router.post('/tambah-buku', (req, res) => {
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

router.put('/edit-buku/:id', (req, res) => {

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

router.delete('/hapus-buku/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = bookList.findIndex(book => book.id === id)

    if(index === -1){
        return res.status(404).send(`Buku tidak ditemukan`)
    }

    bookList.splice(index, 1)

    res.send(`Buku berhasil dihapus`)

})

// FUNGSI UNTUK MELIHAT BUKU

router.get('/list-buku', (req, res) => {

    res.json({
        originalBookList: originalBookList,
        updatedBook: bookList
    })
})

// FAIL TASK

router.post('/test-generateMonthlyBill', async(req, res) => {
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

module.exports = router