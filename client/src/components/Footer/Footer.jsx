import React from 'react';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
            <img src="./img/fullogo.png" alt=''/>
        </div>
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Find your dream home with us</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@realestate.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
          <FontAwesomeIcon icon={faFacebook} className='social-icon' />
          <FontAwesomeIcon icon={faLinkedin}  className='social-icon' />
          <FontAwesomeIcon icon={faInstagram} className='social-icon' />
          <FontAwesomeIcon icon={faXTwitter}  className='social-icon'/>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
