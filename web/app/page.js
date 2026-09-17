import Link from "next/link";
import {sanityClient} from "../lib/sanityClient";

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  excerpt,
  "authorName": author->name
}`;

export default async function Home() {
  const posts = await sanityClient.fetch(postsQuery);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Sanity blog demo
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Latest posts</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Structured content published from Sanity and rendered by Next.js.
        </p>
      </header>

      <section className="space-y-6" aria-label="Blog posts">
        {posts.map((post) => (
          <article key={post.slug.current} className="border-b border-zinc-200 pb-6">
            <Link href={`/posts/${post.slug.current}`} className="group">
              <h2 className="text-2xl font-semibold text-zinc-900 group-hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm text-zinc-500">By {post.authorName}</p>
            <p className="mt-3 leading-7 text-zinc-700">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
