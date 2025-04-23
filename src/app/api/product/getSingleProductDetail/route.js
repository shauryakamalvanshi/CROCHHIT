import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product.Model";

export async function POST(request) {
  await connect();
  try {
    const { productId } = await request.json();
    console.log("Product ID:", productId);
    
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json({
        success: false,
        message: "Product not found",
      }, { status: 404 });
    }
    return Response.json({
      success: true,
      message: "Product found",
      product,
    }, { status: 200 });

  } catch (error) {
    console.log("Error in geettinf the single data" + error);
    return Response.json({
      success: false,
      message: "Error in getting the single data"

    }, { status: 500 })


  }
}