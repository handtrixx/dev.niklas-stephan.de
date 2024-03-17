// getStaticPathsPosts.tsx

import { frontendHost, frontendUrl, backendUrl } from "./env.js";

export async function getStaticPathsPosts() {
  try {
    const res = await fetch(backendUrl + "wp-json/wp/v2/posts?per_page=100", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: false };
  } catch (error) {
    console.error("Failed to get static paths:", error);
    return { paths: [], fallback: false };
  }
}
