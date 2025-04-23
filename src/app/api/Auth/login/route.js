import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User.Model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  try {
    const {email, password } = await request.json();
console.log("heelo");
console.log(email,password);


    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({error:"user does not exists"},{status:400})
    }
    console.log("hrllo pa",user);
    

    const validPassword=await bcrypt.compare(password,user.password);
    if (!validPassword) {
      return NextResponse.json({error:"Invalid password"},{status:400})
    }

    const isVerified=await user.isVerified;
    if (!isVerified) {
      return NextResponse.json({error:"User is not verified"},{status:400})
    }

    const tokenData={
      id:user._id,
      name:user.name,
      email:user.email
    }
    const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"})

    const response=NextResponse.json({
      message:"Login Successfully",
      success:true,  
  })
  response.cookies.set("token", token, { httpOnly: true, maxAge: 86400000 }); // Set expiry to 1 day (in milliseconds)
  return response;
  } catch (error) {
    console.error('Login Error', error);
    return NextResponse.json({
      success: false,
      message: "Login Error"
    },
      {
        status: 500
      })
  }
}