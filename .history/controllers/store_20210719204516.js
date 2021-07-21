var Book=require("../models/book")
var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    var Books=[]
    Book.find()
    .then((arr)=>{
        Books=arr;
        res.render("book_list", { books: Books, title: "Books | Library" });   
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
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