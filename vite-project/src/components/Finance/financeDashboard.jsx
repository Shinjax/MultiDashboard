import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import ExpenseTracker from './expenseTracker';
import SavingsTracker from './savings';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const FinanceDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(1000);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-white font-bold mb-4">Personal Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExpenseTracker expenses={expenses} addExpense={addExpense} deleteExpense={deleteExpense} />
        
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

        <SavingsTracker savings={savings} setSavings={setSavings} savingsGoal={savingsGoal} setSavingsGoal={setSavingsGoal} />
      </div>
    </div>
  );
};

export default FinanceDashboard;