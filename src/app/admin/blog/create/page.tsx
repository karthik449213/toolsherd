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
        <p className="text-slate-600 mt-2">Paste your JSON content below</p>
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
