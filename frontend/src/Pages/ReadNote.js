import React from 'react'
import { useSelector } from 'react-redux';
import './ReadNote.css';

function ReadNote() {
    const { title, description } = useSelector(state => state.note);
    return (
        <div className='readNote-container'>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default ReadNote;