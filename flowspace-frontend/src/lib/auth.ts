import type { NextRequest, NextResponse } from 'next/server'
import { SignJWT, jwtVerify,KeyLike } from 'jose'

interface UserJwtPayload {
  jti: string
  iat: number
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  const secret=new TextEncoder().encode(process.env.secretJwt)
  if (!token) throw new AuthError('Missing user token')

  try {
    const verified = await jwtVerify(
      token,
     secret
    )
    return verified.payload as UserJwtPayload
  } catch (err) {
    console.log(err)
    throw new AuthError('Your token has expired.')
  }
}
