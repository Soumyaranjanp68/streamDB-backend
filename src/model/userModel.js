const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        password: {
            type:String,
            required:true,
            min:5,
            max:15,
            trim:true,
        },
        phone: {
            type:Number,
            required:true,
            unique:true,
            trim:true,
        }
    },{timestamps:true}
)

module.exports = mongoose.model("UserData", userSchema)