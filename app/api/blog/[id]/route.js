import { NextResponse } from 'next/server';
import { blogs } from '@/data/blogs';

export async function GET(request, { params }) {
    const blog = blogs.find(b => b.id === parseInt(params.id));
    if (blog) {
        return NextResponse.json(blog);
    } else {
        return new Response('Blog not found', { status: 404 });
    }
}
