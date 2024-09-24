import React, { useEffect, useState } from 'react';


const GoogleCalendarApp = () => {
    const [calendar, setCalendar] = useState(null);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [query, setQuery] = useState(localStorage.getItem('query') || '');
    const [dateRange, setDateRange] = useState(localStorage.getItem('dateRange') || 'today');
    const [showSettings, setShowSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (
        <div className="container calendar-app">
            {!isSignedIn ? (
                <div className="text-center">
                    <EventList filteredEvents={filteredEvents} />
                </div>
            )  : (
                <>
                    <div className="cont">
                        <div className="text-center">
                            <button className="btn btn-secondary logout" onClick={handleSignOut}>Sign out</button>
                        </div>
                        <div className="toggle-switch">
                            <label className="switch">
                                <span className="sun"> {/* SVG code */} </span>
                                <span className="moon"> {/* SVG code */} </span>
                                <input type="checkbox" className="input"
                                       onChange={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
                                       checked={theme === 'dark'}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default GoogleCalendarApp;
