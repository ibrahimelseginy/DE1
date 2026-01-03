import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'bookings.json');

// Helper for JSON Bookings
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

export async function GET() {
    try {
        // In development, use JSON
        if (process.env.NODE_ENV === 'development') {
            const bookings = getBookingsFromJSON();
            return NextResponse.json(bookings, {
                headers: {
                    'Cache-Control': 'private, max-age=60, stale-while-revalidate=120'
                }
            });
        }

        // In production, use Prisma
        const prisma = (await import('@/lib/prisma')).default;
        let bookings = await prisma.booking.findMany({
            orderBy: { submittedAt: 'desc' }
        });

        // Migration logic: If DB is empty, try to load from JSON
        if (bookings.length === 0) {
            const legacyBookings = getBookingsFromJSON();
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

        return NextResponse.json(formattedBookings, {
            headers: {
                'Cache-Control': 'private, max-age=60, stale-while-revalidate=120'
            }
        });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    let body: any = {};

    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const {
        name, phone, teacherId, teacherName, goal, level, timeline, days, times, source, teacher
    } = body;

    console.log('Received booking for details:', { name, teacherName });

    try {
        // In development, save to JSON
        if (process.env.NODE_ENV === 'development') {
            const bookings = getBookingsFromJSON();
            const newBooking = {
                id: Date.now(),
                name,
                phone,
                teacherId: String(teacherId),
                teacherName: teacher || teacherName || 'Unknown',
                goal,
                level,
                timeline,
                days: days || [],
                times: times || [],
                source: source || 'Website',
                status: 'قيد الانتظار',
                submittedAt: new Date().toISOString()
            };

            bookings.unshift(newBooking); // Add to beginning
            saveBookingsToJSON(bookings);

            console.log('Booking saved to JSON with ID:', newBooking.id);
            return NextResponse.json(newBooking, { status: 200 });
        }

        // In production, save to Prisma
        const prisma = (await import('@/lib/prisma')).default;

        let newBooking;
        try {
            newBooking = await prisma.booking.create({
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
        } catch (dbError) {
            console.warn('Database write failed, falling back:', dbError);

            newBooking = {
                id: Date.now(),
                name,
                phone,
                teacherId: String(teacherId),
                teacherName: teacher || teacherName || 'Unknown',
                goal,
                level,
                timeline,
                days: days || [],
                times: times || [],
                source: source || 'Website',
                status: 'قيد الانتظار (Mock)',
                submittedAt: new Date().toISOString()
            };
        }

        return NextResponse.json(newBooking, { status: 200 });

    } catch (error) {
        console.error('Outer Booking Error:', error);

        // Final fallback using the parsed body
        const fallbackBooking = {
            id: Date.now(),
            name: body.name || 'Unknown',
            phone: body.phone,
            teacherId: String(body.teacherId),
            teacherName: body.teacher || body.teacherName || 'Unknown',
            goal: body.goal,
            level: body.level,
            timeline: body.timeline,
            days: body.days || [],
            times: body.times || [],
            source: body.source || 'Website',
            status: 'قيد الانتظار (Error Fallback)',
            submittedAt: new Date().toISOString()
        };

        return NextResponse.json(fallbackBooking, { status: 200 });
    }
}
