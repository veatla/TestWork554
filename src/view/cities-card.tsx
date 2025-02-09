import { useStore } from "@/model";
import Link from "next/link";

const CityCard: React.FC<{
    id: string;
    onClear: () => void;
}> = ({ id, onClear }) => {
    const city = useStore((store) => store.search.entities.entities[id]);

    return (
        <Link
            href={`/city/${id}`}
            onClick={onClear}
            className="list-group-item list-group-item-action"
        >
            <span className="card-title">
                {city.name}
                {city.state && <small className="text-body-secondary"> {city.state}</small>}
            </span>
            <p className="card-text">{city.country}</p>
        </Link>
    );
};

export default CityCard;
