import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product.Model";
import { NextResponse } from "next/server";

// Ensure DB connection
await connect();

export async function POST(request) {
  try {
    const { title, description, price, quantity, category, images } = await request.json();

    if (!title || !description || !price || !quantity || !category || !images || !images.length) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Create a new product
    const newProduct = new Product({
      title,
      description,
      price,
      quantity,
      category,
      images,
    });
console.log("product1");

    await newProduct.save();
    console.log("product2");
    return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Internal Server Error while adding product" },
      { status: 500 }
    );
  }
}
