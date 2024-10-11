"use client";
import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

interface MonthYearPickerProps {
    onDateChange: (date: Date | null) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({onDateChange}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            onDateChange(date);
        }
    }

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMM, yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            locale={es}
            placeholderText="-"
            className={"timeline__selector"}
            popperClassName={"timeline__popper"}
        />
    )
}
export default MonthYearPicker
