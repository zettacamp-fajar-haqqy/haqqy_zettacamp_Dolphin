

bindBookData();

function addBookDataToLocalStorage(bookObj) {
    //already has data in localstorage then update it other create new one
    var books = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        books.push(bookObj);
        
        localStorage.setItem('bookData', JSON.stringify(books));
    }
    else {
        var bookData = new Array();
        bookData.push(bookObj);
        localStorage.setItem('bookData', JSON.stringify(bookData));
    }
}


function updateDataToLocalStorage(bookObj) {


    var books = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        var book = books.filter((x) => x.id == bookObj.id).pop();
        if (book != null) {
            book.title = bookObj.title;
            book.author = bookObj.author;
            book.price = bookObj.price;
            book.stock = bookObj.stock;
            book.description = bookObj.description;
        }
        localStorage.setItem('bookData', JSON.stringify(books));
    }
}

function deletedataFromLocalStorage(bookId) {


    var books = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        books.splice(books.findIndex(a => a.id === bookId), 1)
        localStorage.setItem('bookData', JSON.stringify(books));
    }
}

function bindBookData() {
    var books = JSON.parse(localStorage.getItem('bookData'));
    if (books != null) {
        document.getElementById('tblbody').innerHTML = "";
        books.forEach(function (item, index) {
            // debugger;
            var btnEditId = "btnedit" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   data-booksID='" + item.id + "'   data-title='" + item.title + "' data-author='" + item.author + "' data-price='" + item.price + "' data-stock='" + item.stock + "' data-description='" + item.description + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.title + "</td>"
                + "<td class='td-data'>" + item.author + "</td>"
                + "<td class='td-data'>" + item.price + "</td>"
                + "<td class='td-data'>" + item.stock + "</td>"
                + "<td class='td-data'>" + item.description + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnEditId + "' class='btn btn-info btn-xs btn-editbooks' onclick='showEditRow(" + item.id + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody').innerHTML += tableRow;
        })
    }
    /* var AddRow = "<tr>"
        + "<td class='td-data'></td>"
        + "<td class='td-data'><input type='text' id='txttitle' placeholder='title..'></td>"
        + "<td class='td-data'><input type='text' id='txtauthor' placeholder='author..'></td>"
        + "<td class='td-data'><input type='number' id='txtprice' placeholder='price..'></td>"
        + "<td class='td-data'><input type='number' id='txtstock' placeholder='stock..'></td>"
        + "<td class='td-data'><input type='text' id='txtdescription' placeholder='description..'></td>"
        
        + "<td class='td-data'>" + "<button id= 'btnaddBooks' onclick='addBook()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody').innerHTML += AddRow; */
}

function GetBookID() {
    const ID = Date.now();
    return ID;
}


function addBook() {
    var bookId = GetBookID();
    var txttitle = document.getElementById("txttitle").value;
    if (!txttitle) {
        alert('Please enter title!')
        return false;
    }
    var txtauthor = document.getElementById("txtauthor").value;
    if (!txtauthor) {
        alert('Please enter author!')
        return false;
    }
    var txtprice = document.getElementById("txtprice").value;
    if (!txtprice) {
        alert('Please enter price!')
        return false;
    }
    var txtstock = document.getElementById("txtstock").value;
    if (!txtstock) {
        alert('Please enter stock!')
        return false;
    }
    var txtdescription = document.getElementById("txtdescription").value;
    if (!txtdescription) {
        alert('Please enter description!')
        return false;
    }
    
    var bookObj = {
      "id":bookId,
      "title":txttitle,
      "author":txtauthor,
      "price":txtprice,
      "stock":txtstock,
      "description":txtdescription
    }
    addBookDataToLocalStorage(bookObj);
    document.getElementById('txttitle').value = "";
    bindBookData();
};


function showEditRow(bookID) {
    var bookRow = document.getElementById(bookID); //this gives tr of  whose button was clicked
    var trdata = bookRow.querySelectorAll(".td-data");
    /*returns array of all elements with
    "row-data" class within the row with given id*/
    var bookId = trdata[0].innerHTML
    var bookTitle = trdata[1].innerHTML
    var bookAuthor = trdata[2].innerHTML
    var bookPrice = trdata[3].innerHTML
    var bookStock = trdata[4].innerHTML
    var bookDescription = trdata[5].innerHTML


    trdata[0].innerHTML = '<input name="txtbookid"  disabled id="txtbookid" value="' + bookID + '"/>';
    trdata[1].innerHTML = '<input name="txttitle" id="txttitle" value="' + bookTitle + '"/>';
    trdata[2].innerHTML = '<input name="txtauthor" id="txtauthor" value="' + bookAuthor + '"/>';
    trdata[3].innerHTML = '<input name="txtprice" id="txtprice" value="' + bookPrice + '"/>';
    trdata[4].innerHTML = '<input name="txtstock" id="txtstock" value="' + bookStock + '"/>';
    trdata[5].innerHTML = '<input name="txtdescription" id="txtdescription" value="' + bookDescription + '"/>';


    trdata[6].innerHTML =
        "<button class='btn btn-primary btn-xs btn-updateBooks' onclick='updateBook(" + bookID + ")'>" +
        "<i class='fa fa-pencil' aria-hidden='true'></i> Save</button>"
        + "<button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancel(" + bookID + ")'><i class='fa fa-times' aria-hidden='true'></i> Cancel</button>"
        + "<button class='btn btn-danger btn-xs btn-deleteBooks' onclick='deleteBook(" + bookID + ")'>"
        + "<i class='fa fa-trash' aria-hidden='true'></i> Delete</button>"
}
function cancel(bookID) {
    // debugger;
    var btneditId = "btnedit" + bookID;


    var booksRow = document.getElementById(bookID); //this gives tr of  whose button was clicked
    var data = booksRow.querySelectorAll(".td-data");


    var title = booksRow.getAttribute("data-title");
    var author = booksRow.getAttribute("data-author");
    var price = booksRow.getAttribute("data-price");
    var stock = booksRow.getAttribute("data-stock");
    var description = booksRow.getAttribute("data-description");


    data[0].innerHTML = bookID
    data[1].innerHTML = title
    data[2].innerHTML = author
    data[3].innerHTML = price
    data[4].innerHTML = stock
    data[5].innerHTML = description

    var actionbtn = "<button id='" + btneditId + "' class='btn btn-info btn-xs btn-editbooks' onclick='showEditRow(" + bookID + ")'><i class='fa fa-pencil' aria-hidden='true'></i> Edit</button>"
    data[6].innerHTML = actionbtn;
}
function updateBook(bookID) {
    var bookRow = document.getElementById(bookID); //this gives tr of  whose button was clicked
    var data = bookRow.querySelectorAll(".td-data")
    var title = data[1].querySelector("#txttitle").value
    var author = data[2].querySelector("#txtauthor").value
    var price = data[3].querySelector("#txtprice").value
    var stock = data[4].querySelector("#txtstock").value
    var description = data[5].querySelector("#txtdescription").value


    var bookObj = {
        "id": bookID,
        "title":title,
        "author":author,
        "price":price,
        "stock":stock,
        "description":description
    };

    updateDataToLocalStorage(bookObj);

    bindBookData();
}
function deleteBook(bookID) {
    deletedataFromLocalStorage(bookID);
    bindBookData();
}

function wipe() {
    //clear method is used to clear localStorage.
   localStorage.clear();
   location.reload();
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}