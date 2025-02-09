export const get_wind_direction = (angle: number): string => {
    const directions: string[] = [
        "North",
        "North - North East",
        "North - East",
        "East - North East",
        "East",
        "East - South East",
        "South - East",
        "South - South East",
        "South",
        "South - South West",
        "South - West",
        "West - South West",
        "West",
        "West - North West",
        "North - West",
        "North - North West",
    ];

    const section: number = Math.floor(angle / 22.5 + 0.5);

    return directions[section % 16];
};
