import { formatInTimeZone, toDate } from 'date-fns-tz';

export const timeZones = [
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Australia/Sydney',
    'UTC'
].sort();

export const formatToTimeZone = (date, timeZone) => {
    return formatInTimeZone(
        new Date(date),
        timeZone,
        'yyyy-MM-dd HH:mm zzz'
    );
};

export const convertToUTC = (dateTime, timeZone) => {
    // Using toDate instead of zonedTimeToUtc
    const zonedDate = toDate(new Date(dateTime), { timeZone });
    return zonedDate;
};

export const getUserTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}; 