'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  slug: string;
  author?: string;
  created_at?: string;
}

export default function ManageBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_post')
        .select('id, title, category, slug, author, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('blog_post').delete().eq('id', id);
      if (error) throw error;
      setBlogs(blogs.filter((b) => b.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete blog post');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Manage Blog Posts</h1>
          <p className="text-slate-600 mt-2">Total: {blogs.length} posts</p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
            + Create New Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      ) : blogs.length === 0 ? (
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="p-12 text-center">
            <p className="text-slate-600 mb-4">No blog posts yet. Create your first one!</p>
            <Link href="/admin/blog/create">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                Create Blog Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{blog.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {blog.author && <span>{blog.author}</span>}
                      {blog.author && <span>•</span>}
                      <Badge variant="outline" className="text-xs rounded-full">
                        {blog.category}
                      </Badge>
                      {blog.created_at && (
                        <>
                          <span>•</span>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/blog/${blog.slug}`}>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="rounded-lg" disabled>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {deleteConfirm === blog.id ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-lg"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
