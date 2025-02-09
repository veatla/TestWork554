import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "openweathermap.org",
                port: "",
                pathname: "/img/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
