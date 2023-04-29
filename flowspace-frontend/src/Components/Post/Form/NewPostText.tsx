import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor, EditorState, RichUtils } from "draft-js";

interface FormValues {
  editorState: EditorState;
}

const initialValues: FormValues = {
  editorState: EditorState.createEmpty(),
};

const onSubmit = (values: FormValues) => {
  // Handle form submission with values
};

const RichTextEditor = ({ field, form }: any) => {
  const handleEditorChange = (editorState: EditorState) => {
    form.setFieldValue(field.name, editorState);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div>
      <Editor
        editorState={field.value}
        onChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};

const RichTextEditorForm = () => {
  return (
    <div className="h-96 w-full">
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ errors, touched }) => (
        <Form>
          <Field name="editorState" component={RichTextEditor} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default RichTextEditorForm;

