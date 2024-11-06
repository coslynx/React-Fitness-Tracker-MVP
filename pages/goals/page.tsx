'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '../lib/store';
import { useGoals } from '../lib/goals';
import styles from './page.module.css'; 
import { Chart, registerables } from 'chart.js';
import { DoughnutController, CategoryScale } from 'chart.js';

// Register Chart.js components needed for doughnut chart
Chart.register(DoughnutController, CategoryScale, ...registerables); 

export default function GoalsPage() {
  const { data: session } = useSession();
  const { goals } = useStore();
  const { fetchGoals, addGoal, updateGoal, deleteGoal } = useGoals(); 

  // State for managing the add goal form
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalTarget, setGoalTarget] = useState(0);
  const [goalTimeline, setGoalTimeline] = useState(''); 

  // State for managing the edit goal form
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState('');
  const [editingGoalName, setEditingGoalName] = useState('');
  const [editingGoalType, setEditingGoalType] = useState('');
  const [editingGoalTarget, setEditingGoalTarget] = useState(0);
  const [editingGoalTimeline, setEditingGoalTimeline] = useState('');

  // State for managing the doughnut chart 
  const [chartRef, setChartRef] = useState<Chart | null>(null); 

  useEffect(() => {
    // Fetch user's goals on component mount
    if (session?.user?.id) {
      fetchGoals(session.user.id); 
    }
  }, [session]);

  // Helper function for calculating doughnut chart data
  const getChartData = () => {
    // Calculate chart data based on goal progress 
    const completedGoals = goals.filter((goal) => goal.progress === 100).length;
    const totalGoals = goals.length;
    return [completedGoals, totalGoals - completedGoals];
  };

  // Function to handle add goal form submission
  const handleAddGoalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form data
    if (!goalName || !goalType || !goalTarget || !goalTimeline) {
      alert('Please fill in all fields');
      return;
    }

    if (goalTarget <= 0) {
      alert('Goal target must be a positive number');
      return;
    }

    // Add new goal
    try {
      await addGoal({
        name: goalName,
        type: goalType,
        target: goalTarget,
        timeline: goalTimeline,
        userId: session?.user?.id || '',
      });
      // Reset form state
      setGoalName('');
      setGoalType('');
      setGoalTarget(0);
      setGoalTimeline('');
      setIsAddingGoal(false);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error adding goal:', error);
      alert('Error adding goal. Please try again later.');
    }
  };

  // Function to handle edit goal form submission
  const handleEditGoalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form data
    if (!editingGoalName || !editingGoalType || !editingGoalTarget || !editingGoalTimeline) {
      alert('Please fill in all fields');
      return;
    }

    if (editingGoalTarget <= 0) {
      alert('Goal target must be a positive number');
      return;
    }

    // Update goal
    try {
      await updateGoal(editingGoalId, {
        name: editingGoalName,
        type: editingGoalType,
        target: editingGoalTarget,
        timeline: editingGoalTimeline,
      });
      // Reset form state
      setEditingGoalName('');
      setEditingGoalType('');
      setEditingGoalTarget(0);
      setEditingGoalTimeline('');
      setIsEditingGoal(false);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error updating goal:', error);
      alert('Error updating goal. Please try again later.');
    }
  };

  // Function to handle goal deletion
  const handleDeleteGoal = async (goalId: string) => {
    // Delete goal
    try {
      await deleteGoal(goalId);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Error deleting goal:', error);
      alert('Error deleting goal. Please try again later.');
    }
  };

  // Function to update the doughnut chart
  const updateChart = () => {
    if (chartRef) {
      chartRef.data.datasets[0].data = getChartData();
      chartRef.update();
    }
  };

  // Function to render the doughnut chart 
  const renderChart = () => {
    if (chartRef) return;

    const canvas = chartRef?.getContext('2d');
    if (!canvas) return;

    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Completed Goals', 'Pending Goals'],
        datasets: [
          {
            label: 'Goal Progress',
            data: getChartData(),
            backgroundColor: ['#4CAF50', '#FF5733'],
            borderColor: ['#4CAF50', '#FF5733'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    setChartRef(chart);
  };

  // Conditional rendering based on authentication status
  if (!session) {
    return (
      <div className={styles.container}>
        <p>Please log in to manage your goals.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Goals</h1>
      <div className={styles.goalList}>
        {goals.map((goal) => (
          <div key={goal.id} className={styles.goalItem}>
            <div className={styles.goalDetails}>
              <h2>{goal.name}</h2>
              <p>{goal.type}</p>
              <p>Target: {goal.target}</p>
              <p>Timeline: {goal.timeline}</p>
            </div>
            <div className={styles.goalActions}>
              <button onClick={() => setIsEditingGoal(true) && setEditingGoalId(goal.id)}>Edit</button>
              <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={setChartRef} /> 
        {goals.length > 0 && renderChart()} 
      </div>
      <div className={styles.addGoalForm}>
        {isAddingGoal && (
          <form onSubmit={handleAddGoalSubmit}>
            {/* Form fields for adding a new goal */}
            <div>
              <label htmlFor="goalName">Goal Name:</label>
              <input 
                type="text" 
                id="goalName" 
                value={goalName} 
                onChange={(e) => setGoalName(e.target.value)} 
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="goalType">Goal Type:</label>
              <select 
                id="goalType" 
                value={goalType} 
                onChange={(e) => setGoalType(e.target.value)} 
                className={styles.select}
              >
                <option value="">Select a Goal Type</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Distance Running">Distance Running</option>
                {/* Add other goal types here */}
              </select>
            </div>
            <div>
              <label htmlFor="goalTarget">Goal Target:</label>
              <input 
                type="number" 
                id="goalTarget" 
                value={goalTarget} 
                onChange={(e) => setGoalTarget(Number(e.target.value))} 
                className={styles.input}
              />
            </div>
            <div>
              <label htmlFor="goalTimeline">Goal Timeline (YYYY-MM-DD):</label>
              <input 
                type="date" 
                id="goalTimeline" 
                value={goalTimeline} 
                onChange={(e) => setGoalTimeline(e.target.value)} 
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>Add Goal</button>
          </form>
        )}
        {!isAddingGoal && (
          <button onClick={() => setIsAddingGoal(true)} className={styles.button}>Add New Goal</button>
        )}
      </div>
      {isEditingGoal && (
        <form onSubmit={handleEditGoalSubmit}>
          {/* Form fields for editing an existing goal */}
          <div>
            <label htmlFor="editingGoalName">Goal Name:</label>
            <input 
              type="text" 
              id="editingGoalName" 
              value={editingGoalName} 
              onChange={(e) => setEditingGoalName(e.target.value)} 
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="editingGoalType">Goal Type:</label>
            <select 
              id="editingGoalType" 
              value={editingGoalType} 
              onChange={(e) => setEditingGoalType(e.target.value)} 
              className={styles.select}
            >
              <option value="">Select a Goal Type</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Distance Running">Distance Running</option>
              {/* Add other goal types here */}
            </select>
          </div>
          <div>
            <label htmlFor="editingGoalTarget">Goal Target:</label>
            <input 
              type="number" 
              id="editingGoalTarget" 
              value={editingGoalTarget} 
              onChange={(e) => setEditingGoalTarget(Number(e.target.value))} 
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="editingGoalTimeline">Goal Timeline (YYYY-MM-DD):</label>
            <input 
              type="date" 
              id="editingGoalTimeline" 
              value={editingGoalTimeline} 
              onChange={(e) => setEditingGoalTimeline(e.target.value)} 
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Update Goal</button>
          <button onClick={() => setIsEditingGoal(false)} className={styles.button}>Cancel</button>
        </form>
      )}
    </div>
  );
}