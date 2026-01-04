# Tools Herd AI - Ultimate AI Directory & Blog Platform

## 1. Project Overview

### Project Name
**Tools Herd AI** (Repository: `toolsherd`)

### Short Description
Tools Herd AI is a modern, full-stack web application built with **Next.js 16** that serves as a comprehensive directory of AI tools combined with a professional blog platform. The application helps users discover, explore, and learn about the best AI tools available for various use cases including productivity, content creation, coding, marketing, and trading. It provides a curated directory with tool categorization, detailed listings, and educational blog posts with full SEO optimization.

### Key Goals & Intended Use Cases
- **Primary Goal**: Create a discoverable, user-friendly directory of AI tools with detailed information and comparisons
- **Secondary Goal**: Publish high-quality, SEO-optimized blog posts about AI tools, trends, and best practices
- **Use Cases**:
  - Users searching for specific AI tools for their workflows
  - Content creators, developers, marketers, and traders looking for AI solutions
  - Readers interested in AI education, tutorials, and industry insights
  - AI tool discovery and comparison across different categories

---

## 2. Tech Stack

### Programming Languages
- **TypeScript** - Primary language for type-safe development
- **JavaScript/JSX/TSX** - React component development
- **SQL** - Database queries and schema definition
- **CSS/PostCSS** - Styling with Tailwind CSS

### Frameworks & Libraries

#### Frontend Framework
- **Next.js 16.1.1** - React metaframework with App Router for SSR and static generation
- **React 19.2.3** - UI library
- **React DOM 19.2.3** - DOM rendering

#### UI Component Libraries & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library built on Radix UI
- **Radix UI** - Accessible component primitives (accordion, alert dialog, avatar, badge, button, dialog, dropdown menu, select, tooltip, etc.)
- **Lucide React 0.544** - Icon library
- **React Icons 5.4** - Additional icon sets
- **Class Variance Authority (CVA) 0.7.1** - Component styling utility
- **Clsx 2.1.1** - Utility for className management

#### Markdown & Content Rendering
- **react-markdown 10.1.0** - React component for rendering Markdown
- **remark-gfm 4.0.1** - GitHub-Flavored Markdown support
- **remark-breaks 4.0.0** - Line break support in Markdown
- **react-day-picker 9.13.0** - Date picker component

#### Form Handling & Validation
- **React Hook Form 7.55.0** - Performant form library
- **@hookform/resolvers 3.10.0** - Form validation resolvers
- **Zod 3.24.2** - TypeScript-first schema validation
- **zod-validation-error 3.4.0** - User-friendly validation error formatting

#### Data Management & State
- **@tanstack/react-query (TanStack Query) 5.89.0** - Server state management
- **Supabase JS 2.57.4** - Backend services client library
- **Wouter 3.3.5** - Lightweight client-side router

#### UI Utilities & Effects
- **Framer Motion 11.13.1** - Animation library
- **React Resizable Panels 2.1.7** - Resizable panel components
- **Vaul 1.1.2** - Drawer component library
- **Input OTP 1.4.2** - One-time password input
- **Embla Carousel React 8.6.0** - Carousel component
- **Recharts 2.15.2** - Charting library

#### Styling Utilities
- **Tailwind Merge 2.6.0** - Smart class merging for Tailwind CSS
- **Tailwindcss-animate 1.0.7** - Tailwind animation utilities
- **TW Animate CSS 1.2.5** - Additional Tailwind animations

#### Form Utilities
- **React Markdown 10.1.0** - Markdown rendering in React
- **Date-fns 3.6.0** - Date utility library

#### Communication & WebSocket
- **WebSocket (ws) 8.18.0** - WebSocket client for real-time features
- **Express 4.21.2** - Backend/server framework (if backend integration needed)
- **Passport 0.7.0** - Authentication middleware
- **Passport-local 1.0.0** - Local authentication strategy
- **Express Session 1.18.1** - Session management
- **connect-pg-simple 10.0.0** - PostgreSQL session store

### Database
- **Supabase** - PostgreSQL database with real-time capabilities
  - Hosted PostgreSQL database
  - Authentication system
  - Real-time subscriptions
  - Storage for images and files
- **PostgreSQL** - Underlying relational database

### Database Schema

**Main Table: `blog_post`**

The blog system uses a single PostgreSQL table in Supabase to store all blog post data:

```sql
CREATE TABLE blog_post (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_md TEXT NOT NULL,  -- MARKDOWN CONTENT ONLY
  cover_image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  author TEXT,
  tags TEXT[],
  category TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);
```

**Field Definitions:**
- `id` - Unique post identifier (auto-incrementing)
- `title` - Blog post title (required)
- `slug` - URL-friendly identifier (required, unique) - used in route `/blog/{slug}`
- `excerpt` - Short description/preview text
- `content_md` - Full markdown content for the post (required)
- `cover_image_url` - Featured image URL
- `seo_title` - SEO-optimized title for search engines
- `seo_description` - Meta description for SEO
- `seo_keywords` - Array of keywords for SEO
- `author` - Post author name
- `tags` - Array of topic tags
- `category` - Post category classification
- `published_at` - Publication timestamp
- `created_at` - Record creation timestamp
- `updated_at` - Last modification timestamp
- `is_published` - Boolean flag to control visibility

### Tools, Services & Platforms
- **Supabase Cloud** - Backend as a Service (BaaS) for database and authentication
- **Node.js** - JavaScript runtime
- **npm** - Package manager
- **ESLint 9** - Code linting and quality
- **PostCSS 4** - CSS processing
- **Turbopack** - Next.js bundler (used in dev mode)
- **Next Font (Google Fonts)** - Optimized font loading

---

## 3. Project Architecture

### High-Level Architecture Explanation

