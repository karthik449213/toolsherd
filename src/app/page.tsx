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
    Bot,
    Network,
    Zap,
    Settings,
    Search as SearchIcon,
    Clock,
    Store,
    PenTool,
    Palette,
    Briefcase,
    ListFilter,
    Upload,
    Rocket,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    X,
  } from "lucide-react";


import {supabase} from "@/lib/supabaseClient";
  import CategorySheet from "@/components/category-sheet";
  import clsx from 'clsx';
  import type { LucideIcon } from 'lucide-react';
  import { BlogPost, RawBlogPost } from "@/lib/types";
  import { getDatabaseValuesForCategory } from "@/lib/categoryMapping";
  // Supabase configuration
  // IMPORTANT: Replace these with environment variables for production.

  interface Tool {
    id: number;
    name: string;
    slug: string;
    category: string;
    description: string | null;
    imageUrl: string | null;
    url: string;
  }

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  const categories = [
    { id: "all", name: "All Tools", icon: null as LucideIcon | null },
    { id: "ai_agents", name: "AI Agents & Autonomous Systems", icon: Bot },
    { id: "agentic_ai", name: "Agentic AI & Multi-Agent Workflows", icon: Network },
    { id: "no_code_ai", name: "No-Code & Low-Code AI Builders", icon: Zap },
    { id: "ai_automation", name: "AI Automation & Workflow Tools", icon: Settings },
    { id: "ai_seo", name: "AI SEO & Search Growth Tools", icon: SearchIcon },
    { id: "ai_content_engines", name: "AI Content Engines (Blogs, Reels, YouTube)", icon: PenTool },
    { id: "ai_creative_tools", name: "AI Creative Tools (Video, Image, Audio)", icon: Palette },
    { id: "ai_business_growth", name: "AI for Business, Sales & Lead Gen", icon: Briefcase },
    { id: "ai_ecommerce", name: "AI for E-Commerce & Dropshipping", icon: Store },
    { id: "ai_productivity", name: "AI Productivity & Personal Assistants", icon: Clock },
    { id: "ai_saas_builders", name: "AI SaaS Builders & Marketplaces", icon: Store },
    { id: "ai_dev_platforms", name: "AI Dev, APIs & Deployment Platforms", icon: PenTool },
  ];

  const normalizeCategory = (category: string | null | undefined) =>
    (category ?? "").toLowerCase().trim();

  const getCategoryDisplayName = (category: string) => {
    const normalized = normalizeCategory(category);
    switch (normalized) {
      case "ai_agents":
        return "AI Agents & Autonomous Systems";
      case "agentic_ai":
        return "Agentic AI & Multi-Agent Workflows";
      case "no_code_ai":
        return "No-Code & Low-Code AI Builders";
      case "ai_automation":
        return "AI Automation & Workflow Tools";
      case "ai_seo":
        return "AI SEO & Search Growth Tools";
      case "ai_content_engines":
        return "AI Content Engines (Blogs, Reels, YouTube)";
      case "ai_creative_tools":
        return "AI Creative Tools (Video, Image, Audio)";
      case "ai_business_growth":
        return "AI for Business, Sales & Lead Gen";
      case "ai_ecommerce":
        return "AI for E-Commerce & Dropshipping";
      case "ai_productivity":
        return "AI Productivity & Personal Assistants";
      case "ai_saas_builders":
        return "AI SaaS Builders & Marketplaces";
      case "ai_dev_platforms":
        return "AI Dev, APIs & Deployment Platforms";
      default:
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }
  };

  const getCategoryColor = (category: string) => {
    const normalized = normalizeCategory(category);
    switch (normalized) {
      case "ai_agents":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      case "agentic_ai":
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/30";
      case "no_code_ai":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      case "ai_automation":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "ai_seo":
        return "bg-green-500/10 text-green-300 border-green-500/30";
      case "ai_content_engines":
        return "bg-pink-500/10 text-pink-300 border-pink-500/30";
      case "ai_creative_tools":
        return "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30";
      case "ai_business_growth":
        return "bg-orange-500/10 text-orange-300 border-orange-500/30";
      case "ai_ecommerce":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      case "ai_productivity":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      case "ai_saas_builders":
        return "bg-violet-500/10 text-violet-300 border-violet-500/30";
      case "ai_dev_platforms":
        return "bg-sky-500/10 text-sky-300 border-sky-500/30";
      default:
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
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
    const [isClient, setIsClient] = useState(false);
    const [showListingBanner, setShowListingBanner] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);

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
        const dbValues = getDatabaseValuesForCategory(activeCategory);
        if (dbValues.length > 0) {
          // Build OR filter for all possible database values
          const filters = dbValues.map(v => `category.ilike.%${v}%`).join(',');
          query = query.or(filters);
        }
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
        

        setBlogError(errorMessage);
        setBlogPosts([]);
      } finally {
        setBlogLoading(false);
      }
    };

    // Initial load + refetch on filter changes
    useEffect(() => {
      setIsClient(true);
      // Check if user is visiting for the first time
      const hasVisited = localStorage.getItem('toolsherd_visited');
      if (!hasVisited) {
        setShowListingBanner(true);
        localStorage.setItem('toolsherd_visited', 'true');
      }
    }, []);

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
      <div className="min-h-screen bg-slate-950">

        {/* First Visit Listing Banner */}
        {showListingBanner && !bannerDismissed && (
          <div className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 border-b-4 border-cyan-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 relative">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                <div className="flex gap-3 sm:gap-4 items-start flex-1">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center mt-1">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Have an Amazing AI Tool?
                    </h3>
                    <p className="text-sm sm:text-base text-cyan-50">
                      Get it featured in our directory and reach thousands of AI professionals looking for tools like yours. It's free and takes just 2 minutes!
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href="/list-a-website" className="inline-block">
                    <Button className="bg-white text-cyan-600 font-semibold px-4 sm:px-6 py-2 rounded-lg hover:bg-cyan-50 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl whitespace-nowrap">
                      List Your Tool
                    </Button>
                  </Link>
                  <button
                    onClick={() => setBannerDismissed(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Close banner"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 sm:py-16 lg:py-24 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-cyan-100 mb-6 animate-in fade-in duration-500 font-mono leading-relaxed">
              Tools Herd: Your Ultimate AI Directory
              <span className="block text-lg sm:text-2xl md:text-3xl lg:text-5xl text-cyan-400 mt-3 sm:mt-4 leading-relaxed">Discover Latest AI Tools by Category</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
              Hand-picked AI tools to boost your productivity, creativity, and business all in one place.
            </p>

            <div className="max-w-2xl mx-auto px-2 sm:px-4 mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 duration-900">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-2xl border-2 border-cyan-500/40 focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/30 shadow-glow-medium pr-14 sm:pr-16 bg-slate-800/60 text-cyan-100"
                />
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
              </div>

              <div className="hidden md:block mt-6">
                <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={clsx(
                          "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                          activeCategory === category.id
                            ? "bg-cyan-500 text-gray-950 shadow-glow-medium hover:bg-cyan-400"
                            : "bg-slate-800/50 text-slate-200 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800"
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
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-slate-300 px-2">              <span className="bg-slate-800/40 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-glow-subtle whitespace-nowrap">Trending: ChatGPT</span>
              <span className="bg-slate-800/40 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-glow-subtle whitespace-nowrap">New: Runway ML</span>
              <span className="bg-slate-800/40 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-glow-subtle whitespace-nowrap">Featured: Notion AI</span>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <main className="py-12 sm:py-16 bg-slate-950" itemScope itemType="https://schema.org/CollectionPage">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-4 font-mono" itemProp="name">
                Featured AI Tools
              </h2>
              <p className="text-lg text-slate-300" itemProp="description">
                Curated collection of the most powerful AI tools available today
              </p>
            </header>

            {error && <div className="text-center text-red-500 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg py-4">{error}</div>}

            {loading && tools.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-slate-300">Loading AI tools...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 tools-lsit lg:grid-cols-3 gap-6 sm:gap-8">
                  {tools.map((tool) => {
                    return (
                      <Card
                        key={tool.id}
                        className="bg-slate-800/40 rounded-2xl border border-cyan-500/20 shadow-glow-medium hover:shadow-glow-large hover:-translate-y-1 transition-all duration-300 transform overflow-hidden"
                      >
                        <div className="tool-logo img relative w-full max-w-sm aspect-square bg-slate-800/40 border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-glow-medium hover:shadow-glow-large transition-shadow duration-300 mx-auto">
                          <Image
                            src={tool.imageUrl || ''}
                            alt={`${tool.name} logo`}
                            fill
                            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 2rem), 448px"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-3">
                            <h3 className="text-2xl font-bold text-cyan-100 mb-2">{tool.name}</h3>
                            <Badge className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tool.category)}`}>
                              {getCategoryDisplayName(tool.category)}
                            </Badge>
                          </div>
                          <p className="tool-tagline text-slate-400 mb-4">{tool.description}</p>
 <Link href={`/tools/${tool.slug}`}>
                      <Button className="w-full bg-cyan-500 text-gray-950 py-3 rounded-xl hover:bg-cyan-400 hover:shadow-glow-medium transition-all font-semibold">
                        Read More <ExternalLink className="h-4 w-4 ml-2" />

                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {tools.length === 0 && !loading && !error && (
                  <div className="text-center py-16">
                    <p className="text-lg text-slate-400">No tools found matching your criteria.</p>
                  </div>
                )}

                <div className="text-center mt-10">
                  {hasMore && (
                    <Button
                      onClick={handleLoadMore}
                      disabled={isClient && loadingMore}
                      className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 px-8 py-4 rounded-2xl font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 shadow-glow-large hover:shadow-glow-xl"
                    >
                      {loadingMore ? "Loading..." : "Load More Tools"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        {/* CTA Section - List Your AI Tool */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-y border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">Join the Directory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-100 mb-4 font-mono leading-tight">
                Got an AI Tool?
                <span className="block text-cyan-400 mt-2">List It On Tools Herd!</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Reach thousands of AI enthusiasts and professionals. Get discovered by users looking for exactly what you offer.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">Boost Visibility</h3>
                  <p className="text-slate-400">Get your tool seen by thousands of AI professionals and enthusiasts monthly</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">Easy to List</h3>
                  <p className="text-slate-400">Simple and quick submission process - get your tool live in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-100 mb-2">Verified Quality</h3>
                  <p className="text-slate-400">Only the best AI tools are featured in our curated directory</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/list-a-website" className="w-full sm:w-auto">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-gray-950 py-4 px-8 rounded-xl font-semibold text-lg shadow-glow-large hover:shadow-glow-xl hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 group">
                  <Upload className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Listing Your Tool
                </Button>
              </Link>
              <Link href="/tools" className="w-full sm:w-auto">
                <Button className="w-full bg-slate-800/60 border-2 border-cyan-500/40 text-cyan-100 py-4 px-8 rounded-xl font-semibold text-lg hover:border-cyan-500/70 hover:bg-slate-700/60 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Explore All Tools
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <p className="text-center text-slate-300">
                <span className="font-semibold text-cyan-300">Already have a listing?</span> {' '}
                <Link href="/admin/tools/manage" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                  Manage your tools
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-12 sm:py-16 bg-slate-900/50 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-4 font-mono">Latest Blog Posts</h2>
              <p className="text-lg text-slate-300">Daily updates from our blog</p>
            </header>

            {blogError && <div className="text-center text-red-500 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg py-4">{blogError}</div>}

            {blogLoading ? (
              <div className="text-center py-8 text-slate-400">Loading blog posts...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No blog posts yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-slate-800/40 rounded-2xl border border-cyan-500/20 shadow-glow-medium hover:shadow-glow-large transition-all duration-300 overflow-hidden"
                  >
                    {post.coverImageUrl && (
                      <Image src={post.coverImageUrl} alt={post.title} height={800} width={400} className="w-full h-48 object-cover" />
                    )}
                    <CardContent className="p-6">
                      <div className="text-sm text-slate-500 mb-2">{formatDate(post.publishedAt)}</div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold text-cyan-100 mb-2 hover:text-cyan-300 transition-colors">{post.title}</h3>
                      </Link>
                      {post.excerpt && <p className="text-slate-400 mb-4">{post.excerpt}</p>}
                      <Link href={`/blog/${post.slug}`}>
                        <Button className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold">
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
          className="md:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 bg-cyan-500 hover:bg-cyan-400 shadow-glow-large text-gray-950"
          onClick={() => setCategorySheetOpen(true)}
        >
          <ListFilter className="h-6 w-6" />
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
