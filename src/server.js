import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import  connectDB from "./config/db.js"
import teacherRoutes from "./routes/teacherRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/students", usersRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => res.send("EduHub API Running"));

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

