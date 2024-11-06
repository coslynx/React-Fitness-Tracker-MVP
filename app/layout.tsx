'use client';

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { Metadata } from "next";
import { useStore } from "../lib/store";
import "./globals.css"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { goals } = useStore();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Tracker</title>
        <link href="/favicon.ico" rel="icon" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-100 font-sans">
        <SessionProvider>
          <header className="bg-white shadow-md px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="text-lg font-bold text-gray-800">
                Fitness Tracker
              </a>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li>
                    <a href="/goals" className="hover:underline">
                      Goals
                    </a>
                  </li>
                  <li>
                    <a href="/progress" className="hover:underline">
                      Progress
                    </a>
                  </li>
                  <li>
                    <a href="/social" className="hover:underline">
                      Social
                    </a>
                  </li>
                  <li>
                    <SessionProvider session={session as Session}>
                      {session && (
                        <div className="flex items-center">
                          <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="ml-2 text-gray-800">
                            {session.user.name}
                          </span>
                        </div>
                      )}
                    </SessionProvider>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="container mx-auto mt-10">
            {children}
          </main>
          <footer className="bg-gray-200 text-center py-4 mt-10">
            <p className="text-gray-600 text-sm">
              &copy; 2024 Fitness Tracker. All rights reserved.
            </p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

export function metadata(): Metadata {
  return {
    title: "Fitness Tracker",
    description: "Track your fitness progress, set goals, and stay motivated.",
  };
}