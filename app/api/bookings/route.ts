import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { submittedAt: 'desc' }
        });

        // Parse JSON fields back to arrays
        const formattedBookings = bookings.map(b => ({
            ...b,
            days: b.days && (b.days.startsWith('[') || b.days.includes(','))
                ? (b.days.startsWith('[') ? JSON.parse(b.days) : b.days.split(','))
                : [],
            times: b.times && (b.times.startsWith('[') || b.times.includes(','))
                ? (b.times.startsWith('[') ? JSON.parse(b.times) : b.times.split(','))
                : []
        }));

        return NextResponse.json(formattedBookings);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name, phone, teacherId, teacherName, goal, level, timeline, days, times, source, teacher
        } = body;

        console.log('Received booking for:', teacherName || teacher);

        const newBooking = await prisma.booking.create({
            data: {
                name,
                phone,
                teacherId: String(teacherId),
                teacherName: teacher || teacherName || 'Unknown',
                goal,
                level,
                timeline,
                days: JSON.stringify(days || []),
                times: JSON.stringify(times || []),
                source: source || 'Website',
                status: 'قيد الانتظار'
            }
        });

        console.log('Booking created in DB with ID:', newBooking.id);
        return NextResponse.json(newBooking, { status: 200 });
    } catch (error) {
        console.error('Booking Error:', error);
        return NextResponse.json({
            error: 'Failed to create booking',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
