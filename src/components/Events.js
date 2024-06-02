import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if user is not available
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        console.log(`Fetching events for user id: ${user.id}`);
        const response = await axios.get(`http://localhost:5000/events/${user.id}`);
        console.log('Fetched events:', response.data);  // Debug log
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    if (user?.id) {
      fetchEvents();
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="relative mx-auto p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg">
        <div className=" bg-white rounded-lg w-full p-16 shadow-md">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-left">Your Events:</h2>
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className="mb-2">
                <span className="text-2xl font-semibold px-8 text-left">{event.event_name}:</span>
                <a
                  href={event.video_call_link}
                  className="bg-mainPurple text-white font-bold py-2 px-8 rounded mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}

export default Events;
