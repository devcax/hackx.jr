import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hackX 10.0",
    short_name: "hackX",
    description: "hackX 10.0 - The Ultimate Hackathon Experience",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1c",
    theme_color: "#d6dde6",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
