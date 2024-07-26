import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/connect';
import { authenticate } from '@/middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = (req as any).user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true},
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default authenticate(handler);