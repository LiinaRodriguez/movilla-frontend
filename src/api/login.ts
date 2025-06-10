// api/login.ts
export async function loginRequest(email: string, password: string) {
  const res = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || 'Error al iniciar sesión');
  }

  return res.json(); 
}
