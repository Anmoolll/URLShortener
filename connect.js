import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1); // fail fast
    }
}

export default connectToDB;