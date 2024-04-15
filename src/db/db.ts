import mongoose from "mongoose";

export async function connectDb() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
        connection.connection.on("error", (error) => {
            console.error("❌ Error in MongoDB connection");
        });
        connection.connection.on("disconnected", () => {
            console.log("❌ Disconnected from MongoDB");
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB");
    }
}