The application follows a **modern Next.js App Router architecture** with a clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│          Vercel/Hosting (Next.js)               │
├─────────────────────────────────────────────────┤
│  Frontend Layer (React 19 + TypeScript)         │
│  - Pages: Home, Blog, Tools, About, Contact    │
│  - Components: Reusable UI elements            │
│  - Hooks: Custom React hooks for logic         │
├─────────────────────────────────────────────────┤
│  Next.js App Router (SSR/SSG/ISR)              │
│  - Dynamic routes: /blog/[slug]                │
│  - API routes (future expansion)               │
├─────────────────────────────────────────────────┤
│  Data Layer                                     │
│  - Supabase Client (supabaseClient.ts)         │
│  - TanStack Query (react-query)                │
│  - Type definitions (types.ts)                 │
├─────────────────────────────────────────────────┤
│  Supabase Cloud Backend                        │
│  - PostgreSQL Database                         │
│  - Authentication (if needed)                  │
│  - Storage for images                          │
└─────────────────────────────────────────────────┘
```

### Architectural Design Patterns

1. **Server-Side Rendering (SSR)**: Blog post pages are server-rendered for optimal SEO
2. **Static Generation with ISR**: Pages are pre-rendered and revalidated incrementally
3. **Component-Based Architecture**: Modular, reusable React components
4. **Separation of Concerns**: Clear division between pages, components, and utilities
5. **Type Safety**: Full TypeScript usage for runtime safety
6. **Controlled Data Flow**: Supabase as single source of truth

### Folder & File Structure

```
toolsherd/
├── src/
│   ├── app/                              # Next.js App Router pages
│   │   ├── layout.tsx                    # Root layout with metadata
│   │   ├── page.tsx                      # Home page - AI directory
│   │   ├── globals.css                   # Global styles
│   │   ├── markdown-content.css          # Markdown-specific styling
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Dynamic blog post page (SSR)
│   │   ├── about/page.tsx                # About page
│   │   ├── contact/page.tsx              # Contact page
│   │   ├── tools/page.tsx                # Tools listing page
│   │   ├── disclaimer/page.tsx           # Disclaimer page
│   │   ├── privacy-policy/page.tsx       # Privacy policy page
│   │   ├── terms-and-conditions/page.tsx # Terms page
│   │   └── list-a-website/page.tsx       # Tool submission page
│   │
│   ├── components/                       # Reusable React components
│   │   ├── Navbar.tsx                    # Navigation component
│   │   ├── Footer.tsx                    # Footer component
│   │   ├── MarkdownRenderer.tsx          # Markdown rendering with plugins
│   │   ├── CodeBlock.tsx                 # Code block with syntax highlighting
│   │   ├── BlogPostComponent.tsx         # Blog post display component
│   │   ├── BlogPostCard.tsx              # Blog preview card
│   │   ├── BlogPostPremiumContent.tsx    # Premium content component
│   │   ├── ContentBuilder.tsx            # Rich content building components
│   │   ├── QuoteBlock.tsx                # Quote/highlight block
│   │   ├── category-sheet.tsx            # Category filter sheet
│   │   ├── feedback-form.tsx             # User feedback form
│   │   └── ui/                           # Shadcn/UI components
│   │       ├── button.tsx                # Button component
│   │       ├── card.tsx                  # Card component
│   │       ├── input.tsx                 # Input field
│   │       ├── dialog.tsx                # Modal dialog
│   │       ├── toast.tsx                 # Toast notifications
│   │       ├── accordion.tsx             # Accordion component
│   │       ├── badge.tsx                 # Badge/tag component
│   │       ├── select.tsx                # Select dropdown
│   │       ├── sheet.tsx                 # Side sheet/drawer
│   │       ├── tabs.tsx                  # Tabbed interface
│   │       ├── carousel.tsx              # Carousel component
│   │       ├── chart.tsx                 # Chart components
│   │       ├── tooltip.tsx               # Tooltip component
│   │       └── [other UI components]     # Additional UI primitives
│   │
│   ├── hooks/                            # Custom React hooks
│   │   ├── use-mobile.tsx                # Mobile detection hook
│   │   └── use-toast.ts                  # Toast notification hook
│   │
│   └── lib/                              # Utility functions & configuration
│       ├── supabaseClient.ts             # Supabase client initialization
│       ├── types.ts                      # TypeScript interfaces
│       ├── blogUtils.ts                  # Blog-specific utilities
│       ├── queryClient.ts                # TanStack Query configuration
│       └── utils.ts                      # General utilities
│
├── public/                               # Static assets
│   ├── robots.txt                        # SEO robots file
│   └── sitemap.xml                       # XML sitemap
│
├── sql/                                  # Database scripts
│   ├── create_blog_posts_table.sql       # Table creation script
│   ├── insert_sample_blog_post_complete.sql
│   ├── insert_detailed_blog_post.sql
│   └── migrate_to_new_schema.sql
│
├── .next/                                # Build output (generated)
├── node_modules/                         # Dependencies (generated)
├── .env                                  # Environment variables (local)
├── .gitignore                            # Git ignore rules
├── package.json                          # Project dependencies & scripts
├── package-lock.json                     # Locked dependency versions
├── tsconfig.json                         # TypeScript configuration
├── next.config.ts                        # Next.js configuration
├── postcss.config.mjs                    # PostCSS/Tailwind configuration
├── eslint.config.mjs                     # ESLint configuration
├── next-env.d.ts                         # Next.js type definitions
│
└── Documentation/
    ├── README.md                         # This file
    ├── BLOG_SYSTEM_DOCS.md               # Detailed blog system documentation
    ├── BLOG_SETUP_EXAMPLES.md            # Blog setup and examples
    ├── BLOG_COMPONENTS_EXAMPLES.md       # Component usage examples
    └── BLOG_IMPLEMENTATION.md            # Implementation details
