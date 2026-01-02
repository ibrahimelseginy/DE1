import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to our "database" file
const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

// Helper to read bookings
const getBookings = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

// Helper to save bookings
const saveBookings = (bookings: any[]) => {
    // Ensure directory exists
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2));
};

export async function GET() {
    const bookings = getBookings();
    return NextResponse.json(bookings);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const bookings = getBookings();

        const newBooking = {
            id: Date.now(), // Simple ID generation
            submittedAt: new Date().toISOString(),
            status: 'قيد الانتظار', // Default status
            ...body
        };

        bookings.unshift(newBooking); // Add to top
        saveBookings(bookings);

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }
}
