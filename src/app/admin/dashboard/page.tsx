'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, BookOpen, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Stats {
  toolsCount: number;
  blogsCount: number;
  loading: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    toolsCount: 0,
    blogsCount: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toolsRes, blogsRes] = await Promise.all([
          supabase.from('ai_tools').select('id', { count: 'exact' }),
          supabase.from('blog_post').select('id', { count: 'exact' }),
        ]);

        setStats({
          toolsCount: toolsRes.count || 0,
          blogsCount: blogsRes.count || 0,
          loading: false,
        });
      } catch (e) {
        console.error('Failed to fetch stats:', e);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Total Tools</p>
                <p className="text-4xl font-bold text-slate-900">{stats.toolsCount}</p>
              </div>
              <div className="bg-emerald-100 rounded-full p-4">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Total Blog Posts</p>
                <p className="text-4xl font-bold text-slate-900">{stats.blogsCount}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/tools/create">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-6 text-lg">
              <Plus className="h-5 w-5 mr-2" />
              Create New Tool
            </Button>
          </Link>
          <Link href="/admin/blog/create">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6 text-lg">
              <Plus className="h-5 w-5 mr-2" />
              Create New Blog Post
            </Button>
          </Link>
          <Link href="/admin/tools/manage">
            <Button variant="outline" className="w-full rounded-xl py-6 text-lg">
              Manage Tools
            </Button>
          </Link>
          <Link href="/admin/blog/manage">
            <Button variant="outline" className="w-full rounded-xl py-lg text-lg">
              Manage Blog Posts
            </Button>
          </Link>
        </div>
      </div>

      {/* Instructions */}
      <Card className="border border-slate-200 bg-slate-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">📋 How to Create Content</h3>
          <ol className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">1.</span>
              <span>Generate JSON content using the provided prompts in ChatGPT or Claude</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">2.</span>
              <span>Go to Create Tool or Create Blog Post page</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">3.</span>
              <span>Paste your JSON and click Parse & Validate</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">4.</span>
              <span>Review the preview below</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">5.</span>
              <span>Upload images using the drag-drop zone</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600 flex-shrink-0">6.</span>
              <span>Click Publish to save to database</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
