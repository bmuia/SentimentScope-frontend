import React from 'react';

const ErrorMessage = ({ message }) => {
    return message ? <p className="text-red-600 text-sm mb-4">{message}</p> : null;
};

export default ErrorMessage;
