'use client';

import { useSession } from 'next-auth/react';
import { useStore } from '../lib/store';
import { useGoals } from '../lib/goals';
import styles from './page.module.css';
import { Chart, registerables } from 'chart.js';
import { DoughnutController, CategoryScale } from 'chart.js';
import { useEffect, useState, useRef } from 'react';

// Register the required Chart.js components
Chart.register(DoughnutController, CategoryScale, ...registerables);

export default function ProgressPage() {
  const { data: session } = useSession();
  const { goals } = useStore();
  const { fetchGoals, fetchActivities } = useGoals();

  // State for managing the add activity form
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityDuration, setActivityDuration] = useState(0);
  const [activityCalories, setActivityCalories] = useState(0);

  // State for the chart
  const [chartRef, setChartRef] = useState<Chart | null>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchGoals(session.user.id);
      fetchActivities(session.user.id);
    }
  }, [session]);

  // Helper function to calculate chart data
  const getChartData = () => {
    const completedGoals = goals.filter((goal) => goal.progress === 100).length;
    const totalGoals = goals.length;
    return [completedGoals, totalGoals - completedGoals];
  };

  // Function to handle add activity form submission
  const handleAddActivitySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activityType || !activityDate || activityDuration <= 0 || activityCalories <= 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await fetch('/api/goals/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activityType,
          date: activityDate,
          duration: activityDuration,
          calories: activityCalories,
          userId: session?.user?.id || '',
        }),
      });

      setActivityType('');
      setActivityDate('');
      setActivityDuration(0);
      setActivityCalories(0);
      setIsAddingActivity(false);
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Error adding activity. Please try again later.');
    }
  };

  // Function to render the doughnut chart
  const renderChart = () => {
    if (chartRef) return;

    const canvas = chartCanvasRef.current?.getContext('2d');
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
        <p>Please log in to track your progress.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Progress</h1>
      <ActivityLog />
      <div className={styles.chartContainer}>
        <canvas ref={chartCanvasRef} />
        {goals.length > 0 && renderChart()}
      </div>
      <ActivityForm />
    </div>
  );
}

// Activity Log Component
const ActivityLog = () => {
  const { fetchActivities } = useGoals();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities().then((data) => setActivities(data));
  }, []);

  return (
    <div className={styles.activityLog}>
      <h2>Your Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.type} - {activity.date} - Duration: {activity.duration} minutes - Calories: {activity.calories}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Activity Form Component
const ActivityForm = () => {
  const { data: session } = useSession();
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityDuration, setActivityDuration] = useState(0);
  const [activityCalories, setActivityCalories] = useState(0);

  const handleAddActivitySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activityType || !activityDate || activityDuration <= 0 || activityCalories <= 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await fetch('/api/goals/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activityType,
          date: activityDate,
          duration: activityDuration,
          calories: activityCalories,
          userId: session?.user?.id || '',
        }),
      });

      setActivityType('');
      setActivityDate('');
      setActivityDuration(0);
      setActivityCalories(0);
      setIsAddingActivity(false);
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Error adding activity. Please try again later.');
    }
  };

  return (
    <div className={styles.activityForm}>
      {isAddingActivity && (
        <form onSubmit={handleAddActivitySubmit}>
          <div>
            <label htmlFor="activityType">Activity Type:</label>
            <select
              id="activityType"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Activity</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Gym">Gym</option>
            </select>
          </div>
          <div>
            <label htmlFor="activityDate">Date:</label>
            <input
              type="date"
              id="activityDate"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="activityDuration">Duration (minutes):</label>
            <input
              type="number"
              id="activityDuration"
              value={activityDuration}
              onChange={(e) => setActivityDuration(Number(e.target.value))}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="activityCalories">Calories Burned:</label>
            <input
              type="number"
              id="activityCalories"
              value={activityCalories}
              onChange={(e) => setActivityCalories(Number(e.target.value))}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Log Activity</button>
        </form>
      )}
      {!isAddingActivity && (
        <button onClick={() => setIsAddingActivity(true)} className={styles.button}>
          Log New Activity
        </button>
      )}
    </div>
  );
};