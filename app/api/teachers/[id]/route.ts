import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');

// Helper to get from JSON (Legacy)
const getTeachersLegacy = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;

        // Try DB first
        const dbTeacher = await prisma.teacher.findUnique({
            where: { id: idStr }
        });

        if (dbTeacher) {
            return NextResponse.json(JSON.parse(dbTeacher.data));
        }

        // Fallback: Check Legacy JSON
        const idNum = Number(idStr);
        const legacyTeachers = getTeachersLegacy();
        const legacyTeacher = legacyTeachers.find((t: any) => t.id === idNum);

        if (legacyTeacher) {
            // Migrate to DB automatically
            await prisma.teacher.create({
                data: {
                    id: String(legacyTeacher.id),
                    data: JSON.stringify(legacyTeacher)
                }
            });
            return NextResponse.json(legacyTeacher);
        }

        return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    } catch (error) {
        console.error('Get Teacher Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const body = await request.json();

        // Save/Update in DB
        // Using upsert to handle both existing and migrated records
        await prisma.teacher.upsert({
            where: { id: idStr },
            update: { data: JSON.stringify(body) },
            create: {
                id: idStr,
                data: JSON.stringify(body)
            }
        });

        return NextResponse.json(body);
    } catch (error) {
        console.error('Update Teacher Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;

        // Delete from DB
        await prisma.teacher.delete({
            where: { id: idStr }
        }).catch(() => { }); // Ignore if not found in DB

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Teacher Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
