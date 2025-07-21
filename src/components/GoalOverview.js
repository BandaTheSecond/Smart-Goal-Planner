import React from 'react';

function GoalOverview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <section className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: Ksh {totalSaved}</p>
      <p>Completed Goals: {completedGoals}</p>
    </section>
  );
}

export default GoalOverview;
