import React from "react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field,ErrorMessage } from "formik";
import { useMutation ,useQueryClient } from '@tanstack/react-query';
import { CreatePost } from '../dto/create-post.dto';
import axios from 'axios';
import { useRouter } from "next/router";
import * as Yup from 'yup';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextInputProps {
  label: string;
  name: string;
}
const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(280, 'Post content must be less than 280 characters')
    .required('Required'),
  title: Yup.string()
    .max(280, 'Title must have less than 50 characters')
    .required('Required'),
});
const RichTextInput: React.FC<RichTextInputProps> = ({ label, name }) => {
  const [field, meta, helpers] = useField<string>(name);

  const handleChange = (content: string) => {
    helpers.setValue(content);
  };
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};
  return (
    <div className="flex items-start justify-center flex-col">
      <label htmlFor={name}>{label}</label>
      <ReactQuill
        {...field}
        value={field.value}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        modules={modules}
        className=" bg-white rounded-lg max-w-max"
        placeholder="Post Content..."
        style={{
          minHeight: '700px !important',
        }}
      />
      {meta.touched && meta.error && (
        <div style={{ color: "red" }}>{meta.error}</div>
      )}
    </div>
  );
};

const MyForm: React.FC = () => {
  const initialValues = { title:'',content: "" ,published:true};
  const router =useRouter()
  const queryClient=useQueryClient()
  const mutation=useMutation({
    mutationFn:(values:CreatePost)=>{
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
  const handleSubmit = (values:CreatePost) => {
    mutation.mutate(values)
    queryClient.invalidateQueries(['posts'])
    console.log(values);
    router.push('/')

  };

  return (
    <div className=" h-full w-3/4">
      <h1>My Form</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} className=" h-full">
        {({ errors, touched }) => (
          <Form className="h-full flex flex-col items-start justify-center">
            <label htmlFor="title">Title</label>
            <Field 
             name="title"
             id="title"
             type="text"
             className={`${errors.title && touched.title} ? "border-red-500 border-2" : "" w-full h-full p-2 rounded-md border-2 border-slate-200`}
             />
         <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm font-normal " />
            <Field name="content" label="Content" className="w-full flex item-start">
              {({ field, form,error }: { field: any; form: any,error:any }) => (
                <><RichTextInput
                  name={field.name}
                  label={'Content'}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value} /><ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm font-normal " /></>
              )}
            </Field>
            {touched.content && errors.content && (
              <div style={{ color: "red" }}>{errors.content}</div>
            )}

                <button
                      type="submit"
                      className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                      Add Post
                  </button>          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
