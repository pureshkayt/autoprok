import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const DatePicker = ({ startDate, endDate, onDatesChange }) => {
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDatesChange = ({ startDate, endDate }) => {
        onDatesChange(startDate, endDate);
    };

    return (
        <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            endDateId="end-date"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            minimumNights={1}
            noBorder={true}
            displayFormat="DD.MM.YYYY"
            isOutsideRange={() => false}
        />
    );
};

export default DatePicker