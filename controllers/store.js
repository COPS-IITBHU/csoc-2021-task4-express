const Book = require('../models/book');

var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find((err,books)=>{
        if(err) throw err;
        res.render("book_list", { books:books, title: "Books | Library" });
    })
    
}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
   
    Book.findById(req.params.id,(err,book)=>{
        if(err) throw err;
        res.render('book_detail',{book:book,num_available:book.available_copies, title: `Book Details | ${book.title}`});
    });
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
    console.log(req);
    res.send('hello');
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