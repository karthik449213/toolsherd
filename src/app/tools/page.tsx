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
  Pen,
  Rocket,
  Code,
  TrendingUp,
  ListFilter,
} from 'lucide-react';
import CategorySheet from '@/components/category-sheet';
import { supabase } from '@/lib/supabaseClient';
import clsx from 'clsx';

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
  { id: 'content creation', name: 'Content Creation', icon: Pen },
  { id: 'productivity', name: 'Productivity', icon: Rocket },
  { id: 'coding', name: 'Coding', icon: Code },
  { id: 'marketing', name: 'Marketing', icon: TrendingUp },
  { id: 'trading', name: 'Trading', icon: TrendingUp },
];

const getCategoryDisplayName = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'content creation':
      return 'Content Creation';
    case 'productivity':
      return 'Productivity';
    case 'coding':
      return 'Coding';
    case 'marketing':
      return 'Marketing';
    case 'trading':
      return 'Trading';
    default:
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
};

const getCategoryColor = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'content creation':
      return 'bg-blue-100 text-blue-800';
    case 'productivity':
      return 'bg-green-100 text-green-800';
    case 'coding':
      return 'bg-slate-100 text-slate-800';
    case 'marketing':
      return 'bg-orange-100 text-orange-800';
    case 'trading':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
        query = query.ilike('category', activeCategory);
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
    <div className="min-h-screen bg-slate-50">


      {/* Search and Category Filter */}
      <main className="py-16 bg-slate-50" itemScope itemType="https://schema.org/CollectionPage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" itemProp="name">
              All AI Tools
            </h2>
            <p className="text-lg text-slate-600" itemProp="description">
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
                className="w-full px-6 py-4 text-lg rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 shadow-lg pr-16"
              />
              <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-xl">
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
                        ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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

          {error && <div className="text-center text-red-600 mb-6">{error}</div>}

          {loading && tools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">Loading AI tools...</p>
            </div>
          ) : tools && tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <Image
                    src={tool.imageUrl || ''}
                    alt={`${tool.name} logo`}
                    width={400}
                    height={192}
                    className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-t-2xl object-contain p-4"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
                      <Badge
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                          tool.category
                        )}`}
                      >
                        {getCategoryDisplayName(tool.category)}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">{tool.description}</p>
                    <Link href={`/tools/${tool.slug}`}>
                      <Button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                        View Tool <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">No tools available at the moment.</p>
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
