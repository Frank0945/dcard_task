import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react'

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const session = await getSession({ req });
  if (req.url === '/login' && session?.accessToken) {
    res.redirect('/');
  } else if (session?.accessToken === null) {
    res.redirect('/login');
  } else {
    next();
  }
};

export default authMiddleware;