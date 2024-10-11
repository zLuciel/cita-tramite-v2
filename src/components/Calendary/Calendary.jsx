"use client";

import { useState } from "react";
import { Calendar } from "@mantine/dates";
import { Paper, Text, Indicator } from "@mantine/core";
import "dayjs/locale/es";

const Calendary = ({ selectedDate, setSelectedDate,setDataTime,memoryTime,setIdTime}) => {
  const [selectedSaturday, setSelectedSaturday] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isSaturday = (date) => {
    return date.getDay() === 6;
  };

  const isSaturdayBeforeToday = (date) => {
    const today = new Date();
    return date < today && isSaturday(date);
  };

  const handleFormatTime = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    setIdTime(null)
    setSelectedDate(utcDate.toISOString().split("T")[0]);
    setSelectedSaturday(utcDate.toISOString().split("T")[0]); // Guardar el sábado seleccionado
  };

  const handleMonthChange = (newMonth) => {
    if (newMonth > currentMonth) {
      setCurrentMonth(newMonth);
    }
  };

  const renderDay = (date) => {
    const isDisabled = !isSaturday(date) || isSaturdayBeforeToday(date);
    const isSelected = selectedSaturday === date.toISOString().split("T")[0];
    const backgroundColor = isSelected ? "rgb(217 255 3)" : "white"; // Color mostaza si es seleccionado

    return (
      <Paper
        padding="xs"
        style={{
          backgroundColor: backgroundColor,
          width: "100%",
          height: "50%",
          position: "relative",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={() => !isDisabled && handleFormatTime(date)}
        key={date.toString()}
      >
        <Text align="center">{date.getDate()}</Text>
        {isSaturday(date) && (
          <Indicator
            color="green"
            size={8}
            offset={-2}
            style={{ position: "absolute", top: 5, right: 4 }}
          />
        )}
      </Paper>
    );
  };

  return (
    <div className="w-full">
      <Calendar
        size="lg"
        locale="es"
        renderDay={renderDay}
        value={currentMonth}
        onChange={handleMonthChange}
        disableOutsideDates // Bloquear los meses anteriores
      />
    </div>
  );
};

export default Calendary;

