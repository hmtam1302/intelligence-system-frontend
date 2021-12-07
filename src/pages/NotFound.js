import React from 'react';
import '../assets/scss/NotFound.scss';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-container">
      <div className="bg-overlay">
        <img src={logo} alt='Logo' onClick={() => navigate('/')} />
        <div className="main-container">
          <div className='heading'>Oops, I think you are lost...</div>
          <p className='paragraph'>Sorry, we can't found this page.<br /> Discover more at homepage.</p>
          <button className='btn' onClick={() => navigate('/')}>Homepage</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;