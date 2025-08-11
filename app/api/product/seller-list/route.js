import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";


export async function GET(request) { 
    try {
        const { userId } = getAuth(request);
        
        const isSeller = authSeller(userId);

        if (!isSeller) { 
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }


        await connectDB();
        // Fetch seller products from the database
        const products = await Product.find({});
        return NextResponse.json({ success: true, products });
    } catch (error) { 
        console.error("Error fetching seller products:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
     }
}

