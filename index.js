import express from "express";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import redis from "redis";
import rateLimit from "express-rate-limit";
import { Article } from "./models/articleModel.js";

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

app.get("/", (req, res) => {
  res.send("NorebaseBETC server is live!");
});

// Redis Setup for Caching
const redisClient = redis.createClient();

// Rate Limiter for Abuse Prevention
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Get Like Count (with Caching)
app.get("/api/articles/:articleId/likes", async (req, res) => {
  const { articleId } = req.params;

  // Check Redis Cache
  redisClient.get(articleId, async (err, cachedLikes) => {
    if (cachedLikes) {
      return res.json({ likes: parseInt(cachedLikes) });
    } else {
      const article = await Article.findById(articleId);
      if (!article) return res.status(404).json({ error: "Article not found" });

      // Cache the like count
      redisClient.set(articleId, article.likeCount);
      res.json({ likes: article.likeCount });
    }
  });
});

// Increment Like Count
app.post("/api/articles/:articleId/likes", async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findByIdAndUpdate(
    articleId,
    { $inc: { likeCount: 1 } },
    { new: true, upsert: true }
  );

  redisClient.set(articleId, article.likeCount);
  res.json({ likes: article.likeCount });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
