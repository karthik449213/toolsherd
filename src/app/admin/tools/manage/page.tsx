'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Tool {
  id: string;
  name: string;
  category: string;
  slug: string;
  created_at?: string;
}

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

export default function ManageToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_tools')
        .select('id, name, category, slug, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('ai_tools').delete().eq('id', id);
      if (error) throw error;
      setTools(tools.filter((t) => t.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete tool');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Manage Tools</h1>
          <p className="text-slate-600 mt-2">Total: {tools.length} tools</p>
        </div>
        <Link href="/admin/tools/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">
            + Create New Tool
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
          <p className="text-slate-600">Loading tools...</p>
        </div>
      ) : tools.length === 0 ? (
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="p-12 text-center">
            <p className="text-slate-600 mb-4">No tools yet. Create your first one!</p>
            <Link href="/admin/tools/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                Create Tool
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tools.map((tool) => (
            <Card key={tool.id} className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{tool.name}</h3>
                      <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                        {getCategoryDisplayName(tool.category)}
                      </Badge>
                    </div>
                    {tool.created_at && (
                      <p className="text-sm text-slate-600">
                        Created: {new Date(tool.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/tools/${tool.slug}`}>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="rounded-lg" disabled>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {deleteConfirm === tool.id ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-lg"
                          onClick={() => handleDelete(tool.id)}
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
                        onClick={() => setDeleteConfirm(tool.id)}
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
