import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

const getBookings = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

const saveBookings = (bookings: any[]) => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2));
};

export async function GET() {
    try {
        const bookings = getBookings();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const bookings = getBookings();

        const newBooking = {
            id: bookings.length > 0 ? Math.max(...bookings.map((b: any) => b.id || 0)) + 1 : 1,
            ...body,
            createdAt: new Date().toISOString()
        };

        bookings.push(newBooking);
        saveBookings(bookings);

        return NextResponse.json(newBooking);
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
