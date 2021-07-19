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
        res.render('book_detail',{book:book,num_available:bookCopies.length, title: `Book Details | ${book.title}`});
        });
    });
}

var getLoanedBooks = async (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
    console.log(req.user.loaned_books);
    
    BookCopy.find((err,bookCopies)=>{
        if(err) throw err;
        Book.find((err,books)=>{
            res.render('loaned_books',{
                books: bookCopies.filter(bookCopy => req.user.loaned_books.includes(bookCopy.id))
                .map(bookCopy=>({
                    book: books.find(book=>(book.id == bookCopy.book)),
                    id: bookCopy.id,
                })),
                title: `Loaned Books | ${req.user.username}`
            })
        })
    })
    // console.log(loaned_copies);
    // res.redirect('/');
    // Book.find((err,books)=>{
    //     if(err) throw err;
    //     console.log(req.user.loaned_books.map((bookCopyId)=>{
    //         return {
    //             book: books.find(book=>book.id==bookCopyId),
    //             id:bookCopyId
    //         }
    //     }));
    //     res.render('loaned_books',{books:req.user.loaned_books.map((bookCopyId)=>{
    //         return {
    //             book: books.find(book=>book.id==bookCopyId),
    //             id:bookCopyId
    //         }
    //     }),title:`Loaned Books | ${req.user.username}`});

    // })


}

var issueBook = (req, res) => {
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
    BookCopy.find({book: req.body.bid,status:true},(err,bookCopies)=>{
        if(bookCopies.length==0){
            res.send('Oh no! no more books')
        } else {
            bookCopies[0].status = false;
            bookCopies[0].save().then((_)=>{
                req.user.loaned_books.push(bookCopies[0].id);
                req.user.save().then((_)=>{
                    res.send('Successfully Issued');
                })
            });
        }
    })
}

var returnBook = (req, res) => {
    BookCopy.findById(req.body.bcid,(err,bookCopy)=>{
        if (bookCopy.status) {
            res.send('Book was already Returned');
        } else {
            bookCopy.status = true;
            bookCopy.save().then((_)=>{
                res.send('Book Returned');
            });
        }
    })
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