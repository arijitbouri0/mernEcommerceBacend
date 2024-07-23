const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
    {
       firstname:{
        type: String,
        required: true,
       },
       lastname:{
        type: String,
        required: true,
       },
       email:{
        type: String,
        required: true,
        unique:true,
       },
       password:{
        type: String,
        required: true,
       },
       role:{
        type: String,
        required: true,
        default:"customer"
       },
       mobile:{
        type: String,
       },
       address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
       }],
       paymentInformation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information"
       }],
       createdAt:{
        type:Date,
        default:Date.now()
       }
    }
);

const User=mongoose.model("users",userSchema);

module.exports=User;