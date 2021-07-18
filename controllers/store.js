const Book = require('../models/book');
const User = require('../models/user');
const Bookcopy = require('../models/bookCopy');
const mongoose = require('mongoose');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.render("book_list", { books: books, title: "Books | Library", error : false });
    } catch (error) {
        res.render("book_list", { books: [], title: "Books | Library", error : true });
    }
}

const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render("book_detail", {
            book: book,
            num_available: book.available_copies.length,
            title: `Books | ${book.title}`,
            message : req.query.message ? true : false
        });
    } catch (error) {
        res.redirect("/books");
    }
}

const getLoanedBooks = async (req, res) => {
    try {
        const copyDetails = await User.
            findById(req.user._id).
            populate({
                path: 'loaned_books',
                populate: { path: 'book' }
            }).
            exec();

        const books = [];
        copyDetails.loaned_books.forEach(el => {
            books.push({
                book: {
                    id: el.book._id,
                    title: el.book.title,
                    author: el.book.author,
                    genre: el.book.genre,
                },
                copyId: el._id,
                borrow_date: el.borrow_data,
            });
        })
        res.render("loaned_books", { title: "Books | Loaned", books: books });

    } catch (error) {
        res.redirect("/");
    }
}

const issueBook = async (req, res) => {
    const bookId = req.body.bid;
    try {

        const book = await Book.findById(bookId);
        if (book.available_copies.length <= 0) {
            return res.redirect(`/book/${bookId}?message=failure`);
        }
        const user = await User.findById(req.user._id);
        const copy = await Bookcopy.findById(book.available_copies[0]);
        user.loaned_books = user.loaned_books.concat(copy._id);
        copy.borrower = user._id;
        copy.borrow_data = new Date();
        copy.status = false;
        book.available_copies.shift();

        await user.save();
        await book.save();
        await copy.save();

        res.redirect('/books/loaned');

    } catch (error) {
        res.redirect(`/book/${bookId}`);
    }
}

const returnBook = async (req, res) => {
    const { returnId } = req.body;

    try {

        const copy = await Bookcopy.findById(returnId);
        const book = await Book.findById(copy.book);
        const user = await User.findById(copy.borrower);

        copy.status = true;
        copy.borrower = undefined;
        copy.borrow_data = undefined;
        book.available_copies = book.available_copies.concat(mongoose.Types.ObjectId(copy._id));
        user.loaned_books = user.loaned_books.filter(book => book.toString() !== copy._id.toString());

        await copy.save();
        await book.save();
        await user.save();

        res.redirect('/books/loaned');

    } catch (error) {
        res.redirect('/books/loaned');
    }
}

const searchBooks = async (req, res) => {
    try {

        const { title, genre, author } = req.body;
        const foundBooks = await Book.find({
            'title': {
                '$regex': title,
                '$options': 'i'
            },
            'genre': {
                '$regex': genre,
                '$options': 'i'
            },
            'author': {
                '$regex': author,
                '$options': 'i'
            }
        })
        res.render("book_list", { books: foundBooks, title: "Books | Library" });

    } catch (error) {
        res.redirect('/books');
    }
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    returnBook,
    searchBooks
}