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
      console.error('Error fetching tools:', e);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-cyan-300 mb-4 font-mono" itemProp="name">
              All AI Tools
            </h2>
            <p className="text-lg text-slate-300" itemProp="description">
              Comprehensive collection of AI tools across all categories
            </p>
          </header>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-2xl border border-cyan-500/30 bg-slate-900/50 text-slate-100 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-glow-medium shadow-lg pr-16 placeholder-slate-500"
              />
              <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-6 py-2 rounded-xl font-semibold shadow-glow-medium">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Category buttons below search */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={clsx(
                      'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                      isActive
                        ? 'bg-cyan-500 text-gray-950 shadow-glow-medium hover:bg-cyan-400'
                        : 'bg-slate-800/50 text-slate-300 border border-cyan-500/20 hover:bg-slate-700/50'
                    )}
                    aria-pressed={isActive}
                  >
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {error && <div className="text-center text-red-500 mb-6 bg-red-950/30 border border-red-500/30 rounded p-4">{error}</div>}

          {loading && tools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-400">Loading AI tools...</p>
            </div>
          ) : tools && tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className="bg-slate-800/40 border border-cyan-500/20 rounded-2xl shadow-glow-medium hover:shadow-glow-large hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <Image
                    src={tool.imageUrl || ''}
                    alt={`${tool.name} logo`}
                    width={400}
                    height={192}
                    className="w-full h-48 flex items-center justify-center bg-slate-700/50 rounded-t-2xl object-contain p-4"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-cyan-100">{tool.name}</h3>
                      <Badge
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                          tool.category
                        )}`}
                      >
                        {getCategoryDisplayName(tool.category)}
                      </Badge>
                    </div>
                    <p className="text-slate-400 mb-4">{tool.description}</p>
                    <Link href={`/tools/${tool.slug}`}>
                      <Button className="w-full bg-cyan-500 text-gray-950 py-3 rounded-xl hover:bg-cyan-400 transition-colors font-medium shadow-glow-medium">
                        Read More <ExternalLink className="h-4 w-4 ml-2" />
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

          <div className="text-center mt-10">
            {hasMore ? (
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loadingMore ? 'Loading...' : 'Load More Tools'}
              </Button>
            ) : (
              tools.length > 0 && (
                <p className="text-slate-500 text-sm">
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
