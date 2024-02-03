import React from 'react';
import './Header.css';
import Orange_Notes from '../Assets/Orange_Notes.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function logoutHandler(e) {
    e.preventDefault();
    const load = toast.loading("Please Wait...");
    axios.get('https://orange-notes-a6en.onrender.com/api/v1/logout',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })
      .then((res) => {
        dispatch(logout());
        navigate('/');
      })
      .catch((error) => {
        console.log("logout error: ", error);
        toast.error("Something Went Wrong...");
      }).finally(() => {
        toast.dismiss(load);
        toast.success("Logged Out Successfully");
      })
  }
  return (
    <div className='header-container'>
      <div className="header">
        <Link to="/" id='orangeNotesLogo'>
          <img src={Orange_Notes} height={50} />
          <span id='OrangeNotes'>Orange Notes</span>
        </Link>
        <div>
          {!isAuthenticated ?
            <div className="login-signup">
              <Link to='/login'>
                <button className="btn headLogin">Login</button>
              </Link>
              <Link to='/signup'>
                <button className="btn headSignup">Sign Up</button>
              </Link>
            </div>
            :
            <div className="login-signup">
              <Link to='/user/createNote'>
                <button className="btn headLogin">Create Notes</button>
              </Link>
              <Link to='/user/dashboard'>
                <button className="btn headLogin">Dashboard</button>
              </Link>

              <button className="btn headSignup" onClick={logoutHandler} >Logout</button>

            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;