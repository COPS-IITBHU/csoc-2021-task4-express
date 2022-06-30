var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL
var bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
   author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    }, 
    rating:{            
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    //TODO: access all books from the book model and render book list page
    /*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
})
module.exports=mongoose.model("Book",bookSchema);