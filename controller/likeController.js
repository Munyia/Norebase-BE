import { Article } from "../models/articleModel.js";

export const getLikesCount = async (req, res) => {
    const { articleId } = req.params;
  
    const article = await Article.findById(articleId);
    if (!article) return res.status(404).json({ error: "Article not found" });
  
    res.json({ likes: article.likeCount });
  }

export const incrementLikeCount = async (req, res) => {
    const { articleId } = req.params;
  
    const article = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { likeCount: 1 } },
      { new: true, upsert: true }
    );
  
    res.json({ likes: article.likeCount });
  }