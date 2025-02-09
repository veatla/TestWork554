interface Coord {
    /** Longitude of the location */
    lon: number;
    /** Latitude of the location */
    lat: number;
}

interface Weather {
    /** Weather condition id */
    id: number;
    /** Group of weather parameters (Rain, Snow, Clouds etc.) */
    main: string;
    /** Weather condition within the group */
    description: string;
    /** Weather icon id */
    icon: string;
}

interface Main {
    /** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit */
    temp: number;
    /** Temperature. This temperature parameter accounts for the human perception of weather */
    feels_like: number;
    /** Atmospheric pressure on the sea level, hPa */
    pressure: number;
    /** Humidity, % */
    humidity: number;
    /** Minimum temperature at the moment. This is minimal currently observed temperature */
    temp_min: number;
    /** Maximum temperature at the moment. This is maximal currently observed temperature */
    temp_max: number;
    /** Atmospheric pressure on the sea level, hPa */
    sea_level?: number;
    /** Atmospheric pressure on the ground level, hPa */
    grnd_level?: number;
}

interface Wind {
    /** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour */
    speed: number;
    /** Wind direction, degrees (meteorological) */
    deg: number;
    /** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour */
    gust?: number;
}

interface Clouds {
    /** Cloudiness, % */
    all: number;
}

interface Rain {
    /** Precipitation, mm/h (where available) */
    "1h"?: number;
}

interface Snow {
    /** Precipitation, mm/h (where available) */
    "1h"?: number;
}

interface Sys {
    /** Internal parameter */
    type: number;
    /** Internal parameter */
    id: number;
    /** Internal parameter */
    message: string;
    /** Country code (GB, JP etc.) */
    country: string;
    /** Sunrise time, unix, UTC */
    sunrise: number;
    /** Sunset time, unix, UTC */
    sunset: number;
}

export type WeatherData = {
    /** Coordinates of the location */
    coord: Coord;
    /** Weather conditions */
    weather: Weather[];
    /** Internal parameter */
    base: string;
    /** Main weather data */
    main: Main;
    /** Visibility, meter. The maximum value of the visibility is 10 km */
    visibility: number;
    /** Wind data */
    wind: Wind;
    /** Cloudiness data */
    clouds: Clouds;
    /** Rain data (if available) */
    rain?: Rain;
    /** Snow data (if available) */
    snow?: Snow;
    /** Time of data calculation, unix, UTC */
    dt: number;
    /** System data */
    sys: Sys;
    /** Shift in seconds from UTC */
    timezone: number;
    /** City ID */
    id: string;
    /** City name */
    name: string;
    /** Internal parameter */
    cod: number;
}
