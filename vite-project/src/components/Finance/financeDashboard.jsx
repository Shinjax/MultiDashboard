import { useState } from 'react';
//OpenAi secret: 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

const FinanceDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState ({
    name: '',
    amount: '',
    category: '',
    tags: '',
    date: '',
  })
  const [newSavings, setNewSavings] = useState([]);

  
  const addExpense = () => {
    setExpenses([...expenses, {...newExpense, id: Date.now()}]);
    setNewExpense({name: '', amount: '', category: '', tags: '', date: '',})
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({...newExpense, [name]: value});
  };
  
  const handleSavingsInputChange = (e) => {
    setNewSavings(e.target.value)
  };

  const addNewSavings = () => {
    setNewSavings([...newSavings,setNewSavings]);
  }

  const deleteSavings = (id) => {
    setNewSavings(newSavings.filter((newSavings) => newSavings.id !== id));
  }

  return (
    <div className='financeDashboard'>
      <div className='expenseTracker'>
        <div className='expenseTags'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={newExpense.name}
            onChange={handleInputChange}
          />
          <label>Amount:</label>
          <input
            type='number'
            name='amount'
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <label>Category:</label>
          <input
            type='text'
            name='category'
            value={newExpense.category}
            onChange={handleInputChange}
          />
          <label>Tags:</label>
          <input
            type='text'
            name='tags'
            value={newExpense.tags}
            onChange={handleInputChange}
          />
          <label>Date:</label>
          <input
            type='date'
            name='date'
            value={newExpense.date}
            onChange={handleInputChange}
          />
          <button onClick={addExpense}>Add Expense</button>
        </div>
        <div className='expenseTable'>
          <h3>Expense List</h3>
          <div className='expenseLabels'>
            <p>Name: </p>
            <p>Amount: </p>
            <p>Category: </p>
            <p>Tags: </p>
            <p>Date: </p>
            <p>Delete: </p>
          </div>
          {expenses.map((expense) => (
            <div className='expenseList'key={expense.id}>
              <p>{expense.name}</p>
              <p>${expense.amount}</p>
              <p>{expense.category}</p>
              <p>{expense.tags}</p>
              <p>{expense.date}</p>
              <button onClick={() => deleteExpense(expense.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
      <div className='financialChatBot'>
        <h3>Financial Assistant</h3>
      </div>
      <div className='savingsGoals'>
        <div className='savingsInput'>
          <h3>Savings</h3>
          <input
            placeholder='Add Savings'
            type='number'
            value={newSavings}
            onChange={handleSavingsInputChange}
          />
          <button onClick={addNewSavings}>+</button>
        </div>
     </div>
    </div>
  );
}

export default FinanceDashboard;
