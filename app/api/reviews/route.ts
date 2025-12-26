import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app/data/reviews.json');

export async function GET() {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const reviews = JSON.parse(fileContent);
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newReview = await request.json();
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const reviews = JSON.parse(fileContent);

        // Add new review to the beginning
        reviews.unshift(newReview);

        fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));

        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }
}
