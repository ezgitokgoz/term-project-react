// src/app/api/auth/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/utils/connect';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.method, req.body);

  if (req.method !== 'POST') {
    console.log("Invalid request method");
    return res.status(405).end(); // Method Not Allowed
  }
 
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password || !password) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('User found:', user);

    if (password !== null) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      console.log('Password not found');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
