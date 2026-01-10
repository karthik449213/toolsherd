import { useState } from 'react';

interface UploadProgress {
  [key: string]: number;
}

export const useImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [uploadedUrls, setUploadedUrls] = useState<{ [key: string]: string }>({});
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File, fieldName: string): Promise<string | null> => {
    setIsUploading(true);
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
    setUploadErrors([]);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fieldName', fieldName);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setUploadErrors([error.error || 'Upload failed']);
        setIsUploading(false);
        return null;
      }

      const data = await response.json();
      setUploadedUrls((prev) => ({ ...prev, [fieldName]: data.url }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));
      setIsUploading(false);
      return data.url;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Upload failed';
      setUploadErrors([errorMsg]);
      setIsUploading(false);
      return null;
    }
  };

  const clearErrors = () => setUploadErrors([]);
  const clearUrls = () => setUploadedUrls({});
  const getUrl = (fieldName: string) => uploadedUrls[fieldName] || null;

  return {
    uploadImage,
    uploadProgress,
    uploadedUrls,
    uploadErrors,
    isUploading,
    clearErrors,
    clearUrls,
    getUrl,
  };
};
