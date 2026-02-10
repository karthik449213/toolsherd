'use client';

import React, { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface MultiImageUploadZoneProps {
  onImagesUpload: (urls: string[]) => void;
  fieldName: string;
  maxFiles?: number;
}

export const MultiImageUploadZone: React.FC<MultiImageUploadZoneProps> = ({
  onImagesUpload,
  fieldName,
  maxFiles = 10,
}) => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const newErrors: string[] = [];
    const filesToUpload: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validation
      if (!file.type.startsWith('image/')) {
        newErrors.push(`${file.name} is not an image file`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        newErrors.push(`${file.name} exceeds 5MB size limit`);
        continue;
      }

      if (uploadedUrls.length + filesToUpload.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} images allowed`);
        break;
      }

      filesToUpload.push(file);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Upload files
    setUploading(true);
    setErrors([]);
    const newUrls: string[] = [];

    for (const file of filesToUpload) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fieldName', fieldName);

        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
        
          setErrors((prev) => [...prev, `${file.name}: ${errorData.error || `Error (${response.status})`}`]);
          continue;
        }

        const data = await response.json();
        newUrls.push(data.url);
        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      } catch (error) {
        setErrors((prev) => [
          ...prev,
          `${file.name}: ${error instanceof Error ? error.message : 'Upload failed'}`,
        ]);
      }
    }

    setUploading(false);
    setUploadProgress({});

    if (newUrls.length > 0) {
      const allUrls = [...uploadedUrls, ...newUrls];
      setUploadedUrls(allUrls);
      onImagesUpload(allUrls);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
    onImagesUpload(newUrls);
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
        <p className="text-sm text-gray-600 mb-2">Drag and drop images or click to select</p>
        <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 5MB each (max {maxFiles} images)</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="multi-image-input"
          disabled={uploading || uploadedUrls.length >= maxFiles}
        />
        <label htmlFor="multi-image-input">
          <button
            type="button"
            onClick={() => document.getElementById('multi-image-input')?.click()}
            disabled={uploading || uploadedUrls.length >= maxFiles}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-400 cursor-pointer"
          >
            Select Images
          </button>
        </label>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h4 className="font-semibold text-red-800 mb-2">Upload Errors:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {errors.map((error, idx) => (
              <li key={idx}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Uploaded Images Gallery */}
      {uploadedUrls.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-3">✓ Uploaded Images ({uploadedUrls.length}/{maxFiles})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedUrls.map((url, index) => (
              <div
                key={index}
                className="relative group bg-white rounded border border-gray-200 overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Body image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Image {index + 1}</span>
                </div>
                <button
                  onClick={() => removeImage(index)}
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded">
            <p className="text-sm text-cyan-800 font-semibold">
              📌 Next Step: Use the visual editor below to insert these images anywhere in your content!
            </p>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Uploading...</h4>
          <div className="space-y-2">
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-blue-700">{filename}</span>
                  <span className="text-blue-600">{progress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