```

---

## 4. Features

### Current Features

#### Home Page & AI Directory
- ✅ **Searchable AI Tools Directory** - Find tools by name or keyword
- ✅ **Category Filtering** - Filter tools by: Content Creation, Productivity, Coding, Marketing, Trading
- ✅ **Tool Cards** - Display tool name, description, category, and link
- ✅ **Responsive Design** - Mobile-first, fully responsive layout
- ✅ **Color-Coded Categories** - Visual category identification

#### Blog System
- ✅ **Blog Listing Page** - Display all published blog posts with cards
- ✅ **Dynamic Blog Post Pages** - Individual blog posts with dynamic routing (`/blog/[slug]`)
- ✅ **Markdown Rendering** - Full GitHub-Flavored Markdown support
  - Headings with responsive sizing
  - Code blocks with syntax highlighting
  - Lists (ordered and unordered)
  - Blockquotes and images
  - Tables and line breaks
- ✅ **Code Syntax Highlighting** - Syntax highlighting for code blocks with copy-to-clipboard
- ✅ **Reading Time Estimation** - Calculate and display estimated reading time
- ✅ **Author Information** - Display author name and bio
- ✅ **Publication Dates** - Show published and updated dates

#### SEO & Performance
- ✅ **Server-Side Rendering** - Blog posts rendered server-side for optimal SEO
- ✅ **Meta Tags** - Dynamic title, description, keywords
- ✅ **Open Graph Tags** - Social media sharing previews
- ✅ **Twitter Card Tags** - Twitter-specific sharing metadata
- ✅ **JSON-LD Structured Data** - Schema.org markup for search engines
- ✅ **Canonical URLs** - Proper URL canonicalization
- ✅ **Sitemap** - XML sitemap for SEO crawling
- ✅ **Robots.txt** - Robots directive file
- ✅ **Image Optimization** - Next.js Image component for optimized image serving

#### Social Features
- ✅ **Social Sharing Buttons** - Share on Twitter, LinkedIn, WhatsApp, Email, Facebook, Reddit
- ✅ **Share Buttons** - Easy sharing of blog posts across platforms
- ✅ **Social Preview** - Open Graph and Twitter card previews

#### Navigation & Pages
- ✅ **Navigation Bar** - Top navigation with links to all main sections
- ✅ **Footer** - Footer with links and information
- ✅ **About Page** - Information about the project
- ✅ **Contact Page** - Contact form for users
- ✅ **Disclaimer Page** - Legal disclaimer
- ✅ **Privacy Policy Page** - Privacy information
- ✅ **Terms & Conditions Page** - Legal terms
- ✅ **List a Website** - Tool submission form

#### Dark Mode
- ✅ **Dark/Light Mode Support** - Theme switching capability using next-themes

---

### Planned/Future Features

- 🔄 **User Authentication** - User accounts and profiles
- 🔄 **Comments Section** - Reader comments on blog posts
- 🔄 **Advanced Search** - Full-text search across tools and posts
- 🔄 **Tool Reviews & Ratings** - User ratings and reviews for tools
- 🔄 **Comparison Tool** - Side-by-side tool comparison
- 🔄 **Email Newsletter** - Subscribe to blog updates
- 🔄 **Related Posts** - Show related blog posts at the end
- 🔄 **Admin Dashboard** - Content management interface
- 🔄 **User Comments** - Discussion threads on blog posts
- 🔄 **Save/Bookmark** - Bookmark favorite tools and posts
- 🔄 **API Endpoint** - Public API for tool data

---

## 5. Setup & Installation

### Prerequisites

Before setting up this project, ensure you have:

- **Node.js** 18.17 or higher ([Download](https://nodejs.org/))
- **npm** 9+ or **yarn** (comes with Node.js)
- **Git** (for cloning the repository)
- **Supabase Account** (free tier available at [https://supabase.com](https://supabase.com))
- **Code Editor** - VS Code recommended ([Download](https://code.visualstudio.com/))

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Development/Production URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000    # Local development
# NEXT_PUBLIC_APP_URL=https://toolsherd.ai/  # Production
```

**Variable Explanations:**

| Variable | Purpose | Where to Find |
|----------|---------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for database connection | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key for Supabase authentication | Supabase Dashboard → Settings → API → `anon` key |
| `NEXT_PUBLIC_APP_URL` | Base URL for the application (used in SEO/OG tags) | Configure based on environment |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not store sensitive secrets here; use server-only environment variables in `.env` for secrets.

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/toolsherd.git
cd toolsherd
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

#### 3. Set Up Environment Variables
```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# Replace the placeholder values with your actual Supabase credentials
```

#### 4. Create Database Tables
Run the SQL script in your Supabase dashboard to set up the blog post table:

1. Go to Supabase Dashboard → SQL Editor → New Query
2. Copy and run the following SQL to create the `blog_post` table:

```sql
CREATE TABLE IF NOT EXISTS blog_post (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_md TEXT NOT NULL,
  cover_image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  author TEXT,
  tags TEXT[],
  category TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS blog_post_slug_idx ON blog_post(slug);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS blog_post_published_at_idx ON blog_post(published_at DESC);

-- Create index on is_published for filtering
CREATE INDEX IF NOT EXISTS blog_post_is_published_idx ON blog_post(is_published);
```

#### 5. (Optional) Insert Sample Blog Post

To test the blog functionality, insert a sample post:

```sql
INSERT INTO blog_post (
  title,
  slug,
  excerpt,
  content_md,
  cover_image_url,
  seo_title,
  seo_description,
  seo_keywords,
  author,
  tags,
  category,
  published_at,
  is_published
) VALUES (
  'Introduction to React Hooks',
  'introduction-to-react-hooks',
  'Learn how to use React Hooks to manage state and side effects in your functional components.',
  '# Introduction to React Hooks

React Hooks revolutionized how we write React components. In this comprehensive guide, we''ll explore the most important hooks and how to use them effectively.

## What are Hooks?

Hooks are functions that let you "hook into" React features. They were introduced in React 16.8 and have become an essential part of modern React development.

> Hooks let you use state and other React features without writing a class.

### Why Use Hooks?

- **Simpler Code**: Write cleaner, more readable components
- **Code Reusability**: Share stateful logic between components
- **Better Testing**: Easier to test in isolation

## Common Hooks

### useState

The `useState` hook lets you add state to functional components.

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

The `useEffect` hook lets you perform side effects in functional components.

```javascript
import { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
```

## Best Practices

1. **Only call hooks at the top level** - Don''t call hooks inside loops or conditions
2. **Use the ESLint plugin** - Install `eslint-plugin-react-hooks`
3. **Keep side effects organized** - Use multiple `useEffect` calls for different concerns
4. **Memoize expensive computations** - Use `useMemo` for heavy calculations

## Conclusion

React Hooks are a powerful way to write modern React applications. By mastering hooks, you''ll write cleaner, more maintainable code.',
  'https://images.unsplash.com/photo-1633356713697-4f4db09c97f5?w=1200&h=630&fit=crop',
  'Master React Hooks in 2025 | Complete Guide',
  'Learn React Hooks with practical examples. Understand useState, useEffect, and custom hooks.',
  ARRAY[''react'', ''javascript'', ''hooks'', ''tutorial''],
  'Sarah Johnson',
  ARRAY[''React'', ''JavaScript'', ''Web Development'', ''Hooks''],
  'Technology',
  NOW() - INTERVAL ''5 days'',
  true
);
```

#### 6. Verify Installation
```bash
npm run lint
```

This checks for any linting errors in the codebase.

### Build & Run Instructions

#### Development Mode
Start the development server with Turbopack for fast compilation:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Pages auto-refresh as you edit files.

#### Production Build
Create an optimized production build:
```bash
npm run build
```

#### Start Production Server
Run the production-built application:
```bash
npm start
```

#### Linting
Check code for style and quality issues:
```bash
npm run lint
```

**Typical Development Workflow:**
```bash
1. npm install                 # One-time setup
2. npm run dev                # Start dev server
3. Edit files in src/         # Make changes
4. Browser auto-refreshes     # View changes
5. Ctrl+C                     # Stop dev server when done
```

---

## 6. Configuration

### Configuration Files Overview

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js runtime configuration (images, redirects, etc.) |
| `tsconfig.json` | TypeScript compiler options and path aliases |
| `postcss.config.mjs` | PostCSS plugins (Tailwind CSS, Autoprefixer) |
| `eslint.config.mjs` | ESLint linting rules and configuration |
| `.env.local` | Local environment variables (not committed) |
| `package.json` | Project metadata, dependencies, and scripts |

### Next.js Configuration (`next.config.ts`)

**Current Configuration:**
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pkjgladwgxzyqamrwnds.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};
```

**Key Settings:**
- **Remote Images**: Allows image optimization for Supabase-hosted images
- **Unoptimized Images**: Disables image optimization in development for faster builds

### TypeScript Configuration (`tsconfig.json`)

**Key Features:**
- **Target**: ES2017 (compatible with most browsers)
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` resolves to `./src/*`
- **JSX Handling**: React 19 JSX transform

