var mongoose=require("mongoose");
//DEFINING THE BOOK  COPIES MODEL
var Book=require("../models/book")
var bookCopySchema=new mongoose.Schema({
//TODO: DEFINE the following attributes-
 book:Book=, //embed reference to id of book of which its a copy
 status:{
     type:Boolean,
     required:true
 }, //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE 
 borrow_data:{
     type:String,
 }, //date when book was borrowed
 borrower:{
     type:String,
 } //embed reference to id of user who has borrowed it 
},{
    timestamps:true,
})
module.exports=mongoose.model("Bookcopy",bookCopySchema);