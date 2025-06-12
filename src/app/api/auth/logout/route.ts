import { NextResponse } from "next/server";

export async function POST() {
  // Intenta llamar al backend real para cerrar sesión, pero ignora errores
  try {
    await fetch("https://movilla-hwh8a0hwepayd2f2.canadacentral-01.azurewebsites.net/api/usuarios/logout", {
      method: "POST",
      credentials: "include"
    });
  } catch (e) {
    // Ignora el error para no bloquear el logout local
    console.error("Error llamando al backend de logout:", e);
  }

  // Elimina la cookie local
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