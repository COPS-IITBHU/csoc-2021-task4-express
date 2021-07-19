var mongoose = require("mongoose");
var Book = require('../models/book');
var Bookcopy = require('../models/bookCopy')
var User = require('../models/user')
var getAllBooks = (req, res) => {
    let books=[];
    Book.find({}).then((data)=>{
        res.render("book_list", { books:data, title: "Books | Library" });
    })
    //TODO: access all books from the book model and render book list page
}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
    book_id=req.params.id;
    Book.findById(book_id).then((data)=>{
        res.render("book_detail", { book:data, title: "Books | Library" });
    })
}

var getLoanedBooks = async (req, res) => {
    user_id=req.user.id;
    Bookcopy.find({borrower:mongoose.Types.ObjectId(user_id),status:false})
        .populate('book')
        .then(data=>{
        res.render("loaned_books", { books: data, title: "Books | Library" });
    })
    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    book_req_id = req.body.bid;
    user_id=req.user.id;
    mongoose.set('useFindAndModify', false);
    Book.findById(book_req_id)
        .then( (book) => {
            book_copy_id = book.available_copies[0];
            book.available_copies.splice(0, 1);
            Book.findByIdAndUpdate(book_req_id, {available_copies: book.available_copies}, (err,upBook) => {
                if(err)console.log(err);
                else {
                    Bookcopy.findByIdAndUpdate(book_copy_id, {
                        status: false, 
                        borrower:  mongoose.Types.ObjectId(user_id),
                        borrow_date: Date.now()
                    }, (err, succ) => {
                        if(err)console.log(err);
                        else res.redirect('/books/loaned');
                    })
                }
            })
                
        } )
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
    query_data = req.body;
    Book.find({
        "title": { "$regex": query_data.title, "$options": "i" }, 
        "author": { "$regex": query_data.author, "$options": "i" }, 
        "genre": { "$regex": query_data.genre, "$options": "i" }
    }).then(data => res.render("book_list", { books:data, title: "Books | Library" }))
}

var returnBook = (req, res) => {
    copy_book_id = req.body.bid;
    mongoose.set('useFindAndModify', false);
    Bookcopy.findByIdAndUpdate(copy_book_id, {status: true, borrower: mongoose.Types.ObjectId(copy_book_id)},(err,docs)=>{
        if(err)console.log(err);
        else {
            Book.findByIdAndUpdate(docs.book, { $push: { available_copies: docs.id } }, (err,docs)=>{
                if(err)console.log(err);
                else {
                    res.redirect('/books/loaned')
                }
            })
        }
    })
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks,
    returnBook
}