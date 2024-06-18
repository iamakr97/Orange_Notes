
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.js';
import Header from './Components/Header';
import CreateNote from './Pages/CreateNote.js';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import EditNote from './Pages/EditNote.js';
import ReadNote from './Pages/ReadNote.js';
import ErrorPage from './Pages/ErrorPage.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/auth.js';
import { jwtDecode } from 'jwt-decode';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("OrangeNotesToken");
    const name = window.localStorage.getItem("OrangeNotesUserName");
    // console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('OrangeNotesToken');
        localStorage.removeItem("OrangeNotesUserName");
      } else {
        const data = {
          token,
          user: {
            name: name
          }
        }
        dispatch(login(data));
      }
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/createNote' element={<CreateNote />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<Dashboard />} />
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/user/edit/:id' element={<EditNote />} />
          <Route path='/user/read/:id' element={<ReadNote />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
