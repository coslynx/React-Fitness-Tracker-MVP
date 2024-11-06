import { Session } from 'next-auth/react/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth].ts';

// You might need to adjust this based on your API endpoints
// For example, you might need to import additional data types or interfaces
// from a common types file. 
// import { Goal, Activity } from '../../types';

export async function fetchGoals(userId: string): Promise<Goal[] | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch(`/api/goals?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Error fetching goals:', response.statusText);
    return undefined;
  }

  const goals: Goal[] = await response.json();
  return goals;
}

export async function createGoal(goal: Goal): Promise<Goal | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch('/api/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(goal),
  });

  if (!response.ok) {
    console.error('Error creating goal:', response.statusText);
    return undefined;
  }

  const newGoal: Goal = await response.json();
  return newGoal;
}

export async function updateGoal(goalId: string, updatedGoal: Goal): Promise<boolean | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch(`/api/goals/${goalId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(updatedGoal),
  });

  if (!response.ok) {
    console.error('Error updating goal:', response.statusText);
    return undefined;
  }

  return true;
}

export async function deleteGoal(goalId: string): Promise<boolean | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch(`/api/goals/${goalId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Error deleting goal:', response.statusText);
    return undefined;
  }

  return true;
}

// Example for fetching a user's activity logs
export async function fetchActivities(userId: string): Promise<Activity[] | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch(`/api/goals/activities?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Error fetching activities:', response.statusText);
    return undefined;
  }

  const activities: Activity[] = await response.json();
  return activities;
}

// Example for creating a new activity log
export async function createActivity(activity: Activity): Promise<Activity | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const response = await fetch('/api/goals/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    console.error('Error creating activity:', response.statusText);
    return undefined;
  }

  const newActivity: Activity = await response.json();
  return newActivity;
}

// ... other API call functions for social feed, user profile, etc.