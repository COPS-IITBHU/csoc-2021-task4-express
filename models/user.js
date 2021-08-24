var mongoose = require("mongoose");
const Bookcopy = require("./bookCopy");
var passportLocal = require("passport-local-mongoose");
//DEFINING THE USER MODEL
var userSchema = new mongoose.Schema({

    //TODO: DEFINE USERNAME AND PASSSWORD ATTRIBUTES
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    loaned_books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookcopy"
        }
    ]
})
userSchema.plugin(passportLocal);
const User = mongoose.model("User", userSchema);
module.exports = User;