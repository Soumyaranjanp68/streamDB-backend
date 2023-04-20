const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    rating:{
        type:Number,
        max:5,

    },
    genres:{
        type:String,
        trim:true
    },
    source:{
       URL:String,
       platform:String,
       price:Number,
       isSubscribed:{
        type :Boolean,
        default:false
       }    
    }
},
{timestamps:true})


module.exports = mongoose.model("moviedata", movieSchema)