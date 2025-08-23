import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./routes/products.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow base64 payloads if needed

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error("Mongo error:", e.message));

app.get("/", (_, res) => res.send("API is running"));
app.use("/api/uploads", uploadsRouter);
app.use("/api/products", productsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
