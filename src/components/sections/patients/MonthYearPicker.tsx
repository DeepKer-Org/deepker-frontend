"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

interface MonthYearPickerProps {
  onDateChange: (date: Date | null) => void;
  value: Date | null;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  onDateChange,
  value,
}) => {
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleDateChange}
      dateFormat="MMM, yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      locale={es}
      placeholderText="-"
      className={"timeline__selector"}
      popperClassName={"timeline__popper"}
    />
  );
};
export default MonthYearPicker;
