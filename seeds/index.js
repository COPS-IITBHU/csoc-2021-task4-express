if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const books = require("./books.json").books;
const Book = require("../models/book");
const BookCopy = require("../models/bookCopy");
const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/library";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Promise.all([Book.deleteMany({}), BookCopy.deleteMany({})]);
  for (let book of books) {
    const new_book = new Book({
      title: book.title,
      author: book.author,
      mrp: Math.round(book.price * 75),
      genre: "Fiction",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque eveniet delectus molestias soluta esse animi sunt quasi autem ullam mollitia consectetur impedit repudiandae laudantium odio, tempore quam nostrum. Vel aliquid officia sunt unde, cum velit, nostrum dolorum alias quia, consequuntur quam porro ullam dignissimos! Dicta vel quo aliquam et praesentium!",
      rating: 3
    });
    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
      let new_book_copy = new BookCopy({
        book: new_book._id,
        status: true
      });
      await new_book_copy.save();
      new_book.available_copies.push(new_book_copy._id);
    }
    await new_book.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

// console.log(books);
