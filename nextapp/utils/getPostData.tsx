// getPostData.tsx

import { frontendHost, frontendUrl, backendUrl } from "./env.js";

export async function getPostData(slug) {
  try {
    const res = await fetch(`${backendUrl}wp-json/wp/v2/posts?slug=${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const [post] = await res.json();
    return {
      title: post.title.rendered,
      date: post.date,
      lang: post.lang,
      slug: post.slug,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featuredImage: post.featured_image_url,
    };
  } catch (error) {
    console.error("Failed to get post data:", error);
    return {};
  }
}
