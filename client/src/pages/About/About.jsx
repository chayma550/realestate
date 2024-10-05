import React from 'react';
import './about.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

const About = () => {
  

  return (
    <div className='about' id="about">
      <div className="imageContent"> 
        <img src="./img/home.jpg" alt="Luxury Real Estate" />
      </div>
      
      <div className="textContent" > 
        <h1>Why our company?</h1>
        <p>
          Our company dedicated to innovating the luxury real estate industry, offers absolutely new
          experiences through a global network of exceptional agents.
        </p>
        <p>
          With a network of homes for sale worldwide, our website lets you search property listings globally,
          and includes a large inventory of luxury homes for sale, including houses, condos, townhomes, villas, and more.
        </p>

        <div className="buttons">
          <button className='btn-icon'>
            <FontAwesomeIcon icon={faCirclePlay} style={{ fontSize: '30px', marginRight: '10px' }} />Watch Video
          </button>
          <button className="learn-more-button">Learn more</button>
        </div>
      </div>
    </div>
  );
}

export default About;
