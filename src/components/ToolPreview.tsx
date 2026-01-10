'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { ToolFormData } from '@/lib/types';

const getCategoryColor = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'content creation':
      return 'bg-blue-100 text-blue-800';
    case 'productivity':
      return 'bg-green-100 text-green-800';
    case 'coding':
      return 'bg-slate-100 text-slate-800';
    case 'marketing':
      return 'bg-orange-100 text-orange-800';
    case 'trading':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryDisplayName = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'content creation':
      return 'Content Creation';
    case 'productivity':
      return 'Productivity';
    case 'coding':
      return 'Coding';
    case 'marketing':
      return 'Marketing';
    case 'trading':
      return 'Trading';
    default:
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
};

interface ToolPreviewProps {
  data: ToolFormData;
  imageUrl?: string;
}

export default function ToolPreview({ data, imageUrl }: ToolPreviewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Preview</h2>

      {/* Hero Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-300">
              {imageUrl ? (
                <img src={imageUrl} alt={data.name} className="max-h-full max-w-full object-contain p-4" />
              ) : (
                <p className="text-slate-500 text-center">Image will appear here</p>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <Badge className={`mb-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(data.category)}`}>
              {getCategoryDisplayName(data.category)}
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{data.name}</h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">{data.description}</p>
            <div className="flex gap-6 pt-6 border-t border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-slate-900">{data.rating}</span>
                </div>
                <p className="text-sm text-slate-600">Rating</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{(data.user_count / 1000).toFixed(1)}K+</div>
                <p className="text-sm text-slate-600">Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.key_features.map((feature, idx) => (
            <Card key={idx} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Use Cases</h2>
        <ul className="space-y-3">
          {data.use_cases.map((useCase, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700">
              <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.pricing_tiers.map((plan, idx) => (
            <Card key={idx} className="border border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-slate-900 mb-6">{plan.price}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Meta Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="font-semibold text-slate-900 mb-4">SEO Information</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-600">Title: <span className="font-medium text-slate-900">{data.seo_title}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Description: <span className="font-medium text-slate-900">{data.seo_description}</span></p>
          </div>
          <div>
            <p className="text-slate-600">Keywords: <span className="font-medium text-slate-900">{data.seo_keywords.join(', ')}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
