import mongoose from "mongoose";

export default async function connectToDB(){
    try {
        await mongoose.connect(
            "mongodb+srv://admin:unidie@cluster0.60bar.mongodb.net/portfolio"
        );
        console.log('Database connected successfully');
    } catch (e) {
        console.log(e);
    }
}