### Tailwind CSS Configuration

Configured through `postcss.config.mjs` with:
- Animation utilities
- Typography plugin for prose styling
- Vite plugin for development

### ESLint Configuration (`eslint.config.mjs`)

Uses ESLint 9 with Next.js recommended rules for code quality.

### Environment-Specific Settings

#### Development
- Turbopack bundler enabled (`npm run dev`)
- Hot module reloading enabled
- Source maps enabled for debugging
- Image unoptimization for faster builds

#### Production
- Standard Webpack bundler
- Optimized image serving with Next.js Image
- Tree-shaking and minification enabled
- SEO meta tags and structured data

---

## 7. Usage Guide

### How to Use the Application

#### For Users
1. **Browse AI Tools**
   - Visit the home page
   - Use search bar to find tools
   - Filter by category (Content Creation, Productivity, Coding, Marketing, Trading)
   - Click tool cards to visit tool websites

2. **Read Blog Posts**
   - Navigate to `/blog` or click "Blog" in navbar
   - Browse published blog post cards with cover images, excerpts, and metadata
   - Click on a post to read full markdown content with syntax-highlighted code blocks
   - Share posts using social sharing buttons (Twitter, LinkedIn, WhatsApp, Email, Facebook, Reddit)
   - View author information, publication date, and reading time estimate

3. **Submit a Tool**
   - Go to "List a Website" page
   - Fill out the tool submission form
   - Submit for review

#### For Developers

##### Adding a New Blog Post (Via Supabase Dashboard)

**Method 1: Using Supabase Dashboard UI**

1. Go to Supabase Dashboard → Your Project → SQL Editor
2. Create a new query with the insert statement:
```sql
INSERT INTO blog_post (
  title,
  slug,
  excerpt,
  content_md,
  cover_image_url,
  seo_title,
  seo_description,
  seo_keywords,
  author,
  tags,
  category,
  published_at,
  is_published
) VALUES (
  'My New Blog Post',
  'my-new-blog-post',
  'Short excerpt that appears in blog listing',
  '# My New Blog Post

## Introduction

This is the main content in **markdown format**.

### Code Example

```javascript
const hello = "world";
console.log(hello);
```

## Conclusion

Thanks for reading!',
  'https://images.unsplash.com/photo-example?w=1200&h=630',
  'My New Blog Post | SEO Title',
  'Meta description for search engines and social sharing',
  ARRAY['ai', 'tools', 'tutorial'],
  'Your Name',
  ARRAY['AI', 'Technology', 'Tutorial'],
  'Technology',
  NOW(),
  true
);
```

3. Execute the query
4. Post is immediately available at `/blog/my-new-blog-post`

**Method 2: Using Supabase Table Editor**

1. Go to Supabase Dashboard → Table Editor
2. Select `blog_post` table
3. Click "Insert Row"
4. Fill in the fields:
   - `title`: Blog post title
   - `slug`: URL-friendly version (lowercase, hyphens only)
   - `excerpt`: Short preview text
   - `content_md`: Full markdown content
   - `cover_image_url`: Featured image URL
   - `seo_title`: Title for search engines
   - `seo_description`: Meta description
   - `seo_keywords`: Array of keywords
   - `author`: Author name
   - `tags`: Array of topic tags
   - `category`: Post category
   - `published_at`: Publication date/time
   - `is_published`: Check to publish
5. Click "Save"

**Important Notes:**
- The `slug` field must be unique and URL-safe (lowercase, hyphens, no special characters)
- `content_md` must be valid **Markdown** format (not HTML)
- To unpublish a post, set `is_published` to `false` instead of deleting
- The post automatically becomes available at `/blog/{slug}`

##### Writing Blog Post Markdown Content

Follow this structure for best results:

```markdown
# Main Title (H1)

Use H1 for the post title. Usually only one per post.

## Section Heading (H2)

H2 headings break up the content into major sections.

### Subsection (H3)

Use H3 for subsections within major sections.

### Code Examples

Always specify the language identifier:

\`\`\`javascript
// Good - syntax highlighting enabled
const name = "John";
console.log(name);
\`\`\`

### Lists

Unordered lists:
- Item 1
- Item 2
- Nested item
  - Sub-item

Ordered lists:
1. First step
2. Second step
3. Third step

### Important Notes

Use blockquotes for important information:

> This is an important message that readers should pay attention to.

### Links and Images

[Link text](https://example.com)
[Internal link](/about)

![Alt text describing the image](https://images.unsplash.com/photo-1633356713697-4f4db09c97f5)

Use descriptive alt text for accessibility.

### Tables

| Feature | Description | Example |
|---------|-------------|---------|
| Markdown | Simple format | Use GFM syntax |
| SEO | Optimized | Set seo_title, seo_description |
| Tags | Categorize | Add to tags array |

---

Thanks for reading!
```

##### Adding UI Components from Shadcn/UI

To add a new UI component (button, card, dialog, etc.):

```bash
npx shadcn-ui@latest add [component-name]
# Example:
npx shadcn-ui@latest add dialog
```

