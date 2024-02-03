
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

function App() {

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
