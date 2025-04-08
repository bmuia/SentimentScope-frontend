import React from 'react';

function AuthFormLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{title}</h1>
                <p className="text-gray-600 mb-6 text-center">{subtitle}</p>
                {children}
            </div>
        </div>
    );
}

export default AuthFormLayout;
