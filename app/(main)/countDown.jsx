import React, { useState, useEffect } from "react";

function CountdownTimer({ endDate }) {
  const calculateCountdown = () => {
    const targetDate = new Date(endDate);
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const secondsRemaining = Math.floor(timeDifference / 1000);
    const days = Math.floor(secondsRemaining / (24 * 60 * 60));
    const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{countdown.days}</h5>
          <p className="text-xs">Days</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{countdown.hours}</h5>
          <p className="text-xs">Hours</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{countdown.minutes}</h5>
          <p className="text-xs">Minutes</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{countdown.seconds}</h5>
          <p className="text-xs">Seconds</p>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
