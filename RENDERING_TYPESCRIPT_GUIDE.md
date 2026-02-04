# Complete Rendering Process: Tools & Blog with TypeScript

## Overview

This guide explains how **Tools** and **Blog** pages are rendered in the Next.js application, with focus on:
- Dynamic slug-based routing (`[slug]`)
- TypeScript types and interfaces
- Data fetching from Supabase
- Component rendering pipeline

---

## 📁 Folder Structure

```
src/app/
├── tools/
│   ├── page.tsx          # List all tools
│   └── [slug]/
│       └── page.tsx      # Individual tool detail page (dynamic)
├── blog/
│   ├── page.tsx          # List all blog posts
│   └── [slug]/
│       └── page.tsx      # Individual blog post (dynamic + SSR)
├── layout.tsx            # Root layout
└── ...other routes

src/lib/
├── types.ts              # TypeScript interfaces
├── categoryMapping.ts    # Category configs
└── supabaseClient.ts     # Database connection

src/components/
├── ui/                   # UI components (Card, Badge, Button)
└── ...other components
```

---

## 🔷 TypeScript Types & Interfaces

### 1. Blog Types (src/lib/types.ts)

```typescript
// Client-side type (after transformation)
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  slug: string;
  publishedAt: Date;           // JavaScript Date object
  author: string | null;
  content: string;             // Markdown content
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Database type (raw from Supabase)
export interface RawBlogPost {
  id?: number;
  title?: string;
  excerpt?: string | null;
  cover_image_url?: string | null;  // snake_case in DB
  slug?: string;
  published_at?: string;             // ISO string from DB
  author?: string | null;
  content_md?: string;              // stored as Markdown
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  category?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  is_published?: boolean;           // Publish status
}
```

**Key Differences:**
- `RawBlogPost`: How data comes from Supabase (snake_case, strings)
- `BlogPost`: How we use it in React (camelCase, Date objects)

### 2. Tool Types

```typescript
// In /tools/page.tsx
type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
};

// In /tools/[slug]/page.tsx
interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  website_url?: string;           // Optional fields
  url?: string;
  detailed_description?: string;
  rating?: number;
  user_count?: number;
  tags?: string[];
}
```

### 3. Category Types

```typescript
// Blog categories (unique from tools)
export const blogCategories = [
  { id: 'ai-for-students', name: 'AI for Students & Education' },
  { id: 'ai-finance', name: 'AI in Finance & Money' },
  { id: 'ai-future-tech', name: 'Future AI Tech (ML, Edge, Robotics)' },
  // ... 10 more categories
];

// Tool categories (mapped to database values)
export const categoryMapping: Record<string, string[]> = {
  ai_agents: ['ai_agents', 'agents'],
  agentic_ai: ['agentic_ai', 'agentic'],
  no_code_ai: ['no_code_ai', 'no-code', 'nocode'],
  // ... 10 more categories
};
```

---

## 🌐 Rendering Pipeline

### A. TOOLS LIST PAGE (/tools)

#### 1. **Route Definition**
```
File: src/app/tools/page.tsx
Route: /tools
Type: Client Component ('use client')
```

#### 2. **Component Setup**
```typescript
'use client';

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);     // TypeScript: Tool array
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
}
```

**TypeScript Concepts:**
- `useState<Tool[]>([])` → Generic type for state
- Optional chaining: `tool?.imageUrl`
- Type unions: `string | null`

#### 3. **Data Fetching**
```typescript
const fetchTools = async () => {
  try {
    const { data, error } = await supabase
      .from('ai_tools')                    // Database table
      .select('*')                         // Get all columns
      .eq('is_published', true)            // Filter: only published
      .order('created_at', { ascending: false });

    if (error) throw error;
    setTools(data as Tool);                // Type cast: data → Tool[]
  } catch (e) {
    console.error('Error:', e);
  }
};
```

**TypeScript Flow:**
1. Supabase returns raw data (unknown type)
2. Cast with `as Tool` to tell TypeScript type
3. Store in state with correct type

#### 4. **Filtering Logic**
```typescript
// Filter by category when selection changes
useEffect(() => {
  if (selectedCategory === "all") {
    setFilteredTools(tools);
  } else {
    // TypeScript: tools.filter() returns Tool[]
    setFilteredTools(
      tools.filter(tool => tool.category === selectedCategory)
    );
  }
}, [selectedCategory, tools]);
```

