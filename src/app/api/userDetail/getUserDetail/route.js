// import { connect } from "@/dbConfig/dbConfig";
import jwt, { decode } from "jsonwebtoken"

export async function POST(request) {
  try {
    // await connect();
    console.log("Hello shaurya");
    
    const cookies=request.cookies;
    const {_parsed}=cookies;
    console.log(_parsed);
    
 
    

    const token=_parsed.get('token');
    if (!token) {
      return Response.json({
        success:false,
        message:"Token is missing in the request cookie."
      },{status:401})
    }
    const tokenData=token.value;
    console.log(tokenData);
    
    
    
    if(!tokenData){
      return Response.json({
        success:false,
        message:"Token is missing in the request cookie."
      },{status:401})
    }
   
    const decoded=jwt.decode(tokenData,process.env.SECRET_KEY);
    console.log("hkkk",decoded);
    
  
const Username=decoded.name;
if(!Username){
  return Response.json({
    success: false,
    message: 'Invalid Token.'
  }, { status: 403 })
  }

  return Response.json(decoded);
  } catch (error) {
    console.log("Error while getting the data",error);
    return Response.json({
      error,
      success:false,
      message:"Error while trying to get the data Please Login first"
    },{status:500})
    
  }
  }
  

