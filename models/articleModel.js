import mongoose from "mongoose";
const articleSchema = new mongoose.Schema({
    _id: String,
    likeCount: { type: Number, default: 0 },
  });

  export const Article = mongoose.model('Article', articleSchema);