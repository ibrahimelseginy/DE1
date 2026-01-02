import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

const getBookings = () => {
    if (!fs.existsSync(dataFilePath)) {
        console.log('Bookings file does not exist, creating...');
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFilePath, '[]');
        return [];
    }
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        console.error('Error reading bookings:', e);
        return [];
    }
};

const saveBookings = (bookings: any[]) => {
    try {
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2));
        console.log('Bookings saved successfully');
    } catch (error) {
        console.error('Error saving bookings:', error);
        throw error;
    }
};

export async function GET() {
    try {
        const bookings = getBookings();
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log('=== Booking POST Request ===');
        const body = await request.json();
        console.log('Request body:', JSON.stringify(body, null, 2));

        const bookings = getBookings();
        console.log('Current bookings count:', bookings.length);

        const newBooking = {
            id: bookings.length > 0 ? Math.max(...bookings.map((b: any) => b.id || 0)) + 1 : 1,
            ...body,
            createdAt: new Date().toISOString()
        };

        console.log('New booking created:', JSON.stringify(newBooking, null, 2));
        bookings.push(newBooking);

        saveBookings(bookings);
        console.log('=== Booking saved successfully ===');

        return NextResponse.json(newBooking, { status: 200 });
    } catch (error) {
        console.error('=== Booking POST Error ===');
        console.error('Error:', error);
        console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');

        return NextResponse.json({
            error: 'Failed to create booking',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
