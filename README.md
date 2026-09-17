# Sanity Blog Demo

A small blog built while learning Sanity.io and Next.js. Content is modeled in a standalone Sanity Studio and rendered by a separate Next.js frontend.

## Stack

- Sanity Studio 6
- Sanity Content Lake with the `production` dataset
- Next.js App Router and JavaScript
- GROQ for content queries
- Portable Text for rich text bodies

## Run Locally

### Studio

```bash
cd studio/my-first-sanity-studio
npm install
npm run dev
```

Open http://localhost:3333 to edit content.

### Frontend

Create `web/.env.local` with the Sanity project settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=oqlwhfw6
NEXT_PUBLIC_SANITY_DATASET=production
```

Then run:

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000 to view the blog.

## Sample Import

From `studio/my-first-sanity-studio`, import the committed fixture with the current CLI syntax:

```bash
npx sanity datasets import -d production sample-data/posts.ndjson
```

## PR History

| PR | What it added |
|---|---|
| 0 | Monorepo scaffold with `studio` and `web` workspaces |
| 1 | Sanity Studio connected to the project and `production` dataset |
| 2 | Author, category, and post schemas with references and Portable Text |
| 3 | Manual authoring of content in Studio; no code change |
| 4 | NDJSON sample content fixture and bulk import workflow |
| 5 | Next.js frontend and configured Sanity client |
| 6 | Homepage post list powered by GROQ |
| 7 | Individual post pages rendered with Portable Text |
| 8 | Styling and project documentation |
