import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import a11yEmoji from "@fec/remark-a11y-emoji";
import externalLinks from "rehype-external-links";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import smartypants from "remark-smartypants";

const Post = defineCollection({
  name: "Post",
  directory: "posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    posted: z.string(),
    updated: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [smartypants, a11yEmoji, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [externalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
        [
          rehypePrettyCode,
          {
            theme: "material-theme-ocean",
            filterMetaString: (string) =>
              string.replace(/filename="[^"]*"/, ""),
          } satisfies Options,
        ],
      ],
    });

    return {
      ...document,
      mdx,
    };
  },
});

const NoBodyPost = defineCollection({
  name: "NoBodyPost",
  directory: "content/posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().max(140).optional(),
    posted: z.string(),
    updated: z.string().optional(),
  }),
});

export default defineConfig({
  collections: [Post, NoBodyPost],
});
