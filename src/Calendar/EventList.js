import React from 'react';
import { formatTime, getMonthAbbreviation, getDayAbbreviation, onlyDay } from './assets/utils';
import { schedule } from './schedule';

const getTodayDayMonth = () => {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}`;
};

// Функция для преобразования даты из формата "dd.mm.yyyy" в формат "yyyy-mm-dd"
const convertDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); // Создаем объект Date
};

export default function EventList() {
    const todayDayMonth = getTodayDayMonth();

    // Преобразуем события, добавляя полное время с датой для сортировки
    const eventsWithDates = schedule.flatMap((event) => {
        return event.dates.map((date) => {
            const startTimeParts = event.time.start.split(':').map(Number);
            const endTimeParts = event.time.end.split(':').map(Number);

            const startDateTime = convertDate(date);
            startDateTime.setHours(startTimeParts[0], startTimeParts[1]);

            const endDateTime = convertDate(date);
            endDateTime.setHours(endTimeParts[0], endTimeParts[1]);

            return {
                ...event,
                start: { dateTime: startDateTime },
                end: { dateTime: endDateTime }
            };
        });
    });

    // Сортируем события по времени
    const sortedEvents = eventsWithDates.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

    // Группируем события по дням
    const eventsByDay = sortedEvents.reduce((acc, event) => {
        const eventDate = onlyDay(event.start.dateTime);
        if (!acc[eventDate]) acc[eventDate] = [];
        acc[eventDate].push(event);
        return acc;
    }, {});

    return (
        <div className="AvyU1e">
            <div role="grid" className="DCx23e">
                {Object.keys(eventsByDay).length > 0 ? (
                    Object.keys(eventsByDay).map((day, index) => {
                        const dayDate = new Date(day);

                        if (isNaN(dayDate)) {
                            console.error('Invalid date:', day);
                            return null;
                        }

                        return (
                            <div key={index} role="rowgroup" className="OVSqWe">
                                {/* Заголовок с датой */}
                                <div role="gridcell" className="V4sZ3c">
                                    <h2 className="bf2t7b">
                                        <div
                                            className={`H3yh2e ubOFEd ${day === todayDayMonth ? 'active' : ''}`}
                                            tabIndex="0"
                                            role="link"
                                        >
                                            {day}
                                        </div>
                                        <div className="U2CF5e" aria-hidden="true">
                                            <div className="yRbOzc">
                                                {/* Форматирование даты */}
                                                {`${getMonthAbbreviation(dayDate)}, ${getDayAbbreviation(dayDate)}`}
                                            </div>
                                        </div>
                                    </h2>
                                </div>

                                {/* События за день */}
                                {eventsByDay[day].map((event, idx) => (
                                    <div role="row" className="YOmXMd DSThoc" key={idx}>
                                        <div role="gridcell" className="FVj2te JxNhxc">
                                            {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                                        </div>
                                        <div role="gridcell" className="FVj2te uFexlc EmMre">
                                            <div
                                                role="button"
                                                tabIndex="0"
                                                style={{ fontWeight: '500' }}
                                                aria-label={`${formatTime(event.start.dateTime)} - ${formatTime(event.end.dateTime)}, ${event.description}`}
                                            >
                                                {event.description} | <br />
                                            </div>
                                        </div>
                                        <div role="gridcell" className="FVj2te AfMD1c">
                                            <div className="poxnAc" style={{ borderColor: 'rgb(124, 179, 66)' }}>
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
