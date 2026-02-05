import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "";

type dbConnectionObject = {
  isConnected?: number;
};

const connection: dbConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    connection.isConnected = conn.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

export default dbConnect;
