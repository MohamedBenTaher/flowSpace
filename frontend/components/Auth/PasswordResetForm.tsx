'use client'
import React,{ useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetDto } from "./dto/reset.dto";
import { useRouter } from "next/navigation";
const ResetSchema = Yup.object().shape({
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
    confirmPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const validateConfirmPassword = (pass:string, value:string) => {

    let error = "";
    if (pass && value) {
      if (pass !== value) {
        error = "Password not matched";
      }
    }
    return error;
  };
  type ResetFormProps = {
    token:string|null
  };
  const initialValues :resetDto ={ password: "", confirmPassword: "" }
const PasswordResetForm = ({token}:ResetFormProps) => {
   
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const router=useRouter()
    if(!token){
        router.push('auth')
    }
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={ResetSchema}
    onSubmit={async (values) => { 
      console.log('reached reset ',values)
      const resetPayload ={
        password:values.password,
        confirmHash:token
      }
      console.log(resetPayload)
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/reset`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(resetPayload)
      }).then( async(response)=>{
        if(response.ok){
            router.push('/auth?reset=true');
        }
      }).catch((error)=>{
        console.log(error)
      })
    }}
  >
    {({ errors, touched,values }) => (
        <Form className="w-96">
    <><div className="mb-4">
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
              </div><div className="mb-4">
                      <label
                          htmlFor="password"
                          className="block text-gray-700 font-bold mb-2"
                      >
                          Confirm password
                      </label>
                      <div className="relative">
                          <Field
                              name="confirmPassword"
                              type={confirmPasswordVisible ? "text" : "password"}
                              placeholder="Confirm Password"
                              className={`${errors.confirmPassword && touched.confirmPassword ? "border-red-500 border-2" : ""} w-full border p-2 rounded-lg focus:outline-none  `}
                              style={{ paddingRight: "2.5rem", paddingLeft: "2.5rem" }}
                              validate={(value: string) => validateConfirmPassword(values.password, value)} />
                          <span
                              className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                              style={{ bottom: errors.confirmPassword && touched.confirmPassword ? '25%' : '0%' }}
                          >
                              {confirmPasswordVisible ?
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
                              style={{ bottom: errors.confirmPassword && touched.confirmPassword ? '25%' : '0%' }}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                              </svg>

                          </span>
                          <ErrorMessage
                              name="confirmPassword"
                              component="p"
                              className="text-red-500 text-sm font-normal " />
                      </div>
                      <button
                      type="submit"
                      className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                      Reset Password
                  </button>
                  </div></>
  </Form>
  )}
</Formik>
  )
}

export default PasswordResetForm