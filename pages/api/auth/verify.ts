import type { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message, signature } = req.body
      const siweMessage = new SiweMessage(message)
      const fields = await siweMessage.verify({ signature })

      if (fields.nonce !== req.session.nonce) {
        return res.status(422).json({ message: 'Invalid nonce.' })
      }

      req.session.siwe = fields
      await req.session.save()
      
      res.json({ ok: true, address: fields.address })
    } catch (error) {
      console.error('Verification error:', error)
      res.status(400).json({ error: 'Invalid signature' })
    }
  } else if (req.method === 'GET') {
    if (req.session.siwe?.address) {
      res.json({ address: req.session.siwe.address })
    } else {
      res.status(401).json({ message: 'Not authenticated' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default withIronSessionApiRoute(handler, sessionOptions)