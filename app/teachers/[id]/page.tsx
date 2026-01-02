import React from 'react';
import BookingClient from './BookingClient';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

// Helper to get from JSON (Legacy fallback)
const getTeachersLegacy = () => {
    const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

async function getTeacher(id: string) {
    // 1. Try DB
    try {
        const dbTeacher = await prisma.teacher.findUnique({
            where: { id }
        });

        if (dbTeacher) {
            return JSON.parse(dbTeacher.data);
        }
    } catch (e) {
        console.error('DB Fetch Error:', e);
    }

    // 2. Fallback to Legacy JSON
    const teachers = getTeachersLegacy();
    return teachers.find((t: any) => String(t.id) === id);
}

// Enable ISR - Revalidate every 5 minutes
export const revalidate = 300;

export default async function TeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const teacher = await getTeacher(id);

    return <BookingClient teacher={teacher} />;
}
