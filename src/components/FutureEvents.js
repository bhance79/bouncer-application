import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Make sure to import the CSS file where the middleofpage class is defined

function FutureEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const API_KEY = process.env.REACT_APP_TICKETMASTER_CONSUMER_KEY;
      const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}`;

      console.log('Fetching events from Ticketmaster API...');
      console.log('API URL:', API_URL);

      try {
        const response = await axios.get(API_URL);
        console.log('API Response:', response.data);

        if (response.data._embedded && response.data._embedded.events) {
          setEvents(response.data._embedded.events);
        } else {
          setError('No events found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="middleofpage">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg w-full max-w-[90vw]">
        <div className="bg-white rounded-lg w-full h-auto p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-4">Future Events</h1>
          <div className="text-xl space-y-6 text-left overflow-y-auto max-h-[60vh]">
            {events.map((event) => (
              <div key={event.id} className="mb-4 flex items-start p-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg">
                {event.images && event.images.length > 0 && (
                  <img src={event.images[0].url} alt={event.name} className="h-24 w-24 object-cover mr-4 rounded-lg" />
                )}
                <div>
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p>{new Date(event.dates.start.dateTime).toLocaleString()}</p>
                  <p>{event._embedded.venues[0].name}</p>
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-mainPurple underline">More Info</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureEvents;
