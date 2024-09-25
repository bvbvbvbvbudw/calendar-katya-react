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

    function setupColorChange(textClasses) {
        const getContrastYIQ = (hexcolor) => {
            const r = parseInt(hexcolor.substr(1, 2), 16);
            const g = parseInt(hexcolor.substr(3, 2), 16);
            const b = parseInt(hexcolor.substr(5, 2), 16);
            const yiq = (r * 299 + g * 587 + b * 114) / 1000;
            return (yiq >= 128) ? 'black' : 'white';
        };

        const updateTextColor = () => {
            const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
            const rgbValues = bodyBackgroundColor.match(/\d+/g);

            if (rgbValues) {
                const hexColor = `#${((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1)}`;
                const textColor = getContrastYIQ(hexColor);

                textClasses.forEach(className => {
                    const elements = document.getElementsByClassName(className);
                    for (const element of elements) {
                        element.style.color = textColor;
                    }
                });
            }
        };
        window.addEventListener('load', updateTextColor);
        window.addEventListener('resize', updateTextColor);
        window.addEventListener('click', updateTextColor);
        const observer = new MutationObserver(updateTextColor);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style']
        });

        return () => {
            window.removeEventListener('load', updateTextColor);
            window.removeEventListener('resize', updateTextColor);
            window.removeEventListener('click', updateTextColor);
            observer.disconnect();
        };
    }

    useEffect(() => {
        setupColorChange(['FVj2te']);

    },[])


    return (
        <div className="container calendar-app">
            <p className="test">fhdso fhdsjf hdsjf hdsjkf hdsjkf </p>
            <div className="top-content">
                <i className="fas fa-settings" onClick={() => {document.getElementById('settings').classList.toggle('show')}}><SettingsIcon backgroundColor={color}/></i>
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
