import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';

const Dashboard = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Make the API request with Authorization header
      const response = await axios.post(
        `${API_URL}api/sentiment/analyze-sentiment/`,
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`, // Get token from localStorage
          },
        }
      );

      // Handle response data
      const { sentiment, confidence_score } = response.data;
      setSentiment(sentiment);
      setConfidenceScore(confidence_score);
    } catch (err) {
      // Handle error
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Sentiment Analysis Dashboard</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="text" className="block text-lg font-medium text-gray-700">Enter Text for Sentiment Analysis</label>
            <textarea
              id="text"
              name="text"
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
              placeholder="Type something here..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-teal-500 text-white font-medium rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        {sentiment && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg space-y-4">
            <h3 className="text-2xl font-semibold text-center text-gray-800">Sentiment Analysis Result</h3>
            <div className="text-center text-lg">
              <p className="font-semibold">Sentiment:</p>
              <p className={`text-xl font-semibold ${sentiment === 'positive' ? 'text-green-500' : sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'}`}>{sentiment}</p>
              <p className="font-semibold">Confidence Score:</p>
              <p className="text-lg text-gray-600">{confidenceScore ? confidenceScore.toFixed(2) : 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
