import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

const getBookingsFromJSON = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

const saveBookingsToJSON = (bookings: any[]) => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2));
};

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();

        // In development, use JSON
        if (process.env.NODE_ENV === 'development') {
            const bookings = getBookingsFromJSON();
            const index = bookings.findIndex((b: any) => b.id === id);

            if (index === -1) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }

            bookings[index] = { ...bookings[index], ...body };
            saveBookingsToJSON(bookings);

            return NextResponse.json(bookings[index]);
        }

        // In production, use Prisma
        const prisma = (await import('@/lib/prisma')).default;
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: body
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    return PUT(request, { params });
}
