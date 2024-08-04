import { useState, useEffect } from 'react';

const Countdown = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          setTime(prevTime => {
            const newSeconds = prevTime.seconds - 1;
            const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
            const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
            return {
              hours: newHours,
              minutes: newMinutes < 0 ? 59 : newMinutes,
              seconds: newSeconds < 0 ? 59 : newSeconds
            };
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleInputChange = (e, field) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setInputTime(prev => ({ ...prev, [field]: value }));
  };

  const setTimer = () => {
    setTime(inputTime);
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="text-6xl text-white font-bold mb-4 text-center">
        {`${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`}
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          onClick={isRunning ? stopTimer : startTimer}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        <input
          type="number"
          placeholder="Hours"
          value={inputTime.hours}
          onChange={e => handleInputChange(e, 'hours')}
          className="w-20 px-2 py-1 text-center rounded"
        />
        <input
          type="number"
          placeholder="Minutes"
          value={inputTime.minutes}
          onChange={e => handleInputChange(e, 'minutes')}
          className="w-20 px-2 py-1 text-center rounded"
        />
        <input
          type="number"
          placeholder="Seconds"
          value={inputTime.seconds}
          onChange={e => handleInputChange(e, 'seconds')}
          className="w-20 px-2 py-1 text-center rounded"
        />
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white"
          onClick={setTimer}
        >
          Set Timer
        </button>
      </div>
    </div>
  );
};

export default Countdown;