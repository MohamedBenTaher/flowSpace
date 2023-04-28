import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import 'tailwindcss/tailwind.css';
import { useMutation ,useQueryClient } from '@tanstack/react-query';
import { CreatePost } from '../dto/create-post.dto'
import { createPost } from '@/services/post/api';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(280, 'Post content must be less than 280 characters')
    .required('Required'),
});
type Post ={
  content:string;
  published:Boolean
}

const initialValues:Post = {
  content: '',
  published:true
};
interface Props {

  setCreated: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPostForm = () => {
  const queryClient=useQueryClient()
  const mutation=useMutation({
    mutationFn:(values:Post)=>{
      console.log('reached mutation')
      return  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,values,
      {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
      }
  )
    }
  },
  );
  const handleSubmit = (values:Post, { resetForm }:FormikHelpers<Post>) => {
    mutation.mutate(values)
    setCreated(prev=>!prev)
 
    queryClient.invalidateQueries(['posts'])
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
        <Form className='w-full'>
          <div className="flex flex-col items-start space-y-2">
            <div className="w-full">
              <Field
                as="textarea"
                name="content"
                className={`w-full p-2 border rounded-md ${
                  errors.content && touched.content
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="What's on your mind?"
              />
              {errors.content && touched.content && (
                <div className="text-red-500">{errors.content}</div>
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