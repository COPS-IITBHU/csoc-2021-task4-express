const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


//DEFINING THE BOOK MODEL
const bookSchema=new mongoose.Schema({
	/*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
    title:String,
    genre:String,
    author:String,
    description:String,
    rating:Number,
    mrp:Number,
    available_copies:Number,

})


module.exports=mongoose.model("Book",bookSchema);