Then import and use:
```tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function MyComponent() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <DialogContent>
        <p>Dialog content here</p>
      </DialogContent>
    </Dialog>
  );
}
```

##### Creating a New Page

Pages are created in `src/app/`:

```tsx
// src/app/my-page/page.tsx
export const metadata = {
  title: 'My Page | Tools Herd AI',
  description: 'Page description',
};

export default function MyPage() {
  return (
    <main>
      <h1>Welcome to My Page</h1>
      <p>Content goes here</p>
    </main>
  );
}
```

Page is automatically available at `/my-page`

##### Fetching Blog Posts in Components

```typescript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BlogPost, RawBlogPost } from '@/lib/types';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_post')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;

        // Transform RawBlogPost to BlogPost
        const transformed = (data as RawBlogPost[]).map(post => ({
          id: post.id ?? 0,
          title: post.title ?? 'Untitled',
          slug: post.slug ?? '',
          excerpt: post.excerpt ?? null,
          coverImageUrl: post.cover_image_url ?? null,
          publishedAt: new Date(post.published_at || new Date()),
          author: post.author ?? null,
          content: post.content_md ?? '',
          createdAt: new Date(post.created_at || new Date()),
          updatedAt: new Date(post.updated_at || new Date()),
          tags: post.tags,
          category: post.category,
        }));

        setPosts(transformed);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-6">
      {posts.map(post => (
        <article key={post.id} className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
            Read More →
          </a>
        </article>
      ))}
    </div>
  );
}
```

### Example Commands & Workflows

```bash
# Development workflow
npm install              # Install dependencies
npm run dev             # Start dev server
# Edit src/ files
# Changes auto-reload in browser

# Production workflow
npm run build           # Create optimized build
npm start              # Start production server
npm run lint           # Check code quality

# Database management
# Use Supabase dashboard for SQL queries
# Or use Supabase CLI for advanced operations
```

---

## 8. API Documentation

### Supabase Database API - Blog Post Operations

The application uses Supabase's JavaScript client library to interact with PostgreSQL. All data operations go through `src/lib/supabaseClient.ts`.

#### Database Queries

##### Get All Published Blog Posts (with Pagination)
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .select('*')
  .eq('is_published', true)
  .order('published_at', { ascending: false });

if (error) {
  console.error('Failed to fetch posts:', error.message);
} else {
  console.log('Posts retrieved:', data);
}
```

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Introduction to React Hooks",
    "slug": "introduction-to-react-hooks",
    "excerpt": "Learn how to use React Hooks to manage state and side effects...",
    "content_md": "# Introduction to React Hooks\n\nReact Hooks revolutionized...",
    "cover_image_url": "https://images.unsplash.com/photo-1633356713697-4f4db09c97f5",
    "seo_title": "Master React Hooks in 2025 | Complete Guide",
    "seo_description": "Learn React Hooks with practical examples. Understand useState, useEffect, and custom hooks.",
    "seo_keywords": ["react", "javascript", "hooks", "tutorial"],
    "author": "Sarah Johnson",
    "tags": ["React", "JavaScript", "Web Development", "Hooks"],
    "category": "Technology",
    "published_at": "2025-01-04T00:00:00Z",
    "created_at": "2025-01-04T10:30:00Z",
    "updated_at": "2025-01-04T10:30:00Z",
    "is_published": true
  }
]
```

##### Get Single Blog Post by Slug (Dynamic Route)
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .select('*')
  .eq('slug', 'introduction-to-react-hooks')
  .eq('is_published', true)
  .single();

if (error) {
  console.error('Post not found:', error.message);
  // Return 404 or "not found" message
} else {
  console.log('Post:', data);
  // Render blog post content
}
```

**Used in:** `src/app/blog/[slug]/page.tsx` - Server-side rendering for SEO

##### Get Posts by Category
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .select('*')
  .eq('category', 'Technology')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

##### Get Posts by Tags
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .select('*')
  .contains('tags', ['React'])
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

##### Insert New Blog Post
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .insert([{
    title: 'New Blog Post',
    slug: 'new-blog-post',
    excerpt: 'This is a new blog post excerpt.',
    content_md: '# New Blog Post\n\nContent in markdown format...',
    cover_image_url: 'https://images.unsplash.com/photo-example',
    seo_title: 'New Blog Post | SEO Title',
    seo_description: 'Meta description for search engines',
    seo_keywords: ['ai', 'tools', 'tutorial'],
    author: 'Author Name',
    tags: ['AI', 'Technology'],
    category: 'Technology',
    published_at: new Date().toISOString(),
    is_published: true
  }])
  .select();

if (error) {
  console.error('Insert failed:', error.message);
} else {
  console.log('Post created:', data);
}
```

##### Update Existing Blog Post
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .update({
    title: 'Updated Title',
    content_md: '# Updated Content\n\nNew markdown content...',
    updated_at: new Date().toISOString()
  })
  .eq('id', 1)
  .select();

if (error) {
  console.error('Update failed:', error.message);
} else {
  console.log('Post updated:', data);
}
```

##### Soft Delete: Unpublish a Blog Post
```typescript
import { supabase } from '@/lib/supabaseClient';

// Instead of deleting, we set is_published to false
const { data, error } = await supabase
  .from('blog_post')
  .update({
    is_published: false,
    updated_at: new Date().toISOString()
  })
  .eq('id', 1)
  .select();
```

##### Hard Delete: Permanently Remove a Post
```typescript
import { supabase } from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('blog_post')
  .delete()
  .eq('id', 1);

if (error) {
  console.error('Delete failed:', error.message);
}
```

#### Markdown Content Tips

All blog posts store content in **Markdown format** in the `content_md` field. The markdown is rendered on the client-side using `react-markdown` with GitHub-flavored markdown (GFM) support.

**Markdown Features Supported:**

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text** and *italic text*

- Unordered list
- List item 2

1. Ordered list
2. Item 2

> Blockquote
> Multi-line support

[Link text](https://example.com)

![Image alt](https://image-url.jpg)

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

\`\`\`javascript
// Code block with syntax highlighting
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

\`inline code\`

---

Horizontal rule
```

### Client Library & Configuration

