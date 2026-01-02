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
    fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2));
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = Number(idStr);
        const body = await request.json();
        const bookings = getBookings();

        const index = bookings.findIndex((b: any) => b.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Update booking
        bookings[index] = { ...bookings[index], ...body };
        saveBookings(bookings);

        return NextResponse.json(bookings[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
