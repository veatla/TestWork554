export interface LocalNames {
    /** Internal field */
    ascii: string;

    /** Internal field */
    feature_name: string;

    /** Name of the found location in different languages. The list of names can be different for different locations */
    [language_code: string]: string;
}
export type FavoriteCity = {
    id: string;
    lon: number;
    lat: number;
};
export type City = {
    /**
     * Unique id
     * the server doesn't return it, so it's just `${lat},${lon}`
     */
    id: string;

    /** Name of the found location */
    name: string;

    /** Localized names for different languages */
    local_names: Array<LocalNames>;

    /** Geographical coordinates of the found location (latitude) */
    lat: number;

    /** Geographical coordinates of the found location (longitude) */
    lon: number;

    /** Country of the found location */
    country: string;

    /** (where available) State of the found location */
    state: null | string;
};
