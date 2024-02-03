
import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonLoading from '../Components/ButtonLoading';

function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, description } = useSelector(state => state.note);
  const { isAuthenticated } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.auth)
  const editor = useRef(null);
  const [notesTitle, setNotesTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/');
    }
    setContent(description);
    setNotesTitle(title);
  }, []);


  const config = {
    placeholder: 'Start typings...',
    style: {
      minHeight: '100vh'
    },
  }
  function titelHandler(event) {
    setNotesTitle(event.target.value);
  }
  function resetbtnHandler(event) {
    event.preventDefault();
    setContent('');
    setNotesTitle('');
  }
  function editorHandler(event) {
    event.preventDefault();

    if (content === '' || notesTitle === '') {
      toast.error('Add title and Desc. to SAVE');
      return;
    }
    setLoading(true);
    const load = toast.loading("Loading...");
    axios.put(`https://orange-notes-a6en.onrender.com/api/v1/myNotes/${id}`,
      { title: notesTitle, description: content, token },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })
      .then((res) => {
        toast.success("Updated Successfully");
        setContent('');
        setNotesTitle('');
        navigate('/user/dashboard');
      })
      .catch((error) => {
        console.log("error in Updating Note ");
        console.log(error);
      }).finally(() => {
        setLoading(false);
        toast.dismiss(load);
      });
  }

  return (
    <div className='editor-container'>
      <h2 style={{ textAlign: "center", color: "rgb(253, 122, 46)", textDecoration: "underline", fontSize: "2rem" }}>Edit Notes</h2>
      <div className='createNotesTitleContainer'>
        <label htmlFor="notesTitle" id='createNotesTitle'>Title</label>
        <input type="text" id='notesTitle'
          onChange={titelHandler}
          name='notesTitle'
          value={notesTitle}
          placeholder='Enter Title here'
          required
        />
      </div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => { }}
      />
      <div className="editorbtn">
        <button className='savebtn' onClick={editorHandler}>
          {(!loading)
            ?
            <p>Save</p>
            :
            <ButtonLoading />
          }
        </button>
        <button className='savebtn resetbtn' onClick={resetbtnHandler}>Reset</button>
      </div>
    </div>
  );
}

export default EditNote;