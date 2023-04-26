import { jwtDecrypt } from "jose";
import axios from "axios";
export const getAuthenticatedUser=async (token:string)=>{

    const user = await axios.get(`/api/users/me`,{
    });
    return user;
}