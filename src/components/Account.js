import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null; // Return null to avoid rendering anything if the user is not logged in
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg">
        <div className="bg-white rounded-lg w-full max-w-xl h-auto p-12 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Account Details</h1>
          <div className="space-y-2 text-left">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
