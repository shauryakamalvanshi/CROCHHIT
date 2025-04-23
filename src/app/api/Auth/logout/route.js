import { cookies } from "next/headers";

export async function POST() {
  try {
    // Remove the authentication cookie by setting it to an empty value
    cookies().set("token", "", { maxAge: 0 });

    return Response.json({
      success: true,
      message: "Logout successful",
    },{status:200});
  } catch (error) {
    console.log("Logout error:", error);
    return Response.json(
      {
        success: false,
        message: "Logout error",
      },
      { status: 500 }
    );
  }
}
