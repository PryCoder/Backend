import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        console.log("MongoDB URL:", process.env.MONGODB_URL);

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`); // Fixed
        console.log(`\nMONGO connected !! HOST :: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MONGODB ERROR : ERR::`, error);
        process.exit(1);
    }
};

export default connectDB;
