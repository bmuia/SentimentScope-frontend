import React from 'react';

function Button({ onClick, disabled, children, variant = 'primary', type = 'button' }) {
    const base =
        'w-full py-2 px-4 rounded-lg transition duration-200 focus:outline-none';
    const styles = {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    };

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${base} ${styles[variant]}`}
        >
            {children}
        </button>
    );
}

export default Button;
