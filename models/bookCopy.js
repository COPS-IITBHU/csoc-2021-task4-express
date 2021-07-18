var mongoose=require("mongoose");

var bookCopySchema=new mongoose.Schema({
    book:  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required : true,
    },
    status: {
        type : Boolean,
        required : true,
    }, 
    borrow_data: {
        type : Date,
    }, 
    borrower: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } 
    });

module.exports = mongoose.model("Bookcopy",bookCopySchema);