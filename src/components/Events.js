import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

        // Sort events so that joinable events appear first
        const sortedEvents = response.data.sort((a, b) => {
          if (a.joinable && !b.joinable) return -1;
          if (!a.joinable && b.joinable) return 1;
          return 0;
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, [user, loading, navigate]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleAgree = () => {
    if (selectedEvent) {
      window.open(selectedEvent.video_call_link, '_blank');
      closeModal();
    }
  };

  return (
    <div className="middleofpage">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg w-full max-w-[60vw]">
        <div className="bg-white rounded-lg w-full h-auto p-8 shadow-md max-h-[65vh] overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}!</h1>
          <h2 className="text-xl font-semibold mb-4 text-left">Your Events:</h2>
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            <div className="text-xl space-y-6 text-left">
              {events.map((event, index) => (
                <div key={index} className="mb-4 flex items-start p-4 hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg">
                  {event.image_url && (
                    <img src={event.image_url} alt={event.event_name} className="h-24 w-24 object-cover mr-4 rounded-lg" />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-left">{event.event_name}</h3>
                    <p className="text-left">{event.event_description}</p>
                  </div>
                  <div className="ml-4 flex items-center">
                    {event.video_call_link ? (
                      event.joinable ? (
                        <button
                          onClick={() => openModal(event)}
                          className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-6 rounded inline-block"
                        >
                          Join
                        </button>
                      ) : (
                        <span className="text-gray-500">Link not joinable</span>
                      )
                    ) : (
                      <span className="text-gray-500">No link available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agreement Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-3xl text-center font-bold mb-4 p-8">Terms and Conditions</h2>
        <div className="text-justify mb-4">
          <ul className="list-decimal pl-6 mb-4">
            <li><strong>No Recording:</strong> By joining this live stream session, you agree that recording, capturing, or broadcasting the content in any form is strictly prohibited. This includes, but is not limited to, audio, video, and screen recordings.</li>
            <li><strong>Usage Rights:</strong> The content provided in this live stream is for personal viewing only. Unauthorized distribution or sharing of the content is a violation of this agreement.</li>
            <li><strong>Consequences of Violation:</strong> Any breach of this agreement may result in immediate termination of your access to the live stream, forfeiture of any fees paid, and potential legal action.</li>
          </ul>
          <p className="text-justify p-4">By proceeding to join the session, you acknowledge and agree to abide by these terms.</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAgree}
            className="bg-mainPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded"
          >
            Agree and Join
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Events;
