/*
 * Copyright Gargi Tawde (c) 2023.
 */

// Saving Data from the Form on pencilMeInPage.html
let iCalform = document.getElementById('iCalform');

/**
 * Create and download a file on click
 * @params {string} filename - The name of the file with the ending
 * @params {string} filebody - The contents of the file
 */
function download(filename, fileBody) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileBody));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


/**
 * Returns a date/time in ICS format
 * @params {Object} dateTime - A date object you want to get the ICS format for.
 * @returns {string} String with the date in ICS format
 */
function convertToICSDate(dateTime) {
    const year = dateTime.getFullYear().toString();
    const month = (dateTime.getMonth() + 1) < 10 ? "0" + (dateTime.getMonth() + 1).toString() : (dateTime.getMonth() + 1).toString();
    const day = dateTime.getDate() < 10 ? "0" + dateTime.getDate().toString() : dateTime.getDate().toString();
    const hours = dateTime.getHours() < 10 ? "0" + dateTime.getHours().toString() : dateTime.getHours().toString();
    const minutes = dateTime.getMinutes() < 10 ? "0" +dateTime.getMinutes().toString() : dateTime.getMinutes().toString();

    return year + month + day + "T" + hours + minutes + "00";
}


/**
 * Creates and downloads an ICS file
 * @params {string} timeZone - In the format America/New_York
 * @params {object} startTime - Vaild JS Date object in the event timezone
 * @params {object} endTime - Vaild JS Date object in the event timezone
 * @params {string} title
 * @params {string} description
 * @params {string} venueName
 * @params {string} address
 * @params {string} city
 * @params {string} state
 */
function createDownloadICSFile(timezone, startTime, endTime, title, description, meetingLink) {
    const icsBody = 'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'PRODID:Calendar\n' +
        'CALSCALE:GREGORIAN\n' +
        'METHOD:PUBLISH\n' +
        'BEGIN:VTIMEZONE\n' +
        'TZID:' + timezone + '\n' +
        'END:VTIMEZONE\n' +
        'BEGIN:VEVENT\n' +
        'SUMMARY:' + title + '\n' +
        'UID:@Default\n' +
        'SEQUENCE:0\n' +
        'STATUS:CONFIRMED\n' +
        'TRANSP:TRANSPARENT\n' +
        'DTSTART;TZID=' + timezone + ':' + convertToICSDate(startTime) + '\n' +
        'DTEND;TZID=' + timezone + ':' + convertToICSDate(endTime)+ '\n' +
        'DTSTAMP:'+ convertToICSDate(new Date()) + '\n' +
        'LOCATION:' + meetingLink + '\\n' +
        description + '\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR\n';

    download(title + '.ics', icsBody);
}

iCalform.addEventListener("submit", e => {
    e.preventDefault();
    let eventTitle = document.getElementById('eventTitle').value;
    let eventDescription = document.getElementById('eventDescription').value;
    let date = document.getElementById('date').value;
    let startTime = document.getElementById('startTime').value;
    let endTime = document.getElementById('endTime').value;
    let meetingLink = document.getElementById('meetingLink').value;

    let startDateAndTime = date + ' ' + startTime + ' PST';
    // alert(startDateAndTime);
    let endDateAndTime = date + ' ' + endTime + ' PST';

    // alert("This form worked and the value you put into fname is: " + fname);
    createDownloadICSFile(
        'America/Los_Angeles',
        // new Date('Jan 1, 2020 08:00 PST'),
        new Date(startDateAndTime),
        new Date(endDateAndTime),
        // new Date('Jan 4, 2020 17:00 PST'),
        // 'Example Event',
        eventTitle,
        // 'This is the event description',
        eventDescription,
        // 'Washington State Convention Center',
        meetingLink
        // 'https://sjsu.zoom.us/j/6617242592'
    );
});