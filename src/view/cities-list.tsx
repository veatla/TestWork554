import { RequestKeys } from "@/api/base";
import CityCard from "./cities-card";
import { useStore } from "@/model";

const CitiesList: React.FC<{
    onClear: () => void
}> = ({ onClear }) => {
    const fetching = useStore((store) => store.fetch.fetching);
    const cities = useStore((store) => store.search.entities.ids);

    if (fetching[RequestKeys.CITIES])
        return (
            <div className="card position-absolute b-0 z-3 w-100">
                <ul className="list-group list-group-flush align-items-center">
                    <div className="spinner-border m-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </ul>
            </div>
        );

    if (!cities.length) return null;

    return (
        <div className="card position-absolute b-0 z-3 w-100">
            <ul className="list-group list-group-flush">
                {cities.map((v) => (
                    <CityCard key={v} id={v} onClear={onClear} />
                ))}
            </ul>
        </div>
    );
};

export default CitiesList;