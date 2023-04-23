import { LoginDto } from "@/Components/Auth/dto/login.dto";
import axios from "axios";
import { SignInDto } from "@/Components/Auth/dto/signIn.dto";
export const loginUser = async (values: LoginDto): Promise<any> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/login`,
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return { data: response.data, status: response.status };
      } else {
        const errorMessage = response.data;
        // Display an error message to the user
        console.log(`Login failed: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      // Handle any network errors
      console.log(`Login failed: ${error.message}`);
      throw new Error(error.message);
    }
  };
  
export const sendToken = async (session: any): Promise<any> => {
    try {
      const user = session?.user;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`,
        { idToken: session?.id_token },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(user, session?.id_token);
      return { data: response.data, status: response.status };
    } catch (error: any) {
      // Handle any network errors
      console.log(`Token sending failed: ${error.message}`);
      throw new Error(error.message);
    }
  };

  export const signIn = async (values: SignInDto): Promise<boolean> => {
    try {
      const payload: SignInDto = { ...values };
      delete payload.confirmPassword;
      console.log("reached", payload);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     return true
    } catch (error: any) {
      console.log(`Signin failed: ${error.message}`);
      throw new Error(error.message);
    }
  };
  export const confirmAccount=async(token:string):Promise<boolean>=>{
    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/confirm`,{token},  {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              return true;
        } catch (error:any) {
            console.log(`Signin failed: ${error.message}`);
            throw new Error(error.message);
        }
    }
    
export const forgotPassword = async (values: any): Promise<boolean> => {
    try {
      console.log("reached reset", values);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/forgot`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return true
      }
      return false
    } catch (error: any) {
      console.log(`Reset failed: ${error.message}`);
      throw new Error(error.message);
    }
  };
  export const resetPassword = async (values: any, token: string | null): Promise<boolean> => {
    try {
      const resetPayload = {
        password: values.password,
        confirmHash: token,
      };
      console.log(resetPayload);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/reset`,
        resetPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return true
      }
      return false
    } catch (error: any) {
      console.log(`Reset failed: ${error.message}`);
      throw new Error(error.message);
    }
  };