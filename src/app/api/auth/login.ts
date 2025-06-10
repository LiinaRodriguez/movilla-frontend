// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { loginRequest } from '@/api/login';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    const { token, user } = await loginRequest(email, password);

    // Guardar token en cookie HTTP-only
    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 día
        sameSite: 'lax',
        path: '/',
      })
    );

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
