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
    // isReleased:{
    //     type:Boolean,
    //     default:false
    // },
    genres:{
        type:String,
        trim:true
    },
    source:{
       URL:String,
       platform:String,
       price:Number,
       isSubscribed:Boolean,    
    }
},
{timestamps:true})


module.exports = mongoose.model("moviedata", movieSchema)