var mongoose=require("mongoose");
//DEFINING THE BOOK  COPIES MODEL
const Schema = mongoose.Schema;
var bookCopySchema = new Schema({
//TODO: DEFINE the following attributes-
 book:  {type: Schema.Types.ObjectId, ref: "Book", required: true},
 status: {type: Boolean, default: true},
 borrow_date: {type: Date, default: Date.now()},
 borrower: {type: Schema.Types.ObjectId, ref: "User"}
})
const Bookcopy = mongoose.model("Bookcopy", bookCopySchema);
module.exports = Bookcopy; 