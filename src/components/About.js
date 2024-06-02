import React from 'react';
import '../App.css'; // Make sure to import the CSS file where the middleofpage class is defined

function AboutUs() {
  return (
    <div className="middleofpage">
      <div className="relative p-8 bg-gradient-to-r from-purple-400 via-mainPurple to-darkPurple rounded-lg">
        <div className="bg-white rounded-lg w-full max-w-7xl h-auto p-12 shadow-md">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <div className="text-xl space-y-6 text-left">
            <p>Welcome to Bouncer, your premier gateway to seamless live event experiences. Our innovative platform bridges the gap between event holders like Ticketmaster and LiveNation and live streaming services such as Zoom, YouTube, and Microsoft Teams. At Bouncer, we are dedicated to revolutionizing the way you experience pay-per-view livestreams.</p>
            <p>Our mission is to provide a user-friendly and secure environment where you can easily access and enjoy your favorite events. Once you log in to our website, you'll find all the events you currently own tickets for conveniently listed. If an event is live, a button to join the call is displayed, allowing you instant access to the livestream without any hassle.</p>
            <p>Bouncer is designed with both event organizers and attendees in mind. We aim to enhance the virtual event experience by ensuring a smooth and efficient process for joining live streams. Our platform not only simplifies access but also guarantees a high-quality viewing experience, making sure you don't miss a moment of the action.</p>
            <p>Join us at Bouncer and be part of the future of live event streaming. Whether you're attending a concert, a sports event, or a conference, Bouncer is here to make your virtual attendance as immersive and enjoyable as possible.</p>
            <p>Thank you for choosing Bouncer – where live events come to life online.</p>
            <div className="flex justify-center mt-8">
              <img src="/bouncer logo.png" alt="Bouncer Logo" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
