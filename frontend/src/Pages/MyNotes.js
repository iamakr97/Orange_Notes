import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import './MyNotes.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setNoteData } from '../redux/slices/noteSlice';
import { useSelector } from 'react-redux';
import moment from 'moment';

function MyNotes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [myNotes, setMyNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, [])

  // defining function to fetch all notes ...
  async function fetchNotes() {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_SERVER_URL}/myNotes`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })
      .then((response) => {
        setMyNotes(response.data.allNotes);
      })
      .catch((error) => {

      }).finally(() => setLoading(false));
  }
  // defining readHandler function to read the note
  function readHandler(e, note) {
    e.preventDefault();
    dispatch(setNoteData(note));
    navigate(`/user/read/${note._id}`);
  }
  // defining editHandler function to edit the note
  function editHandler(e, note) {
    e.preventDefault();
    dispatch(setNoteData(note));
    navigate(`/user/edit/${note._id}`);
  }
  // defining deleteHanddler function to delete the note
  function deleteHandler(e, note) {
    e.preventDefault();
    const load = toast.loading("Please Wait...");
    axios.delete(`https://orange-notes-a6en.onrender.com/api/v1/myNotes/${note._id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      }).then((res) => {
        if (!res) {
          toast.error("Something went Wrong try again");
          return;
        }
        if (res.status === 200) {
          toast.success("Note Deleted Successfully");
        }
      }).catch((error) => {
        toast.error("Internal Server Error, try again...");
      }).finally(() => {
        fetchNotes()
        toast.dismiss(load);
      });
  }
  function dateFormat(myDate) {
    const momentDate = moment(myDate);
    return momentDate.format('MMMM Do YYYY, h:mm:ss a');
  }

  return (
    <div className='myNotes-card-container'>
      {(loading)
        ?
        (<Loader />)
        :
        ((myNotes.length > 0)
          ?
          myNotes.map((note) => {
            return <div key={note._id} className='myNotes-card'>
              {
                (note.title.length > 20)
                  ?
                  <h3>{note.title.substr(0, 20)}...</h3>
                  :
                  <h3>{note.title}</h3>
              }
              <p>{dateFormat(note.createdAt)}</p>

              <div className='card-btn'>
                <button onClick={(e) => readHandler(e, note)} className='read-btn'>Read </button>
                <button onClick={(e) => editHandler(e, note)} className='edit-btn'>Edit </button>
                <button onClick={(e) => deleteHandler(e, note)} className='edit-btn'>Delete</button>
              </div>

            </div>
          })
          :
          <h1>No notes found</h1>)

      }
    </div>
  );
}

export default MyNotes;