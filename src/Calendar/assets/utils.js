import {format} from 'date-fns';

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
    return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
}

export function setupColorChange(textClasses) {
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