const book = require('../models/book')
const user = require('../models/user')
const bookCopy = require('../models/bookCopy');


var getAllBooks = async (req, res) => {
    //TODO: access all books from the book model and render book list page
    const books = await book.find({});
    res.render("book_list", { books: [], title: "Books | Library" });
}

var getBook = async (req, res) => {
    var o_id = new ObjectId(req.book.bid);

    const book = await book.find({_id : o_id} );
    res.render("book_detail", { book, title: "Book Detail" });
    //TODO: access the book with a given id and render book detail page
}

var getLoanedBooks = async (req, res) => {
    const copies = await  user.findById(req.user._id).populated({
        path: "loaned_books",
        populate: { path: "book" },
    });
    const books = copies.loaned_books;
    res.render("loaned_books", { books: books, title: "Loaned Books"});
    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = async (req, res) => {
    const user = await user.findById(req.user._id);
    const book = await book.findById(req.body.bid);
    const bookCopy = await bookCopy.findById(book.available_copies);

    user.loaned_books = user.loaned_books.concat(bookCopy._id);

    bookCopy.status = false;
    bookCopy.borrow_date = Date.now();
    bookCopy.borrower = user._id;

    book.available_copies.splice(0,1);

    await book.save();
    await bookCopy.save();
    await user.save();

    res.redirect("books/loaned");
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}
var returnBook = async(req,res) => {
const user = await user.findById(req.user._id);
const bookCopy = await bookCopy.findById(req.body.bid);
await user.update({ _id: req.user._id }, { $pull: { loaned_books: bookCopy._id}});

await bookCopy.findByIdAndUpdate(req.body.bid, {
    status : true,
    borrow_date : undefined,
    borrower : undefined
});

await book.findByIdAndUpdate(req.body.bid, {
    $push: { available_copies: bookCopy._id}
});
res.redirect("/books/loaned");
}

var searchBooks = async (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
    let books = [];

    books = await book.find({
        title: {$regex: req.book.title, $options: "i"}, 
        author: {$regex: req.book.author, $options: "i"}, 
        genre: {$regex: req.book.genre, $options: "i"}
    });
    res.render('book_detail', { books: books , title: 'Books' });
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    returnBook,
    searchBooks
}