#### 5. **Rendering Cards**
```typescript
{filteredTools.map((tool) => (
  <Link key={tool.id} href={`/tools/${tool.slug}`}>
    <Card className="hover:border-cyan-400 transition">
      <CardContent>
        <Image
          src={tool.imageUrl}
          alt={tool.name}
          width={200}
          height={200}
          className="object-cover h-48"
        />
        <h3 className="text-lg font-bold text-cyan-300">
          {tool.name}
        </h3>
        <p className="text-slate-400">{tool.description}</p>
        <Badge>{getCategoryDisplayName(tool.category)}</Badge>
      </CardContent>
    </Card>
  </Link>
))}
```

**TypeScript Safety:**
- TypeScript knows `tool.name`, `tool.slug` exist (from Tool interface)
- Auto-completion in IDE
- Catch missing properties at compile time

---

### B. TOOLS DETAIL PAGE (/tools/[slug])

#### 1. **Dynamic Route Definition**
```
File: src/app/tools/[slug]/page.tsx
Route: /tools/:slug (dynamic segment)
Type: Client Component
Example URLs: /tools/chatgpt, /tools/claude, /tools/midjourney
```

#### 2. **Params Interface (TypeScript)**
```typescript
// Next.js passes params as Promise (async)
export default function ToolDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>  // TypeScript: params is Promise
}) {
  const { slug } = React.use(params);  // Unwrap Promise with React.use()
  const [tool, setTool] = useState<Tool | null>(null);
  //                                    ^^^^^^^^^^^^^^^^^
  //                                    Tool or null (might fail to load)
}
```

**Why Promise?**
- Next.js 13+ dynamic routes return Promise
- Allows async data fetching in params
- Must use `React.use()` to unwrap

#### 3. **Fetch Single Tool by Slug**
```typescript
useEffect(() => {
  const fetchTool = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('slug', slug)           // Find by slug (unique identifier)
        .single();                   // Return 1 item (not array)

      if (error) throw error;
      setTool(data as Tool);         // TypeScript cast
    } catch (e) {
      setError('Tool not found');
    }
  };
  fetchTool();
}, [slug]);                          // Re-fetch if slug changes
```

**TypeScript Pattern:**
```typescript
// Before: data is unknown
const { data, error } = await supabase.from('ai_tools').select('*').single();

// After: TypeScript knows it's Tool
setTool(data as Tool);
```

#### 4. **Conditional Rendering**
```typescript
if (loading) {
  return <div>Loading...</div>;
}

if (error || !tool) {
  //      Tool is definitely null here (TypeScript narrows type)
  return <div>Error: {error}</div>;
}

// TypeScript: tool is definitely not null anymore
return (
  <div>
    <h1>{tool.name}</h1>
    <p>{tool.description}</p>
    {tool.imageUrl && (
      <Image src={tool.imageUrl} alt={tool.name} />
    )}
    {tool.rating && <span>⭐ {tool.rating}</span>}
  </div>
);
```

**TypeScript Type Narrowing:**
- Before check: `tool: Tool | null`
- After `if (!tool) return`: `tool: Tool` (guaranteed not null)

---

### C. BLOG LIST PAGE (/blog)

#### 1. **Route Definition**
```
File: src/app/blog/page.tsx
Route: /blog
Type: Client Component
```

#### 2. **Type Transformation Pipeline**
```typescript
'use client';

const fetchBlogPosts = async () => {
  // STEP 1: Fetch raw data from Supabase
  const { data, error } = await supabase
    .from('blog_post')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  // STEP 2: Transform RawBlogPost → BlogPost
  const mapped: BlogPost[] = rows.map((row: RawBlogPost) => {
    // Transform snake_case to camelCase
    // Convert strings to Date objects
    return {
      id: row.id ?? 0,
      title: row.title ?? 'Untitled',
      excerpt: row.excerpt ?? null,
      coverImageUrl: row.cover_image_url ?? null,  // snake_case → camelCase
      slug: row.slug ?? '',
      publishedAt: row.published_at ? new Date(row.published_at) : new Date(),
      //           Convert ISO string to Date object
      author: row.author ?? null,
      content: row.content_md ?? '',
      createdAt: row.created_at ? new Date(row.created_at) : new Date(),
      updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
      category: row.category ?? 'ai-tools',
    };
  });

  // STEP 3: Store transformed data
  setBlogPosts(mapped);  // TypeScript: BlogPost[]
};
```

