import Link from "next/link";
import {sanityClient} from "../lib/sanityClient";

const postsQuery = `*[_type == "post" && ($category == "" || $category in categories[]->title)] | order(publishedAt desc) {
  title,
  slug,
  excerpt,
  "authorName": author->name
}`;

const categoriesQuery = `*[_type == "category"] | order(title asc) {title}`;

export default async function Home({searchParams}) {
  const {category = ""} = await searchParams;
  const [posts, categories] = await Promise.all([
    sanityClient.fetch(postsQuery, {category}),
    sanityClient.fetch(categoriesQuery),
  ]);

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

      <form className="mb-10 flex items-end gap-3" method="get">
        <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
          Filter by category
          <select
            name="category"
            defaultValue={category}
            className="rounded border border-zinc-300 bg-white px-3 py-2 font-normal"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded bg-zinc-900 px-4 py-2 text-sm font-semibold text-white" type="submit">
          Apply
        </button>
      </form>

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
