const mongoose = require("mongoose");
const URI = require("../config/uri").mongoURI;
const Book = require("../models/book");

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connection of store with MongoDB established..."))
    .catch(err => console.log(err));

//making some dummy books for debugging
// const book1 = new Book({
//     title: "Harry Potter",
//     genre: "Fantasy",
//     author: "J.K.Rowling",
//     description: "This is a fantasy based story of a magician.",
//     rating: 5,
//     mrp: 400,
//     available_copies: 8
// })

// const book2 = new Book({
//     title: "Lords of the Ring",
//     genre: "Fantasy",
//     author: "J.R.R.Tolkien",
//     description: "This is an epic high fantasy story.",
//     rating: 4,
//     mrp: 350,
//     available_copies: 5
// })

// const book3 = new Book({
//     title: "Pride and Prejudice",
//     genre: "Romance",
//     author: "Jane Austen",
//     description: "This is a 1813 romantic novel.",
//     rating: 3.5,
//     mrp: 200,
//     available_copies: 12
// })

// const dummyBooks = [book1, book2, book3];

var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find({}, (err, foundBooks) => {
        if (err) {
            console.log(err);
        } else {
            res.render("book_list", { books: foundBooks, title: "Books | Library" });
        }
    })
}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
    const id = req.params.id;

    Book.findById(id, (err, foundBook) => {
        if (err) {
            console.log(err);
        } else {
            console.log(id, foundBook)
            res.render("book_detail", { book: foundBook, title: "Book Details" });
        }
    })
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}