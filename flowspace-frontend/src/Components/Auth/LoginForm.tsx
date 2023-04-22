import React,{ useState,useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { LoginDto } from "./dto/login.dto";
import { useRouter } from 'next/navigation';
import Google from "@/assets/icons/Google";
import Facebook from "@/assets/icons/Facebook";
import { useSession, signIn, signOut } from "next-auth/react"
type LoginFormProps = {
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
  confirmed?:string|boolean|null;
  reset?:string|boolean|null;
  unauthorized:string|boolean|null;
};
// redirecet in nextjs
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const initialValues :LoginDto ={ email: "", password: "" }
const LoginForm = ({ setIsMember,confirmed,reset,unauthorized }: LoginFormProps) => {
  const { data: session } = useSession()
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const handleGoogleSignIn=async()=>{
       signIn('google')

    }
    useEffect(()=>{
     const sendToken=()=>{
      const user=session?.user
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({idToken:session?.id_token})
        })
        console.log(user,session?.id_token)
      }
      if(session){
        sendToken()
      }
    },[])
  
  return (
    
    <><Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/local/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(values)
          });

          if (response.ok) {
            router.push('/');
          } else {
            const errorMessage = await response.text();
            // Display an error message to the user
            console.log(`Login failed: ${errorMessage}`);
          }
        } catch (error: any) {
          // Handle any network errors
          console.log(`Login failed: ${error.message}`);
        }
      } }
    >
      {({ errors, touched }) => (
        <>
          <Form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full mx-5 h-max ">
            <div className="flex flex-col justify-start mb-16">
              <h2 className="font-bold text-text text-4xl">Welcome Back!</h2>
              <p className="font-ligh mt-3 text-zinc-600">Enter your credentials, to access your account</p>
            </div>
            {confirmed ? (
              <div className="rounded-lg bg-green-500 text-slate-50 shadow-md w-full h-12 p-2 mb-10">Account Confirmed Successfully , welcome &#127881; &#127881;</div>
            ) :
              reset ? (
                <div className="rounded-lg bg-green-500 text-slate-50 shadow-md w-full h-12 p-2 mb-10">Password Updated , login with your new credentials &#127881; &#127881;</div>
              ) :
                unauthorized ? (
                  <div className="rounded-lg bg-yellow-400 text-slate-50 shadow-md w-full h-12 p-2 mb-10">Unauthorized , login with your credentials </div>
                ) :
                  null}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-text font-bold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`${errors.email && touched.email ? "border-red-500 border-2" : ""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  style={{ paddingLeft: "2.5rem" }} />
                <span
                  className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                  style={{ bottom: '0%' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm font-normal " />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={`${errors.password && touched.password ? "border-red-500 border-2" : ""} w-full border p-2 rounded-lg focus:outline-none  `}
                  style={{ paddingRight: "2.5rem", paddingLeft: "2.5rem" }} // add some padding on the right to make space for the eye icon
                />
                <span
                  className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ bottom: errors.password && touched.password ? '25%' : '0%' }}
                >
                  {passwordVisible ?
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>) :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>}
                </span>
                <span
                  className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                  style={{ bottom: errors.password && touched.password ? '25%' : '0%' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>

                </span>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm font-normal " />
              </div>
            </div>
            <div className="w-full flex items-center justify-end  mb-4 font-semibold text-sm text-primary hover:text-secondary hover:underline decoration-from-font hover:decoration-blue-400'">
              <Link href={'/auth/forgot'}>Forgot password ?</Link>
            </div>
            <button
              type="submit"
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Login
            </button>


          </Form></>
      )}
    </Formik><div className="relative flex py-5 items-center mt-5">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div><div className="flex sm:flex-row  flex-col items-center justify-evenly w-full">
        {session?(
          <div>{session.user?.name}</div>
        ):(
          null
        )}
        <button
          onClick={()=>handleGoogleSignIn()}
          className="flex w-full flex-row md:flex-col lg:flex-row items-center justify-center bg-zinc-100 border border-slate-400 hover:bg-zinc-200 text-text font-bold p-4 rounded-lg sm:w-1/3"
        >
          <Google width={25} height={25} />
          <div className="mx-3">
            Google
          </div>
        </button>
        <button
          type="submit"
          className="mt-4 sm:mt-0 flex w-full  md:flex-col  flex-row lg:flex-row items-center justify-center bg-zinc-100  border border-slate-400 hover:bg-zinc-200 text-text font-bold p-4 rounded-lg sm:w-1/3"
        >
          <Facebook width={25} height={25} />
          <div className="mx-3">
            Facebook
          </div>
        </button>
      </div><div className="w-full flex items-center justify-center mt-4 mb-4 ">
        Not a Member ? <a onClick={() => setIsMember((prev) => !prev)} className='font-semibold text-sm text-primary hover:text-secondary hover:underline decoration-from-font hover:decoration-blue-400'> SignIn</a>
      </div></>
  );
};

export default LoginForm;
 