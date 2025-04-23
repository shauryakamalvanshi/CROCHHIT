import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/Contact.Model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  try {
    const { name, email, phone, message } = await request.json();
    console.log(name, email, phone, message);

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Contact form submission error",
      },
      { status: 500 }
    );
  }
}
