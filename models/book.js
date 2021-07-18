var mongoose=require("mongoose");

var bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default : 0,
  },
  mrp: {
    type: Number,
    min: 1,
    required: true,
  },
  available_copies: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Bookcopy'
  }]

});

module.exports=mongoose.model("Book",bookSchema);