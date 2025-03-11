import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        img: String,
        message: String 
    },
    { timestamps: true }
);
const Blogs = mongoose.models.Blogs || mongoose.model("Blogs",BlogsSchema);
export default Blogs;