**TypeScript Concepts:**
- Type annotation: `: BlogPost[]`
- Nullish coalescing: `?? 'Untitled'`
- Type casting: `(row: RawBlogPost)`

#### 3. **Filtering by Category**
```typescript
const [selectedCategory, setSelectedCategory] = useState("all");
const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

useEffect(() => {
  if (selectedCategory === "all") {
    setFilteredPosts(blogPosts);
  } else {
    // TypeScript: array.filter() returns BlogPost[]
    setFilteredPosts(
      blogPosts.filter(post => post.category === selectedCategory)
    );
  }
}, [selectedCategory, blogPosts]);
```

#### 4. **Rendering Blog Cards**
```typescript
{filteredPosts.map((post) => (
  <Link key={post.id} href={`/blog/${post.slug}`}>
    <Card>
      {post.coverImageUrl && (
        <Image src={post.coverImageUrl} alt={post.title} />
      )}
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span>{formatDate(post.publishedAt)}</span>
      {post.author && <span>By {post.author}</span>}
    </Card>
  </Link>
))}
```

---

### D. BLOG DETAIL PAGE (/blog/[slug])

#### 1. **Route Definition**
```
File: src/app/blog/[slug]/page.tsx
Route: /blog/:slug
Type: Server Component (NOT 'use client')
Example URLs: /blog/ai-beginners-guide, /blog/chatgpt-tutorial
```

**Why Server Component?**
- Can generate SEO metadata dynamically
- Can use `async` directly in component
- Faster initial page load

#### 2. **Server Component Structure**
```typescript
import { Metadata } from 'next';  // TypeScript: Metadata interface

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate SEO metadata (server-side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;  // Async params in server component
  
  const postData = await fetchPost('blog_post');
  const row = postData[0];

  return {
    title: row.seo_title || row.title,
    description: row.seo_description || row.excerpt,
    keywords: row.seo_keywords || [],
    openGraph: {
      title: row.title,
      description: row.excerpt,
      images: [row.cover_image_url],
    },
  };
}

// Main component (Server Component)
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Fetch data directly in component (no useEffect needed)
  const postData = await fetchPost('blog_post');
  
  if (!postData?.length) {
    return <div>Post not found</div>;
  }

  const row = postData[0];
  
  // Transform RawBlogPost → BlogPost
  const post: BlogPost = {
    id: row.id ?? 0,
    title: row.title ?? 'Untitled',
    // ... rest of transformation
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Render blog content */}
    </div>
  );
}
```

**TypeScript Patterns:**
- `Props` interface for component props
- `Promise<Metadata>` return type
- `as BlogPost` type casting

#### 3. **Data Fetching in Server Component**
```typescript
// Direct async function (no hooks needed)
const fetchPost = async (table: string): Promise<RawBlogPost[]> => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('slug', slug)
    .limit(1);

  if (error) throw error;
  return (data ?? []) as RawBlogPost[];
};

// Call it directly (not in useEffect)
const postData = await fetchPost('blog_post');
```

#### 4. **Related Posts**
```typescript
// Fetch related posts by tags
if (post.tags && post.tags.length > 0) {
  const { data: allPostsData } = await supabase
    .from('blog_post')
    .select('*')
    .eq('is_published', true)
    .neq('slug', post.slug)
    .order('published_at', { ascending: false })
    .limit(20);

  // Filter: find posts with matching tags
  const relatedPosts = allPostsData?.filter((p: any) => {
    const postTags = p.tags || [];
    return post.tags.some((tag) => postTags.includes(tag));
  });
}
```

---

## 🔑 Key TypeScript Concepts Used

### 1. **Generics**
```typescript
const [tools, setTools] = useState<Tool[]>([]);
//                          ^^^^^^^^
//                          Generic type parameter
```
Allows functions/classes to work with any type.

### 2. **Interfaces**
```typescript
interface Tool {
  id: string;
  name: string;
  slug: string;
}
//      ↑ Defines shape of object
```
Contracts for object structure.

### 3. **Union Types**
```typescript
const [tool, setTool] = useState<Tool | null>(null);
//                                ^^^^^^^^^^
//                                Tool OR null
```
Value can be one of several types.

### 4. **Type Casting**
```typescript
const tool = data as Tool;
//          ^^^^^^^^^^^^^^
//          Tell TypeScript: treat data as Tool
```
Override TypeScript's type inference.

### 5. **Optional Properties**
```typescript
interface Tool {
  name: string;           // Required
  rating?: number;        // Optional (might be undefined)
}
```
`?` means property might not exist.

