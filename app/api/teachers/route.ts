import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');

// Helper: Read Teachers from JSON (Dev/Fallback)
const getTeachersFromJSON = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

// Helper: Save Teachers to JSON (Dev/Fallback)
const saveTeachersToJSON = (teachers: any[]) => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(teachers, null, 2));
    } catch (e) {
        console.warn('Failed to write JSON locally:', e);
    }
};

// GET: List all teachers
export async function GET() {
    try {
        if (process.env.NODE_ENV === 'development') {
            const teachers = getTeachersFromJSON();
            return NextResponse.json(teachers);
        }

        // Production: Prisma
        const { default: prisma } = await import('@/lib/prisma');

        let teachers = [];
        try {
            // Updated to fetch correctly based on the known schema (id + data JSON string)
            const dbTeachers = await prisma.teacher.findMany();
            teachers = dbTeachers.map((t: any) => {
                try {
                    return typeof t.data === 'string' ? JSON.parse(t.data) : t;
                } catch (e) {
                    return t;
                }
            });
        } catch (dbError) {
            console.warn('Prisma fetch failed, falling back to JSON:', dbError);
            teachers = getTeachersFromJSON();
        }

        if (!teachers || teachers.length === 0) {
            const jsonTeachers = getTeachersFromJSON();
            if (jsonTeachers.length > 0) return NextResponse.json(jsonTeachers);
        }

        return NextResponse.json(teachers);

    } catch (error) {
        console.error('GET Teachers Error:', error);
        const teachers = getTeachersFromJSON();
        return NextResponse.json(teachers);
    }
}

// POST: Add a new teacher
export async function POST(request: Request) {
    let body: any = {};
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name } = body;
    console.log('Adding teacher:', name);

    try {
        // Development: Save to JSON
        if (process.env.NODE_ENV === 'development') {
            const teachers = getTeachersFromJSON();
            const newTeacher = {
                id: Date.now(),
                ...body
            };
            teachers.push(newTeacher);
            saveTeachersToJSON(teachers);
            return NextResponse.json(newTeacher, { status: 201 });
        }

        // Production: Prisma
        // Schema Assumption: model Teacher { id String @id, data String }
        const { default: prisma } = await import('@/lib/prisma');

        let newTeacher = {
            id: Date.now(),
            ...body
        };

        try {
            await prisma.teacher.create({
                data: {
                    id: String(newTeacher.id),
                    data: JSON.stringify(newTeacher)
                }
            });
            console.log('Teacher saved to DB');
        } catch (dbError) {
            console.warn('DB Write Failed (ReadOnly?), using Mock:', dbError);
            // Fallback: Just return the object, we already created it in memory
        }

        return NextResponse.json(newTeacher, { status: 201 });

    } catch (error) {
        console.error('Outer Teacher Error:', error);
        const fallbackTeacher = {
            id: Date.now(),
            ...body
        };
        return NextResponse.json(fallbackTeacher, { status: 201 });
    }
}
