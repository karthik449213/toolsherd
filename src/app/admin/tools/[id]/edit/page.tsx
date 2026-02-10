'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ToolPreview from '@/components/ToolPreview';
import ImageUploadZone from '@/components/ImageUploadZone';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ToolFormData } from '@/lib/types';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface ToolEditPageParams {
  id: string;
}

export default function EditToolPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = (params as any)?.id as string | undefined;

  const {
    uploadImage,
    isUploading,
    getUrl,
  } = useImageUpload();

  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const [formData, setFormData] = useState<ToolFormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Load tool data
  useEffect(() => {
    if (!toolId || hasLoaded) {
      return;
    }

    const fetchTool = async () => {
      try {
        setLoading(true);
        setLoadError('');
        const response = await fetch(`/api/admin/tools/get/${toolId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load tool');
        }

        const { data } = await response.json();
        setTool(data);
        setImageUrl(data.imageUrl || '');
        
        // Helper function to safely parse JSON fields
        const parseArrayField = (field: any): any[] => {
          if (Array.isArray(field)) return field;
          if (typeof field === 'string') {
            try {
              const parsed = JSON.parse(field);
              return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              return [];
            }
          }
          return [];
        };
        
        const parseStringField = (field: any): string => {
          if (typeof field === 'string') return field;
          return '';
        };
        
        // Convert database record to form data
        setFormData({
          name: data.name,
          slug: data.slug,
          category: data.category,
          description: data.description,
          detailed_description: data.detailed_description,
          key_features: parseArrayField(data.key_features),
          use_cases: parseArrayField(data.use_cases),
          pricing_tiers: parseArrayField(data.pricing_tiers),
          target_audience: parseStringField(data.target_audience),
          tags: parseArrayField(data.tags),
          website_url: data.website_url,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keywords: parseArrayField(data.seo_keywords),
          rating: data.rating,
          user_count: data.user_count,
        });
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Failed to load tool');
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    fetchTool();
  }, [toolId]);

  const handleUploadImage = async (file: File) => {
    const url = await uploadImage(file, 'logo');
    if (url) {
      setImageUrl(url);
    }
    return url;
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, name: e.target.value });
    }
  };

  const handleUpdateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, slug: e.target.value });
    }
  };

  const handleUpdateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, category: e.target.value });
    }
  };

  const handleUpdateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, description: e.target.value });
    }
  };

  const handlePublish = async () => {
    if (!formData) return;

    setPublishError('');
    setPublishSuccess(false);
    setIsPublishing(true);

    try {
      const response = await fetch('/api/admin/tools/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: toolId,
          ...formData,
          imageUrl: imageUrl || tool.imageUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update');
      }

      setPublishSuccess(true);
      setTimeout(() => {
        router.push('/admin/tools/manage');
      }, 2000);
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading || !toolId) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/tools/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Loading tool...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/tools/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-red-800">
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tools/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Edit Tool</h1>
            <p className="text-slate-600 mt-2">{formData?.name}</p>
          </div>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tool Name
            </label>
            <input
              type="text"
              value={formData?.name || ''}
              onChange={handleUpdateName}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Tool name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={formData?.slug || ''}
              onChange={handleUpdateSlug}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="tool-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={formData?.category || ''}
              onChange={handleUpdateCategory}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Category</option>
              <option value="Content Creation">Content Creation</option>
              <option value="Productivity">Productivity</option>
              <option value="Coding">Coding</option>
              <option value="Marketing">Marketing</option>
              <option value="Trading">Trading</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={formData?.description || ''}
              onChange={handleUpdateDescription}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Tool description"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Upload Tool Image</h2>
        <ImageUploadZone
          onUpload={handleUploadImage}
          uploadedUrl={imageUrl || undefined}
          fieldName="logo"
          isUploading={isUploading}
        />
      </div>

      {/* Preview */}
      {formData && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Preview</h2>
          <ToolPreview data={formData} imageUrl={imageUrl} />
        </div>
      )}

      {/* Update Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">4. Update</h2>
        </div>

        {publishError && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{publishError}</p>
          </div>
        )}

        {publishSuccess && (
          <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex gap-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">✓ Tool updated successfully! Redirecting...</p>
          </div>
        )}

        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-6 text-lg font-semibold"
        >
          {isPublishing ? 'Updating...' : 'Update Tool'}
        </Button>
      </div>
    </div>
  );
}
