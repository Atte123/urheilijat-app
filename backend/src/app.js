import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import athleteRoutes from "./routes/athleteRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/athletes", athleteRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    ...(err.details ? { details: err.details } : {}),
  });
});

export default app;