- **Library**: `@supabase/supabase-js` v2.57.4
- **Initialization**: `src/lib/supabaseClient.ts`
- **Documentation**: [Supabase JavaScript Library Docs](https://supabase.com/docs/reference/javascript)
- **Real-time Features**: Supabase supports real-time subscriptions (not yet implemented in blog)

---

## 9. Data Flow & Logic

### Complete Data Flow - From Supabase to Browser

```
Supabase PostgreSQL Database (blog_post table)
       ↓
supabaseClient.ts (Initialize Supabase connection with keys)
       ↓
React Component or Page (useEffect hook / Server component)
       ↓
Fetch Query (select, filter, order, limit)
       ↓
Transform Data (RawBlogPost → BlogPost interface)
       ↓
Render Component (BlogPostCard, MarkdownRenderer, etc.)
       ↓
Browser Display (HTML with styled content)
```

### Blog Post Data Flow - Step by Step

**Step 1: Blog Listing Page** (`src/app/blog/page.tsx`)
```
1. Component mounts
2. useEffect triggers on mount
3. Query: SELECT * FROM blog_post WHERE is_published = true ORDER BY published_at DESC
4. Response: Array of RawBlogPost objects
5. Transform to BlogPost interface (camelCase field names)
6. setState(transformedPosts)
7. Render BlogPostCard components in grid
8. User clicks on a post card
```

**Step 2: Dynamic Blog Post Page** (`src/app/blog/[slug]/page.tsx`)
```
1. User visits /blog/{slug}
2. Next.js extracts {slug} from URL
3. Server-side code runs (generateMetadata function)
4. Query: SELECT * FROM blog_post WHERE slug = '{slug}' AND is_published = true
5. Response: Single RawBlogPost object
6. Generate SEO metadata (title, description, OpenGraph, Twitter cards)
7. Transform RawBlogPost to BlogPost interface
8. Pass post.content_md to MarkdownRenderer
9. MarkdownRenderer converts markdown to JSX
10. Browser renders fully styled blog post with:
    - Featured image
    - Meta information (author, date, reading time)
    - Markdown content (with syntax highlighting in code blocks)
    - Social sharing buttons
    - JSON-LD structured data script tag
```

**Step 3: Markdown Rendering Pipeline** (Most important!)
```
Markdown Input (content_md from database)
       ↓
MarkdownRenderer component (src/components/MarkdownRenderer.tsx)
       ↓
react-markdown library (parses markdown syntax)
       ↓
remark plugins:
  - remark-gfm (GitHub-Flavored Markdown support)
  - remark-breaks (Line break handling)
       ↓
Component rendering:
  - h1 → <h1 className="text-4xl font-bold mt-8 mb-4">
  - h2 → <h2 className="text-3xl font-bold mt-8 mb-4">
  - p → <p className="text-slate-900 leading-relaxed my-4">
  - code (inline) → <code className="bg-slate-100 px-2 py-1 rounded">
  - code (block) → CodeBlock component (with syntax highlighting)
  - a → <a target="_blank" rel="noopener noreferrer">
  - img → <figure> with caption
  - li, ul, ol → Styled lists
  - blockquote → Styled blockquote
  - table → Styled table
       ↓
JSX Output (React elements)
       ↓
Browser Rendering (HTML + Tailwind CSS styles)
```

### Key Business Logic

#### 1. Reading Time Calculation
```typescript
// From src/lib/blogUtils.ts
calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;  // Average reading speed
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);  // Round up
}

// Example: 2000 words = 10 minutes reading time
```

#### 2. Date Formatting
```typescript
// Display formats
formatDate(new Date()) 
// Returns: "January 4, 2025"

formatDateISO(new Date()) 
// Returns: "2025-01-04" (for SEO/API)
```

#### 3. Slug Generation & Validation
```typescript
// Slugs are manually created when inserting posts
// Must be:
// - URL-safe (lowercase, hyphens only)
// - Unique (enforced by database unique constraint)
// - Descriptive

// Examples:
// "introduction-to-react-hooks"
// "best-ai-tools-2025"
// "how-to-use-supabase"
```

#### 4. SEO Metadata Generation
```typescript
// From src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPostBySlug(slug);
  
  return {
    // Basic meta
    title: post.seo_title || post.title,  // Use SEO title if available
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords,
    
    // Open Graph (social media sharing)
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImageUrl }],
    },
    
    // Twitter Card (Twitter sharing)
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      creator: `@${post.author}`,
      images: [post.coverImageUrl],
    },
  };
}
```

#### 5. Markdown Content Rendering
The markdown rendering uses GitHub-Flavored Markdown (GFM):

```typescript
// src/components/MarkdownRenderer.tsx
const MarkdownRenderer = ({ content, className }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        // Custom component rendering for each element
        h1: (props) => <h1 className="text-4xl font-bold mt-8">{props.children}</h1>,
        h2: (props) => <h2 className="text-3xl font-bold mt-8">{props.children}</h2>,
        p: (props) => <p className="leading-relaxed my-4">{props.children}</p>,
        code: (props) => {
          // Code blocks use CodeBlock component
          if (props.className?.startsWith('language-')) {
            return <CodeBlock {...props} />;
          }
          // Inline code
          return <code className="bg-slate-100 px-2 py-1">{props.children}</code>;
        },
        // ... more component mappings
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
```

#### 6. Code Block Syntax Highlighting
```typescript
// src/components/CodeBlock.tsx
// Uses code-block-highlighter or similar library
// Features:
// - Language detection from markdown fence (e.g., ```javascript)
// - Syntax highlighting (colors for keywords, strings, etc.)
// - Copy-to-clipboard button
// - Line numbers (optional)
// - Dark theme styling
```

### Data Transformation Pipeline

**RawBlogPost (from database)** → **BlogPost (internal interface)**

```typescript
// types.ts defines both interfaces

// RawBlogPost (snake_case, matches database columns)
interface RawBlogPost {
  id?: number;
  title?: string;
  excerpt?: string | null;
  cover_image_url?: string | null;  // ← snake_case
  slug?: string;
  published_at?: string;            // ← snake_case
  author?: string | null;
  content_md?: string;              // ← snake_case
  created_at?: string;              // ← snake_case
  updated_at?: string;              // ← snake_case
  tags?: string[];
  category?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  is_published?: boolean;
}

// BlogPost (camelCase, used throughout app)
interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;    // ← camelCase
  slug: string;
  publishedAt: Date;               // ← camelCase, typed as Date
  author: string | null;
  content: string;                 // ← renamed from content_md
  createdAt: Date;                 // ← camelCase, typed as Date
  updatedAt: Date;                 // ← camelCase, typed as Date
  tags?: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Transformation code (from blog/page.tsx)
