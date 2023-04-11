const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    
    movie:{
        type:String,
        trim:true
    },

    review:{
        type:String,
        trim:true
    },
    rating:{
        type:Number,
        max:5,

    },
    reviewedBy:{
        type:String,
        trim:true,
        default:"guest"
    },
},{timestamps:true})


module.exports = mongoose.model("reviewsData", reviewSchema)