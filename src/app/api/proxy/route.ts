import { API_BASE_URL, API_KEY } from "@/constants/api";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get("u");
        if (!url || !url.length) {
            return NextResponse.json({ error: "Empty query" }, { status: 500 });
        }
        const queries: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (key === "u") return;
            queries[key] = value;
        });
        queries.appid = API_KEY;

        const externalResponse = await axios({
            url: url,
            baseURL: API_BASE_URL,
            method: "get",
            params: queries,
        });

        const data = (await externalResponse.data) ?? false;

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
