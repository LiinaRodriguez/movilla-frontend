import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Llamada al API backend para registro
    const response = await fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.message || "Error al crear la cuenta" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Crear la respuesta con el usuario
    const jsonResponse = NextResponse.json(
      { user: data.user },
      { status: 200 }
    );

    // Establecer la cookie con el token
    jsonResponse.cookies.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 día
      path: "/",
    });

    return jsonResponse;
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
