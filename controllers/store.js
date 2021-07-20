const Book = require('../models/book');
const BookCopy = require('../models/bookCopy');
const mongoose = require('mongoose');
const book = require('../models/book');
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
        BookCopy.find({book: mongoose.Types.ObjectId(req.params.id),status:true},(er,bookCopies)=>{
            if(er) throw er;
        res.render('book_detail',{
            book:book,num_available:bookCopies.length,
             title: `Book Details | ${book.title}`,
             success_message: req.query.issue=='success'?'Book Issued Successfully':undefined,
             error_message: req.query.issue=='failure'?'Book Issue Failed':undefined
            });
        });
    });
}

var getLoanedBooks = async (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
    BookCopy.find((err,bookCopies)=>{
        if(err) throw err;
        Book.find((err,books)=>{
            res.render('loaned_books',{
                books: bookCopies.filter(bookCopy => req.user.loaned_books.includes(bookCopy.id))
                .map(bookCopy=>({
                    book: books.find(book=>(book.id == bookCopy.book)),
                    id: bookCopy.id,
                    borrow_date: `${bookCopy.borrow_date.getDate()}/${bookCopy.borrow_date.getMonth()+1}/${bookCopy.borrow_date.getFullYear()}`,
                })),
                title: `Loaned Books | ${req.user.username}`,
                success_message: req.query.ret == 'success'?"Book returned successfully": undefined,
                error_message: req.query.ret =='failure'?"Book could not be returned": undefined,
            })
        })
    })
 

}

var issueBook = (req, res) => {
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
    try {
            BookCopy.find({book: req.body.bid,status:true},(err,bookCopies)=>{
            if(bookCopies.length==0){
                res.redirect(`/book/${req.body.bid}/?issue=failure`);
            } else {
                bookCopies[0].status = false;
                bookCopies[0].borrow_date = Date.now();
                bookCopies[0].borrower = req.user.id;
                bookCopies[0].save().then((_)=>{
                    req.user.loaned_books.push(bookCopies[0].id);
                    req.user.save().then((_)=>{
                        res.redirect(`/book/${req.body.bid}/?issue=success`);
                    })
                });
            }
        });
    } catch {
        res.redirect(`/book/${req.body.bid}/?issue=failure`);

    }
}

var returnBook = (req, res) => {
    try{
        BookCopy.findById(req.body.bcid,(err,bookCopy)=>{
            if(err) throw err;
            if (bookCopy.status) {
                res.send('Book was already Returned');
            } else {
                bookCopy.status = true;
                bookCopy.borrow_date = null;
                bookCopy.borrower=null;
                req.user.loaned_books.splice(req.user.loaned_books.indexOf(req.body.bcid),1)
                bookCopy.save().then((_)=>{
                    req.user.save().then((_)=>{
                        res.redirect('/books/loaned?ret=success');
                    })
                });
            }
        });
    } catch {
        res.redirect('/books/loaned?ret=failure');
    }

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
    returnBook,
    searchBooks
}