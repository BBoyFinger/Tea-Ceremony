import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

// middleware to parse JSON change to use body Parse

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


