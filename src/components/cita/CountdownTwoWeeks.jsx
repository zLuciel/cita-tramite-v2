import React, { useEffect, useState } from "react";

const CountdownTwoWeeks = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const targetDate = new Date(new Date(startDate).getTime() + 14 * 24 * 60 * 60 * 1000);

    const updateCounter = () => {
      const now = new Date();
      const timeDiff = targetDate - now;

      if (timeDiff <= 0) {
        setCompleted(true);
        clearInterval(intervalId); // Detiene el contador cuando termina
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const intervalId = setInterval(updateCounter, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [startDate]);

  return (
    <div className="mb-8 text-center">
      {completed ? (
        <h2>Ya puede reservar una cita</h2>
      ) : (
        <div>
          <h2 className="text-1xl font-semibold">Tiempo estimado para reserva una cita</h2>
          <p>
            {timeLeft.days} días, {timeLeft.hours} horas, {timeLeft.minutes} minutos, {timeLeft.seconds} segundos
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTwoWeeks;
