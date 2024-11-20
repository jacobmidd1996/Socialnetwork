import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"
    );
    return mongoose.connection;
  } catch (error) {
    console.error("connection error", error);
    throw new Error("DB failed");
  }
};

export default db;
