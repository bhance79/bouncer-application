import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg">
        <div className=" bg-white rounded-lg w-96 p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Account Details</h1>
          <div className="space-y-2 text-left">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
