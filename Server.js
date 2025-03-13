import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import mainRouter from './routes/indexRouting.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/', mainRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("DB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to She Leads Finance API");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
