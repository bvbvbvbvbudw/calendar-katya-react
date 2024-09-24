import React, { useEffect, useState } from 'react';
import EventList from './EventList';

import {schedule} from './schedule';
// styles
import './assets/css/test.css';

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const [time, setTime] = useState(false);

    setTimeout(() => {
        setTime(true);
    }, 1000);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (
        <div className="container calendar-app">
            <div className="toggle-switch">
                <label className="switch">
                    <span className="sun"></span>
                    <span className="moon"></span>
                    <input
                        type="checkbox"
                        onChange={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
                        checked={theme === 'dark'}
                    />
                    <span className="slider"></span>
                </label>
            </div>
            <EventList/>
        </div>
    );
}