const transformed: BlogPost = {
  id: row.id ?? 0,
  title: row.title ?? 'Untitled',
  slug: row.slug ?? '',
  excerpt: row.excerpt ?? null,
  coverImageUrl: row.cover_image_url ?? null,
  publishedAt: new Date(row.published_at || new Date()),
  author: row.author ?? null,
  content: row.content_md ?? '',
  createdAt: new Date(row.created_at || new Date()),
  updatedAt: new Date(row.updated_at || new Date()),
  tags: row.tags,
  category: row.category,
};
```

### Important Assumptions & Edge Cases

| Scenario | Current Handling | Notes |
|----------|------------------|-------|
| Post not found (wrong slug) | Return 404 from `generateMetadata` | Handled gracefully |
| Unpublished post | Filtered via `is_published = false` query | Won't appear in any list |
| Missing cover image | Fallback to `/og-image.png` in OG tags | Always has image for social sharing |
| No author specified | Default to empty string or "Anonymous" | Optional field |
| Empty markdown content | Still renders (empty page) | Should be prevented at insert time |
| Missing SEO fields | Use post title/excerpt as fallback | Better than empty meta tags |
| Very long article (10,000+ words) | Reading time calculated (50+ min) | No truncation, full content displayed |
| External links in markdown | Opened with `target="_blank"` | Security: `rel="noopener noreferrer"` added |
| Code blocks without language | Rendered as plain text | Language identifier recommended |
| Images in markdown | Rendered with responsive sizing | Uses `max-w-full h-auto` classes |
| Multiple H1 headings | All rendered (semantically wrong) | Best practice: use only one H1 |
| Relative image paths | Not resolved (must use absolute URLs) | All images must be from external sources |

---

## 10. Testing

### Testing Strategy

**Current Status**: No automated tests implemented (**PLACEHOLDER - TO BE IMPLEMENTED**)

### Recommended Testing Approach

#### Unit Tests (Components & Utilities)
- Test individual components in isolation
- Test utility functions (blogUtils.ts, etc.)
- Framework: **Jest** + **React Testing Library**

#### Integration Tests
- Test data flow from Supabase to components
- Test page rendering with real data
- Framework: **Playwright** or **Cypress**

#### E2E Tests
- Test complete user workflows
- Test blog post discovery and reading
- Framework: **Playwright** or **Cypress**

#### Manual Testing Checklist
- [ ] Home page loads and displays tools
- [ ] Search/filter works on home page
- [ ] Blog listing page shows all posts
- [ ] Blog post renders markdown correctly
- [ ] Code blocks display with syntax highlighting
- [ ] Social sharing buttons work
- [ ] Meta tags present in page HTML
- [ ] Responsive design on mobile/tablet
- [ ] Dark mode toggle works
- [ ] All links are functional

### How to Run Tests (When Implemented)

```bash
# Unit tests
npm run test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# Watch mode
npm run test:watch
```

---

## 11. Deployment

### Deployment Process

#### Recommended Hosting
**Vercel** (official Next.js hosting) - Recommended
- Zero-config deployments
- Automatic preview deployments for PRs
- Built-in CI/CD
- Free tier available

**Alternative Options:**
- **Netlify** - Next.js support, easy deploys
- **Railway** - Full-stack hosting
- **Self-hosted** - VPS (DigitalOcean, Linode, AWS EC2)

### Deploying to Vercel

#### Step 1: Push to Git Repository
```bash
git add .
git commit -m "Deployment ready"
git push origin main
```

#### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Select project root
5. Click "Deploy"

#### Step 3: Configure Environment Variables
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
3. Click "Save"

#### Step 4: Custom Domain (Optional)
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

### CI/CD Pipeline (Recommended Setup)

**GitHub Actions** (automatic with Vercel):

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run lint
      # Deploy to Vercel (automatic if connected)
```

### Database Migrations

For Supabase migrations:

1. Make schema changes in Supabase Dashboard
2. Or run SQL migrations:
   ```bash
   # Using Supabase CLI
   supabase db push
   ```

3. Test in staging environment
4. Deploy to production

### Hosting & Infrastructure Details

| Component | Hosting | Details |
|-----------|---------|---------|
| Next.js Application | Vercel / Your VPS | Auto-scales, CDN included |
| PostgreSQL Database | Supabase (AWS/GCP) | Managed, auto-backups |
| Static Assets | Vercel CDN / Supabase Storage | Globally distributed |
| Image Serving | Next.js Image + Supabase | Optimized via Next.js |
| DNS/Domain | Your registrar | Cloudflare optional |

---

## 12. Known Issues & Limitations

### Current Issues

- **No Authentication**: User accounts/login not yet implemented
- **No Comments System**: Comment section not available (planned)
- **Limited Search**: Simple text search only (full-text search planned)
- **No Admin Dashboard**: Content management via Supabase UI only
- **No API Endpoints**: External API not exposed

### Technical Debt

- **Test Coverage**: 0% - no automated tests implemented
- **Documentation**: Could include more inline code comments
- **Component Prop Validation**: Some components missing PropTypes/Zod validation
- **Error Handling**: Could be more comprehensive in data fetching
- **Performance**: Image lazy-loading could be optimized further

### Performance & Scalability Concerns

| Concern | Current Status | Mitigation |
|---------|---|---|
| Database Queries | N/A - Supabase handles | Use connection pooling |
| Image Serving | Optimized via Next.js | CDN via Vercel |
| Blog Post Count | No limit set | Implement pagination at 100+ posts |
| Concurrent Users | Depends on Supabase tier | Scale Supabase plan as needed |
| SEO Crawling | No rate limiting | Robots.txt limits crawl rate |

---

## 13. Contribution Guidelines

### Coding Standards

#### TypeScript
- Use strict mode (enabled in tsconfig.json)
- Always define component prop types
- Use interfaces over types for objects
- Example:
```typescript
interface BlogPostProps {
  title: string;
  content: string;
  author?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ title, content, author }) => {
  // ...
};
```

#### React Components
- Prefer functional components with hooks
- Use `React.FC` type for function components
- Keep components focused and reusable
- Use descriptive variable names
- Example:
```typescript
'use client'; // Add if using client features

import React from 'react';

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};
```

#### Styling
- Use Tailwind CSS utility classes
- Avoid inline styles
- Keep custom CSS in dedicated files
- Example:
```tsx
<div className="flex items-center gap-4 p-6 bg-slate-50 rounded-lg">
  {/* content */}
</div>
```

