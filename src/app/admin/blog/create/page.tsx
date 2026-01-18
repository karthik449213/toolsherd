'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import JsonInput from '@/components/JsonInput';
import BlogPreview from '@/components/BlogPreview';
import ImageUploadZone from '@/components/ImageUploadZone';
import { MultiImageUploadZone } from '@/components/MultiImageUploadZone';
import { useJsonParse } from '@/hooks/useJsonParse';
import { useImageUpload } from '@/hooks/useImageUpload';
import { BlogFormData } from '@/lib/types';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function CreateBlogPage() {
  const router = useRouter();
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

  const [parsedData, setParsedData] = useState<BlogFormData | null>(null);
  const [bodyImageUrls, setBodyImageUrls] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleParse = () => {
    clearErrors();
    const data = parseBlogJson();
    if (data) {
      setParsedData(data);
    }
  };

  const handleUploadImage = async (file: File) => {
    return uploadImage(file, 'featured');
  };

  const jsonTemplate = `{
  "title": "Emergent.sh: The Complete Guide to Autonomous \\"Vibe Coding\\"",
  "slug": "emergent-sh-guide-vibe-coding",
  "excerpt": "Discover how Emergent.sh is redefining software development through agentic \\"vibe coding.\\" This comprehensive guide explores how to build full-stack applications using natural language prompts.",
  "category": "AI Development",
  "author": "Alex Chen",
  "tags": ["Emergent.sh", "Vibe Coding", "AI App Builder", "Autonomous Agents"],
  "reading_time_minutes": 10,
  "seo_title": "Emergent.sh Guide: Build Full-Stack Apps with AI Agents (2026)",
  "seo_description": "A comprehensive guide to Emergent.sh, the leading autonomous coding platform.",
  "seo_keywords": ["Emergent.sh guide", "vibe coding", "AI software engineer", "autonomous coding agents"],
  "content": [
    {
      "type": "heading",
      "level": 1,
      "content": "Your Main Title Here"
    },
    {
      "type": "paragraph",
      "content": "Your first paragraph goes here. Keep it engaging and set the tone for your article."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Main Section"
    },
    {
      "type": "paragraph",
      "content": "Add your content here. Use multiple paragraphs to develop your ideas."
    },
    {
      "type": "list",
      "ordered": false,
      "items": ["First point", "Second point", "Third point"]
    },
    {
      "type": "quote",
      "content": "Add an inspiring or important quote here."
    },
    {
      "type": "code",
      "content": "// Add code examples here\\nfunction example() {\\n  return true;\\n}"
    }
  ]
}`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(jsonTemplate);
    alert('Template copied to clipboard!');
  };

  const handlePublish = async () => {
    if (!parsedData) return;

    setPublishError('');
    setPublishSuccess(false);
    setIsPublishing(true);

    try {
      const coverImageUrl = getUrl('featured') || '';

      const response = await fetch('/api/admin/blog/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsedData,
          cover_image_url: coverImageUrl,
          bodyImages: bodyImageUrls,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish');
      }

      setPublishSuccess(true);
      setTimeout(() => {
        router.push('/admin/blog/manage');
      }, 2000);
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Publishing failed');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Create New Blog Post</h1>
        <p className="text-slate-600 mt-2">Create blog posts using JSON format</p>
      </div>

      {/* Instructions Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 JSON Format Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Required Fields:</strong> title, slug, excerpt, category, author, tags, reading_time_minutes, seo_title, seo_description, seo_keywords</p>
          <p><strong>Content Field:</strong> Can be a JSON array of content blocks (or a JSON string if pasting as string)</p>
          <p><strong>Supported Block Types:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1 text-xs">
            <li><code className="bg-blue-100 px-2 py-1 rounded">heading</code> - with level (1-6) and content</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">paragraph</code> - with content</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">list</code> - with ordered (true/false) and items array</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">quote</code> - with content</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">code</code> - with content (code snippet)</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">image</code> - with src, alt, and optional caption</li>
          </ul>
        </div>
        <Button
          onClick={copyTemplate}
          className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Copy JSON Template
        </Button>
        <p className="text-xs text-blue-700 mt-2">📖 See BLOG_POST_FORMAT_GUIDE.md for complete documentation</p>
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
          placeholder="Paste your blog JSON here (or click 'Copy JSON Template' above)..."
        />
      </div>

      {/* Preview Section */}
      {parsedData && (
        <>
          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Upload Featured Image</h2>
            <ImageUploadZone
              onUpload={handleUploadImage}
              uploadedUrl={getUrl('featured') || undefined}
              fieldName="featured"
              isUploading={isUploading}
            />
          </div>

          {/* Body Images Upload */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Upload Body Images (Optional)</h2>
            <p className="text-slate-600 mb-4">Upload multiple images to embed throughout your blog post content</p>
            <MultiImageUploadZone
              onImagesUpload={setBodyImageUrls}
              fieldName="body"
              maxFiles={10}
            />
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Preview</h2>
            <BlogPreview data={parsedData} imageUrl={getUrl('featured') || undefined} bodyImages={bodyImageUrls} />
          </div>

          {/* Publish Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Publish</h2>

            {publishError && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{publishError}</p>
              </div>
            )}

            {publishSuccess && (
              <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800">✓ Blog post published successfully! Redirecting...</p>
              </div>
            )}

            <Button
              onClick={handlePublish}
              disabled={isPublishing || !getUrl('featured')}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6 text-lg font-semibold"
            >
              {isPublishing ? 'Publishing...' : 'Publish Blog Post'}
            </Button>

            {!getUrl('featured') && (
              <p className="text-sm text-slate-600 text-center mt-3">⬆ Please upload a featured image first</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
