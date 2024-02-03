import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import MyNotes from '../Pages/MyNotes';


function Dashboard() {
    const { userName } = useSelector(state => state.auth);
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);
    return (
        <div className='dashboard'>
            <h2 className='dashboard-header'>Hello <span>{userName}</span></h2>
            <MyNotes />
        </div>
    );
}

export default Dashboard;