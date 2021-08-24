var mongoose = require("mongoose");
const Schema = mongoose.Schema;
//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }, //true if available to borrow
  borrow_date: {
    type: Date
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Bookcopy", bookCopySchema);
