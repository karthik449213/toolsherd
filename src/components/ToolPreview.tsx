'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { ToolFormData } from '@/lib/types';

const getCategoryColor = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'ai_agents':
      return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
    case 'agentic_ai':
      return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    case 'no_code_ai':
      return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    case 'ai_automation':
      return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    case 'ai_seo':
      return 'bg-green-500/10 text-green-300 border-green-500/30';
    case 'ai_content_engines':
      return 'bg-pink-500/10 text-pink-300 border-pink-500/30';
    case 'ai_creative_tools':
      return 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30';
    case 'ai_business_growth':
      return 'bg-orange-500/10 text-orange-300 border-orange-500/30';
    case 'ai_ecommerce':
      return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    case 'ai_productivity':
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    case 'ai_saas_builders':
      return 'bg-violet-500/10 text-violet-300 border-violet-500/30';
    case 'ai_dev_platforms':
      return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
    default:
      return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  }
};

const getCategoryDisplayName = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'ai_agents':
      return 'AI Agents & Autonomous Systems';
    case 'agentic_ai':
      return 'Agentic AI & Multi-Agent Workflows';
    case 'no_code_ai':
      return 'No-Code & Low-Code AI Builders';
    case 'ai_automation':
      return 'AI Automation & Workflow Tools';
    case 'ai_seo':
      return 'AI SEO & Search Growth Tools';
    case 'ai_content_engines':
      return 'AI Content Engines (Blogs, Reels, YouTube)';
    case 'ai_creative_tools':
      return 'AI Creative Tools (Video, Image, Audio)';
    case 'ai_business_growth':
      return 'AI for Business, Sales & Lead Gen';
    case 'ai_ecommerce':
      return 'AI for E-Commerce & Dropshipping';
    case 'ai_productivity':
      return 'AI Productivity & Personal Assistants';
    case 'ai_saas_builders':
      return 'AI SaaS Builders & Marketplaces';
    case 'ai_dev_platforms':
      return 'AI Dev, APIs & Deployment Platforms';
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
      <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-mono">Preview</h2>

      {/* Hero Section */}
      <div className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 bg-slate-900/50 rounded-xl flex items-center justify-center border border-cyan-500/20">
              {imageUrl ? (
                <img src={imageUrl} alt={data.name} className="max-h-full max-w-full object-contain p-4" />
              ) : (
                <p className="text-slate-400 text-center">Image will appear here</p>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <Badge className={`mb-4 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(data.category)}`}>
              {getCategoryDisplayName(data.category)}
            </Badge>
            <h1 className="text-4xl font-bold text-cyan-100 mb-4">{data.name}</h1>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">{data.description}</p>
            <div className="flex gap-6 pt-6 border-t border-cyan-500/20">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-cyan-400 fill-cyan-400" />
                  <span className="text-2xl font-bold text-cyan-100">{data.rating}</span>
                </div>
                <p className="text-sm text-slate-400">Rating</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-100 mb-2">{(data.user_count / 1000).toFixed(1)}K+</div>
                <p className="text-sm text-slate-400">Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-200">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-mono">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(data.key_features) && data.key_features.map((feature, idx) => (
            <Card key={idx} className="border-cyan-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cyan-100 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-200">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-mono">Use Cases</h2>
        <ul className="space-y-3">
          {Array.isArray(data.use_cases) && data.use_cases.map((useCase, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300">
              <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing */}
      <div className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-200">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-mono">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(data.pricing_tiers) && data.pricing_tiers.map((plan, idx) => (
            <Card key={idx} className="border-cyan-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-cyan-100 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-cyan-300 mb-6">{plan.price}</div>
                <ul className="space-y-3">
                  {Array.isArray(plan.features) && plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
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
      <div className="bg-slate-800/60 border border-cyan-500/20 rounded-2xl p-6">
        <h3 className="font-semibold text-cyan-300 mb-4 font-mono">SEO Information</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-400">Title: <span className="font-medium text-slate-200">{data.seo_title}</span></p>
          </div>
          <div>
            <p className="text-slate-400">Description: <span className="font-medium text-slate-200">{data.seo_description}</span></p>
          </div>
          <div>
            <p className="text-slate-400">Keywords: <span className="font-medium text-slate-200">{Array.isArray(data.seo_keywords) ? data.seo_keywords.join(', ') : ''}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
