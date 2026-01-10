'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import JsonInput from '@/components/JsonInput';
import ToolPreview from '@/components/ToolPreview';
import ImageUploadZone from '@/components/ImageUploadZone';
import { useJsonParse } from '@/hooks/useJsonParse';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ToolFormData } from '@/lib/types';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function CreateToolPage() {
  const router = useRouter();
  const {
    jsonInput,
    setJsonInput,
    isLoading: isValidating,
    errors,
    success,
    parseToolJson,
    clearErrors,
  } = useJsonParse();

  const {
    uploadImage,
    uploadedUrls,
    uploadErrors: uploadErrs,
    isUploading,
    getUrl,
  } = useImageUpload();

  const [parsedData, setParsedData] = useState<ToolFormData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleParse = () => {
    clearErrors();
    const data = parseToolJson();
    if (data) {
      setParsedData(data);
    }
  };

  const handleUploadImage = async (file: File) => {
    return uploadImage(file, 'logo');
  };

  const handlePublish = async () => {
    if (!parsedData) return;

    setPublishError('');
    setPublishSuccess(false);
    setIsPublishing(true);

    try {
      const imageUrl = getUrl('logo') || '';

      const response = await fetch('/api/admin/tools/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsedData,
          imageUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish');
      }

      setPublishSuccess(true);
      setTimeout(() => {
        router.push('/admin/tools/manage');
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
        <h1 className="text-4xl font-bold text-slate-900">Create New Tool</h1>
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
          placeholder="Paste your tool JSON here..."
        />
      </div>

      {/* Preview Section */}
      {parsedData && (
        <>
          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Upload Tool Image</h2>
            <ImageUploadZone
              onUpload={handleUploadImage}
              uploadedUrl={getUrl('logo') || undefined}
              fieldName="logo"
              isUploading={isUploading}
            />
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Preview</h2>
            <ToolPreview data={parsedData} imageUrl={getUrl('logo') || undefined} />
          </div>

          {/* Publish Section */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">4. Publish</h2>
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
                <p className="text-green-800">✓ Tool published successfully! Redirecting...</p>
              </div>
            )}

            <Button
              onClick={handlePublish}
              disabled={isPublishing || !getUrl('logo')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl py-6 text-lg font-semibold"
            >
              {isPublishing ? 'Publishing...' : 'Publish Tool'}
            </Button>

            {!getUrl('logo') && (
              <p className="text-sm text-slate-600 text-center mt-3">⬆ Please upload an image first</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
