/** 
 * Function for validating ids
 * Id = `{{lat}},{{lon}}`
 * @returns id
 */
const validate_coords = (slug?: string) => {
    return parse_coords(slug)?.join(",");
};

/** 
 * Parses id, extracts lat, lon and returns it
 */
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
