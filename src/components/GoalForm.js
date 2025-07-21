import React, { useState } from 'react';

function GoalForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', targetAmount: '', category: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Goal Name" required />
      <input name="targetAmount" type="number" value={form.targetAmount} onChange={handleChange} placeholder="Target Amount" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
