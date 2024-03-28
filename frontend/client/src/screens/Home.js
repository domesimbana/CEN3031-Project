// src/screens/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to DocIQ</h1>
        <p>Your friendly AI companion for all your learning needs.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h2>Upload Documents</h2>
          <p>Quickly understands and summarizes uploaded documents.</p>
        </div>
        <div className="feature-card">
          <h2>Answer Questions</h2>
          <p>Ask DocIQ questions and receive accurate answers based on uploaded documents.</p>
        </div>
        <div className="feature-card">
          <h2>Learning Help</h2>
          <p>Get help learning.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
