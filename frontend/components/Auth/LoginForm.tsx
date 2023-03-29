'use client'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full mx-5">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`${
                errors.email && touched.email ? "border-red-500" : ""
              } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`${
                errors.password && touched.password ? "border-red-500" : ""
              } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
