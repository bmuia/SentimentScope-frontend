import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. Please ensure you're using the correct link or contact the system administrator for further assistance.
        </p>
        <div className="flex justify-center mt-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
