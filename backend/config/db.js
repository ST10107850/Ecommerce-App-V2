import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.const.js";

export const db = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Failed to connect: ", err.message);
    process.exit(1);
  }
};
