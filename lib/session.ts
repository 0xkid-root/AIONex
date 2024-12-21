import { SessionOptions } from 'iron-session';
import { SiweMessage } from 'siwe';

// Extend iron-session types
declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
  }
}

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is not set');
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'aionex_auth',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  },
  ttl: 7 * 24 * 60 * 60, // 1 week in seconds
};