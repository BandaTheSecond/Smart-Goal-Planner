import React, { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';
import GoalOverview from './components/GoalOverview';
import GoalList from './components/GoalList';
import './App.css';

const API_URL = 'http://localhost:3001/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [deposit, setDeposit] = useState({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("Fetched goals:", data);
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
      setGoals([]);
    }
  };

  const addGoal = async (goal) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...goal, savedAmount: 0 })
    });
    fetchGoals();
  };

  const deleteGoal = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchGoals();
  };

  const depositToGoal = async (id, amount) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: goal.savedAmount + amount })
    });
    setDeposit(prev => ({ ...prev, [id]: '' }));
    fetchGoals();
  };

  return (
    <div className="App">
      <h1>SMART GOAL PLANNER</h1>
      <GoalForm onSubmit={addGoal} />
      {Array.isArray(goals) && goals.length > 0 && <GoalOverview goals={goals} />}
      <GoalList
        goals={goals}
        deposit={deposit}
        setDeposit={setDeposit}
        onDeposit={depositToGoal}
        onDelete={deleteGoal}
      />
    </div>
  );
}

export default App;
