import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";
import chatSocket from "./sockets/chatSocket.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/chat", chatRoutes);

// error handler
app.use(errorHandler);

// socket.io
chatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
