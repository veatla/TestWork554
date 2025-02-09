'use client';

import { WeatherData } from "@/types/weather";
import { format } from "date-fns";
import CardItem from "./card-item";
import { get_wind_direction } from "@/utils/wind-direction";

export interface WeatherAdditionalProps {
    main: WeatherData['main'];
    sys: WeatherData['sys'];
    wind: WeatherData['wind'];
}
const WeatherAdditional: React.FC<WeatherAdditionalProps> = (props) => {
    const { main, sys, wind } = props;
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <CardItem title="Pressure" text={`${main.pressure}mbar`} />
                </div>
                <div className="col">
                    <CardItem title="Real feel" text={<span>{main.feels_like}&deg;</span>} />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <CardItem title="Humidity" text={`${main.humidity}%`} />
                </div>
                <div className="col">
                    <CardItem
                        title={`Wind`}
                        text={`${get_wind_direction(wind.deg)}: ${wind.speed}m/s`}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CardItem title="Sunrise" text={format(sys.sunrise * 1000, "HH:mm")} />
                </div>
                <div className="col">
                    <CardItem title="Sunset" text={format(sys.sunset * 1000, "HH:mm")} />
                </div>
            </div>
        </div>
    );
};
export default WeatherAdditional;
