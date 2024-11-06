'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth].ts';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('fitness-tracker'); 

    const goals = await db.collection('goals').find({ userId: session.user.id }).toArray();

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('fitness-tracker');

    const newGoal = await req.json();

    const { insertedId } = await db.collection('goals').insertOne({ ...newGoal, userId: session.user.id });

    res.status(201).json({ message: 'Goal created successfully', goalId: insertedId.toString() });
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const goalId = req.query.goalId as string;
    if (!goalId) {
      return res.status(400).json({ error: 'Missing goal ID' });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('fitness-tracker');

    const updatedGoal = await req.json();

    const result = await db.collection('goals').updateOne({ _id: new ObjectId(goalId), userId: session.user.id }, { $set: updatedGoal });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal updated successfully' });
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const goalId = req.query.goalId as string;
    if (!goalId) {
      return res.status(400).json({ error: 'Missing goal ID' });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('fitness-tracker');

    const result = await db.collection('goals').deleteOne({ _id: new ObjectId(goalId), userId: session.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
}

// ... other API endpoints for activities, etc.