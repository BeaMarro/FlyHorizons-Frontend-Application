const DateTimeUtilities = {
    convertToTime(value) {
        try {
            // Parse the ISO date string into a Date object
            const date = new Date(value);

            // Round up the minute if seconds are greater than 0
            if (date.getSeconds() > 0) {
                date.setMinutes(date.getMinutes() + 1);
            }

            // Format the time in 24 hour format
            const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

            return formattedTime;
        } catch (error) {
            console.error("Error parsing time:", error);
            return "Invalid time";
        }
    },
    addMinutesToTime(time, minutesToAdd) {
        const date = new Date(time);

        // Round up the minute if seconds are greater than 0
        if (date.getSeconds() > 0) {
            date.setMinutes(date.getMinutes() + 1);
        }

        // Add rounded minutes
        date.setMinutes(date.getMinutes() + minutesToAdd);

        // Format the time in 24 hour format
        const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        return formattedTime;
    },
    convertMinutesToTime(minutes) {
        // Full hours
        const hours = Math.floor(minutes / 60)

        // Remaining minutes
        const remainingMinutes = minutes % 60

        return `${hours}h ${remainingMinutes}m`
    }
};

export default DateTimeUtilities;