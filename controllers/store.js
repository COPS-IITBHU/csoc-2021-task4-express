const mongoose = require('mongoose');
const Book = require("../models/book");
const User = require("../models/user");
const Bookcopy = require("../models/bookCopy");

mongoose.connect('mongodb+srv://tiger:firstapp@cluster0.tlwt0.mongodb.net/Library?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


var getAllBooks = async function (req, res) {
    //TODO: access all books from the book model and render book list page
    const books = await Book.find({});
    res.render("book_list", { books, title: "Books | Library" });
}

var getBook = async (req, res) => {
    //TODO: access the book with a given id and render book detail page
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("book_detail", { book, title: "Book Details" })
}

var getLoanedBooks = async (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
    // const {user}=req;

    const { user } = req;
    const copies = await User.findById(user._id).populate({ path: "loaned_books", populate: { path: "book" } });
    const books = copies.loaned_books;
    res.render("loaned_books", { books: books, title: "Loaned Books" });
}

var issueBook = async (req, res) => {

    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
    const { user, body } = req;
    const books = await Bookcopy.find({ book: body.bid });
    let id;
    for (let bookcopy of books) {
        if (bookcopy.status === true) {
            id = bookcopy._id;
            await Book.findByIdAndUpdate(body.bid, { $inc: { available_copies: -1 } });
            await Bookcopy.findByIdAndUpdate(id, { status: false, borrow_date: Date.now(), borrower: user.id });
            break
        }
    }
    
    await User.findByIdAndUpdate(user.id, { $push: { loaned_books: id } })
    res.redirect("/")
}

var searchBooks = async (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details

    const { title, author, genre } = req.body;
    let books = [];
    books = await Book.find({ title: { $regex: title, $options: 'i' }, author: { $regex: author, $options: 'i' }, genre: { $regex: genre, $options: 'i' } });
    res.render("book_list", { books: books, title: "Books | Library" });
}

var returnBook = async (req, res) => {
    const { bid } = req.body;
    let copy = await Bookcopy.findByIdAndUpdate(bid, { status: true, borrow_date: undefined, borrower: undefined });
    const id = copy.book;
    const userId = copy.borrower;
    await User.findByIdAndUpdate(userId, { $pull: { loaned_books: bid } })
    await Book.findByIdAndUpdate(id, { $inc: { available_copies: 1 } })
    res.redirect("/books/loaned")
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks,
    returnBook
}