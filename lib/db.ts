import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Extend globalThis to include mongoose cache
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (global.mongoose.conn) return global.mongoose.conn;
  
  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI!).then((conn) => conn.connection);
  }
  
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
