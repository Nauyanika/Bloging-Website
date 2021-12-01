const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    blogTitle: String,
    blogContent: String,
  },
  { timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
