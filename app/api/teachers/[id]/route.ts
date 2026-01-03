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
        const idNum = Number(idStr);

        // In development, use JSON directly
        if (process.env.NODE_ENV === 'development') {
            const legacyTeachers = getTeachersLegacy();
            const teacher = legacyTeachers.find((t: any) => t.id === idNum);

            if (teacher) {
                return NextResponse.json(teacher);
            }

            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }

        // In production, try DB first
        const dbTeacher = await prisma.teacher.findUnique({
            where: { id: idStr }
        });

        if (dbTeacher) {
            return NextResponse.json(JSON.parse(dbTeacher.data));
        }

        // Fallback: Check Legacy JSON
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
        const idNum = Number(idStr);
        const body = await request.json();

        // In development, save to JSON
        if (process.env.NODE_ENV === 'development') {
            const teachers = getTeachersLegacy();
            const index = teachers.findIndex((t: any) => t.id === idNum);

            if (index === -1) {
                return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
            }

            teachers[index] = { ...teachers[index], ...body, id: idNum };
            fs.writeFileSync(dataFilePath, JSON.stringify(teachers, null, 2));

            return NextResponse.json(teachers[index]);
        }

        // In production, save/Update in DB
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
        const idNum = Number(idStr);

        // In development, delete from JSON
        if (process.env.NODE_ENV === 'development') {
            const teachers = getTeachersLegacy();
            const newTeachers = teachers.filter((t: any) => t.id !== idNum);

            if (teachers.length === newTeachers.length) {
                return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
            }

            fs.writeFileSync(dataFilePath, JSON.stringify(newTeachers, null, 2));
            return NextResponse.json({ success: true });
        }

        // Delete from DB (Production)
        await prisma.teacher.delete({
            where: { id: idStr }
        }).catch(() => { }); // Ignore if not found in DB

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Teacher Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
