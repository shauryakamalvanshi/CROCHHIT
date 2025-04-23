import mongoose, { mongo, Mongoose } from "mongoose";

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  verifyCode:{
    type:String,
    required:[true,"please provide us the verify code"],
  },
  verifyCodeExpiry:{
    type:Date,
    required:[true,"please provide us the verify code expiry"],
  },
  isVerified:{
    type:Boolean,
    default:false
  }
})

const User=mongoose.models.User?mongoose.model("User"):mongoose.model("User",UserSchema);
export default User;