import React from 'react';
import { formatTime, getMonthAbbreviation, getDayAbbreviation, onlyDay } from './CalendarUtils';

const replaceLinks = (description) => {
    if (!description) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');

    doc.querySelectorAll('a').forEach(a => {
        a.textContent = 'Open lesson';
        a.setAttribute('target', '_blank');
    });

    return doc.body.innerHTML;
};

const getDayMonth = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.getDate()}-${date.getMonth() + 1}`;
};

const getTodayDayMonth = () => {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}`;
};

export default function EventList({ filteredEvents }) {
    const todayDayMonth = getTodayDayMonth();
    let lastDisplayedDate = null;

    return (
        <div className="AvyU1e">
            <div role="grid" className="DCx23e">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => {
                        const eventDate = onlyDay(event.start.dateTime);
                        const eventDayMonth = getDayMonth(event.start.dateTime);
                        const showDate = eventDate !== lastDisplayedDate;

                        return (
                            <div role="rowgroup" className="OVSqWe" key={event.id}>
                                {showDate && (
                                    <div role="gridcell" className="V4sZ3c">
                                        <h2 className="bf2t7b">
                                            <div
                                                className={`H3yh2e ubOFEd ${eventDayMonth === todayDayMonth ? 'active' : ''}`}
                                                tabIndex="0"
                                                role="link"
                                                aria-label={`${getDayAbbreviation(event.start.dateTime)}, ${onlyDay(event.start.dateTime)} ${getMonthAbbreviation(event.start.dateTime)}`}
                                            >
                                                {onlyDay(event.start.dateTime)}
                                            </div>
                                            <div className="U2CF5e" aria-hidden="true">
                                                <div className="yRbOzc">
                                                    {`${getMonthAbbreviation(event.start.dateTime)}, ${getDayAbbreviation(event.start.dateTime)}`}
                                                </div>
                                            </div>
                                        </h2>
                                    </div>
                                )}
                                <div role="row" className="YOmXMd DSThoc" key={event.id}>
                                    <div role="gridcell" className="FVj2te JxNhxc">
                                        {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                                    </div>
                                    <div role="gridcell" className="FVj2te uFexlc EmMre">
                                        <div
                                            role="button"
                                            tabIndex="0"
                                            style={{ fontWeight: '500' }}
                                            aria-label={`${formatTime(event.start.dateTime)} - ${formatTime(event.end.dateTime)}, ${event.summary}`}
                                        >
                                            {event.summary} | <br/>
                                            <span style={{ color: 'blue' }}
                                                  dangerouslySetInnerHTML={{ __html: replaceLinks(event.description) }}
                                            />
                                        </div>
                                    </div>
                                    <div role="gridcell" className="FVj2te AfMD1c">
                                        <div className="poxnAc" style={{ borderColor: "rgb(124, 179, 66)" }}>
                                            <span className="XuJrye">
                                                Календар: #ITUniv - Бакалаврат, 2 курс, 2023 р.в. (4CS), Прийнято
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {showDate && (lastDisplayedDate = eventDate)}
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
};
