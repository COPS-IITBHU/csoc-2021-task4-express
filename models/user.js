var mongoose=require("mongoose");
var	passportLocal=require("passport-local-mongoose");
//DEFINING THE USER MODEL
const BookCopy = require("./bookCopy");
const Schema = mongoose.Schema

var userSchema = new Schema({


    username: {type: String,required: true},
    password: {type: String,required: true},
 
	//TODO: DEFINE USERNAME AND PASSSWORD ATTRIBUTES
    

    loaned_books:[
        {type: Schema.Types.ObjectId, ref: "Bookcopy"}
    ]
})

userSchema.plugin(passportLocal);
const User = mongoose.model("User", userSchema);
module.exports = User; 