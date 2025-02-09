import { useStore } from "@/model";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { WeatherData } from "../types/weather";
import { City, FavoriteCity } from "../types/city";
import { Forecast } from "../types/forecast";

export enum RequestKeys {
    GET_FAVORITE,
    TOGGLE_FAVORITE,
    GET_USER_LOCATION,
    CITIES,
    FORECAST_HOURLY,
    CURRENT_WEATHER,
}

class BaseAPI {
    private async fetch<T>(key: RequestKeys, config: AxiosRequestConfig): Promise<T> {
        const store = useStore.getState().fetch;
        const controller = new AbortController();
        store.cancel_request(key);
        store.start_fetching(key, controller);

        try {
            const response = await axios({
                ...config,
                signal: controller.signal,
            });
            return response as T;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log(`Request ${key} cancelled`);
            } else {
                throw error;
            }
        } finally {
            store.stop_fetching(key);
        }

        return null as T;
    }

    private request<ResponseObject>(
        key: RequestKeys,
        method: Method,
        path = "",
        body?: unknown,
        query?: Record<string, unknown>,
        withCredentials?: boolean,
    ): Promise<AxiosResponse<ResponseObject>> {
        let data;

        if (body) {
            if (body instanceof FormData) data = body;
            else data = JSON.stringify(body);
        }

        const queries = query ?? {};
        queries.u = path;

        const request = this.fetch<ResponseObject>(key, {
            url: "/api/proxy",
            method,
            data,
            params: queries,
            withCredentials,
        }).catch((res) => {
            console.log(res);
            return res;
        });

        return request;
    }

    public currentWeather(lat: number, lon: number) {
        return this.request<WeatherData>(
            RequestKeys.CURRENT_WEATHER,
            "get",
            `/data/2.5/weather`,
            null,
            {
                lat,
                lon,
                units: "metric",
            },
        );
    }
    public forecast(lat: number, lon: number) {
        return this.request<Forecast>(
            RequestKeys.FORECAST_HOURLY,
            "get",
            "/data/2.5/forecast",
            null,
            {
                lat,
                lon,
                units: "metric",
                // cnt,
            },
        );
    }

    public search_city(q: string, limit = 5) {
        return this.request<Array<City>>(RequestKeys.CITIES, "get", "/geo/1.0/direct", null, {
            q,
            limit,
        });
    }

    public async get_user_location() {
        // Выполняем запрос на сервере
        const res = await this.fetch<AxiosResponse<{
            lat: number;
            lon: number;
            status: "success";
        }>>(RequestKeys.GET_USER_LOCATION, {
            url: `http://ip-api.com/json/?fields=status,message,lon,lat`,
        }).catch(() => null);

        return res;
    }

    public async toggle_favorite(lat: number, lon: number) {
        return await this.fetch<
            AxiosResponse<{
                status: "removed" | "added";
            }>
        >(RequestKeys.TOGGLE_FAVORITE, {
            method: "POST",
            url: "/api/favorites/toggle",
            data: {
                lat,
                lon,
            },
            withCredentials: true,
        }).catch(() => null);
    }

    public async get_favorite() {
        return await this.fetch<AxiosResponse<{
            weather: Array<WeatherData>,
            favorites: Array<FavoriteCity>
        }>>(RequestKeys.GET_FAVORITE, {
            method: "GET",
            url: "/api/favorites",
            withCredentials: true,
        }).catch(() => null);
    }
}

const request = new BaseAPI();

export default request;
