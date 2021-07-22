var mongoose = require("mongoose");
const Book = require("../models/book");
//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema = new mongoose.Schema({
    //TODO: DEFINE the following attributes-
    book: {
        //embed reference to id of book of which its a copy
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

    status: {
        type: Boolean, //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE 
        required: true
    },

    borrow_date: {
        //date when book was borrowed
        type: Date,
        default: Date.now,
        required: true
    },

    borrower: {
        //embed reference to id of user who has borrowed it 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
})
module.exports = mongoose.model("Bookcopy", bookCopySchema);