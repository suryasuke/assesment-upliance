import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          Welcome to Forms — Create your own form
        </h1>
        <p className="home-subtitle">
          Start building your form in just a few clicks.  
          Fully customizable. No coding required.
        </p>
        <div className='button-container'>
           <Link to='/create'><button className="home-btn">Get Started</button></Link>
           <Link to='/myforms'><button className="list-forms-btn">View Forms</button></Link>
        </div>
       
      </div>
    </div>
  );
}

export default Home;
