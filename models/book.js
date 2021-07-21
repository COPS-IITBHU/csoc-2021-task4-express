var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL
const Schema = mongoose.Schema;
var bookSchema = new Schema({
	/*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    genre: [{type: String, required: true}],
    mrp: {type: Number, required: true},
    available_copies: [{type: Schema.Types.ObjectId, ref: 'bookCopy', required: true}]
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;