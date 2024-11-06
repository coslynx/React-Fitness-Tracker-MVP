import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "next-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter({
    db: process.env.MONGODB_URI
      ? new MongoClient(process.env.MONGODB_URI).db()
      : new MongoClient("mongodb://localhost:27017").db("fitness-tracker"),
  }),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});