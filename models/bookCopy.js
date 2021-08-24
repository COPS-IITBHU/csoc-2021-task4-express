var mongoose=require("mongoose");
//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema=new mongoose.Schema({
//TODO: DEFINE the following attributes-
    book: {             //embed reference to id of book of which its a copy
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },      
    status: {           //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE
        type: Boolean,
        default: true
    },   
    borrow_data: {      //date when book was borrowed
        type: Date,
        default: Date.now
    },
    borrower: {         //embed reference to id of user who has borrowed it
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }   
})

module.exports = BookCopy = mongoose.model("Bookcopy", bookCopySchema);