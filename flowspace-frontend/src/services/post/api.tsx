import { jwtDecrypt } from "jose";
import axios from "axios";
export const getAuthenticatedUser=async ()=>{

    const user = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
        {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
        }
    );
    return user;
}