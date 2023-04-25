import { jwtDecrypt } from "jose";
import axios from "axios";
export const getAuthenticatedUser=async (token:string)=>{

    const secret=new TextEncoder().encode(process.env.secretJwt)
    const decodedToken=jwtDecrypt(token,secret)
    const user = await axios.get(`/api/users/${decodedToken?.userId}`);
    return user
}