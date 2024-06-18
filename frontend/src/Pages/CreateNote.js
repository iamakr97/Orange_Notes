import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './CreateNote.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ButtonLoading from '../Components/ButtonLoading';
import { useNavigate } from 'react-router-dom';


function CreateNote() {

    const [loading, setLoading] = useState(false);
    const { token, isAuthenticated } = useSelector(state => state.auth)
    const editor = useRef(null);
    const [notesTitle, setNotesTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
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
        if(!isAuthenticated) {
            toast.dismiss("Login to Save Notes");
            return;
        }
        if (content === '' || notesTitle === '') {
            toast.error('Add title and Desc. to SAVE');
            return;
        }
        setLoading(true);
        const load = toast.loading("Please Wait...");
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/createnote`,
            { title: notesTitle, description: content, token },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then((res) => {
                toast.success("Saved Successfully");
                setContent('');
                setNotesTitle('');
            })
            .catch((error) => {
                toast.error("Internal Server Error...");
                console.log("error in creating new notes : ",error);
            }).finally(() => {
                setLoading(false);
                toast.dismiss(load);
            });
    }

    return (
        <form className='editor-container' onSubmit={editorHandler}>
            <h2 style={{ textAlign: "center", color: "rgb(253, 122, 46)", textDecoration: "underline", fontSize: "2rem" }}>Create Notes</h2>
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
                <button className={loading ? 'savebtn btn-clicked': 'savebtn'} type='submit' disabled={loading}>
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

export default CreateNote;