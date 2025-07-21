import React from 'react';

function GoalList({ goals, deposit, setDeposit, onDeposit, onDelete }) {
  return (
    <section className="goal-list">
      {goals.map(goal => {
        const progress = ((goal.savedAmount / goal.targetAmount) * 100).toFixed(2);
        const remaining = goal.targetAmount - goal.savedAmount;
        const deadline = new Date(goal.deadline);
        const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));

        let status = '';
        if (goal.savedAmount >= goal.targetAmount) {
          status = '✅ Completed';
        } else if (daysLeft < 0) {
          status = '⚠️ Overdue';
        } else if (daysLeft <= 30) {
          status = '⚠️ Less than 30 days';
        }

        return (
          <div key={goal.id} className="goal-card">
            <h3>{goal.name} ({goal.category})</h3>
            <p>Saved: Ksh {goal.savedAmount} / Ksh {goal.targetAmount}</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{remaining} remaining</p>
            <p>Deadline: {goal.deadline} ({status})</p>
            <input
              type="number"
              placeholder="Deposit Amount"
              value={deposit[goal.id] || ''}
              onChange={e => setDeposit({ ...deposit, [goal.id]: e.target.value })}
            />
            <button onClick={() => onDeposit(goal.id, Number(deposit[goal.id]))}>Deposit</button>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </div>
        );
      })}
    </section>
  );
}

export default GoalList;
