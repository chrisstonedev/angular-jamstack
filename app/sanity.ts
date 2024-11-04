import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // this option enables faster responses
  // but can return stale data at times.
  // recommended for client-side queries
  useCdn: true,
  apiVersion: "v2024-11-03",
});

export const imageUrlBuilder = ImageUrlBuilder(sanity);
