import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-secondColor rounded-lg shadow-md">
      <div className="text-6xl font-bold font-mono">
        {formatTime(seconds)}
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={toggleTimer}
          className={`px-4 py-2 rounded ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;