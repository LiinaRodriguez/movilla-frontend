import { NextResponse } from "next/server";

export async function POST() {
 
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}