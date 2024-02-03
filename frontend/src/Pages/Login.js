import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import signup from '../Assets/signup.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth';
import ButtonLoading from '../Components/ButtonLoading';


function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })


  function inputHandler(event) {
    setLoginData(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  function loginHandler(event) {
    event.preventDefault();
    setLoading(true);
    axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,
      {
        username: loginData.username,
        password: loginData.password
      }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then((response) => {

      if (response.status === 200) {
        toast.success("LoggedIn Successfully");

        dispatch(login(response.data))
        setLoginData(
          {
            username: '',
            password: ''
          }
        );
        navigate('/user/dashboard');
      }
    }).catch((err) => {
      console.log("err message :", err)
      if (err.response.status === 400) {
        toast.error("Please fill all the details");
        return;
      }
      if (err.response.status === 401) {
        toast.error("User Not found");
        return;
      }
      if (err.response.status === 403) {
        toast.error("Password Incorrect");
        return;
      }
      if (err.response.status === 500) {
        toast.error("Error in Login, Try again...");
        return;
      }
    }).finally(() => setLoading(false));
  }
  return (
    <div className='signup-container'>
      <div className="left-signup">
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="username">Enter Username</label>
            <input type="text" id='username' name='username'
              placeholder='amit123'
              onChange={inputHandler}
              value={loginData.username}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Enter Password</label>
            <input type="password" id='password' name='password'
              placeholder='Enter Password'
              onChange={inputHandler}
              value={loginData.password}
              required
            />
          </div>
          <button className='btnform' >
            {(!loading)
              ?
              <p>Login</p>
              :
              <ButtonLoading />
            }
          </button>
        </form>
      </div>
      <div className="right-signup">
        <img src={signup} alt='' height={400} />
      </div>
    </div>
  );
}

export default Login;

