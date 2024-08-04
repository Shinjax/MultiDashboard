import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Countdown from './Countdown'; // Ensure the correct case for import

const ProgressDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [quoteData, setQuoteData] = useState(null);
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const fetchQuoteData = async () => {
    try {
      const url = 'https://api.quotable.io/random';
      const response = await axios.get(url);
      setQuoteData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleTaskKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewTask();
    }
  };

  const addNewTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (indexToRemove) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const handleMoodSelection = (mood) => {
    setMood(mood);
    setMoodHistory([...moodHistory, mood]);
    console.log(`Selected mood: ${mood}`);
  };

  const clearMoodHistory = () => {
    setMoodHistory([]);
  };
  
  return (
    <section className="flex justify-between items-stretch h-[60vh] text-text mb-2.5">
      {/* TIMER START */}
      <div className="flex-1 bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg">
        <h3 className="m-0 font-semibold">Timer</h3>
        <div className="flex flex-row justify-center mt-6">
          <Countdown />
        </div>
      </div>
      {/* TASK LIST START */}
      <div className="flex-1 bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg flex flex-col justify-start">
        <div className="mb-2.5">
          <input
            className="h-8 w-56 bg-[#1b1f2a] border-gray-300 text-white rounded mr-1.5 border-solid border px-2"
            type="text"
            placeholder="Add your new task"
            value={newTask}
            onChange={handleTaskInputChange}
            onKeyDown={handleTaskKeyDown}
          />
          <button
            className="h-8 w-8 rounded border-transparent bg-blue-500 text-white"
            onClick={addNewTask}
          >
            +
          </button>
        </div>
        <div className="overflow-y-auto max-h-[40vh]">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="h-8 w-[260px] rounded bg-[#f2f2f2] text-black mb-2.5 mt-2.5 flex items-center justify-between text-sm relative group"
            >
              <p className="ml-2.5">{task.text}</p>
              <button
                className="invisible group-hover:visible bg-red-500 border-none absolute h-full right-0 w-8 flex items-center justify-center text-base text-white"
                onClick={() => removeTask(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p>You have {tasks.length} pending tasks</p>
        </div>
        {tasks.length > 0 && (
          <button
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={clearAllTasks}
          >
            Clear All
          </button>
        )}
      </div>
      {/* MOOD TRACKER START */}
      <div className="flex-1 bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg">
        <h3 className="m-0 mb-4 font-semibold">Mood Tracker</h3>
        <div className="flex flex-wrap justify-center">
          {['Stressed', 'Sad', 'Chill', 'Neutral', 'Energetic', 'Happy', 'Motivated', 'Angry'].map((moodOption) => (
            <button
              key={moodOption}
              className={`h-[35px] w-[75px] m-1.5 text-xs border-none ${
                moodOption === 'Stressed' ? 'bg-black text-white' :
                moodOption === 'Sad' ? 'bg-blue-500 text-white' :
                moodOption === 'Chill' ? 'bg-cyan-200 text-slate-800' :
                moodOption === 'Neutral' ? 'bg-gray-300 text-slate-800' :
                moodOption === 'Energetic' ? 'bg-orange-500 text-white' :
                moodOption === 'Happy' ? 'bg-yellow-400 text-slate-800' :
                moodOption === 'Motivated' ? 'bg-green-500 text-white' :
                'bg-red-500 text-white'
              }`}
              onClick={() => handleMoodSelection(moodOption)}
            >
              {moodOption}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {mood && <p>Current Mood: {mood}</p>}
        </div>
        <div className="flex flex-col items-center mt-4">
          {moodHistory.length > 0 && <p>Mood History</p>}
          <div className="flex flex-row min-w-[20px] max-w-[250px] m-1.5 overflow-x-auto">
            {moodHistory.map((mood, index) => (
              <div
                key={index}
                className={`flex-none w-5 h-5 mr-2.5 mb-2 ${
                  mood === 'Stressed' ? 'bg-black' :
                  mood === 'Sad' ? 'bg-blue-500' :
                  mood === 'Chill' ? 'bg-cyan-200' :
                  mood === 'Neutral' ? 'bg-gray-300' :
                  mood === 'Energetic' ? 'bg-orange-500' :
                  mood === 'Happy' ? 'bg-yellow-400' :
                  mood === 'Motivated' ? 'bg-green-500' :
                  'bg-red-500'
                }`}
              ></div>
            ))}
          </div>
          {moodHistory.length > 0 && (
            <button
              className="w-[100px] h-[20px] m-1 bg-red-500 text-white text-xs rounded"
              onClick={clearMoodHistory}
            >
              Clear History
            </button>
          )}
        </div>
      </div>
      {/* QUOTE GEN START */}
      <div className="flex-[0.5] bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg flex flex-col justify-start items-center text-center">
        <button
          className="w-50 h-[50px] mt-2.5 rounded border-solid bg-blue-500 text-white"
          onClick={fetchQuoteData}
        >
          Get a little motivation
        </button>
        {quoteData && <p className="mt-4">{quoteData.content}</p>}      
      </div>
      {/* QUOTE GEN END */}
    </section>
  );
};

export default ProgressDashboard;
