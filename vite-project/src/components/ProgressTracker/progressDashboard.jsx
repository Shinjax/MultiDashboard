import { useState } from 'react';
import { FaTrash } from "react-icons/fa6";
import axios from 'axios';
import Countdown from './countdown';
const ProgressDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [quoteData, setQuoteData] = useState('');
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
 
  const fetchQuoteData = async () => {
    try {
      const url = 'https://api.quotable.io/random'
      const response = await axios.get(url);
      setQuoteData(response.data); 
    } catch (error){
        console.log(error);
    }

  }
  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleTaskKeyDown = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      addNewTask();
    }
  }
  const addNewTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const removeTask = (indexToRemove) => {
    setTasks((prevTasks) => 
      prevTasks.filter((_,index) => index !== indexToRemove)
    ); 
  };

  const clearAllTasks = () => {
    setTasks([]);
  }

  const handleMoodSelection = (mood) => {
    setMood(mood)
    setMoodHistory([...moodHistory, mood])
    console.log(`Selected mood: ${mood}`);
  }
  
  const clearMoodHistory = () => {
    setMoodHistory([]);
  }


  return (
    <div className='progressDashboard'>
      <div className='workTimer'>
        <div>
          <h3>Timer</h3>
          <Countdown hours={2} minutes={0} seconds={0} />
        </div>
       
      </div> 
      <div className='tasks'>
        <form>
          <div className='taskInputBar'>
            <input
              type='text'
              placeholder='Add your new task'
              value={newTask}
              onChange={handleTaskInputChange}
              onKeyDown={handleTaskKeyDown}
            />
            <button type= 'button' onClick={addNewTask}>+</button>
          </div>
        </form>
        <div className='tasksList'>
          {tasks.map((task, index) => (
            <div className='taskTable'key={index}>
              <p>{task}</p>
              <button type='button' onClick={() => removeTask(index)}>
                <FaTrash />
              </button>
            </div>  
          ))}
        </div>
        <div className='pendingTasks'> 
          <p>You have {tasks.length} pending tasks</p>
        </div>
        <div className='clearAll'>
          {tasks.length > 0 ? (<button onClick={clearAllTasks}>Clear All</button>) : null}
        </div>
      </div>     
      <div className='moodTracker'>
          <h3>Mood Tracker</h3>
          <div className='moodChoices'>
            <button className='StressedMood' onClick={() => handleMoodSelection('Stressed')}>Stressed</button> 
            <button className='SadMood'  onClick={() => handleMoodSelection('Sad')}>Sad</button>
            <button className='ChillMood' onClick={() => handleMoodSelection('Chill')}>Chill</button>
            <button className='NeutralMood' onClick={() => handleMoodSelection('Neutral')}>Neutral</button>
            <button className='EnergeticMood' onClick={() => handleMoodSelection('Energetic')}>Energetic</button>
            <button className='HappyMood' onClick={() => handleMoodSelection('Happy')}>Happy</button>
            <button className='MotivatedMood' onClick={() => handleMoodSelection('Motivated')}>Motivated</button>
            <button className='AngryMood' onClick={() => handleMoodSelection('Angry')}>Angry</button>
          </div>
          <div className='moodForToday'>
            {mood ? (<p>Current Mood: {mood}</p>) : null}
          </div>
          <div className='moodsOverview'>
              {moodHistory.length > 0 ? (<p>Mood History</p>) : null}
              <div className='moodHistory'>
                {moodHistory.map((mood, index) => (
                    <div key={index} className={`pastMood ${mood}Mood`}></div>
                ))}
              </div>
              {moodHistory.length > 0 ? (<button onClick={clearMoodHistory}>Clear History</button>) : null}
          </div>
      </div>
      <div className='motivation'>
          <button type='button' onClick={fetchQuoteData}>
            Get a little motivation
          </button>
          {quoteData && <p>{quoteData.content}</p>}
      </div>  
    </div>
  );
}

export default ProgressDashboard;
