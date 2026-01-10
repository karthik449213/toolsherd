import { useState } from 'react';
import { validateToolJson, validateBlogJson, ValidationResult } from '@/lib/jsonValidator';
import { ToolFormData, BlogFormData } from '@/lib/types';

export const useJsonParse = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const parseToolJson = (): ToolFormData | null => {
    setIsLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      let jsonStr = jsonInput.trim();
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      jsonStr = jsonStr.trim();
      
      // Remove any text before first { and after last }
      const startIdx = jsonStr.indexOf('{');
      const endIdx = jsonStr.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1) {
        jsonStr = jsonStr.substring(startIdx, endIdx + 1);
      }
      
      const parsed = JSON.parse(jsonStr);
      const validation = validateToolJson(parsed);

      if (!validation.valid) {
        setErrors(validation.errors);
        setIsLoading(false);
        return null;
      }

      setSuccess(true);
      setIsLoading(false);
      return validation.data || null;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown parsing error';
      
      // Try to provide more helpful error message
      let enhancedError = errorMsg;
      if (errorMsg.includes('position')) {
        const match = errorMsg.match(/position (\d+)/);
        if (match) {
          const pos = parseInt(match[1]);
          const start = Math.max(0, pos - 50);
          const end = Math.min(jsonInput.length, pos + 50);
          const snippet = jsonInput.substring(start, end);
          const markerPos = pos - start;
          enhancedError = `${errorMsg}\n\nContext: ...${snippet}...\n${' '.repeat(markerPos + 13)}^`;
        }
      }
      
      setErrors([`Invalid JSON: ${enhancedError}`]);
      setIsLoading(false);
      return null;
    }
  };

  const parseBlogJson = (): BlogFormData | null => {
    setIsLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      let jsonStr = jsonInput.trim();
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      jsonStr = jsonStr.trim();
      
      // Remove any text before first { and after last }
      const startIdx = jsonStr.indexOf('{');
      const endIdx = jsonStr.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1) {
        jsonStr = jsonStr.substring(startIdx, endIdx + 1);
      }
      
      const parsed = JSON.parse(jsonStr);
      const validation = validateBlogJson(parsed);

      if (!validation.valid) {
        setErrors(validation.errors);
        setIsLoading(false);
        return null;
      }

      setSuccess(true);
      setIsLoading(false);
      return validation.data || null;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown parsing error';
      
      // Try to provide more helpful error message
      let enhancedError = errorMsg;
      if (errorMsg.includes('position')) {
        const match = errorMsg.match(/position (\d+)/);
        if (match) {
          const pos = parseInt(match[1]);
          const start = Math.max(0, pos - 50);
          const end = Math.min(jsonInput.length, pos + 50);
          const snippet = jsonInput.substring(start, end);
          const markerPos = pos - start;
          enhancedError = `${errorMsg}\n\nContext: ...${snippet}...\n${' '.repeat(markerPos + 13)}^`;
        }
      }
      
      setErrors([`Invalid JSON: ${enhancedError}`]);
      setIsLoading(false);
      return null;
    }
  };

  const clearErrors = () => setErrors([]);
  const clearSuccess = () => setSuccess(false);

  return {
    jsonInput,
    setJsonInput,
    isLoading,
    errors,
    success,
    parseToolJson,
    parseBlogJson,
    clearErrors,
    clearSuccess,
  };
};
