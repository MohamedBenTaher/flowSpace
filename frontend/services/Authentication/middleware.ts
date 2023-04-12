 import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './isAuthenticated';

 
 export function middleware(request: NextRequest) {
   // Call our authentication function to check the request
   if (!isAuthenticated(request)) {
     // Respond with JSON indicating an error message
     return NextResponse.json(
       {
         success: false,
         message: 'Auth failed',
       },
       {
         status: 401,
       },
     );
   }
 }