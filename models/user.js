var mongoose=require("mongoose");
var	passportLocal=require("passport-local-mongoose");

/* Here, salt and hash will constitute the password together */

var userSchema=new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    salt : {
        type : String,
    }, 
    hash : {
        type : String,
    },
    loaned_books:[{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Bookcopy'    
    }]
})

userSchema.plugin(passportLocal);
module.exports=mongoose.model("User",userSchema);