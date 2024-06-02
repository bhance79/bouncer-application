import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const { user_id } = location.state;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${user_id}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, [user_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg w-96 p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Events</h1>
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <ul>
            {events.map((event, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{event.event_name}:</span>
                <a href={event.video_call_link} className="text-blue-500 underline ml-2">Join</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Events;
