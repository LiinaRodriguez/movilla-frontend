import { NextResponse } from "next/server";

export async function POST() {
  // Elimina la cookie 'token' estableciéndola expirada
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
