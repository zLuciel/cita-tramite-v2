"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Paper, Text, Indicator } from "@mantine/core";
import "dayjs/locale/es";

const Calendary = ({ selectedDate, setSelectedDate, setIdTime, initialDate }) => {
  const [selectedSaturday, setSelectedSaturday] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [thirdSaturday, setThirdSaturday] = useState(null);

  // Función para calcular el tercer sábado después de una fecha dada
  const calculateThirdSaturday = (startDate) => {
    let date = new Date(startDate);
    let saturdayCount = 0;

    while (saturdayCount < 3) {
      date.setDate(date.getDate() + 1); // Avanzar un día
      if (date.getDay() === 6) {
        saturdayCount++;
      }
    }
    return date; // Esta será la fecha del tercer sábado
  };

  useEffect(() => {
    if (initialDate) {
      const thirdSat = calculateThirdSaturday(initialDate);
      setThirdSaturday(thirdSat);
    }
  }, [initialDate]);

  const isSaturday = (date) => date.getDay() === 6;

  const isSaturdayBeforeToday = (date) => {
    const today = new Date();
    return date < today && isSaturday(date);
  };

  // Verificar si la fecha es seleccionable (después del tercer sábado)
  const isSelectable = (date) => {
    return thirdSaturday && date >= thirdSaturday && isSaturday(date);
  };

  const handleFormatTime = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setIdTime(null);
    setSelectedDate(utcDate.toISOString().split("T")[0]);
    setSelectedSaturday(utcDate.toISOString().split("T")[0]); // Guardar el sábado seleccionado
  };

  const handleMonthChange = (newMonth) => {
    if (newMonth > currentMonth) {
      setCurrentMonth(newMonth);
    }
  };

  const renderDay = (date) => {
    const isDisabled = !isSelectable(date) || isSaturdayBeforeToday(date);
    const isSelected = selectedSaturday === date.toISOString().split("T")[0];
    const backgroundColor = isSelected ? "rgb(217 255 3)" : "white"; // Color mostaza si es seleccionado
    const indicatorColor = isSelectable(date) ? "green" : "red"; // Verde si es seleccionable, rojo si no

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
            color={indicatorColor} // Mostrar indicador verde o rojo
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