### 6. **Nullish Coalescing**
```typescript
const title = row.title ?? 'Untitled';
//             ^^^^^^^^^^^^
//             Use right side if left is null/undefined
```
Default value when null/undefined.

### 7. **Type Narrowing**
```typescript
if (!tool) return;
// After this line, TypeScript knows tool is NOT null
console.log(tool.name);  // ✅ No error
```
TypeScript refines type based on conditions.

---

## 📊 Data Flow Diagram

```
TOOLS LIST PAGE (/tools)
├─ fetchTools() [Supabase query]
│  └─ SELECT * FROM ai_tools WHERE is_published=true
├─ Transform: unknown → Tool[]
├─ Filter by category
└─ Render Card → Link to /tools/[slug]

    ↓ Click on tool card

TOOLS DETAIL PAGE (/tools/[slug])
├─ Extract slug from URL
├─ fetchTool(slug) [Supabase query]
│  └─ SELECT * FROM ai_tools WHERE slug='X'
├─ Transform: RawTool → Tool
└─ Render detailed page


BLOG LIST PAGE (/blog)
├─ fetchBlogPosts() [Supabase query]
│  └─ SELECT * FROM blog_post WHERE is_published=true
├─ Transform: RawBlogPost[] → BlogPost[]
├─ Filter by category
└─ Render Card → Link to /blog/[slug]

    ↓ Click on blog card

BLOG DETAIL PAGE (/blog/[slug]) [SERVER COMPONENT]
├─ generateMetadata(slug) → SEO tags
├─ fetchPost(slug) [Supabase query]
│  └─ SELECT * FROM blog_post WHERE slug='X'
├─ Transform: RawBlogPost → BlogPost
├─ Fetch related posts (by tags)
└─ Render: Title + Content + Related posts
```

---

## 🔍 Slug-Based Routing Explained

### Directory Structure
```
/app
  /tools
    page.tsx           → /tools (list page)
    /[slug]
      page.tsx         → /tools/:slug (detail page)
  /blog
    page.tsx           → /blog (list page)
    /[slug]
      page.tsx         → /blog/:slug (detail page)
```

### How Slug Works

1. **URL Pattern**: `/tools/chatgpt`
   - Route: `/tools/[slug]/page.tsx`
   - `slug = 'chatgpt'`

2. **Extract Slug**:
   ```typescript
   // Client Component
   const { slug } = React.use(params);  // Get from Promise

   // Server Component
   const { slug } = await params;        // Async await
   ```

3. **Query Database**:
   ```typescript
   .eq('slug', slug)  // Find where slug matches
   .single()          // Return one item
   ```

4. **Render Page**:
   ```typescript
   return <ToolDetail tool={tool} />;
   ```

---

## ✅ Best Practices

### 1. **Type Everything**
```typescript
// ❌ Bad
const tool = data;

// ✅ Good
const tool = data as Tool;
```

### 2. **Handle Nulls**
```typescript
// ❌ Bad
const title = tool.title;

// ✅ Good
const title = tool?.title ?? 'Untitled';
```

### 3. **Use Interfaces for Data**
```typescript
// ✅ Good
interface BlogPost { ... }
const [posts, setPosts] = useState<BlogPost[]>([]);

// Instead of any
const [posts, setPosts] = useState<any[]>([]);  // ❌ Bad
```

### 4. **Separate Raw & Transformed Types**
```typescript
// ✅ Good
RawBlogPost (from DB)    →    Transform    →    BlogPost (in React)
```

### 5. **Use Server Components for Static Content**
```typescript
// ✅ Good (Blog detail with SSG)
export default async function BlogPostPage() { ... }

// ⚠️ Client Component when interactive
'use client';
export default function BlogListPage() { ... }
```

---

## 🎯 Summary

| Concept | Tools | Blog |
|---------|-------|------|
| **List Route** | `/tools` | `/blog` |
| **Detail Route** | `/tools/[slug]` | `/blog/[slug]` |
| **Component Type** | Client | Client (List), Server (Detail) |
| **Database Table** | `ai_tools` | `blog_post` |
| **Query by** | `slug` (unique) | `slug` (unique) |
| **Type Interface** | `Tool` | `BlogPost` / `RawBlogPost` |
| **Categories** | Tool categories | Blog categories |
| **Filtering** | Category filter | Category + tag filter |
| **SEO** | Manual metadata | `generateMetadata()` |

