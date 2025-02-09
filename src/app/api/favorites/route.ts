import { API_BASE_URL, API_KEY } from "@/constants/api";
import { WeatherData } from "@/types/weather";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const externalResponse = axios.create({
    baseURL: API_BASE_URL,
    method: "get",
});
export async function GET() {
    const session_id = (await cookies()).get("session_id")?.value;
    console.log(`session_id`, session_id);
    if (!session_id) {
        return NextResponse.json([]);
    }

    try {
        const favorites = await prisma.favorite.findMany({
            where: { session_id: <string>session_id },
            select: { id: true, lon: true, lat: true },
        });

        const data = [];

        for await (const item of favorites) {
            const result = await externalResponse<WeatherData>({
                params: {
                    lat: item.lat,
                    lon: item.lon,
                    appid: API_KEY,
                    units: "metric"
                },
                url: '/data/2.5/weather'
            });
            data.push({...result.data, id: `${item.lat},${item.lon}`});
        }

        return NextResponse.json({
            weather: data,
            favorites,
        });
    } catch (_error) {
        return NextResponse.json({ error: "Failed to fetch favorites" });
    }
}
