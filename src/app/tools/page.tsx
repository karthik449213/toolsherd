'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ExternalLink,
  Bot,
  Network,
  Zap,
  Settings,
  Search,
  Clock,
  Store,
  PenTool,
  Palette,
  Briefcase,
  ListFilter,
} from 'lucide-react';
import CategorySheet from '@/components/category-sheet';
import { supabase } from '@/lib/supabaseClient';
import clsx from 'clsx';
import { getDatabaseValuesForCategory } from '@/lib/categoryMapping';

type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
};

const categories = [
  { id: 'all', name: 'All Tools', icon: null },
  { id: 'ai_agents', name: 'AI Agents & Autonomous Systems', icon: Bot },
  { id: 'agentic_ai', name: 'Agentic AI & Multi-Agent Workflows', icon: Network },
  { id: 'no_code_ai', name: 'No-Code & Low-Code AI Builders', icon: Zap },
  { id: 'ai_automation', name: 'AI Automation & Workflow Tools', icon: Settings },
  { id: 'ai_seo', name: 'AI SEO & Search Growth Tools', icon: Search },
  { id: 'ai_content_engines', name: 'AI Content Engines (Blogs, Reels, YouTube)', icon: PenTool },
  { id: 'ai_creative_tools', name: 'AI Creative Tools (Video, Image, Audio)', icon: Palette },
  { id: 'ai_business_growth', name: 'AI for Business, Sales & Lead Gen', icon: Briefcase },
  { id: 'ai_ecommerce', name: 'AI for E-Commerce & Dropshipping', icon: Store },
  { id: 'ai_productivity', name: 'AI Productivity & Personal Assistants', icon: Clock },
  { id: 'ai_saas_builders', name: 'AI SaaS Builders & Marketplaces', icon: Store },
  { id: 'ai_dev_platforms', name: 'AI Dev, APIs & Deployment Platforms', icon: PenTool },
];

const getCategoryDisplayName = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'ai_agents':
      return 'AI Agents & Autonomous Systems';
    case 'agentic_ai':
      return 'Agentic AI & Multi-Agent Workflows';
    case 'no_code_ai':
      return 'No-Code & Low-Code AI Builders';
    case 'ai_automation':
      return 'AI Automation & Workflow Tools';
    case 'ai_seo':
      return 'AI SEO & Search Growth Tools';
    case 'ai_content_engines':
      return 'AI Content Engines (Blogs, Reels, YouTube)';
    case 'ai_creative_tools':
      return 'AI Creative Tools (Video, Image, Audio)';
    case 'ai_business_growth':
      return 'AI for Business, Sales & Lead Gen';
    case 'ai_ecommerce':
      return 'AI for E-Commerce & Dropshipping';
    case 'ai_productivity':
      return 'AI Productivity & Personal Assistants';
    case 'ai_saas_builders':
      return 'AI SaaS Builders & Marketplaces';
    case 'ai_dev_platforms':
      return 'AI Dev, APIs & Deployment Platforms';
    default:
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
};

const getCategoryColor = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'ai_agents':
      return 'bg-blue-500/10 text-blue-300 border border-blue-500/20';
    case 'agentic_ai':
      return 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20';
    case 'no_code_ai':
      return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
    case 'ai_automation':
      return 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20';
    case 'ai_seo':
      return 'bg-green-500/10 text-green-300 border border-green-500/20';
    case 'ai_content_engines':
      return 'bg-pink-500/10 text-pink-300 border border-pink-500/20';
    case 'ai_creative_tools':
      return 'bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20';
    case 'ai_business_growth':
      return 'bg-orange-500/10 text-orange-300 border border-orange-500/20';
    case 'ai_ecommerce':
      return 'bg-amber-500/10 text-amber-300 border border-amber-500/20';
    case 'ai_productivity':
      return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20';
    case 'ai_saas_builders':
      return 'bg-violet-500/10 text-violet-300 border border-violet-500/20';
    case 'ai_dev_platforms':
      return 'bg-sky-500/10 text-sky-300 border border-sky-500/20';
    default:
      return 'bg-slate-500/10 text-slate-300 border border-slate-500/20';
  }
};

