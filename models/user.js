var mongoose = require("mongoose");
var passportLocal = require("passport-local-mongoose");
const BookCopy = require("./bookCopy");
const Schema = mongoose.Schema;
//DEFINING THE USER MODEL
var userSchema = new Schema({
  loaned_books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookcopy"
    }
  ]
});
userSchema.plugin(passportLocal);
module.exports = mongoose.model("User", userSchema);
