import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User.Model";
import bcrypt from "bcryptjs"


export async function POST(request) {
  await connect();
  try {
    const { name,email,phone, password } =await request.json();
    console.log(name,email,phone,password);

    const existingUserByEmail=await User.findOne({email});
    const verifyCode=Math.floor(1000+Math.random()*9000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          success:false,
          message: "User already exists and is verified",
        },{status:400})
      }else{
        const hashedPassword =await bcrypt.hash(password,10);
        existingUserByEmail.password=hashedPassword;
        existingUserByEmail.verificationCode=verifyCode;
        existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000);

        await existingUserByEmail.save();
        return Response.json({
          success:true,
          message: "verification code sent to email",
          },{status:200})
      }
     }  else{
      const hashedPassword =await bcrypt.hash(password,10);
      const expiryDate=new Date()
      expiryDate.setHours(expiryDate.getHours()+1)
      const newUser =new User({
        name,
        email,
        phone,
        password:hashedPassword,
        verifyCode:verifyCode,
        verifyCodeExpiry:expiryDate,
        isVerified:false,
      })
      await newUser.save();
      return Response.json({
        success:true,
        message: "User registered successfully",
        },{status:201})
    }
    return Response.json({
      success: true,
      message: "Bla blabla"
    }, { status: 201 })
     
    

    
    
  } catch (error) {
    console.log("Error registering user"+error);

    return Response.json({
      success:false,
      message: "Error registering the user"
    },{
      status: 500
    }) 
  }

}