
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
    if (!isAuthenticated) {
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
  async function editorHandler(event) {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.dismiss("Login to Edit Notes");
      return;
    }
    if (content === '' || notesTitle === '') {
      toast.error('Add title and Desc. to SAVE');
      return;
    }
    setLoading(true);
    const load = toast.loading("Loading...");
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/myNotes/${id}`,
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
    <form className='editor-container' onSubmit={editorHandler}>
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
        <button className={loading ? 'savebtn btn-clicked' : 'savebtn'} type='sumit' disabled={loading} >
          {(!loading)
            ?
            <p>Save</p>
            :
            <ButtonLoading />
          }
        </button>
        <button className='savebtn resetbtn' onClick={resetbtnHandler} disabled={loading}>Reset</button>
      </div>
    </form>
  );
}

export default EditNote;