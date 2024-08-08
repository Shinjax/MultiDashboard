import { useState } from 'react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    setMoodHistory([...moodHistory, selectedMood]);
    console.log(`Selected mood: ${selectedMood}`);
  };

  const clearMoodHistory = () => {
    setMoodHistory([]);
  };

  const moodOptions = ['Stressed', 'Sad', 'Chill', 'Neutral', 'Energetic', 'Happy', 'Motivated', 'Angry'];

  const getMoodColor = (moodOption) => {
    const colors = {
      'Stressed': 'bg-black text-white',
      'Sad': 'bg-blue-500 text-white',
      'Chill': 'bg-cyan-200 text-slate-800',
      'Neutral': 'bg-gray-300 text-slate-800',
      'Energetic': 'bg-orange-500 text-white',
      'Happy': 'bg-yellow-400 text-slate-800',
      'Motivated': 'bg-green-500 text-white',
      'Angry': 'bg-red-500 text-white'
    };
    return colors[moodOption] || '';
  };

  return (
    <div className="flex-1 bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg">
      <h3 className="m-0 mb-4 font-semibold">Mood Tracker</h3>
      <div className="flex flex-wrap justify-center">
        {moodOptions.map((moodOption) => (
          <button
            key={moodOption}
            className={`h-[35px] w-[75px] m-1.5 text-xs border-none ${getMoodColor(moodOption)}`}
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
              className={`flex-none w-5 h-5 mr-2.5 mb-2 ${getMoodColor(mood).split(' ')[0]}`}
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
  );
};

export default MoodTracker;