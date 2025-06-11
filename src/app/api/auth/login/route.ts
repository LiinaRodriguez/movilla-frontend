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

    // Llamada a la API de producción
    const response = await fetch(
      "https://movilla-hwh8a0hwepayd2f2.canadacentral-01.azurewebsites.net/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Error parsing response:", error);
      return NextResponse.json(
        { error: "Error al procesar la respuesta del servidor" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Error al iniciar sesión" },
        { status: 401 }
      );
    }

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
    console.error("Error en el login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