const PAGE_SIZE = 9;

const mergeUniqueById = (prev: Tool[], next: Tool[]) => {
  const seen = new Set<string>(prev.map((t) => t.id));
  const merged = [...prev];
  for (const item of next) {
    if (!seen.has(item.id)) {
      merged.push(item);
      seen.add(item.id);
    }
  }
  return merged;
};

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);

  const fetchTools = async (opts: { page: number; replace: boolean }) => {
    const q = searchQuery.trim().toLowerCase();
    const from = opts.page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    try {
      if (opts.replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      let query = supabase
        .from('ai_tools')
        .select('*', { count: 'exact' })
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

      const { data, error, count } = await query;

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

      const loadedCount = (opts.replace ? 0 : tools.length) + fetched.length;
      const effectiveLoadedCount = opts.replace ? fetched.length : loadedCount;
      if (count != null) {
        setHasMore(effectiveLoadedCount < count);
      } else {
        setHasMore(fetched.length === PAGE_SIZE);
      }
    } catch (e: unknown) {
    
      setError(e instanceof Error ? e.message : 'Failed to load tools');
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setTools([]);
    setPage(0);
    setHasMore(true);
    fetchTools({ page: 0, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    fetchTools({ page: page + 1, replace: false });
  };

  return (
    <div className="min-h-screen bg-slate-950">


      {/* Search and Category Filter */}
      <main className="py-16 bg-slate-950" itemScope itemType="https://schema.org/CollectionPage">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-300 mb-3 sm:mb-4 font-mono" itemProp="name">
              All AI Tools
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300" itemProp="description">
              Comprehensive collection of AI tools across all categories
            </p>
          </header>

          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base rounded-2xl border border-cyan-500/30 bg-slate-900/50 text-slate-100 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-glow-medium shadow-lg pr-10 sm:pr-12 placeholder-slate-500"
              />
              <div className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
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

          {error && <div className="text-center text-red-500 mb-6 bg-red-950/30 border border-red-500/30 rounded p-4">{error}</div>}

          {loading && tools.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-sm sm:text-base md:text-lg text-slate-400">Loading AI tools...</p>
            </div>
          ) : tools && tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className="bg-slate-800/40 border border-cyan-500/20 rounded-xl sm:rounded-2xl shadow-glow-medium hover:shadow-glow-large hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  <div className="relative w-full max-w-sm aspect-square bg-slate-800/40 border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-glow-medium hover:shadow-glow-large transition-shadow duration-300 mx-auto">
                    {tool.imageUrl ? (
                      <Image
                        src={tool.imageUrl}
                        alt={`${tool.name} logo`}
                        fill
                        sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 2rem), 448px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-slate-700 to-slate-900">
                        <div className="text-center">
                          <div className="text-cyan-400/50 mb-2">
                            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-slate-400 text-xs">No image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-cyan-100 line-clamp-2">{tool.name}</h3>
                      <Badge
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${getCategoryColor(
                          tool.category
                        )}`}
                      >
                        {getCategoryDisplayName(tool.category)}
                      </Badge>
                    </div>
                    <p className="text-slate-400 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2 flex-1">{tool.description}</p>
                    <Link href={`/tools/${tool.slug}`} className="w-full">
                      <Button className="w-full bg-cyan-500 text-gray-950 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-cyan-400 transition-colors font-medium shadow-glow-medium text-xs sm:text-sm">
                        Read More <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-400">No tools available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10">
            {hasMore ? (
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                {loadingMore ? 'Loading...' : 'Load More Tools'}
              </Button>
            ) : (
              tools.length > 0 && (
                <p className="text-slate-500 text-xs sm:text-sm">
                  Showing {tools.length} {hasMore ? '' : 'tools.'}
                </p>
              )
            )}
          </div>
        </div>
      </main>



      {/* Floating mobile button and category sheet */}
      <Button
        aria-label="Open categories"
        className="md:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 bg-cyan-500 hover:bg-cyan-400 shadow-lg"
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
