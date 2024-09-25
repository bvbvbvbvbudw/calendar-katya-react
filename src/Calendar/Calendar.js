import React, { useEffect, useState } from 'react';
import EventList from './EventList';
// styles
import './assets/css/test.css';
import SettingsIcon from "./assets/icons";

export default function Calendar() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const [color, setColor] = useState(localStorage.getItem('color') || "#fff");

    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('color', color);
        document.body.style.backgroundColor = color;
    },[color])


    return (
        <div className="container calendar-app">
            <div className="top-content">
                <i className="fas fa-settings" onClick={() => {document.getElementById('settings').classList.toggle('show')}}><SettingsIcon/></i>
                <div className="settings show   " id="settings">
                    <input type="color" value={color} onChange={(e) => {setColor(e.target.value)}}/>
                </div>
            </div>

            {/*<div className="toggle-switch">*/}
            {/*    <label className="switch">*/}
            {/*        <span className="sun"></span>*/}
            {/*        <span className="moon"></span>*/}
            {/*        <input*/}
            {/*            type="checkbox"*/}
            {/*            onChange={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}*/}
            {/*            checked={theme === 'dark'}*/}
            {/*        />*/}
            {/*        <span className="slider"></span>*/}
            {/*    </label>*/}
            {/*</div>*/}
            <EventList/>
        </div>
    );
}
