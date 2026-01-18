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

    // Validate file before upload
    if (!file.type.startsWith('image/')) {
      const error = 'Invalid file type. Please upload an image file.';
      setUploadErrors([error]);
      setIsUploading(false);
      console.error('Upload validation error:', error);
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      const error = 'File size exceeds 5MB limit';
      setUploadErrors([error]);
      setIsUploading(false);
      console.error('Upload validation error:', error);
      return null;
    }

    try {
      console.log('Starting upload:', { fieldName, fileName: file.name, fileSize: file.size, fileType: file.type });
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fieldName', fieldName);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error || `Upload failed with status ${response.status}`;
        console.error('Upload response error:', errorData);
        setUploadErrors([errorMsg]);
        setIsUploading(false);
        return null;
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setUploadedUrls((prev) => ({ ...prev, [fieldName]: data.url }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));
      setIsUploading(false);
      return data.url;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Upload failed';
      console.error('Upload exception:', errorMsg, e);
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
