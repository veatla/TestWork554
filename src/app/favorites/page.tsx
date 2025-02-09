'use client';

import { RequestKeys } from "@/api/base";
import { useStore } from "@/model";
import FavoriteItem from "@/view/favorite-city";
import Loader from "@/view/loader";

const Page: React.FC = () => {
    const fetching = useStore((store) => store.fetch.fetching[RequestKeys.GET_FAVORITE]);
    const favorites = useStore((store) => store.cities.favorites.ids);

    // Check if favorite cities being loaded
    if (fetching) return <Loader />;

    return (
        <div className="card-body d-flex flex-column gap-1">
            {favorites.map((v) => (
                <FavoriteItem key={v} id={v} />
            ))}
        </div>
    );
};

export default Page;
