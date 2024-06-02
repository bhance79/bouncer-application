import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data.status === 'success') {
        setMessage(`Welcome, ${response.data.name}`);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="container mx-auto p-8" id="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <img src="/static/images/bouncer logo.png" alt="Logo" className="logo mb-4" />
          <div className="social-icons flex justify-center mb-4">
            <a href="#" className="icon mx-2"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon mx-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon mx-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="icon mx-2"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className="block mb-4">Or use your email and password</span>
          <input
            type="email"
            name="username"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="block mb-4 text-sm text-purple-600 hover:underline">Forget Your Password?</a>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          {message && (
            <div className="message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
