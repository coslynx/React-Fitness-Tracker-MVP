'use client';

import { useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useGoals } from '../lib/goals';
import { useUser } from '../lib/user';

export default function HomePage() {
  const { data: session } = useSession();
  const { goals } = useGoals();
  const { user } = useUser();

  return (
    <SessionProvider session={session}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to the Fitness Tracker</h1>
          <p className={styles.description}>
            Track your fitness progress, set goals, and stay motivated.
          </p>

          {session && (
            <div className={styles.user}>
              <img
                src={session.user.image}
                alt={session.user.name}
                className={styles.userImage}
              />
              <h2 className={styles.userName}>{session.user.name}</h2>
            </div>
          )}

          {session && goals && (
            <div className={styles.goals}>
              <h2>Your Goals</h2>
              <ul>
                {goals.map((goal) => (
                  <li key={goal.id}>{goal.name}</li>
                ))}
              </ul>
              <button className={styles.button}>Add Goal</button>
            </div>
          )}

          {!session && goals && (
            <div className={styles.goals}>
              <h2>Featured Goals</h2>
              <ul>
                {goals.map((goal) => (
                  <li key={goal.id}>{goal.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.grid}>
            <a href="/goals" className={styles.card}>
              <h2>Goals</h2>
              <p>Set your fitness targets and track your progress.</p>
            </a>
            <a href="/progress" className={styles.card}>
              <h2>Progress</h2>
              <p>Monitor your workouts and see how you're improving.</p>
            </a>
            <a href="/social" className={styles.card}>
              <h2>Social</h2>
              <p>Connect with friends, share your journey, and stay motivated.</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
        </footer>
      </div>
    </SessionProvider>
  );
}