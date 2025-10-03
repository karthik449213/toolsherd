-- SQL query to create the blog_posts table in Supabase
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  coverImageUrl TEXT,
  slug TEXT UNIQUE NOT NULL,
  publishedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  author TEXT,
  content TEXT NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster search on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
