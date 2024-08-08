import { useState } from 'react';
import { Pie } from 'react-chartjs-2';

const SavingsTracker = ({ savings, setSavings, savingsGoal, setSavingsGoal }) => {
  const [newSavings, setNewSavings] = useState('');
  const [newSavingsGoal, setNewSavingsGoal] = useState('');

  const handleSavingsInput = (e) => {
    setNewSavings(e.target.value);
  };

  const addToSavings = () => {
    const amount = parseFloat(newSavings);
    if (!isNaN(amount) && amount > 0) {
      setSavings(prevSavings => prevSavings + amount);
      setNewSavings('');
    }
  };

  const handleSavingsGoalInput = (e) => {
    setNewSavingsGoal(e.target.value);
  };

  const updateSavingsGoal = () => {
    const newGoal = parseFloat(newSavingsGoal);
    if (!isNaN(newGoal) && newGoal > 0) {
      setSavingsGoal(newGoal);
      setNewSavingsGoal('');
    }
  };

  const savingsData = {
    labels: ['Savings', 'Remaining'],
    datasets: [
      {
        data: [savings, Math.max(savingsGoal - savings, 0)],
        backgroundColor: ['#36A2EB', '#E7E9ED'],
        borderColor: ['#36A2EB', '#E7E9ED'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-firstColor p-4 rounded shadow">
      <h2 className="text-xl text-text font-semibold mb-5">Savings Goal Tracker</h2>
      <div>
        <h3 className="text-lg text-text font-semibold">Savings Goal Progress</h3>
        <Pie data={savingsData} />
        <p className="mt-2 text-white">Goal: ${savingsGoal}</p>
        <p className='text-white'>Current Savings: ${savings}</p>
        <div className="mt-2 flex items-center">
          <input
            type="number"
            value={newSavings}
            onChange={handleSavingsInput}
            placeholder="Amount to add"
            className="p-2 border rounded mr-1"
          />
          <button onClick={addToSavings} className="bg-green-500 text-white p-2 rounded w-full">
            Add to Savings
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <input
            type="number"
            value={newSavingsGoal}
            onChange={handleSavingsGoalInput}
            placeholder="New savings goal"
            className="p-2 border rounded mr-1"
          />
          <button onClick={updateSavingsGoal} className="bg-blue-500 text-white p-2 rounded w-full">
            Update Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;