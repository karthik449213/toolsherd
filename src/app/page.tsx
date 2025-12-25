'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input";
  import {
    Search,
    ExternalLink,

    Pen,
    Rocket,
    Code,
    TrendingUp,

    ListFilter,

  } from "lucide-react";


import {supabase} from "@/lib/supabaseClient";
  import CategorySheet from "@/components/category-sheet";
  import clsx from 'clsx';
  import type { LucideIcon } from 'lucide-react';
  import { BlogPost, RawBlogPost } from "@/lib/types";
  // Supabase configuration
  // IMPORTANT: Replace these with environment variables for production.

  interface Tool {
    id: number;
    name: string;
    category: string;
    description: string | null;
    imageUrl: string | null;
    url: string;
  }

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  const categories = [
    { id: "all", name: "All Tools", icon: null as LucideIcon | null },
    { id: "content creation", name: "Content Creation", icon: Pen },
    { id: "productivity", name: "Productivity", icon: Rocket },
    { id: "coding", name: "Coding", icon: Code },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
    { id: "trading", name: "Trading", icon: TrendingUp },
  ];

  const normalizeCategory = (category: string | null | undefined) =>
    (category ?? "").toLowerCase().trim();

  const getCategoryDisplayName = (category: string) => {
    const normalized = normalizeCategory(category);
    switch (normalized) {
      case "content creation":
        return "Content Creation";
      case "productivity":
        return "Productivity";
      case "coding":
        return "Coding";
      case "marketing":
        return "Marketing";
      case "trading":
        return "Trading";
      default:
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }
  };

  const getCategoryColor = (category: string) => {
    const normalized = normalizeCategory(category);
    switch (normalized) {
      case "content creation":
        return "bg-blue-100 text-blue-800";
      case "productivity":
        return "bg-green-100 text-green-800";
      case "coding":
        return "bg-slate-100 text-slate-800";
      case "marketing":
        return "bg-orange-100 text-orange-800";
      case "trading":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Pagination constants
  const PAGE_SIZE = 9;

  // Simple dedupe by id when appending
  const mergeUniqueById = (prev: Tool[], next: Tool[]) => {
    const seen = new Set<number>(prev.map((t) => t.id));
    const merged = [...prev];
    for (const item of next) {
      if (!seen.has(item.id)) {
        merged.push(item);
        seen.add(item.id);
      }
    }
    return merged;
  };

  export default function Home() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [categorySheetOpen, setCategorySheetOpen] = useState(false);

    const [tools, setTools] = useState<Tool[]>([]);
     const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [blogLoading, setBlogLoading] = useState(true);
    const [blogError, setBlogError] = useState<string | null>(null);

  // Fetch a page with current filters
  const fetchTools = async (opts: { page: number; replace: boolean }) => {
    const q = searchQuery.trim().toLowerCase();
    const from = opts.page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    // Check for network connectivity
    if (!navigator.onLine) {
      setError('No internet connection. Please check your network.');
      return;
    }

    try {
      if (opts.replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      let query = supabase
        .from('ai_tools')
        .select('*')
        .order('id', { ascending: true })
        .range(from, to);

      if (activeCategory !== 'all') {
        query = query.ilike('category', activeCategory);
      }

      if (q) {
        query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const fetched = (data ?? []) as Tool[];

      if (opts.replace) {
        setTools(fetched);
        setPage(0);
      } else {
        setTools((prev) => mergeUniqueById(prev, fetched));
        setPage(opts.page);
      }

      setHasMore(fetched.length === PAGE_SIZE);
    } catch (e: unknown) {
      let errorMessage = 'Failed to load tools';
      
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === 'string') {
        errorMessage = e;
      } else if (e && typeof e === 'object') {
        // Handle Supabase error objects
        const errorObj = e as Record<string, any>;
        if (errorObj.message) {
          errorMessage = errorObj.message;
        } else if (errorObj.error) {
          errorMessage = typeof errorObj.error === 'string' ? errorObj.error : JSON.stringify(errorObj.error);
        } else {
          errorMessage = JSON.stringify(e);
        }
      }
      
      console.error('Error fetching tools:', errorMessage, e);
      setError(errorMessage);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

    const fetchBlogPosts = async () => {
      // Check for network connectivity
      if (!navigator.onLine) {
        setBlogError('No internet connection. Please check your network.');
        return;
      }

      setBlogLoading(true);
      setBlogError(null);
      try {
        const { data, error } = await supabase
          .from("blog_post")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(12);
        if (error) throw error;

        const rows: RawBlogPost[] = (data ?? []) as RawBlogPost[];

        console.log("Fetched blog posts:", rows);

        const mapped: BlogPost[] = rows
          .map((row: RawBlogPost) => {
            const title = row.title ?? "Untitled";
            const excerpt = row.excerpt ?? null;
            const coverImageUrl = row.cover_image_url ?? null;
            const slug = row.slug ?? "";
            const publishedAt = row.published_at ? new Date(row.published_at) : new Date();
            const id = row.id ?? 0;
            const author = row.author ?? null;
            const content = row.content_md ?? "";
            const createdAt = row.created_at ? new Date(row.created_at) : new Date();
            const updatedAt = row.updated_at ? new Date(row.updated_at) : new Date();
            return { id, title, excerpt, coverImageUrl, slug, publishedAt, author, content, createdAt, updatedAt };
          })
          .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
          .slice(0, 6);

        setBlogPosts(mapped);
      } catch (e: unknown) {
        let errorMessage = 'Failed to load blog posts';
        
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === 'string') {
          errorMessage = e;
        } else if (e && typeof e === 'object') {
          // Handle Supabase error objects
          const errorObj = e as Record<string, any>;
          if (errorObj.message) {
            errorMessage = errorObj.message;
          } else if (errorObj.error) {
            errorMessage = typeof errorObj.error === 'string' ? errorObj.error : JSON.stringify(errorObj.error);
          } else {
            errorMessage = JSON.stringify(e);
          }
        }
        
        console.error('Error fetching blog posts:', errorMessage, e);
        setBlogError(errorMessage);
        setBlogPosts([]);
      } finally {
        setBlogLoading(false);
      }
    };

    // Initial load + refetch on filter changes
    useEffect(() => {
      setTools([]);
      setPage(0);
      setHasMore(true);
      fetchTools({ page: 0, replace: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, activeCategory]);

    // Load blog posts once on mount
    useEffect(() => {
      fetchBlogPosts();
    }, []);

    // Monitor network status
    useEffect(() => {
      const handleOnline = () => {
        console.log('Back online! Retrying...');
        setError(null);
        setBlogError(null);
        fetchTools({ page: 0, replace: true });
        fetchBlogPosts();
      };

      const handleOffline = () => {
        setError('No internet connection');
        setBlogError('No internet connection');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    const handleLoadMore = () => {
      if (loadingMore || !hasMore) return;
      fetchTools({ page: page + 1, replace: false });
    };

    return (
      <div className="min-h-screen bg-slate-50">


        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-50 to-zinc-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 animate-in fade-in duration-500">
              Tools Herd AI: Your Ultimate AI Directory
              <span className="block text-3xl lg:text-5xl text-emerald-600 mt-2">Discover 2025&apos;s Best AI Tools by Category</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
              Hand-picked AI tools to boost your productivity, creativity, and business – all in one place.
            </p>

            <div className="max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-900">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-lg pr-16"
                />
                <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-xl">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">�� Trending: ChatGPT</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">✨ New: Runway ML</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">💎 Featured: Notion AI</span>
            </div>
          </div>
        </section>

        {/* Category Filter - hidden on mobile, sticky on md+ */}
        <section className="hidden md:block bg-white py-8 border-b border-slate-200 md:sticky md:top-0 md:z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                   <Button
    key={category.id}
    onClick={() => setActiveCategory(category.id)}
    className={clsx(
      "px-6 py-3 rounded-xl font-medium transition-all duration-300",
      activeCategory === category.id
        ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    )}
    aria-pressed={activeCategory === category.id}
  >
  {Icon && <Icon className="h-4 w-4 mr-2" />}
  {category.name}
</Button>

                );
              })}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <main className="py-16 bg-slate-50" itemScope itemType="https://schema.org/CollectionPage">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" itemProp="name">
                Featured AI Tools
              </h2>
              <p className="text-lg text-slate-600" itemProp="description">
                Curated collection of the most powerful AI tools available today
              </p>
            </header>

            {error && <div className="text-center text-red-600 mb-6">{error}</div>}

            {loading && tools.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-slate-600">Loading AI tools...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 tools-lsit lg:grid-cols-3 gap-8">
                  {tools.map((tool) => {
                    return (
                      <Card
                        key={tool.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="tool-logo img relative h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
                        <Image
                                         src={tool.imageUrl || ''}
                                         alt={`${tool.name} logo`}
                                         width={400}
                                         height={192}
                                         className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-t-2xl object-contain p-4"
                                       />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
                            <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tool.category)}`}>
                              {getCategoryDisplayName(tool.category)}
                            </Badge>
                          </div>
                          <p className="tool-tagline text-slate-600 mb-4">{tool.description}</p>

                          <Link  href={tool.url} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                              Visit {tool.name} <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {tools.length === 0 && !loading && !error && (
                  <div className="text-center py-16">
                    <p className="text-lg text-slate-600">No tools found matching your criteria.</p>
                  </div>
                )}

                <div className="text-center mt-10">
                  {hasMore && (
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {loadingMore ? "Loading..." : "Load More Tools"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        {/* Blog Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Latest Blog Posts</h2>
              <p className="text-lg text-slate-600">Daily updates from our blog</p>
            </header>

            {blogError && <div className="text-center text-red-600 mb-6">{blogError}</div>}

            {blogLoading ? (
              <div className="text-center py-8 text-slate-600">Loading blog posts...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-8 text-slate-600">No blog posts yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {post.coverImageUrl && (
                      <Image src={post.coverImageUrl} alt={post.title} height={800} width={400} className="w-full h-48 object-cover" />
                    )}
                    <CardContent className="p-6">
                      <div className="text-sm text-slate-500 mb-2">{formatDate(post.publishedAt)}</div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-emerald-600 transition-colors">{post.title}</h3>
                      </Link>
                      {post.excerpt && <p className="text-slate-600 mb-4">{post.excerpt}</p>}
                      <Link href={`/blog/${post.slug}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          Read More <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>



        {/* Floating mobile button and category sheet */}
        <Button
          aria-label="Open categories"
          className="md:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 bg-emerald-600 hover:bg-emerald-700 shadow-lg"
          onClick={() => setCategorySheetOpen(true)}
        >
          <ListFilter className="h-6 w-6 text-white" />
        </Button>

        <CategorySheet
          categories={categories}
          activeCategory={activeCategory}
          open={categorySheetOpen}
          onOpenChange={setCategorySheetOpen}
          onSelect={(id) => {
            setActiveCategory(id);
            setCategorySheetOpen(false);
          }}
        />
      </div>
    );
  }
