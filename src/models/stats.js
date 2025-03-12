import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
    {
        movement: String,
        measure: String,
        img: String,
        process: String 
    },
    { timestamps: true }
);
const Stats = mongoose.models.Stats || mongoose.model("Stats",StatsSchema);
export default Stats;