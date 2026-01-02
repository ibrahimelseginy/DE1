import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'teachers.json');

// Helper: Read Teachers
const getTeachers = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

// Helper: Save Teachers
const saveTeachers = (teachers: any[]) => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(teachers, null, 2));
};

// GET: List all teachers
export async function GET() {
    return NextResponse.json(getTeachers());
}

// POST: Add a new teacher
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const teachers = getTeachers();

        const newTeacher = {
            id: Date.now(), // Use timestamp as ID
            ...body
        };

        teachers.push(newTeacher);
        saveTeachers(teachers);

        return NextResponse.json(newTeacher, { status: 201 });
    } catch (error) {
        console.error('Error saving teacher:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

// PUT: Update a teacher (We'll use a separate route [id] for cleaner REST, but for now we can handle basic updates here if needed, or stick to POST/GET first)
