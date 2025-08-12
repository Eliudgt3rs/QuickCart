
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";


export async function GET(request) { 
    try {
        

        await connectDB();
        // Fetch seller products from the database
        const products = await Product.find({});
        return NextResponse.json({ success: true, products });
    } catch (error) { 
        console.error("Error fetching seller products:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
     }
}

