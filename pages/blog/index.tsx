import Layout from "@components/layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Bolg">
      <h1>Latest Post</h1>
      <ul>
        {posts.map((post, i) => (
          <div key={i} className="mb-5">
            <Link href={`/blog/${post.slug}`}>
              <span className="text-lg font-semibold">{post.title}</span>
              <div>
                <span className="text-lg text-red-500">
                  {post.date} / {post.category}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  //prisma 를 사용해 글을 가져와 블로그를 만들 수 있음

  //nodejs 사용해서 파일 읽어오기
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  return { props: { posts: blogPosts } };
};

export default Blog;
