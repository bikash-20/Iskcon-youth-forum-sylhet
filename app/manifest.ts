import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ISKCON Youth Forum Sylhet · Sri Sri Radha Madhava Mandir",
    short_name: "IYF Sylhet",
    description:
      "Official portal for ISKCON Youth Forum Sylhet (IYF Sylhet) at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila. Darshan timings, kirtan, youth courses & festivals.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf3",
    theme_color: "#7b1113",
    icons: [
      {
        src: "/co-ordinator.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
