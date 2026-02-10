'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {

  Calendar,
  User,
  ListFilter,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { BlogPost, RawBlogPost } from "@/lib/types";
import { blogCategories } from "@/lib/categoryMapping";
import CategorySheet from "@/components/category-sheet";

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function BlogPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchFrom = async (table: string): Promise<RawBlogPost[]> => {
        const { data, error } = await supabase.from(table).select("*").eq("is_published", true).order("published_at", { ascending: false });
        
        if (error) throw error;
        return (data ?? []) as RawBlogPost[];
      };
      
      let rows: RawBlogPost[] = [];

        rows = await fetchFrom("blog_post");



      const mapped: BlogPost[] = rows.map((row: RawBlogPost) => {
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
        const category = row.category ?? "ai-tools"; // Default category
        return { id, title, excerpt, coverImageUrl, slug, publishedAt, author, content, createdAt, updatedAt, category };
      });

      setBlogPosts(mapped);
      setFilteredPosts(mapped);
    } catch (e: unknown) {
   
      setError(e instanceof Error ? e.message : "Failed to load blog posts");
      setBlogPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, blogPosts]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Set mounted flag to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className="min-h-screen bg-slate-950" suppressHydrationWarning>


      {/* Blog Section */}
      <main className="py-12 sm:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <header className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-300 mb-4 font-mono">
              AI Blog & Insights
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300">
              Stay updated with the latest trends, tips, and insights in AI technology
            </p>
          </header>

          {/* Category Filter - desktop only */}
          <div className="hidden md:block mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-cyan-500 text-slate-900"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-cyan-500/20"
                }`}
              >
                All Posts
              </button>
              {blogCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-cyan-500 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-cyan-500/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="text-center text-red-500 mb-6 bg-red-950/30 border border-red-500/30 rounded p-4">{error}</div>}

          {loading ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-400">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-slate-800/40 border border-cyan-500/20 rounded-2xl shadow-glow-medium hover:shadow-glow-large hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  {post.coverImageUrl && (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      height={800}
                      width={400}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-slate-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1 text-cyan-400" />
                      {formatDate(post.publishedAt)}
                      {post.author && (
                        <>
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1 text-cyan-400" />
                          {post.author}
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-cyan-100 mb-3">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full bg-cyan-500 text-gray-950 py-3 rounded-xl hover:bg-cyan-400 transition-colors font-medium shadow-glow-medium">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">No blog posts available in this category.</p>
            </div>
          )}
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
        categories={[{ id: "all", name: "All Posts", icon: null }, ...blogCategories.map((cat) => ({ ...cat, icon: null }))]}
        activeCategory={selectedCategory}
        open={categorySheetOpen}
        onOpenChange={setCategorySheetOpen}
        onSelect={(id) => {
          setSelectedCategory(id);
          setCategorySheetOpen(false);
        }}
      />

      {/* Footer */}
   
    </div>
  );
}
