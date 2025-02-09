import validate_coords from "@/utils/parse-coords";
import Weather from "@/view/weather";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const coords = validate_coords(slug);
    return <Weather id={coords} />;
}
