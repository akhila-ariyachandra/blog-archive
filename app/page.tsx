import { allPosts } from "content-collections";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import Title from "./_components/title";

dayjs.extend(advancedFormat);

const HomePage = () => {
  return (
    <>
      <Title>Akhila Ariyachandra&apos;s Blog Archive</Title>

      <ul className="space-y-2 sm:space-y-3">
        {allPosts
          .sort((a, b) => (dayjs(a.posted).isBefore(b.posted) ? 1 : -1))
          .map((post) => (
            <li key={post._meta.path}>
              <Link
                href={`/blog/${post._meta.path}`}
                className="font-display text-xl font-medium tracking-tighter text-pretty text-green-700 hover:underline sm:text-2xl dark:text-green-500"
              >
                {post.title}
              </Link>

              <time
                dateTime={dayjs(post.posted).toISOString()}
                className="block text-sm text-zinc-600 sm:text-base dark:text-zinc-400"
              >
                {`${dayjs(post.posted).format("Do MMMM YYYY")}${
                  post.updated
                    ? ` (Updated on ${dayjs(post.updated).format(
                        "Do MMMM YYYY",
                      )})`
                    : ""
                }`}
              </time>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
