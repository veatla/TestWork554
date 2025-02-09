import { NextResponse } from "next/server";

// middleware.ts
export async function middleware() {
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
}
