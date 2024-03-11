/**
 * Calculates the elapsed time in seconds between the provided date and now.
 *
 * @param {number} date - The number of milliseconds elapsed since January 1, 1970 00:00:00 UTC of a particular date
 *
 * @returns {number} The elapsed time in seconds.
 */
const getElapsedTimeInSeconds = (date: number): number => {
    return (Date.now() - date) / 1000;
};

export default {
    getElapsedTimeInSeconds,
};
