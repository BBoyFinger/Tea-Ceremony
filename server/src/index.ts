import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import connectDb from "./config/db";
import router from "./routes";

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Define the port number from environment variable or default to 8081
const PORT: number = parseInt(process.env.PORT || "8081", 10);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());


app.use("/api", router)

connectDb().then(() => {
  // Start the server and log the URL
  app.listen(PORT, () => {
    console.log("Connected to DB Successfully!");
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
