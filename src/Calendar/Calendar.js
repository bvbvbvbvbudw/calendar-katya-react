import React, {useEffect, useState} from 'react';
import EventList from './EventList';
// styles
import './assets/css/test.css';
import SettingsIcon from "./assets/icons";

import {setupColorChange} from "./assets/utils";

export default function Calendar() {
    const [color, setColor] = useState(localStorage.getItem('color') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    useEffect(() => {
        localStorage.setItem('color', color);
        document.body.style.backgroundColor = color;
    }, [color])

    useEffect(() => {
        setupColorChange(['FVj2te']);
    }, [])

    return (
        <div className="container calendar-app">
            <div className="top-content">
                <i className="fas fa-settings" onClick={() => {
                    document.getElementById('settings').classList.toggle('show')
                }}><SettingsIcon backgroundColor={color}/></i>
                <div className="settings show   " id="settings">
                    <input type="color" value={color} onChange={(e) => {
                        setColor(e.target.value)
                    }}/>
                </div>
            </div>
            <EventList/>
        </div>
    );
}
