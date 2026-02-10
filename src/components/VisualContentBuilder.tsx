'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'quote' | 'image';
  level?: number;
  content?: string;
  items?: string[];
  ordered?: boolean;
  url?: string;
  alt?: string;
}

interface VisualContentBuilderProps {
  initialBlocks: ContentBlock[];
  availableImages: string[];
  onChange: (blocks: ContentBlock[]) => void;
}

export default function VisualContentBuilder({
  initialBlocks,
  availableImages,
  onChange,
}: VisualContentBuilderProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [showImagePicker, setShowImagePicker] = useState<number | null>(null);

  const updateBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const insertImageAfter = (index: number, imageUrl: string) => {
    const newBlock: ContentBlock = {
      id: `img-${Date.now()}`,
      type: 'image',
      url: imageUrl,
      alt: 'Blog content image',
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    updateBlocks(newBlocks);
    setShowImagePicker(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    updateBlocks(newBlocks);
  };

  const deleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    updateBlocks(newBlocks);
  };

  const renderBlockPreview = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="font-bold text-slate-900">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mr-2">
              H{block.level}
            </span>
            {block.content}
          </div>
        );
      case 'paragraph':
        return (
          <div className="text-slate-700">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">P</span>
            {block.content?.substring(0, 100)}...
          </div>
        );
      case 'list':
        return (
          <div className="text-slate-700">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-2">
              {block.ordered ? 'OL' : 'UL'}
            </span>
            {block.items?.length} items
          </div>
        );
      case 'code':
        return (
          <div className="text-slate-700 font-mono text-sm">
            <span className="text-xs bg-slate-800 text-cyan-300 px-2 py-1 rounded mr-2">CODE</span>
            {block.content?.substring(0, 50)}...
          </div>
        );
      case 'quote':
        return (
          <div className="text-slate-700 italic">
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mr-2">
              QUOTE
            </span>
            {block.content?.substring(0, 100)}...
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center gap-3">
            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">IMAGE</span>
            {block.url && (
              <div className="relative w-20 h-20 border border-gray-300 rounded overflow-hidden">
                <Image
                  src={block.url}
                  alt={block.alt || 'Content image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm text-slate-600">{block.alt}</span>
          </div>
        );
      default:
        return <div className="text-slate-400">Unknown block type</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <p className="text-cyan-900 font-semibold mb-2">📝 Visual Content Builder</p>
        <p className="text-sm text-cyan-800">
          Your content blocks are displayed below. Use the + button to insert images between any blocks.
        </p>
      </div>

      {blocks.map((block, index) => (
        <div key={block.id || index}>
          {/* Content Block */}
          <div className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-cyan-400 transition-colors">
            <div className="flex items-start gap-3">
              {/* Controls */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <ChevronUp className="h-4 w-4 text-slate-600" />
                </button>
                <button
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  className="p-1 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <ChevronDown className="h-4 w-4 text-slate-600" />
                </button>
                {block.type === 'image' && (
                  <button
                    onClick={() => deleteBlock(index)}
                    className="p-1 hover:bg-red-100 rounded text-red-600"
                    title="Delete image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Block Preview */}
              <div className="flex-1">{renderBlockPreview(block)}</div>
            </div>
          </div>

          {/* Insert Image Button */}
          <div className="flex justify-center my-2">
            {showImagePicker === index ? (
              <div className="w-full bg-slate-50 border-2 border-cyan-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900">Choose an image to insert</h4>
                  <button
                    onClick={() => setShowImagePicker(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
                {availableImages.length === 0 ? (
                  <p className="text-sm text-slate-600">
                    No images uploaded yet. Upload images in section #3 above.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {availableImages.map((url, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => insertImageAfter(index, url)}
                        className="relative aspect-square border-2 border-slate-200 hover:border-cyan-500 rounded-lg overflow-hidden group transition-colors"
                      >
                        <Image src={url} alt={`Image ${imgIndex + 1}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">Insert</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowImagePicker(index)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm font-medium transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <ImageIcon className="h-4 w-4" />
                Insert Image Here
              </button>
            )}
          </div>
        </div>
      ))}

      {blocks.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          No content blocks yet. Add your content in the JSON editor above.
        </div>
      )}
    </div>
  );
}
