"use client";

import { RequestKeys } from "@/api/base";
import { AppStore, useStore } from "@/model";
import { useEffect } from "react";
import ForecastHourly from "./forecast";
import WeatherAdditional from "./weather-additional";
import { parse_coords } from "@/utils/parse-coords";
import Loader from "./loader";

const currentWeatherKey = RequestKeys.CURRENT_WEATHER;

const selector = {
    weather: (id?: string) => (store: AppStore) => id ? store.weather.weather.entities[id] : null,
    in_favorite: (id?: string) => (store: AppStore) =>
        id ? store.cities.favorites.ids.includes(id) : false,
};

const Weather: React.FC<{
    id?: string;
}> = ({ id }) => {
    const weather_fetching = useStore((store) => store.fetch.fetching[currentWeatherKey]);
    const forecast_fetching = useStore(
        (store) => store.fetch.fetching[RequestKeys.FORECAST_HOURLY],
    );
    const weather = useStore(selector.weather(id));
    const in_favorite = useStore(selector.in_favorite(id));
    const load_city = useStore((store) => store.weather.load_weather);
    const load_forecast = useStore((store) => store.weather.load_forecast);
    const toggle_favorite = useStore((store) => store.cities.toggle_favorite);
    const cancel_request = useStore((store) => store.fetch.cancel_request);

    useEffect(() => {
        const parsed = parse_coords(id);
        if (parsed) {
            load_city(parsed[0], parsed[1]);
            load_forecast(parsed[0], parsed[1]);
        }
    }, [id, load_city, load_forecast]);

    useEffect(() => {
        return () => {
            cancel_request(currentWeatherKey);
            cancel_request(RequestKeys.FORECAST_HOURLY);
        };
    }, [cancel_request]);

    const handleClickFavorite = () => {
        const parsed = parse_coords(id);
        if (parsed) toggle_favorite(parsed[0], parsed[1]);
    };

    if (forecast_fetching || weather_fetching) {
        return <Loader />;
    }

    if (!weather || !id) return <NotFound />;

    return (
        <div className="card-body d-flex flex-column gap-1">
            <div className="d-flex justify-content-between">
                <h1 className="card-title">{weather.name}</h1>

                <button className="btn btn-primary" onClick={handleClickFavorite}>
                    {in_favorite ? (
                        <i className="bi bi-bookmark-plus-fill"></i>
                    ) : (
                        <i className="bi bi-bookmark-plus"></i>
                    )}
                </button>
            </div>
            <div className="d-flex flex-column column-gap-2">
                <h1 className="display-1">{weather.main.temp}&deg;</h1>
                <div>
                    <span>{weather.weather[0].main}</span>{" "}
                    <span>
                        {weather.main.temp_min}&deg;/{weather.main.temp_max}&deg;
                    </span>
                </div>
            </div>
            <div>
                <h4 className="mb-0">Forecast</h4>
                <ForecastHourly id={id} />
            </div>
            <WeatherAdditional main={weather.main} sys={weather.sys} wind={weather.wind} />
        </div>
    );
};

const NotFound = () => {
    return (
        <div className="card-body d-flex flex-column gap-1">
            <div className="d-flex justify-content-between">
                <h1 className="card-title">Not Found</h1>

                <button className="btn btn-primary">
                    <i className="bi bi-bookmark-plus"></i>
                </button>
            </div>
            <div className="d-flex flex-column column-gap-2">
                <h1 className="display-1">0&deg;</h1>
                <div>
                    <span>Unknown</span> <span>0&deg;/0&deg;</span>
                </div>
            </div>
        </div>
    );
};

export default Weather;
