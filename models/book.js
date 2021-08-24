var mongoose = require("mongoose");
//DEFINING THE BOOK MODEL
var bookSchema = new mongoose.Schema({
    /*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
    title: {
        type: String,
        required: true
    },
    genre: String,
    author: {
        type: String,
        required: true
    },
    description: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    mrp: Number,
    available_copies: Number,
})
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

