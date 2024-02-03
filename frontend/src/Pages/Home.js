import React, { useEffect } from 'react';
import './Home.css';
import TextTransition, { presets } from 'react-text-transition';
import notesTaking from '../Assets/Notes-taking.jpg';
import { TEXTS } from '../data';
import { Link } from 'react-router-dom';
import Features from './Features';
import Testimonials from '../Components/Testimonials';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer'

function Home() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000,
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className='home-Page-Container'>
      <div className="homePage">

        <div className="home-left">
          <div>
            <p id='orangeNotesHero'>Welcome to <span>Orange Notes</span></p>
            <TextTransition
              springConfig={presets.wobbly}
              style={{ fontSize: "1.4rem", width: '80%', border: "2px", position: 'relative' }}
            >
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </div>

          <div>
            {(!isAuthenticated) ?
              <div className="login-signup">

                <Link to='/login'>
                  <button className="btn login">Login</button>
                </Link>
                <Link to='/signup'>
                  <button className="btn signup">Sign Up</button>
                </Link>

              </div>
              :
              <div className="login-signup">

                <Link to='/user/Dashboard'>
                  <button className="btn login">Dashboard</button>
                </Link>
                <Link to='/user/createNote'>
                  <button className="btn signup">Create Note</button>
                </Link>

              </div>
            }
          </div>
        </div>

        <div className="home-right">
          <img src={notesTaking} alt='' />
        </div>

      </div>
      <div>
        <h2 style={{ textAlign: "center", color: "rgb(253, 122, 46)", textDecoration: "underline", fontSize: "2rem" }}>Features</h2>
        <Features />
      </div>
      <Testimonials />
      <Footer />
    </div >
  );
}

export default Home;
