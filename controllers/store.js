const Book = require("../models/book");
const BookCopy = require("../models/bookCopy");
const User = require("../models/user");
const catchAsync = require("../utilities/catchAsync");
var getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find({});
  res.render("book_list", { books, title: "Books | Library" });
});

var getBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id).populate("available_copies");
  res.render("book_detail", { book, title: "Book Detail" });
});

var getLoanedBooks = catchAsync(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).populate({
    path: "loaned_books",
    populate: {
      path: "book"
    }
  });
  res.render("loaned_books", { books: user.loaned_books, title: "Loaned Books" });
});

var issueBook = catchAsync(async (req, res) => {
  const { bid } = req.body;
  const userId = req.user._id;
  const book = await Book.findById(bid).populate("available_copies");
  const bookCopy = book.available_copies.find(copy => {
    return copy.status;
  });
  if (!bookCopy) {
    req.flash("error", "No copy available");
    res.redirect("/books");
  }
  await Promise.all([
    User.findByIdAndUpdate(userId, { $push: { loaned_books: bookCopy._id } }),
    BookCopy.findByIdAndUpdate(bookCopy._id, {
      status: false,
      borrow_date: Date.now(),
      borrower: userId
    })
  ]);
  req.flash("success", "Book issued");
  res.redirect("/books/loaned");
});

var returnBook = catchAsync(async (req, res) => {
  const { bcid } = req.body;
  const userId = req.user._id;
  const bookCopy = await BookCopy.findById(bcid);
  await Promise.all([
    User.findByIdAndUpdate(userId, { $pull: { loaned_books: bookCopy._id } }),
    BookCopy.findByIdAndUpdate(bookCopy._id, {
      status: true,
      borrow_date: undefined,
      borrower: undefined
    })
  ]);
  req.flash("success", "Book returned");
  res.redirect("/books/loaned");
});

var searchBooks = catchAsync(async (req, res) => {
  let { title, author, genre } = req.body;
  const books = await Book.find({
    title: RegExp(title, "i"),
    author: RegExp(author, "i"),
    genre: RegExp(genre, "i")
  });
  res.render("book_list", { books, title: "Books | Library" });
});

module.exports = {
  getAllBooks,
  getBook,
  getLoanedBooks,
  issueBook,
  returnBook,
  searchBooks
};
