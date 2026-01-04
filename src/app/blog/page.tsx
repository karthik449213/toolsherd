'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {

  Calendar,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { BlogPost, RawBlogPost } from "@/lib/types";

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function BlogPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        console.log("Fetched blog posts:", rows);


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
        return { id, title, excerpt, coverImageUrl, slug, publishedAt, author, content, createdAt, updatedAt };
      });

      setBlogPosts(mapped);
    } catch (e: unknown) {
      console.error("Error fetching blog posts:", e);
      setError(e instanceof Error ? e.message : "Failed to load blog posts");
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Set mounted flag to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("Rendering BlogPage with posts:", blogPosts);
  return (
    <div className="min-h-screen bg-slate-50" suppressHydrationWarning>


      {/* Blog Section */}
      <main className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              AI Blog & Insights
            </h2>
            <p className="text-lg text-slate-600">
              Stay updated with the latest trends, tips, and insights in AI technology
            </p>
          </header>

          {error && <div className="text-center text-red-600 mb-6">{error}</div>}

          {loading ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">Loading blog posts...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
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
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishedAt)}
                      {post.author && (
                        <>
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
   
    </div>
  );
}
