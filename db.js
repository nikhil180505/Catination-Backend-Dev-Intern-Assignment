const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected:", mongoose.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    } 
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

module.exports = connectDB;
