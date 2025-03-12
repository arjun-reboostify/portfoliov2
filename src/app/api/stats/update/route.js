import connectToDB from "@/database";
import Stats from "@/models/stats";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function PUT(req) {
    try {
        await connectToDB();
        const extractData = await req.json();
        const { _id, movement, measure, img, process } = extractData;

        const updateData = await Stats.findByIdAndUpdate(
            {
                _id: _id
            },
            { movement, measure, img, process },
            { new: true }
        );

        if (updateData) {
            return NextResponse.json({
                success: true,
                message: "Stats updated successfully"
            });
        } else { 
            return NextResponse.json({
                success: false,
                message: "Something went wrong. Please try again"
            });
        } 

    } catch (e) {
        console.log(e);
        
        return NextResponse.json({
            success: false,
            message: "Something went wrong. Please try again"
        });
    }
}