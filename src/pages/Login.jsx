import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext'
import { API_URL } from '../config/apiConfig';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import AuthFormLayout from '../components/AuthFormLayout';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { login } = useAuth(); // Get login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(`${API_URL}/api/accounts/login/`, {
                email,
                password,
            });

            const { access, refresh } = response.data;
            // Using context's login function
            login(access, refresh);
            setSuccess(true);
        } catch (error) {
            if (error.response?.status === 400) {
                setError('Invalid email or password');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(`${API_URL}/api/accounts/guest/`, {});
            const { access, refresh } = response.data;
            login(access, refresh); // Using context's login function for guest login
            setSuccess(true);
        } catch (error) {
            if (error.response?.status === 400) {
                setError('Something went wrong with guest login.');
            } else {
                setError('Guest login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthFormLayout title="Welcome Back 👋" subtitle="Please sign in to continue">
            {/* Error & Success Messages */}
            <ErrorMessage message={error} />
            <SuccessMessage message={success ? 'Login successful! 🎉' : ''} />

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input Field */}
                <InputField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input Field */}
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Login Button */}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{' '}
                <a href="/signup" className="text-purple-600 hover:underline">
                    Create one
                </a>
            </p>

            {/* Guest Login Button */}
            <div className="mt-6 text-center">
                <Button onClick={handleGuestLogin} disabled={loading} variant="secondary">
                    {loading ? 'Loading...' : 'Continue as Guest'}
                </Button>
            </div>
        </AuthFormLayout>
    );
}

export default Login;
