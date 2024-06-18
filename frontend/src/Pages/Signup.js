import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Signup.css';
import signup from '../Assets/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoading from '../Components/ButtonLoading';
import {useSelector} from 'react-redux';

function Signup() {
  
  const { isAuthenticated } = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated) {
      navigate('/');
    }
  },[isAuthenticated])
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    choosePassword: '',
    confirmPassword: ''
  })
  function inputHandler(event) {
    setSignupData(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }
  async function signupHandler(event) {
    if(isAuthenticated) return;
    event.preventDefault();
    setLoading(true);
    if (signupData.choosePassword !== signupData.confirmPassword) {
      toast.error("Password and confirm password does not match")
      return;
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`,
      {
        name: signupData.name,
        username: signupData.username,
        password: signupData.choosePassword,
        role: "User"
      }).then((response) => {
        if (response.status === 200) {
          toast.success("Signup Successfully");
          setSignupData(
            {
              name: '',
              username: '',
              choosePassword: '',
              confirmPassword: ''
            }
          );
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log("err message :", err)
        if (err.response.status === 400) {
          toast.error("User already exits ");
          return;
        }
        if (err.response.status === 500) {
          toast.error("Something Went Wrong, Please try again");
          return;
        }
      }).finally(() => setLoading(false));
  }

  return (
    <div className='signup-container'>
      <div className="left-signup">
        <form onSubmit={signupHandler}>
          <div>
            <label htmlFor="name">Enter Your Name</label>
            <input type="text" id='name' name='name'
              placeholder='Amit Ranjan'
              onChange={inputHandler}
              value={signupData.name}
              required
            />
          </div>
          <div>
            <label htmlFor="nausernameme">Enter Username</label>
            <input type="text" id='username' name='username'
              placeholder='amit123'
              onChange={inputHandler}
              value={signupData.username}
              required
            />
          </div>
          <div>
            <label htmlFor="choosePassword">Enter Password</label>
            <input type="password" id='choosePassword' name='choosePassword'
              placeholder='Enter Password'
              onChange={inputHandler}
              value={signupData.choosePassword}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id='confirmPassword' name='confirmPassword'
              placeholder='Confirm Password'
              onChange={inputHandler}
              value={signupData.confirmPassword}
              required
            />
          </div>
          <button className={loading ? 'btnform btn-clicked' : 'btnform'} type='submit' disabled={loading}>
            {(!loading)
              ?
              <p>Sign Up</p>
              :
              <ButtonLoading />
            }
          </button>
        </form>
        <p>Already have an Accout ? <Link to="/login">Login</Link> </p>
      </div>
      <div className="right-signup">
        <img src={signup} alt='' height={400} />
      </div>
    </div>
  );
}

export default Signup;