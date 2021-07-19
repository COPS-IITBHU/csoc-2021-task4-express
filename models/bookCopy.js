var mongoose=require("mongoose");
//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema=new mongoose.Schema({
//TODO: DEFINE the following attributes-
 book:  //embed reference to id of book of which its a copy
 {   
     type: mongoose.Schema.Types.ObjectId,
     required: true
 }, 
 status: {
     type: Boolean,
     required: true
 },
 //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE 
 borrow_data: {
     type: Date,
    //  required: function() {
    //      return !this.status;
    //  }
 }, //date when book was borrowed
 borrower:{
     type: mongoose.Schema.Types.ObjectId,
    //  required: function() {
    //      return !this.status;
    //  }
 } //embed reference to id of user who has borrowed it 
})
module.exports=mongoose.model("Bookcopy",bookCopySchema);