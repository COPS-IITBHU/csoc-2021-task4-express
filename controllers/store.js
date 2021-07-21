const Book = require("../models/book");
const BookCopy = require("../models/bookCopy");
const User = require("../models/user");

var getAllBooks = async (req, res) => {
  //TODO: access all books from the book model and render book list page
  const books = await Book.find({});
  try {
    res.render("book_list", {
      books: books,
      title: "Books",
      error: false,
    });
  } catch (error) {
    res.render("book_list", {
      books: books,
      title: "Books",
      error: true,
    });
  }
};

var getBook = async (req, res, next) => {
  //TODO: access the book with a given id and render book detail page
  try{
    const { id } = req.params;
    const book = await Book.findById(id);
  
    res.render("book_detail", { book, title: "Book Detail" });
  }
  catch(error){
      res.redirect("/books");
  }

};

var getLoanedBooks = async (req, res) => {
  //TODO: access the books loaned for this user and render loaned books page

  const { user } = req;
  try {
    const copies = await User.findById(user._id).populate({
      path: "loaned_books",
      populate: { path: "book" },
    });
    const books = copies.loaned_books;
    res.render("loaned_books", { books: books, title: "Loaned Books" });
  } catch (error) {
    res.redirect("/books");
  }
};

var issueBook = async (req, res) => {
  // TODO: Extract necessary book details from request
  // return with appropriate status
  // Optionally redirect to page or display on same

  try {
    const book = await Book.findById(req.body.bid);

    const user = await User.findById(req.user._id);
    const copy = await BookCopy.findById(book.available_copies);
    user.loaned_books = user.loaned_books.concat(copy._id);
    copy.borrower = user._id;
    copy.borrow_date = Date.now();
    copy.status = false;
    book.available_copies.splice(0, 1);

    await user.save();
    await book.save();
    await copy.save();
    await available_copies.save();

    res.redirect("/books/loaned");
  } catch (error) {
    res.redirect(`/book/${req.body.bid}`);
  }
};

var searchBooks = async (req, res) => {
  // TODO: extract search details
  // query book model on these details
  // render page with the above details
  try {
    const books = await Book.find({
      title: { $regex: req.body.title, $options: "i" },
      author: { $regex: req.body.author, $options: "i" },
      genre: { $regex: req.body.genre, $options: "i" },
    });
    res.render("book_list", { books: books, title: "Books" });
  } catch (error) {
    console.log(error);
    res.redirect("/books");
  }
};

var returnBooks = async (req, res) => { 
  try {
    const bookCopy = await BookCopy.findById(req.body.bid);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { loaned_books: bookCopy._id },
    });
    await BookCopy.findByIdAndUpdate(bookCopy._id, {
      status: true,
      borrower: undefined,
      borrow_date: undefined,
    });

    res.redirect("/books/loaned");
  } catch (error) {
    res.redirect("/books/loaned");
  }
};
module.exports = {
  getAllBooks,
  getBook,
  getLoanedBooks,
  issueBook,
  searchBooks,
  returnBooks,
};
