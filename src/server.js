import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/simulations", simulationRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/social", socialRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
