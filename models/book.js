var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL
var bookSchema=new mongoose.Schema({
	/*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
    title:{
        type: String,
        required: true
    },
    genre:[{
        type: String,
        required: true
    }],
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    mrp:{
        type: Number,
        required: true
    },
    available_copies:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'bookCopy', required: true
    }],
})
module.exports=mongoose.model("Book",bookSchema);