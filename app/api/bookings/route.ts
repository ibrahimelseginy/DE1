import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

// Helper for Legacy Bookings
const getBookingsLegacy = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

export async function GET() {
    try {
        let bookings = await prisma.booking.findMany({
            orderBy: { submittedAt: 'desc' }
        });

        // Migration logic: If DB is empty, try to load from JSON
        if (bookings.length === 0) {
            const legacyBookings = getBookingsLegacy();
            if (legacyBookings.length > 0) {
                console.log(`Migrating ${legacyBookings.length} legacy bookings...`);
                for (const b of legacyBookings) {
                    await prisma.booking.create({
                        data: {
                            name: b.name || '',
                            phone: b.phone || '',
                            teacherId: String(b.teacherId || '0'),
                            teacherName: b.teacher || b.teacherName || 'Unknown',
                            goal: b.goal || '',
                            level: b.level || '',
                            timeline: b.timeline || '',
                            days: JSON.stringify(b.days || []),
                            times: JSON.stringify(b.times || []),
                            source: b.source || 'Legacy',
                            status: b.status || 'pending',
                            submittedAt: b.submittedAt ? new Date(b.submittedAt) : new Date()
                        }
                    }).catch((e: any) => console.error('Skipped bad booking:', e));
                }
                // Fetch again after migration
                bookings = await prisma.booking.findMany({
                    orderBy: { submittedAt: 'desc' }
                });
            }
        }

        // Parse JSON fields back to arrays
        const formattedBookings = bookings.map((b: any) => ({
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
