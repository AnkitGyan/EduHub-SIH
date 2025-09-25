import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import  connectDB from "./config/db.js";
import communityRoutes from "./routes/communityRoutes.js";
import globalQuizRoutes from "./routes/globalQuizRoutes.js";
import questionRoutes from './routes/questionRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/users", userRoutes);
app.use("./api/admin", adminRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/admin/global-quizzes", globalQuizRoutes);
app.use('/api/questions', questionRoutes);
app.get("/", (req, res) => res.send("EduHub API Running"));

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

