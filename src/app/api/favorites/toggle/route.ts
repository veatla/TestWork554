import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { lat, lon } = await request.json();

    let session_id = (await cookies()).get("session_id")?.value;

    if (!session_id) {
        session_id = Math.random().toString(36).substring(2) + Date.now().toString(36);
        (await cookies()).set("session_id", session_id, {
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
    }

    try {
        const is_exists = await prisma.favorite.findFirst({
            where: { id: `${lat},${lon}`, session_id },
            select: {
                id: true,
            },
        });
        if (!is_exists) {
            await prisma.favorite.create({
                data: {
                    session_id,
                    lat: lat,
                    lon: lon,
                    id: `${lat},${lon}`,
                },
            });
            return NextResponse.json({ status: "added" });
        } else {
            await prisma.favorite.delete({
                where: {
                    session_id,
                    id: `${lat},${lon}`,
                },
            });
            return NextResponse.json({ status: "removed" });
        }
    } catch (_error) {
        return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
    }
}
