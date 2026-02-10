'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import JsonInput from '@/components/JsonInput';
import BlogPreview from '@/components/BlogPreview';
import ImageUploadZone from '@/components/ImageUploadZone';
import { MultiImageUploadZone } from '@/components/MultiImageUploadZone';
import VisualContentBuilder from '@/components/VisualContentBuilder';
import { useJsonParse } from '@/hooks/useJsonParse';
import { useImageUpload } from '@/hooks/useImageUpload';
import { BlogFormData } from '@/lib/types';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = (params as any)?.id as string | undefined;

  const {
    jsonInput,
    setJsonInput,
    isLoading: isValidating,
    errors,
    success,
    parseBlogJson,
    clearErrors,
  } = useJsonParse();

  const {
    uploadImage,
    uploadedUrls,
    isUploading,
    getUrl,
  } = useImageUpload();

  const [blog, setBlog] = useState<any>(null);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  const [parsedData, setParsedData] = useState<BlogFormData | null>(null);
  const [bodyImageUrls, setBodyImageUrls] = useState<string[]>([]);
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Load blog data
  useEffect(() => {
    if (!blogId || hasLoaded) {
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoadingBlog(true);
        setLoadError('');
        const response = await fetch(`/api/admin/blog/get/${blogId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load blog post');
        }

        const { data } = await response.json();
        setBlog(data);

        // Convert database record back to JSON string for editing
        const blogContent = data.content_md || JSON.stringify([]);
        setJsonInput(blogContent);
        
        // Parse tags if they're a JSON string
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
        
        // Set parsed data for preview
        const parsedBlogData: BlogFormData = {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || '',
          category: data.category,
          content: blogContent,
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: parseArrayField(data.seo_keywords),
          author: data.author || '',
          reading_time_minutes: data.reading_time_minutes || 0,
          tags: parseArrayField(data.tags),
        };
        setParsedData(parsedBlogData);
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Failed to load blog post');
      } finally {
        setLoadingBlog(false);
        setHasLoaded(true);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleParse = () => {
    clearErrors();
    const data = parseBlogJson();
    if (data) {
      setParsedData(data);
      // Extract content blocks with IDs
      try {
        let blocks = [];
        if (typeof data.content === 'string') {
          blocks = JSON.parse(data.content);
        } else if (Array.isArray(data.content)) {
          blocks = data.content;
        }
        // Add IDs to blocks if they don't have them
        const blocksWithIds = blocks.map((block: any, index: number) => ({
          ...block,
          id: block.id || `block-${index}-${Date.now()}`,
        }));
        setContentBlocks(blocksWithIds);
      } catch (e) {
        setContentBlocks([]);
      }
    }
  };

  const handleUploadImage = async (file: File) => {
    return uploadImage(file, 'featured');
  };

  const handleContentBlocksChange = (newBlocks: any[]) => {
    setContentBlocks(newBlocks);
    // Update parsedData with new content
    if (parsedData) {
      setParsedData({
        ...parsedData,
        content: JSON.stringify(newBlocks),
      });
    }
  };

  const handlePublish = async () => {
    if (!parsedData) return;

    setPublishError('');
    setPublishSuccess(false);
    setIsPublishing(true);

    try {
      const coverImageUrl = getUrl('featured') || blog.cover_image_url || '';

      // Use contentBlocks instead of parsedData.content
      const response = await fetch('/api/admin/blog/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: blogId,
          ...parsedData,
          content: contentBlocks,
          cover_image_url: coverImageUrl,
          bodyImages: bodyImageUrls,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update');
      }

      setPublishSuccess(true);
      setTimeout(() => {
        router.push('/admin/blog/manage');
      }, 2000);
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setIsPublishing(false);
    }
  };

  if (loadingBlog || !blogId) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
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
          <Link href="/admin/blog/manage">
            <Button variant="outline" size="sm" className="rounded-lg">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Edit Blog Post</h1>
            <p className="text-slate-600 mt-2">{blog?.title}</p>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 How to Edit Your Blog Post</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">Step 1: Edit Your Content (JSON)</p>
            <p className="text-xs">Modify your blog structure using JSON format with headings, paragraphs, lists, quotes, and code blocks.</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">Step 2: Update Featured Image</p>
            <p className="text-xs">Update the main cover image for your blog post (optional).</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">Step 3: Update Body Images</p>
            <p className="text-xs">Upload or replace all images you want to use throughout your blog content.</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">✨ Step 4: Insert Images Visually (NEW!)</p>
            <p className="text-xs font-semibold text-blue-900">Click the "Insert Image Here" buttons to place images anywhere in your content - no JSON editing needed!</p>
          </div>
          <p className="text-xs"><strong>Supported Content Types:</strong> heading, paragraph, list, quote, code</p>
        </div>
      </div>

      {/* JSON Input Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">1. JSON Content</h2>
        <JsonInput
          value={jsonInput}
          onChange={setJsonInput}
          onParse={handleParse}
          errors={errors}
          success={success}
          isLoading={isValidating}
          placeholder="Paste your blog JSON here..."
        />
      </div>

      {/* Preview Section */}
      {parsedData && (
        <>
          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Update Featured Image</h2>
            <ImageUploadZone
              onUpload={handleUploadImage}
              uploadedUrl={getUrl('featured') || blog.cover_image_url || undefined}
              fieldName="featured"
              isUploading={isUploading}
            />
          </div>

          {/* Body Images Upload */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Update Body Images (Multiple images supported)</h2>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
              <p className="text-cyan-900 font-semibold mb-2">📸 Upload images to use throughout your blog post</p>
              <p className="text-sm text-cyan-800">Upload images here, then use the visual editor below to insert them anywhere in your content.</p>
            </div>
            <MultiImageUploadZone
              onImagesUpload={setBodyImageUrls}
              fieldName="body"
              maxFiles={10}
            />
          </div>

          {/* Visual Content Builder */}
          {contentBlocks.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Insert Images Visually</h2>
              <VisualContentBuilder
                initialBlocks={contentBlocks}
                availableImages={bodyImageUrls}
                onChange={handleContentBlocksChange}
              />
            </div>
          )}

          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{contentBlocks.length > 0 ? '5' : '4'}. Preview</h2>
            <BlogPreview data={parsedData} imageUrl={getUrl('featured') || blog.cover_image_url} bodyImages={bodyImageUrls} />
          </div>

          {/* Update Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{contentBlocks.length > 0 ? '6' : '5'}. Update</h2>

            {publishError && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{publishError}</p>
              </div>
            )}

            {publishSuccess && (
              <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800">✓ Blog post updated successfully! Redirecting...</p>
              </div>
            )}

            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6 text-lg font-semibold"
            >
              {isPublishing ? 'Updating...' : 'Update Blog Post'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
