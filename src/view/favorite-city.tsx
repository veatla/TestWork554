"use client";

import { useStore } from "@/model";
import { format } from "date-fns";
import Image from "next/image";

const FavoriteItem: React.FC<{
    id: string;
}> = ({ id }) => {
    const weather = useStore((store) => store.weather.weather.entities[id]);

    if (!weather) return <div>Ok but weather is undefined</div>;
    return (
        <div className="card">
            <div className="card-body d-flex justify-content-between">
                <div>
                    <h1 className="card-title">{weather.name}</h1>
                    <h6 className="card-title">{format(weather.dt * 1000, "H:mm")}</h6>
                </div>
                <div>
                    <div className="d-flex justify-content-center">
                        <Image
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather.weather[0].main}
                            width={50}
                            height={50}
                        />
                    </div>
                    <h6 className="card-text">
                        {weather.weather[0].main} {weather.main.temp}&deg;
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default FavoriteItem;
