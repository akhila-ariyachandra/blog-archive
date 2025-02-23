import { PRODUCTION_URL } from "@/_lib/constants";
import { allPosts } from "content-collections";
import dayjs from "dayjs";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts.map((post) => ({
    url: `${PRODUCTION_URL}/blog/${post._meta.path}`,
    lastModified: dayjs(post.updated ?? post.posted).format("YYYY-MM-DD"),
  }));

  return [
    {
      url: PRODUCTION_URL,
      lastModified: dayjs().format("YYYY-MM-DD"),
    },
    ...posts,
  ];
};

export default sitemap;
