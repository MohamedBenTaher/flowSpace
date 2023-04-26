import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';

const validationSchema = Yup.object().shape({
  postContent: Yup.string()
    .max(280, 'Post content must be less than 280 characters')
    .required('Required'),
});

const initialValues = {
  postContent: '',
};

const NewPostForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-col items-start space-y-2">
            <div className="w-full">
              <Field
                as="textarea"
                name="postContent"
                className={`w-full p-2 border rounded-md ${
                  errors.postContent && touched.postContent
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="What's on your mind?"
              />
              {errors.postContent && touched.postContent && (
                <div className="text-red-500">{errors.postContent}</div>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;