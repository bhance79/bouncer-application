import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data.status === 'success') {
        setMessage(`Welcome, ${response.data.name}`);
        setUser({ id: response.data.user_id, name: response.data.name });
        navigate('/events', { state: { user_id: response.data.user_id } });
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="form-container sign-in bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg w-96 p-8 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-inner">
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
          <a href="#" className="block mb-4 text-sm text-darkPurple hover:underline">Forget Your Password?</a>
          <button
            type="submit"
            className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
