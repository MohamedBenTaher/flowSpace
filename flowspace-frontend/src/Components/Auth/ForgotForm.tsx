'use client'
import React,{ useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetDto } from "./dto/reset.dto";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/api";
const forgotSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('An email is required'),
  });
  const initialValues ={ email: "" }
const ForgotForm = () => {

    const router=useRouter()
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={forgotSchema}
    onSubmit={async (values) => { 
        const forgottenPassword=await forgotPassword(values)
        if(forgottenPassword){
            router.push('/auth');
        }
    }}
  >
    {({ errors, touched }) => (
        <Form className="w-96">
    <><div className="mb-4">
                  <label
                      htmlFor="password"
                      className="block text-gray-700 font-bold mb-2"
                  >
                      Insert your Email
                  </label>
                  <div className="relative">
                      <Field
                          name="email"
                          type={"email"}
                          placeholder="email"
                          className={`${errors.email && touched.email ? "border-red-500 border-2" : ""} w-full border p-2 rounded-lg focus:outline-none  `}
                          style={{ paddingRight: "2.5rem", paddingLeft: "2.5rem" }} // add some padding on the right to make space for the eye icon
                      />
                      <span
                          className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                          style={{ bottom: errors.email && touched.email ? '25%' : '0%' }}
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                         </svg>

                      </span>
                      <ErrorMessage
                          name="password"
                          component="p"
                          className="text-red-500 text-sm font-normal " />
                  </div>
                      <button
                      type="submit"
                      className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                      Send Reset Email
                  </button>
                  </div></>
  </Form>
  )}
</Formik>
  )
}

export default ForgotForm