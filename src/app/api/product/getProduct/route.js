import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connect();
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(20); // Fetch only the 20 most recent products
      console.log(products);
      

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error while fetching products" },
      { status: 500 }
    );
  }
}
