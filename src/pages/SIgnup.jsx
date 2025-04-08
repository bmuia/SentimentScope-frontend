import React from 'react';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import AuthFormLayout from '../components/AuthFormLayout';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/accounts/register/`, {
                email,
                password,
            });

            setSuccess(true);
            navigate('/');
        } catch (err) {
            if (err.response?.data?.email) {
                setError(err.response.data.email[0]);
            } else if (err.response?.data?.password) {
                setError(err.response.data.password[0]);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post(`${API_URL}/api/accounts/guest/`, {});
            const { acess, refresh } = response.data;
            localStorage.setItem('access', acess);
            localStorage.setItem('refresh', refresh);
            setSuccess(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Something went wrong with guest login.');
            } else {
                setError('Guest login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthFormLayout title="Create an Account 🎉" subtitle="Join us and start your journey">
            <ErrorMessage message={error} />
            <SuccessMessage message={success ? 'Signup successful! 🎊 You can now log in.' : ''} />

            <form onSubmit={handleSignup} className="space-y-4">
                <InputField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/" className="text-purple-600 hover:underline">
                    Sign in
                </a>
            </p>

            <div className="mt-6 text-center">
                <button
                    onClick={handleGuestLogin}
                    disabled={loading}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-200"
                >
                    {loading ? 'Loading...' : 'Continue as Guest'}
                </button>
            </div>
        </AuthFormLayout>
    );
}

export default Signup;
