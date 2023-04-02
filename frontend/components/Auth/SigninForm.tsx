'use client'
import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignInDto } from "./dto/signIn.dto";
import { countries } from "@/utils/countries-list";
import Link from "next/link";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
    birthdate:Yup.date()
    .required('BirthDate is required'),
    confirmpassword: Yup.string()
    .required("Password confirmation is required"),
    userName:Yup.string()
    .min(5,"Username must have atleast 5 charecters")
    .required("Username is required"),
    firstName:Yup.string()
    .min(3,"First name must be at least 3 charecters")
    .required("First name is required"),
    lastName:Yup.string()
    .min(3,"Last name must be at least 3 charecters")
    .required("Last name is required"),
    gender:Yup.string()
    .required('Please select your gender')
    .oneOf(['male','female'])
});

const SignInForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const validateConfirmPassword = (pass:string, value:string) => {

        let error = "";
        if (pass && value) {
          if (pass !== value) {
            error = "Password not matched";
          }
        }
        return error;
      };
    const initialValues:SignInDto={ email: "", password: "" ,firstName:"",lastName:"",userName:"",birthday:new Date(),confirmPassword:'',gender:''}
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={SigninSchema}
      onSubmit={async (values) => {
        const payload:SignInDto= values;
        delete payload.confirmPassword
        console.log('reached', payload)
        await fetch('http://localhost:5000/auth/local/register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(payload)
        })
      }}
    >
      {({ errors, touched,values }) => (
        <>
        <Form className="transition ease-in-out delay-150 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full mx-5 h-max ">
        <div className="flex flex-col justify-start mb-16">
            <h2 className="font-bold text-text text-4xl">Get Started with FlowSpace</h2>
            <p className="font-ligh mt-3 text-zinc-600">Register to create your first account and start exploring the creative community of FlowSpace</p>
        </div>
        <div className="mb-4">
                      <label
                          htmlFor="email"
                          className="block text-text font-bold mb-2"
                      >
                          Username
                      </label>
                      <div className="relative">
                      <Field
                          type="input"
                          id="username"
                          name="userName"
                          placeholder="Enter your username"
                          className={`${errors.userName && touched.userName ? "border-red-500 border-2" : ""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                          style={{ paddingLeft: "2.5rem" }} />
                       <span
                        className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:'0%'}}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    </span>
                    </div>
                      <ErrorMessage
                          name="userName"
                          component="p"
                          className="text-red-500 text-sm font-normal " />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4  w-3/4 mr-4">
                      <label
                          htmlFor="email"
                          className="block text-text font-bold mb-2"
                      >
                          First name
                      </label>
                      <div className="relative">
                      <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          className={`${errors.firstName && touched.firstName ? "border-red-500 border-2" : ""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                          style={{ paddingLeft: "2.5rem" }} />
                       <span
                        className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:'0%'}}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    </span>
                    </div>
                      <ErrorMessage
                          name="firstName"
                          component="p"
                          className="text-red-500 text-sm font-normal " />
                  </div>
                  <div className="mb-4 w-3/4 ml-4">
                      <label
                          htmlFor="email"
                          className="block text-text font-bold mb-2"
                      >
                          Last name
                      </label>
                      <div className="relative">
                      <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          className={`${errors.lastName && touched.lastName ? "border-red-500 border-2" : ""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                          style={{ paddingLeft: "2.5rem" }} />
                       <span
                        className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:'0%'}}
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    </span>
                    </div>
                      <ErrorMessage
                          name="lastName"
                          component="p"
                          className="text-red-500 text-sm font-normal " />
                  </div>
                  </div>
   <div className="mb-4">
                      <label
                          htmlFor="email"
                          className="block text-text font-bold mb-2"
                      >
                          Email
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
                        style={{bottom:'0%'}}
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
                      <div className="relative">
                <Field name="birthday" style={{ paddingLeft: "2.5rem" }} >
                    {({ field , form, meta }) => (
                        <div className="mb-4">
                        <label htmlFor="birthday" className="block text-gray-700 font-bold mb-2">
                            Birthdate
                        </label>
                        <DatePicker
                            id="birthday"
                            {...field}
                            className={` appearance-none pl-10 border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            meta.error && meta.touched ? 'border-red-500' : ''
                            }`}
                            selected={field.value}
                            onChange={(date) => form.setFieldValue('birthday', date)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Select your birthdate"
                        />
                        {meta.error && meta.touched && (
                            <div className="text-red-500 text-sm mt-2">{meta.error}</div>
                        )}
                        </div>
                    )}
                    </Field>
                       <span
                        className="absolute  left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:errors.birthday?'37%':'10%'}}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    </span>
                    </div>
                  </div>
                  <div className="mb-4">
                      <label
                          htmlFor="email"
                          className="block text-text font-bold mb-2"
                      >
                          Gender
                      </label>
                      <div className="flex items-start justify-start flex-row">
                     
                         <label className="inline-flex items-center ">
                         <div className={`${  values.gender=='male' ?"border-blue-700 border-2 bg-slate-50" : "border-zinc-400  border-1"} h-12 inline-flex items-center flex-row space-x-2 justify-start w-36 border-solid  border-zinc-400 bg-zinc-100 mr-4 rounded-lg`}>
                         <Field type="radio" name="gender" value="male" 
                         className='mr-4 ml-6'
                         />
                         Male
                         </div>
                       </label>
                       
                      
                       <label>
                       <div className={`${  values.gender=='female' ?"border-blue-700 border-2 bg-slate-50 border-1" : "border-zinc-400"} h-12 flex items-center flex-row justify-start w-36 border-solid  border-zinc-400 bg-zinc-100 mr-4 rounded-lg`}>
                         <Field type="radio" name="gender" value="female" className='mr-4 ml-6'/>
                         Female
                         </div>
                       </label>
                      
                       </div>
                      <ErrorMessage
                          name="gender"
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
                        style={{ paddingRight: "2.5rem" ,paddingLeft: "2.5rem"}} // add some padding on the right to make space for the eye icon
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        style={{bottom:errors.password && touched.password ? '25%':'0%'}}
                    >
                        {passwordVisible ?
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>):
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                         }
                    </span>
                    <span
                        className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:errors.password && touched.password ? '25%':'0%'}}
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
                    <div className="mb-4">
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
                        style={{ paddingRight: "2.5rem" ,paddingLeft: "2.5rem"}}
                        validate={(value :string)=>
                            validateConfirmPassword(values.password, value)
                          }
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        style={{bottom:errors.confirmPassword && touched.confirmPassword ? '25%':'0%'}}
                    >
                        {confirmPasswordVisible ?
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>):
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                         }
                    </span>
                    <span
                        className="absolute inset-y-0 left-0 pl-2 flex items-center cursor-pointer"
                        style={{bottom:errors.password && touched.password ? '25%':'0%'}}
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
                    </div>
                  <button
                      type="submit"
                      className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                      Sign In
                  </button>
                 <div className="w-full flex items-center justify-center mt-4 mb-4 ">
                   Already have an account ? <Link href={'#'} className='font-semibold text-sm text-primary hover:text-secondary hover:underline decoration-from-font hover:decoration-blue-400'> Login</Link>
                  </div>

              </Form></>
      )}
    </Formik>
  );
};

export default SignInForm;
