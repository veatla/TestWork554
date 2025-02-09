import { City } from "./city";

export type Forecast = {
    id: string;
    city: City;
    /** Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more here */
    country: string;
    /** Internal parameter */
    population: string;
    /** Shift in seconds from UTC */
    timezone: number;
    /** Internal parameter */
    cod: string;
    /** Internal parameter */
    message: string;
    /** A number of days returned in the API response */
    cnt: number;

    list: Array<ForecastEntry>;
};

export interface FeelsLike {
    /** Temperature at 12:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
    day: number;

    /** Temperature at 00:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
    night: number;

    /** Temperature at 18:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
    eve: number;

    /** Temperature at 06:00 local time. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
    morn: number;
}

interface MainForecast {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface Clouds {
    all: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Sys {
    pod: string;
}

interface Snow {
    "3h": number;
}

export interface ForecastEntry {
    dt: number;
    main: MainForecast;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
    snow?: Snow;
}

export interface Weather {
    /** Weather condition id */
    id: number;

    /** Group of weather parameters (Rain, Snow, Clouds etc.) */
    main: string;

    /** Weather condition within the group. Please find more here. You can get the output in your language. Learn more */
    description: string;

    /**
     * Weather icon id
     *
     * https://openweathermap.org/img/wn/{{icon}}@2x.png
     */
    icon: string;
}
