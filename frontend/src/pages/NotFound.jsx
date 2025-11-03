import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src="404_NotFound.png"
        alt="not found"
        className="max-w-full mb-6 w-96"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >Return back</a>
    </div>
  );
};

export default NotFound;