### Branching Strategy

**Git Flow** (simplified):

```
main (production-ready)
  ↑
develop (integration branch)
  ↑
feature/* (feature branches)
  ↑
bugfix/* (bug fix branches)
```

**Branch Naming:**
- Feature: `feature/add-comments-system`
- Bug Fix: `bugfix/markdown-rendering-issue`
- Hotfix: `hotfix/critical-seo-bug`

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (no logic change)
- `refactor` - Code refactor
- `test` - Adding/updating tests
- `chore` - Maintenance

**Examples:**
```
feat(blog): add reading time estimation
fix(markdown): handle code block edge cases
docs: update installation instructions
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make commits with descriptive messages
3. Push to GitHub
4. Create Pull Request with:
   - Clear description
   - Related issues linked
   - Screenshots if UI changes
5. Request code review
6. Address review comments
7. Merge when approved

---

## 14. Maintenance Notes (Important for AI Assistants)

### Common Tasks an AI May Be Asked to Perform

| Task | Key Files | Difficulty |
|------|-----------|------------|
| Add new blog feature | `src/app/blog/`, `src/components/` | Medium |
| Fix markdown rendering | `src/components/MarkdownRenderer.tsx` | Low |
| Add new page | `src/app/[path]/page.tsx` | Low |
| Optimize performance | `src/app/`, `next.config.ts` | High |
| Update SEO metadata | `src/app/layout.tsx`, `src/app/blog/[slug]/page.tsx` | Low |
| Add new UI component | `src/components/ui/` | Low |
| Database schema change | `sql/` scripts, Supabase | Medium |
| Fix styling issues | `src/app/globals.css`, `markdown-content.css` | Low |
| Implement authentication | `src/lib/supabaseClient.ts`, new auth pages | High |

### Files Most Frequently Modified

**High-Change Files** (expect these to change often):
1. `src/app/page.tsx` - Home page content/layout
2. `src/components/Navbar.tsx` - Navigation changes
3. `src/app/layout.tsx` - Global layout/metadata
4. `src/lib/blogUtils.ts` - Blog utility functions
5. `src/components/MarkdownRenderer.tsx` - Markdown rendering

**Moderate-Change Files**:
- `src/components/BlogPostComponent.tsx` - Blog display
- `src/app/blog/[slug]/page.tsx` - Blog post page
- `next.config.ts` - Build configuration

**Stable Files** (rarely change):
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `src/lib/types.ts` - Data types
- `src/lib/supabaseClient.ts` - DB config

### Areas Requiring Extra Caution

⚠️ **Critical Areas - Approach with care:**

1. **Blog Post Rendering Pipeline**
   - Location: `MarkdownRenderer.tsx`, `CodeBlock.tsx`
   - Risk: Changes affect all blog post displays
   - Mitigation: Test with various markdown content types
   - Note: GFM support is essential for user content

2. **SEO Metadata Generation**
   - Location: `src/app/blog/[slug]/page.tsx`
   - Risk: Broken metadata impacts search rankings
   - Mitigation: Validate Open Graph tags are present
   - Note: Test with Social Media preview tools

3. **Supabase Client Initialization**
   - Location: `src/lib/supabaseClient.ts`
   - Risk: Database connection issues affect entire app
   - Mitigation: Test with actual Supabase instance
   - Note: Environment variables must be correct

4. **TypeScript Types**
   - Location: `src/lib/types.ts`
   - Risk: Type mismatches cause runtime errors
   - Mitigation: Run type checks (`npm run lint`)
   - Note: Keep interfaces in sync with DB schema

### Debugging Tips for AI Assistants

```typescript
// Enable detailed logging in development
console.log('Post data:', postData);
console.debug('Metadata:', generateMetadata());

// Check Supabase connection
const { error } = await supabase.from('blog_post').select('count(*)');
if (error) console.error('DB Error:', error.message);

// Validate markdown rendering
console.log('Markdown input:', content);
console.log('Rendered HTML:', renderedContent);
```

### Performance Optimization Areas

1. **Image Loading** - Use `next/image` with `priority` prop carefully
2. **Database Queries** - Pagination for large result sets
3. **Component Rendering** - Use `React.memo` for heavy components
4. **Bundle Size** - Monitor with `next/bundle-analyzer`

---

## 15. License & Author

### License
**[Placeholder - Please specify]**

Recommended licenses:
- **MIT License** - Permissive, allows commercial use
- **Apache 2.0** - Includes patent protection
- **GPL 3.0** - Copy-left, requires open source
- **Proprietary** - Private/commercial use only

### Author & Maintainer

**Project**: Tools Herd AI
**Maintainer**: [Your Name / Team]
**Repository**: [Your GitHub URL]
**Website**: https://toolsherd.ai/
**Contact**: [Your contact email]

### Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) (if available) or follow the Contribution Guidelines section above.

### Support
For issues, feature requests, or questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/toolsherd/issues)
- Email: [Your contact email]
- Website: https://toolsherd.ai/contact

---

## Additional Resources

### Documentation Files
- [BLOG_SYSTEM_DOCS.md](BLOG_SYSTEM_DOCS.md) - Detailed blog system documentation
- [BLOG_SETUP_EXAMPLES.md](BLOG_SETUP_EXAMPLES.md) - Setup examples and SQL scripts
- [BLOG_COMPONENTS_EXAMPLES.md](BLOG_COMPONENTS_EXAMPLES.md) - Component usage examples
- [BLOG_IMPLEMENTATION.md](BLOG_IMPLEMENTATION.md) - Implementation details

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shadcn/UI Documentation](https://ui.shadcn.com)

### Tools & Services
- [Vercel](https://vercel.com) - Hosting & Deployment
- [Supabase](https://supabase.com) - Backend & Database
- [GitHub](https://github.com) - Version Control

---

**Last Updated**: January 4, 2026
**Version**: 1.0.0
**Status**: Active Development

---

## Quick Reference

### Most Important Links
- **Live Site**: https://toolsherd.ai/
- **Repository**: [GitHub Link]
- **Supabase Project**: https://app.supabase.com/
- **Vercel Dashboard**: https://vercel.com/dashboard/

### Command Reference
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Check code quality
```

### File Structure Quick Reference
```
src/
  ├── app/          # Pages & routes
  ├── components/   # React components
  ├── lib/          # Utilities & config
  └── hooks/        # Custom React hooks
```

---

**End of README.md**
