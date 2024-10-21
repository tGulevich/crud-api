import express from "express";
import dotenv from "dotenv";
import { getUsers } from "./usersController";

dotenv.config();

export const app = express();
const PORT = parseInt(process.env.PORT || "8080");

app.use(express.json());

// Get all users
app.get("/api/users", (_, res) => {
  res.status(200).json(getUsers());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
