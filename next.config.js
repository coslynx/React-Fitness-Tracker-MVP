/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const { withAuth } = require('next-auth/react');
const { GoogleProvider } = require('next-auth/providers/google');

module.exports = withSentryConfig(
  withAuth({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['lh3.googleusercontent.com'] // Allow loading images from Google profile pictures
    },
    experimental: {
      appDir: true // Enable the new 'app' directory for Next.js 13+ routing
    },
    // NextAuth.js configuration
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
      // ... other providers (e.g., Facebook, GitHub, etc.)
    ],
    // Database adapter (MongoDB Atlas)
    adapter: {
      mongodb: {
        database: 'fitness-tracker',
        url: process.env.MONGODB_URI
      }
    },
    // Pages where user authentication is required
    pages: {
      signIn: '/auth/login',
      signOut: '/auth/logout',
      error: '/auth/error'
    },
    // Session storage strategy
    session: {
      strategy: 'jwt', 
      // ... other session settings 
    },
    // Secret key for authentication
    secret: process.env.NEXTAUTH_SECRET
  }),
  {
    // Sentry configuration
    silent: true, // Don't log Sentry events in the console
    // ... other Sentry settings 
  }
);