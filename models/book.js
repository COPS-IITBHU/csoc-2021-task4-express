var mongoose = require("mongoose");
const Schema = mongoose.Schema;
//DEFINING THE BOOK MODEL
var bookSchema = new Schema({
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
    min: 1,
    max: 5
  },
  mrp: Number,
  available_copies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookcopy"
    }
  ]
});
module.exports = mongoose.model("Book", bookSchema);
