import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not defined");
}

const MONGODB_URI = process.env.MONGODB_URI;

type DbConnectionObject = {
  isConnected?: number;
};

const connection: DbConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    connection.isConnected = conn.connections[0].readyState;
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
}

export default dbConnect;
