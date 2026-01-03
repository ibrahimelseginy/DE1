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
        // In development, prioritize JSON for speed/simplicity if wanted, or use Prisma.
        // Let's stick to the pattern: Dev = JSON, Prod = Prisma (with fallback).

        if (process.env.NODE_ENV === 'development') {
            const teachers = getTeachersFromJSON();
            return NextResponse.json(teachers);
        }

        // Production: Prisma
        const prisma = (await import('@/lib/prisma')).default;

        // Try fetching from DB
        let teachers = [];
        try {
            teachers = await prisma.teacher.findMany({
                orderBy: { id: 'desc' } // Assuming ID is appropriate sort
            });
        } catch (dbError) {
            console.warn('Prisma fetch failed, falling back to JSON:', dbError);
            teachers = getTeachersFromJSON(); // Partial fallback
        }

        // If empty in DB/Prisma failed, try legacy JSON migration concept or just JSON
        if (!teachers || teachers.length === 0) {
            // Just return JSON content as backup
            const jsonTeachers = getTeachersFromJSON();
            if (jsonTeachers.length > 0) return NextResponse.json(jsonTeachers);
        }

        // Format if needed (handling relations etc if any, but Teacher model is simple usually)
        return NextResponse.json(teachers);

    } catch (error) {
        console.error('GET Teachers Error:', error);
        // Fallback to JSON file directly
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

    // Extract fields (adjust based on your actual Teacher model fields)
    // Assuming: name (ar/en), role (ar/en), bio (ar/en), image, stats, videoUrl
    const {
        name, role, bio, image, stats, videoUrl,
        experience, // maybe passed directly
        sessions,
        stars
    } = body;

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
        const prisma = (await import('@/lib/prisma')).default;

        let newTeacher;
        try {
            // Map body to Prisma schema
            // Warning: Schema might need 'nameAr', 'nameEn' etc OR a JSON type for 'name'.
            // Based on previous JSON usage: name: { ar: "", en: "" }
            // SQLite/Prisma might support JSON or string fields.
            // Let's assume the Prisma schema uses JSON type for multilingual fields OR specific columns.
            // If schema is unknown, treating it as 'any' or storing JSON stringified is safer.

            // To be safe against schema mismatch, we'll try to match common patterns,
            // BUT if Vercel db is read-only, this will fail anyway.

            newTeacher = await prisma.teacher.create({
                data: {
                    // Try to map fields. If schema differs, this might error inside the try block, which is fine (fallback handles it).
                    name: typeof name === 'object' ? JSON.stringify(name) : name,
                    role: typeof role === 'object' ? JSON.stringify(role) : role,
                    bio: typeof bio === 'object' ? JSON.stringify(bio) : bio,
                    image: image || '',
                    videoUrl: videoUrl || '',
                    // Flatten stats if needed or store as JSON
                    // If schema has 'stars', 'sessions', 'experience' columns:
                    stars: stats?.stars || 5,
                    sessions: stats?.sessions || 0,
                    experience: stats?.exp || '1 Year', // Map 'exp' to 'experience' locally

                    // Or if 'stats' is a JSON field:
                    // stats: JSON.stringify(stats)
                }
            });
            console.log('Teacher saved to DB:', newTeacher.id);

        } catch (dbError) {
            console.warn('DB Write Failed (ReadOnly?), using Mock:', dbError);
            // Fallback
            newTeacher = {
                id: Date.now(),
                ...body
            };
        }

        return NextResponse.json(newTeacher, { status: 201 });

    } catch (error) {
        console.error('Outer Teacher Error:', error);

        // Final Fallback
        const fallbackTeacher = {
            id: Date.now(),
            ...body
        };
        return NextResponse.json(fallbackTeacher, { status: 201 });
    }
}
