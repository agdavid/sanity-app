import {PortableText} from '@portabletext/react'
import {notFound} from 'next/navigation'
import {sanityClient} from '../../../lib/sanityClient'

const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  "authorName": author->name,
  body
}`

export default async function PostPage({params}) {
  const {slug} = await params
  const post = await sanityClient.fetch(postQuery, {slug})

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <article>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Blog post</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">{post.title}</h1>
        <p className="mt-4 text-sm text-zinc-500">
          By {post.authorName} ·{' '}
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unpublished'}
        </p>
        <div className="prose prose-zinc mt-10 max-w-none leading-7">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  )
}
