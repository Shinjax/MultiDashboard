import { useState } from 'react';

const ExpenseTracker = ({ expenses, addExpense, deleteExpense }) => {
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(newExpense);
    setNewExpense({ name: '', amount: '', category: '', date: '' });
  };

  return (
    <div className="bg-firstColor p-4 rounded shadow max-h-[80vh]">
      <h2 className="text-xl text-text font-semibold mb-5">Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-4">
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
  );
};

export default ExpenseTracker;