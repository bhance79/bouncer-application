import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Account() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg w-96 p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Account Details</h1>
        <p>Name: {user?.name}</p>
        <p>User ID: {user?.id}</p>
      </div>
    </div>
  );
}

export default Account;
