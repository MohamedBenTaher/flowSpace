import {verify,Secret} from "jsonwebtoken"
import { NextRequest,NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
export const config = {
    matcher: "/",
    };

export default function Middlware(req:NextRequest){

 const access_token=req.cookies.get('access_token')
 const refresh_token=req.cookies.get('refresh_token')
 console.log(access_token,refresh_token)
  if(access_token && refresh_token){
    try {
        verifyAuth(req)
        return NextResponse.next()
    } catch (error) {
        console.log('access token is incorrect',error)
    }
   
  }else{
    return NextResponse.redirect(new URL('/auth', req.url))
  }
}
