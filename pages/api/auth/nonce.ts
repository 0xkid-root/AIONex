import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { generateNonce } from 'siwe';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const nonce = generateNonce();
  req.session.nonce = nonce;
  await req.session.save();
  
  res.json({ nonce });
}

export default withIronSessionApiRoute(handler, sessionOptions);