
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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from './redux/slices/auth.js';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("https://orange-notes-a6en.onrender.com/api/v1/isTokenValid",
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }).then((res) => {
        if (!res) {
          return;
        }
        if (res.status === 200) {
          dispatch(login(res.data));
        }
      }).catch((err)=>{
        console.log(err);
      })
  }, []);

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
          <Route path='*' element={<p>Error Page ....</p>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
