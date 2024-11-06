import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    _id: String,
    likeCount: { type: Number, default: 0 },
  });

  export const Likes = mongoose.model('Likes', likeSchema);