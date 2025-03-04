import Title from "@/_components/title";
import { PRODUCTION_URL } from "@/_lib/constants";
import { allPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXComponent from "./mdx-component";

dayjs.extend(advancedFormat);

// https://beta.nextjs.org/docs/api-reference/generate-static-params
export const generateStaticParams = () => {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
};

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async (
  props: BlogPostPageProps,
): Promise<Metadata> => {
  const params = await props.params;
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post._meta.path}`,
      type: "article",
      publishedTime: dayjs(post.posted).toISOString(),
    },
    alternates: {
      canonical: `/blog/${post._meta.path}`,
    },
    authors: {
      name: "Akhila Ariyachandra",
      url: new URL(PRODUCTION_URL),
    },
  };
};

const BlogPostPage = async (props: BlogPostPageProps) => {
  const params = await props.params;
  const post = allPosts.find((post) => post._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Title>{post.title}</Title>

      <time
        dateTime={dayjs(post.posted).toISOString()}
        className="mb-4 block text-sm text-zinc-600 sm:mb-5 sm:text-base dark:text-zinc-400"
      >
        {`${dayjs(post.posted).format("Do MMMM YYYY")}${
          post.updated
            ? ` (Updated on ${dayjs(post.updated).format("Do MMMM YYYY")})`
            : ""
        }`}
      </time>

      <MDXComponent mdx={post.mdx} className="mb-16" />
    </>
  );
};

export default BlogPostPage;
