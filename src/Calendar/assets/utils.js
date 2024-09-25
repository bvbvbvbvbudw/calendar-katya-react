import { format } from 'date-fns';

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