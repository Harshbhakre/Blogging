import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    require: true,
    type: String,
  },
  body: {
    require: true,
    type: String,
  },
  userId: {
    require: true,
    type: String,
  }
},{    timestamps:true
  });

export const BlogModel = mongoose.model("blogs", blogSchema);
