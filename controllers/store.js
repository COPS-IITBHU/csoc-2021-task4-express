const Book = require("../models/book")
const BookCopy = require("../models/bookCopy")


var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find({},function(err,foundBooks) {
        if(foundBooks.length>0){
            res.render("book_list", { books: foundBooks, title: "Books | Library" });
        }   
    })
}


var getBook = (req, res) => {
    const bookId=req.params.id
    Book.findById(bookId,function(err,selectedBook) {
        if (err){
            console.log(err);
        }
        else{
            res.render("book_detail", { book: selectedBook, title: "Books | Library" });
        }
    })
    //TODO: access the book with a given id and render book detail page
    
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    const bookId=req.body.bid
    const currentCopiesAvailable=req.body.num_available_copies

    const date=new Date()
    const borrowDate= date.toDateString()
    
    // console.log(req.user.id)

    

    if (currentCopiesAvailable>0){

    const bookInstance = new BookCopy({book:bookId,status:false,borrow_date:borrowDate,borrower:req.user.id})
    bookInstance.save();
    Book.findByIdAndUpdate(bookId,{available_copies:currentCopiesAvailable-1},function(err,thisBook) {
        if(err){
            console.log(err)
        }
    })
    
    Book.find({},function(err,foundBooks) {
        if(foundBooks.length>0){
            res.render("book_list", { books: foundBooks, title: "Books | Library" });
        }   
    })}

    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
    const {title,author,genre} = req.body

    Book.find({"title":{$regex:title, "$options" : "i"},"author":{$regex:author, "$options" : "i"},"genre":{$regex:genre, "$options" : "i"}},function(err,foundBooks){
 
            res.render("book_list", { books: foundBooks, title: "Books | Library" });

    })
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}