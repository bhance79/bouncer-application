import React, { useState } from 'react';
import axios from 'axios';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/request-quote', {
        name,
        email,
        event_date: eventDate,
        event_description: eventDescription,
      });
      if (response.data.status === 'success') {
        setMessage('Quote request sent successfully!');
      } else {
        setMessage('Failed to send quote request.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg w-full max-w-lg">
        <div className="bg-white rounded-lg p-8 shadow-md w-full">
          <h1 className="text-2xl font-bold mb-6">Request a Quote</h1>
          {message && <p className="mb-4 text-center text-red-500">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Event</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Event Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded h-32"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
