import React from 'react';

const SuccessMessage = ({ message }) => {
    return message ? <p className="text-green-600 text-sm mb-4">{message}</p> : null;
};

export default SuccessMessage;
