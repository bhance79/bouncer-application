import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
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

    fetchEvents();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg">
        <div className="bg-white rounded-lg w-full max-w-xl h-auto p-12 shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}!</h1>
          <h2 className="text-xl font-semibold mb-4 text-left">Your Events:</h2>
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={index} className="flex justify-between items-center mb-4">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-left">{event.event_name}</h3>
                    <p className="text-left">{event.event_description}</p>
                  </div>
                  <div className="ml-4 flex items-center">
                    {event.video_call_link ? (
                      event.joinable ? (
                        <a
                          href={event.video_call_link}
                          className="bg-mainPurple text-white font-bold py-2 px-4 rounded inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join
                        </a>
                      ) : (
                        <span className="text-gray-500">Link not joinable</span>
                      )
                    ) : (
                      <span className="text-gray-500">No link available</span>
                    )}
                  </div>
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
