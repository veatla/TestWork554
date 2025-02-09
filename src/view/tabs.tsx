"use client";

import Link from "next/link";
import Searchbar from "./searchbar";
import { useEffect } from "react";
import { useStore } from "@/model";
import { usePathname } from "next/navigation";
import clsx from "@/utils/clsx";

export const Tabs: React.FC = () => {
    const pathname = usePathname();
    const get_favorites = useStore((store) => store.cities.get_favorites);

    useEffect(() => {
        get_favorites();
    }, [get_favorites]);

    const is_favorites = pathname === "/favorites";

    return (
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                    <Link
                        className={clsx("nav-link", { active: !is_favorites })}
                        aria-current={!is_favorites}
                        href="/city"
                    >
                        City
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={clsx("nav-link", { active: is_favorites })}
                        aria-current={is_favorites}
                        href="/favorites"
                    >
                        Favorites
                    </Link>
                </li>
                <li className="nav-item ms-auto">
                    <Searchbar />
                </li>
            </ul>
        </div>
    );
};
