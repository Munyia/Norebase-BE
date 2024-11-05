import express from "express";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { getLikesCount, incrementLikeCount } from "./controllers/articleControllers.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
connectDB();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


// Rate Limiter for Abuse Prevention
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

//default test route
app.get("/", (req, res) => {
  res.send("NorebaseBETC server is live!");
});

app.route('/api/articles/:articleId/likes')
.get(getLikesCount) // Get Like Count
.post(incrementLikeCount) // Increment Like Count


app.listen(port, () => console.log(`Server running on port ${port}`));