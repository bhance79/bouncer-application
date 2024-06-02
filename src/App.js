import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Events from './components/Events';
import FutureEvents from './components/FutureEvents';
import Navbar from './components/Navbar';
import Account from './components/Account';
import { UserProvider } from './UserContext';
import './App.css'; // Import the CSS file for transitions

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <AnimatedRoutes />
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/account" element={<Account />} />
          <Route path="/future-events" element={<FutureEvents />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
