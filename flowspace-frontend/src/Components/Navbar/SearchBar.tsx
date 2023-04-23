import React from "react";
import { useFormik } from "formik";

const SearchBar = () => {
  const formik = useFormik({
    initialValues: {
      searchQuery: "",
    },
    onSubmit: (values) => {
      // Handle the search query here
      console.log(values.searchQuery);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center border-2 border-teal-500 rounded-full ">
        <input
          id="searchQuery"
          name="searchQuery"
          type="text"
          placeholder="Search"
          className="appearance-none bg-transparent  border-teal-500 w-full text-gray-700 mx-3 py-1 px-2 leading-tight focus:outline-none"
          value={formik.values.searchQuery}
          onChange={formik.handleChange}
        />
        {formik.values.searchQuery.length >= 3 && (
          <button
            type="submit"
            className="flex-shrink-0 hover:  text-sm  text-white py-1 px-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
