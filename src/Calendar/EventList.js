import React, {useEffect} from 'react';
import {formatTime, getMonthAbbreviation, getDayAbbreviation} from './assets/utils';
import {schedule} from './schedule';

export default function EventList() {
    const expandedSchedule = schedule.flatMap(event => {
        if (event.dates.length === 0) {
            return [{
                date: 'Нет даты',
                time: event.time,
                description: event.description,
                subject: event.subject,
                location: event.location,
            }];
        }

        return event.dates.map(date => {
            let time = event.time;
            if (date === '05.12.2024' && event.description.includes('Środki transportu')) {
                time = {start: '09:05', end: '09:50'};
            }

            return {
                date,
                time,
                description: event.description,
                subject: event.subject,
                location: event.location,
            };
        });
    });

    expandedSchedule.sort((a, b) => {
        if (a.date === 'Нет даты') return 1;
        if (b.date === 'Нет даты') return -1;

        const dateA = a.date.split('.').reverse().join('-');
        const dateB = b.date.split('.').reverse().join('-');
        return new Date(dateA) - new Date(dateB);
    });

    const eventsByDay = expandedSchedule.reduce((acc, event) => {
        if (!acc[event.date]) {
            acc[event.date] = [];
        }
        acc[event.date].push(event);
        return acc;
    }, {});

    const todayDayMonth = new Date().toLocaleDateString('pl-PL');

    useEffect(() => {
        const activeElement = document.querySelector('.H3yh2e.active');
        if (activeElement) {
            activeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, []);

    const createGoogleMapsLink = (location) => {
        const encodedLocation = encodeURIComponent(location);
        return `https://www.google.com/maps?q=${encodedLocation}`;
    };

    return (
        <div className="AvyU1e">
            <div role="grid" className="DCx23e">
                {Object.keys(eventsByDay).length > 0 ? (
                    Object.keys(eventsByDay).map((day, index) => {
                        const dayDate = new Date(day.split('.').reverse().join('-'));

                        if (isNaN(dayDate)) {
                            return null;
                        }

                        return (
                            <div key={index} role="rowgroup" className="OVSqWe">
                                <div role="gridcell" className="V4sZ3c">
                                    <h2 className="bf2t7b">
                                        <div
                                            className={`H3yh2e ubOFEd ${day === todayDayMonth ? 'active' : ''}`}
                                            tabIndex="0"
                                            role="link"
                                        >
                                            {day.slice(0, 2)}
                                        </div>
                                        <div className="U2CF5e" aria-hidden="true">
                                            <div className="yRbOzc">
                                                {`${getMonthAbbreviation(dayDate)}, ${getDayAbbreviation(dayDate)}`}
                                            </div>
                                        </div>
                                    </h2>
                                </div>

                                {eventsByDay[day].map((event, idx) => (
                                    <div role="row" className="YOmXMd DSThoc" key={idx}>
                                        <div role="gridcell" className="FVj2te JxNhxc">
                                            {event.time.start} - {event.time.end}
                                        </div>
                                        <div role="gridcell" className="FVj2te uFexlc EmMre">
                                            <div role="button" tabIndex="0"
                                                 style={{fontWeight: '500', whiteSpace: "normal"}}
                                                 aria-label={`${formatTime(event.time.start)} - ${formatTime(event.time.end)}, ${event.description}`}>
                                                {event.description} |
                                                Location:
                                                {event.location === "7 Fit, ul. Jana Pawła II 17, 20-535 Lublin" ? (
                                                    <a href={createGoogleMapsLink(event.location)} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {event.location}
                                                    </a>
                                                ) : (
                                                    event.location
                                                )}
                                            </div>
                                        </div>
                                        <div role="gridcell" className="FVj2te AfMD1c">
                                            <div className="poxnAc" style={{borderColor: 'rgb(124, 179, 66)'}}>
                                                <span className="XuJrye">
                                                    Календарь: {event.subject}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center mt-5">
                        <p>No events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
