import request from "@/api/base";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.clone();
    const response = await request.get_user_location();
    if (response?.data) {
        const { lat, lon } = response?.data;
        if (lat && lon) {
            url.pathname = `/city/${lat},${lon}`;
        }
    }
    return NextResponse.redirect(url);
}
