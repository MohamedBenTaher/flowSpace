import { request } from 'http';
import { cookies} from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';
export function isAuthenticated(request:NextRequest):boolean {
  const token = cookies().get('access_token');
  // Check if the token is valid (e.g., not expired)
  return Boolean(token) && isValidToken(token);
}

const JWT_SECRET = process.env.sercetJwt?.toString()||'';



export function isValidToken(token:any): boolean {
  try {
    // Verify the token and decode its payload
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Check if the token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (error) {
    // An error occurred during token verification (e.g., invalid signature)
    return false;
  }
}
