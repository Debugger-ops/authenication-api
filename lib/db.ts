import mongoose, { Connection } from 'mongoose';

// Extend the global object type to include mongoose
declare global {
  var mongoose: { conn: Connection | null, promise: Promise<Connection> | null };
}

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;  // Return the cached connection if it exists
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Ensure the promise resolves to the Connection object directly
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance.connection; // Explicitly return the connection object
    });
  }

  // Await the promise and store the Connection type in cached.conn
  cached.conn = await cached.promise;
  return cached.conn;  // Return the Connection object
}

export default dbConnect;
