"use client";

import { ForecastEntry } from "@/types/forecast";
import { format } from "date-fns";
import Image from "next/image";

const ForecastItem: React.FC<ForecastEntry> = (props) => {
    return (
        <li className="list-group-item text-center" key={props.dt}>
            <div className="d-flex justify-content-center">
                <Image
                    src={`https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`}
                    alt={props.weather[0].main}
                    width={24}
                    height={24}
                />
            </div>
            <h6 className="">{props.main.temp}&deg;</h6>
            <p className="mb-0 text-secondary">{props.weather[0].main}</p>
            <p className="mb-0">
                <small>{format(props.dt * 1000, "H:mm")}</small>
            </p>
        </li>
    );
};
export default ForecastItem;
