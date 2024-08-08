import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

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

  return (
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
  );
};

export default TaskList;