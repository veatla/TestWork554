"use client";

import { RequestKeys } from "@/api/base";
import { useStore } from "@/model";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState, useCallback } from "react";
import CitiesList from "./cities-list";

const Searchbar: React.FC = () => {
    const [city, set_city] = useState("");

    const cancel_request = useStore((store) => store.fetch.cancel_request);
    const search = useStore((store) => store.search.search);
    const clear = useStore((store) => store.search.clear);

    const with_debounce = useRef(debounce(search, 500));

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        set_city(e.currentTarget.value);
    };

    const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        with_debounce.current(city);
    };

    const handleClear = useCallback(() => {
        clear();
        set_city("");
    }, [clear]);

    useEffect(() => {
        if (city.length >= 3) with_debounce.current(city);
    }, [city, search]);

    useEffect(() => {
        return () => cancel_request(RequestKeys.CITIES);
    }, [cancel_request]);

    return (
        <div className="position-relative">
            <form onSubmit={handleSearch} className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-search"
                    value={city}
                    onChange={handleInputChange}
                />
                <button className="btn btn-outline-secondary" type="submit" id="button-search">
                    Search
                </button>
            </form>
            <CitiesList onClear={handleClear} />
        </div>
    );
};

export default Searchbar;
