import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "healthy", service: "web-orchestration" });
});

app.get("/api/example", (_req, res) => {
  res.json({ message: "Hello from BFF layer!" });
});

app.listen(PORT, () => {
  console.log(`Web Orchestration (BFF) running on port ${PORT}`);
});
