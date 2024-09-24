import { format } from 'date-fns';
// import {gapi} from 'gapi-script';
// export const loadCalendarAPI = (initClient) => {
//     gapi.client.load('calendar', 'v3', initClient);
// };
//
// export const loadEvents = (calendarId, dateRange, setEvents) => {
//     const now = new Date();
//     let timeMin, timeMax;
//
//     switch (dateRange) {
//         case 'today':
//             timeMin = new Date(now.setHours(0, 0, 0, 0)).toISOString();
//             timeMax = new Date(now.setHours(23, 59, 59, 999)).toISOString();
//             break;
//         case 'tomorrow':
//             const tomorrow = new Date();
//             tomorrow.setDate(now.getDate() + 1);
//             timeMin = new Date(tomorrow.setHours(0, 0, 0, 0)).toISOString();
//             timeMax = new Date(tomorrow.setHours(23, 59, 59, 999)).toISOString();
//             break;
//         case 'week':
//             const startOfWeek = new Date();
//             startOfWeek.setDate(now.getDate() - now.getDay());
//             const endOfWeek = new Date();
//             endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
//             timeMin = new Date(startOfWeek.setHours(0, 0, 0, 0)).toISOString();
//             timeMax = new Date(endOfWeek.setHours(23, 59, 59, 999)).toISOString();
//             break;
//         default:
//             timeMin = new Date().toISOString();
//             timeMax = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
//     }
//
//     if (gapi.client.calendar) {
//         gapi.client.calendar.events.list({
//             calendarId: calendarId,
//             timeMin: timeMin,
//             timeMax: timeMax,
//             showDeleted: false,
//             singleEvents: true,
//             maxResults: 200,
//             orderBy: 'startTime',
//         }).then(response => {
//             setEvents(response.result.items);
//         }).catch((error) => {
//             console.error("Error loading events", error);
//         });
//     } else {
//         console.error("gapi.client.calendar is not defined");
//     }
// };

export const filterEvents = (events, query, filters) => {
    let filtered = events;

    if (query) {
        filtered = filtered.filter(event =>
            event.summary.toLowerCase().includes(query.toLowerCase())
        );
    }

    const selectedFilters = Object.keys(filters).filter(key => filters[key]);
    if (selectedFilters.length > 0) {
        filtered = filtered.filter(event =>
            selectedFilters.some(filter => event.summary.toLowerCase().includes(filter.toLowerCase()))
        );
    }

    return filtered;
};

export function onlyDay(dateTime) {
    const date = new Date(dateTime);
    return date.getDate();
}

export function formattedDate(dateTime) {
    const date = new Date(dateTime);
    return format(date, 'MMMM yyyy, EEEE');
}

export function getMonthAbbreviation(dateTime) {
    const date = new Date(dateTime);
    return format(date, 'MMM yyyy');
}

export function getDayAbbreviation(dateTime) {
    const date = new Date(dateTime);
    return format(date, 'E');
}

export function formatTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}