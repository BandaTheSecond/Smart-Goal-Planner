import React, { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';
import GoalOverview from './components/GoalOverview';
import GoalList from './components/GoalList';
import './App.css';

const API_URL = 'https://goals-api-y5pv.onrender.com/goals';


function App() {
  const [goals, setGoals] = useState([]);
  const [deposit, setDeposit] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch goals');
      const data = await res.json();
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Unable to fetch goals. Please try again later.');
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goal) => {
    try {
      setError('');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...goal, savedAmount: 0 })
      });
      if (!res.ok) throw new Error('Failed to add goal');
      fetchGoals();
    } catch (err) {
      console.error("Add goal error:", err);
      setError('Unable to add goal. Please try again.');
    }
  };

  const deleteGoal = async (id) => {
    try {
      setError('');
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete goal');
      fetchGoals();
    } catch (err) {
      console.error("Delete goal error:", err);
      setError('Unable to delete goal. Please try again.');
    }
  };

  const depositToGoal = async (id, amount) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    try {
      setError('');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: goal.savedAmount + amount })
      });
      if (!res.ok) throw new Error('Failed to deposit to goal');
      setDeposit(prev => ({ ...prev, [id]: '' }));
      fetchGoals();
    } catch (err) {
      console.error("Deposit error:", err);
      setError('Unable to update savings. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>SMART GOAL PLANNER</h1>

      {loading && <p>Loading goals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <GoalForm onSubmit={addGoal} />

      {Array.isArray(goals) && goals.length > 0 && !loading && (
        <>
          <GoalOverview goals={goals} />
          <GoalList
            goals={goals}
            deposit={deposit}
            setDeposit={setDeposit}
            onDeposit={depositToGoal}
            onDelete={deleteGoal}
          />
        </>
      )}
    </div>
  );
}

export default App;
