import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Events from './components/Events';
import Navbar from './components/Navbar';
import Account from './components/Account'; // Import the Account component
import { UserProvider } from './UserContext';
import './App.css'; // Assuming you have a general stylesheet

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<Events />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
