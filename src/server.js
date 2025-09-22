import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import  connectDB from "./config/db.js"
import teacherRoutes from "./routes/teacherRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/users", userRoutes);
app.use("./api/admin", adminRoutes)
app.get("/", (req, res) => res.send("EduHub API Running"));

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

