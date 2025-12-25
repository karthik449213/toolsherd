-- Migration script to update blog post table schema
-- WARNING: This will drop and recreate the blog_posts table
-- Backup your data before running this script!

-- Step 1: Create the new table with the correct schema
CREATE TABLE IF NOT EXISTS blog_post (
  id serial not null,
  title text not null,
  slug text not null,
  excerpt text null,
  content_md text not null,
  cover_image_url text null,
  seo_title text null,
  seo_description text null,
  seo_keywords text[] null,
  author text null,
  tags text[] null,
  published_at timestamp with time zone not null default now(),
  is_published boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint blog_post_pkey primary key (id),
  constraint blog_post_slug_key unique (slug)
) TABLESPACE pg_default;

-- Step 2: Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_post_slug ON public.blog_post USING btree (slug) TABLESPACE pg_default;

-- Step 3: Enable Row Level Security (RLS) if needed for public access
ALTER TABLE public.blog_post ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policy for public read access
CREATE POLICY "Allow public read access" ON public.blog_post
  FOR SELECT USING (is_published = true);

-- Optional: If you need to copy data from old blog_posts table, uncomment and modify this:
-- INSERT INTO blog_post (title, slug, excerpt, content_md, cover_image_url, author, created_at, updated_at, published_at)
-- SELECT title, slug, excerpt, content, "coverImageUrl", author, "createdAt", "updatedAt", "publishedAt"
-- FROM blog_posts
-- WHERE NOT EXISTS (SELECT 1 FROM blog_post WHERE blog_post.slug = blog_posts.slug);

-- Step 5: Drop old table if migration is successful
-- DROP TABLE IF EXISTS blog_posts CASCADE;
