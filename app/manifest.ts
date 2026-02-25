import type { MetadataRoute } from "next";

const { SITE_NAME, SITE_DESCRIPTION } = process.env;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME ?? "BLKLST Records",
    short_name: SITE_NAME ?? "BLKLST Records",
    description:
      SITE_DESCRIPTION ??
      "BLKLST Records is an independent underground record label from Helsinki, Finland. Dark techno and experimental electronic music. Artists, releases and events.",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
