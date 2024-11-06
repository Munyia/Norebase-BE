import { Likes } from "../models/likeModel.js";

export const getLikesCount = async (req, res) => {
    const { articleId } = req.params;
  
    const likes = await Likes.findById(articleId);
    if (!likes) return res.status(404).json({ error: "Article not found" });
  
    res.json({ likes: likes.likeCount });
  }

export const incrementLikeCount = async (req, res) => {
    const { articleId } = req.params;
  
    const likes = await Likes.findByIdAndUpdate(
      articleId,
      { $inc: { likeCount: 1 } },
      { new: true, upsert: true }
    );
  
    res.json({ likes: likes.likeCount });
  }