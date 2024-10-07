import React, { useContext, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle} from '@fortawesome/free-brands-svg-icons';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';
import apiRequest from '../../components/lib/apiRequest';

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", { email, password });
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userData={
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      }
      updateUser(userData);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
 

  return (
    <div className="login">
      <div className="login-container">
        <div className="right-side">
          <div className="login-box">
            <div className="top">
            <h2>Welcome to <span className="brand-name">Real Estate</span></h2>

            </div>
            <p>We make it easy for everyone to invest in real estate</p>
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" name="email" required />
              <input type="password" placeholder="Password" name="password" required />
              <div className="actions">
                <Link className='link'>Forgot password?</Link>
              </div>
              {error && <span>{error}</span>}
              <button type="submit" disabled={loading}>Login</button>
              <Link to="/register">
                <button type="button" className="create-profile">Create profile</button>
              </Link>
            </form>
            <div className="social-login">
            <div className="log">
            <hr/>  
            <p>Or login with</p>
            <hr/>
            </div>
          
            <div className="buttons">
              
              <div className="media">
                <button  className="social-btn" onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faGoogle} className='icon'  />Google
                </button>
              </div>
              
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
