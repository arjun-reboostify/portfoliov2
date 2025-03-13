import mongoose from "mongoose";

const CoursesSchema = new mongoose.Schema(
    {
        category: String,
        title: String,
        concept: String,
        videolink: String,
        content: String,
        keywords : String,
        img: String,
    },
    { timestamps: true }
);
const Courses = mongoose.models.Courses || mongoose.model("Courses",CoursesSchema);
export default Courses;