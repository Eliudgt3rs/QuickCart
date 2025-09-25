import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Address from "@/models/address";
import { NextResponse } from "next/server";
import authSeller from '@/lib/authSeller';


export async function POST(request) { 
    try {

        const { userId } = getAuth(request);
        const { address } = await request.json();
        await connectDB();

        const newAddress = await Address.create({...address, userId});


        return NextResponse.json({ success: true, message: "Address added successfully", newAddress }, { status: 201 });
     } catch (error) {
        console.error("Error adding address:", error.message);
        return NextResponse.json({ success: false, message: "Please Login" });
    }
}