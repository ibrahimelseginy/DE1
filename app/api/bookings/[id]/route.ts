import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = Number(idStr);
        const body = await request.json();

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: body
        });

        // Format for response if needed (handle JSON parsing for days/times if we were returning them, but for status update it matters little)
        // But let's return it consistently
        const formattedBooking = {
            ...updatedBooking,
            days: updatedBooking.days && updatedBooking.days.startsWith('[') ? JSON.parse(updatedBooking.days) : updatedBooking.days.split(','),
            times: updatedBooking.times && updatedBooking.times.startsWith('[') ? JSON.parse(updatedBooking.times) : updatedBooking.times.split(',')
        };

        return NextResponse.json(formattedBooking);
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
