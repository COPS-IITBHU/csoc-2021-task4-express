const mongoose = require("mongoose");
const books = require("./books.json").books;
const Book = require("../models/book");
const BookCopy = require("../models/bookCopy");

const mongoDB =
  "mongodb+srv://user008:cq1569008@cluster0.avvqc.mongodb.net/library_database?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose Connected.."))
  .catch((err) => console.log(err));

const dB = async () => {
  await Promise.allSettled([Book.deleteMany({})]);
  try {
    books.forEach((book) => {
      const newBook = new Book({
        title: book.Title,
        author: book.Author,
        genre: book.Genre,
        rating: book.rating,
        mrp: book.Price,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque eveniet delectus molestias soluta esse animi sunt quasi autem ullam mollitia consectetur impedit repudiandae laudantium odio, tempore quam nostrum. Vel aliquid officia sunt unde, cum velit, nostrum dolorum alias quia, consequuntur quam porro ullam dignissimos! Dicta vel quo aliquam et praesentium!",
      });

      let book_copy = new BookCopy({
        book: newBook._id,
        status: true,
      });
      book_copy.save();
      newBook.save();

      newBook.available_copies.push(book_copy.id);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dB();
