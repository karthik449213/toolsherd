-- SQL query to create the blog_post table in Supabase
CREATE TABLE public.blog_post (
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

-- Index for faster search on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_post_slug ON public.blog_post USING btree (slug) TABLESPACE pg_default;
