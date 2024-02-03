import React from 'react'
import './ErrorPage.css';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='ErrorPage'>
      <h1>404</h1>
      <p>Sorry, We couldn't find this page.</p>
      <Link to='/'>Back to Homepage</Link>
    </div>
  );
}

export default ErrorPage;