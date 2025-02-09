// The latitude and longitude of London, UK
const validate_coords = (slug?: string) => {
    return parse_coords(slug)?.join(",");
};

export const parse_coords = (slug?: string) => {
    if (!slug?.length) return null;
    const [lat, lon] = decodeURIComponent(slug).split(",");
    const parsed_lat = parseFloat(lat);
    const parsed_lon = parseFloat(lon);

    if (isNaN(parsed_lat) || isNaN(parsed_lon)) {
        return null;
    } else return [parsed_lat, parsed_lon];
};

export default validate_coords;
