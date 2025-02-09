"use client";

import { AppStore, useStore } from "@/model";
import { useRef, useState } from "react";
import ForecastItem from "./forecast-item";


const selector = {
    forecast: (id: string) => (store: AppStore) => store.weather.forecast.entities[id],
};

const ForecastHourly: React.FC<{
    id: string;
}> = ({ id }) => {
    const scroll_container = useRef<HTMLUListElement>(null);
    const [show_left_arrow, set_show_left_arrow] = useState(false);
    const [show_right_arrow, set_show_right_arrow] = useState(true);

    const weather = useStore(selector.forecast(id));

    const scroll = (direction: "left" | "right") => {
        if (!scroll_container.current) return;

        const scroll_amount = 300;
        const container = scroll_container.current;

        if (direction === "left") {
            container.scrollLeft -= scroll_amount;
        } else {
            container.scrollLeft += scroll_amount;
        }

        set_show_left_arrow(container.scrollLeft > 0);
        set_show_right_arrow(container.scrollLeft + container.clientWidth < container.scrollWidth - 10);
    };

    if (!weather) return <div>Not Found!</div>;

    return (
        <div className="position-relative my-1">
            {show_left_arrow && (
                <button
                    onClick={() => scroll("left")}
                    className="position-absolute start-0 top-50 translate-middle-y btn btn-secondary rounded-circle"
                    style={{ zIndex: 1, left: "-20px", height: 40, width: 40 }}
                >
                    <i className="bi bi-arrow-left"></i>
                </button>
            )}
            {show_right_arrow && (
                <button
                    onClick={() => scroll("right")}
                    className="position-absolute end-0 top-50 translate-middle-y btn btn-secondary rounded-circle"
                    style={{ zIndex: 1, right: "-20px", height: 40, width: 40 }}
                >
                    <i className="bi bi-arrow-right"></i>
                </button>
            )}
            <ul
                ref={scroll_container}
                className="list-group list-group-horizontal overflow-x-hidden scroll-horizontal"
                style={{ scrollBehavior: "smooth" }}
                onScroll={() => {
                    if (!scroll_container.current) return;
                    const { scrollLeft, clientWidth, scrollWidth } = scroll_container.current;
                    set_show_left_arrow(scrollLeft > 0);
                    set_show_right_arrow(scrollLeft + clientWidth < scrollWidth - 5);
                }}
            >
                {weather.list.map((v) => (
                    <ForecastItem key={v.dt} {...v} />
                ))}
            </ul>
        </div>
    );
};


export default ForecastHourly;
