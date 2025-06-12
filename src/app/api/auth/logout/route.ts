import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Elimina la cookie 'token' estableciéndola expirada
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });
   request.cookies.delete("token");
  return response;
}