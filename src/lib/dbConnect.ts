// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('❌ MONGODB_URI not defined in environment');

// Define a global variable for mongoose cache
const globalForMongoose = global as typeof global & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

// Ensure `cached` is always initialized
const cached =
  globalForMongoose.mongoose ||
  (globalForMongoose.mongoose = { conn: null, promise: null });

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
