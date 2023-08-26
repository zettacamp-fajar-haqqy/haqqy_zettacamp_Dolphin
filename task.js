let bookPurchasing = (title, discount, tax) => {
    const price = 500000
    let totalDiscount = (discount/100) * price
    let afterDiscount = price - totalDiscount
    let totalTax = (tax/100) * afterDiscount
    let afterTax = afterDiscount + totalTax
    const finalPrice = afterTax - totalDiscount
    const isWorth = price > finalPrice

    return `\nThank you for shopping, here is the details about your purchase \n
    Book title \t\t: ${title}\n
    Book price \t\t: ${price}\n
    Book discount \t: ${discount}% which ${totalDiscount}\n
    Book after discount : ${afterDiscount}\n
    Book tax \t\t: ${tax}% which ${totalTax}\n
    Book with tax \t: ${afterTax}\n
    Total payment \t: ${finalPrice}\n
    Is worth to buy \t: ${isWorth}`
}

let manga1 = {
    title : "Darling in the Franxx",
    price : 750000
}

console.log(bookPurchasing("Jujutsu Kaisen", 30, 10))
console.log(bookPurchasing(manga1.title, 0, 20))

console.log("\nThis is recursive function")
let countdown = (num) => {
    console.log(num)
    if(num <= 0){
        console.log("Done")
    } else {
        countdown(num - 1)
    }
}

countdown(5)