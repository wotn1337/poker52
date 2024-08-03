import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    cachedConnection = cnx.connection;
    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default dbConnect;
