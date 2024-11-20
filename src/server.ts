import express from "express";
import db from "./config/connection.js";
import { userRoutes } from "./routes/userRoutes.js";
import thoughtRoutes from "./routes/thoughtRoutes.js";

await db();
const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// 673d250cae6020e226da843a
