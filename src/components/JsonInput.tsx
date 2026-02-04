'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle, Copy } from 'lucide-react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onParse: () => void;
  errors: string[];
  success: boolean;
  isLoading: boolean;
  placeholder?: string;
}

export default function JsonInput({
  value,
  onChange,
  onParse,
  errors,
  success,
  isLoading,
  placeholder = 'Paste your JSON here...',
}: JsonInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (e) {
     
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handlePaste}
          variant="outline"
          className="rounded-xl"
        >
          <Copy className="h-4 w-4 mr-2" />
          Paste JSON
        </Button>
        <Button
          onClick={onParse}
          disabled={!value || isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 rounded-xl"
        >
          {isLoading ? 'Parsing...' : 'Parse & Validate'}
        </Button>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-64 p-4 border border-slate-300 rounded-xl font-mono text-sm resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-900 mb-2">Validation Errors:</p>
            <ul className="space-y-2">
              {errors.map((error, idx) => (
                <li key={idx} className="text-sm text-red-800 whitespace-pre-wrap font-mono">
                  {error}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-red-100 rounded border border-red-200 text-xs text-red-900">
              <strong>Common JSON errors:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Missing comma between object properties</li>
                <li>Trailing comma at end of arrays or objects</li>
                <li>Single quotes instead of double quotes</li>
                <li>Unescaped special characters in strings</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {success && !errors.length && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 font-semibold">✓ JSON is valid! Scroll down to preview.</p>
        </div>
      )}
    </div>
  );
}
