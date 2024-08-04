import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const FinanceDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });
  const [savings, setSavings] = useState(0);
  const [newSavings, setNewSavings] = useState('');
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const [newSavingsGoal, setNewSavingsGoal] = useState('');

  const addExpense = () => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({ name: '', amount: '', category: '', date: '' });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

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

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const expenseData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expensesByCategory),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-white font-bold mb-4">Personal Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Expense Tracker */}
        <div className="bg-firstColor p-4 rounded shadow max-h-[80vh]">
          <h2 className="text-xl text-text font-semibold mb-5">Expense Tracker</h2>
          <form onSubmit={(e) => { e.preventDefault(); addExpense(); }} className="mb-4">
            <input
              type="text"
              name="name"
              value={newExpense.name}
              onChange={handleInputChange}
              placeholder="Expense Name"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Expense</button>
          </form>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-thirdColor">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b">
                    <td className="p-2">{expense.name}</td>
                    <td className="p-2">${expense.amount}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">{expense.date}</td>
                    <td className="p-2">
                      <button onClick={() => deleteExpense(expense.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Financial Overview */}
        <div className="bg-firstColor p-4 rounded shadow max-h-[80vh]">
          <h2 className="text-xl text-text font-semibold mb-5">Financial Overview</h2>
          <div className="mb-4">
            <p className='text-text'>Total Expenses: ${totalExpenses}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg text-text font-semibold">Expense Breakdown</h3>
            <Pie data={expenseData} />
          </div>
        </div>

        {/* Savings Goal Tracker */}
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
      </div>
    </div>
  );
};

export default FinanceDashboard;