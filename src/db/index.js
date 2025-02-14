import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constant.js";

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        // Ensure the environment variable is loaded
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }

        // Build the full MongoDB connection string
        const fullDbUrl = `${process.env.MONGODB_URL}/${DB_NAME}`;
        console.log("Connecting to MongoDB:", fullDbUrl);

        // Connect to MongoDB with options
        const connectionInstance = await mongoose.connect(fullDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: "majority" }  // ✅ Ensures proper write concern
        });

        console.log(`\n✅ MONGO connected! HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MONGODB CONNECTION ERROR:", error);
        process.exit(1);  // Exit process with failure
    }
};

export default connectDB;
