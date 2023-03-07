const mongoose = require("mongoose");

//connect mongoose
mongoose.connect("mongodb+srv://Sherin17:Reenijiji1@cluster0.quvjjgb.mongodb.net/MovieManagementSystem?retryWrites=true&w=majority");

//Schema
const Schema = mongoose.Schema;
var movieSchema=new Schema({
    moviename:String,
    actor:String,
    actress:String,
    director:String,
    releaseover:Number,
    camera:String,
    producer:String,
    language:String
})

const movieInfo = mongoose.model('movie',movieSchema)
module.exports = movieInfo