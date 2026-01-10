'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle } from 'lucide-react';

interface ImageUploadZoneProps {
  onUpload: (file: File) => Promise<string | null>;
  uploadedUrl?: string;
  fieldName: string;
  isUploading?: boolean;
}

export default function ImageUploadZone({
  onUpload,
  uploadedUrl,
  fieldName,
  isUploading = false,
}: ImageUploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(uploadedUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    const url = await onUpload(file);
    if (!url) {
      setError('Failed to upload image');
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'
        }`}
      >
        <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
        <p className="text-lg font-semibold text-slate-900 mb-2">Drop your image here</p>
        <p className="text-sm text-slate-600 mb-4">or</p>
        <label htmlFor={`upload-${fieldName}`}>
          <Button asChild variant="outline" className="rounded-xl">
            <span>Choose File</span>
          </Button>
          <input
            id={`upload-${fieldName}`}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
        <p className="text-xs text-slate-600 mt-4">Max 5MB. Supported: JPG, PNG, WebP</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-red-800">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl border border-slate-300" />
          {uploadedUrl && (
            <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-2">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
              <div className="text-white">Uploading...</div>
            </div>
          )}
        </div>
      )}

      {uploadedUrl && (
        <p className="text-sm text-green-700 bg-green-50 rounded-xl p-3">
          ✓ Image uploaded successfully
        </p>
      )}
    </div>
  );
}
