'use client';

import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Loader2 } from 'lucide-react';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
  title?: string;
  description?: string;
  currentImageUrl?: string;
  fieldName?: string; // 'tool' or 'blog' etc
}

export function ImageUploadModal({
  isOpen,
  onClose,
  onUpload,
  title = 'Update Image',
  description = 'Upload a new image to replace the current one',
  currentImageUrl,
  fieldName = 'image',
}: ImageUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fieldName', fieldName);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (!data.url) {
        throw new Error('No URL returned from upload');
      }

      setSuccess(true);

      // Call the callback with the new URL
      onUpload(data.url);

      // Auto-close after showing success message
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
        setPreview('');
        onClose();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-6">
          {/* Current Image */}
          {currentImageUrl && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Current Image</p>
              <img
                src={currentImageUrl}
                alt="Current"
                className="w-full h-32 object-cover rounded-lg border border-slate-200"
              />
            </div>
          )}

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer bg-slate-50"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
              id="file-input"
              disabled={loading}
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-900">
                Drag and drop your image here
              </p>
              <p className="text-xs text-slate-600 mt-1">or click to select</p>
              <p className="text-xs text-slate-500 mt-2">Max 5MB • JPG, PNG, WebP</p>
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-slate-200"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-3">
              <p className="text-sm text-green-800">✓ Image uploaded successfully!</p>
            </div>
          )}
          </div>
        </div>

        {/* Actions - Sticky Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-lg"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={success ? onClose : handleUpload}
              disabled={!file || loading}
              className={`flex-1 rounded-lg text-white ${
                success
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : success ? (
                '✓ Close'
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>
        </div>
      </div>
    
  );
}
