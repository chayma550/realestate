import React, { useContext, useEffect, useState } from 'react';
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPhone, faRightToBracket, faUserPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { HashLink as Link } from 'react-router-hash-link';
import { AuthContext } from '../../Context/AuthContext';
import { useNotificationStore } from '../lib/notificationStore';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetchNotifications = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
    }
  }, [currentUser, fetchNotifications]); // Fetch notifications only when currentUser changes

  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" className='link'>
          <div className="logo">
            <img src="./img/fullogo.png" alt='' />
            <span>Real Estate</span>
          </div>
        </Link>
        <Link to="/" className='link'>Home</Link>
        <Link smooth to="#about" className='link'>About</Link>
        <Link smooth to="#contact" className='link'>Contact</Link>
        <Link smooth to="#testimonials" className='link'>Testimonials</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className='user'>
            <img src={currentUser.avatar || currentUser.photoURL  || "/img/noavatar.jpg"} alt="avatar" />
            <span>{currentUser.username||currentUser.displayName}</span>
            <Link to="/profile" className='link'>
              <button className='profile'>
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className='link'>
              <button className='btn'>Sign in</button>
            </Link>
            <Link to="/register" className='link'>
              <button className='login'>Sign Up</button>
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img src='./img/menu.png' alt='' onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" className='link'><FontAwesomeIcon icon={faHouse} style={{ marginRight: "10px" }} />Home</Link>
          <Link to="/about" className='link'><FontAwesomeIcon icon={faCircleQuestion} style={{ marginRight: "15px" }} />About</Link>
          <Link to="/contact" className='link'><FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} /> Contact</Link>
          <Link to="/agent" className='link'><FontAwesomeIcon icon={faUserTie} style={{ marginRight: "15px" }} />Agents</Link>
          <Link to="/register" className='link'><FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />Sign up</Link>
          <Link to="/login" className='link'><FontAwesomeIcon icon={faRightToBracket} style={{ marginRight: "10px" }} /> Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
