import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');

const getTeachers = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

const saveTeachers = (teachers: any[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(teachers, null, 2));
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = Number(idStr);
        const teachers = getTeachers();
        const teacher = teachers.find((t: any) => t.id === id);

        if (!teacher) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }
        return NextResponse.json(teacher);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = Number(idStr);
        const body = await request.json();
        const teachers = getTeachers();

        const index = teachers.findIndex((t: any) => t.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }

        // Update preserving ID
        teachers[index] = { ...teachers[index], ...body, id };
        saveTeachers(teachers);

        return NextResponse.json(teachers[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: idStr } = await params;
        const id = Number(idStr);
        let teachers = getTeachers();

        const initialLength = teachers.length;
        teachers = teachers.filter((t: any) => t.id !== id);

        if (teachers.length === initialLength) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }

        saveTeachers(teachers);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
