'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, ExternalLink, Check, Star, Share2, Copy, Check as CheckIcon } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  website_url?: string;
  url?: string;
  detailed_description?: string;
  rating?: number;
  user_count?: number;
  tags?: string[];
}

const getCategoryColor = (category: string) => {
  const normalized = (category ?? '').toLowerCase().trim();
  switch (normalized) {
    case 'content creation':
      return 'bg-magenta-500/10 text-magenta-300 border border-magenta-500/20';
    case 'productivity':
      return 'bg-green-500/10 text-green-300 border border-green-500/20';
    case 'coding':
      return 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20';
    case 'marketing':
      return 'bg-orange-500/10 text-orange-300 border border-orange-500/20';
    case 'trading':
      return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
    default:
      return 'bg-slate-500/10 text-slate-300 border border-slate-500/20';
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

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareResponse, setShareResponse] = useState<string | null>(null);

  const handleShareTool = async () => {
    if (!tool) return;

    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tools/${tool.slug}`;
    const shareText = `Check out ${tool.name} - ${tool.description}`;

    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: shareText,
          url: shareUrl,
        });
        setShareResponse('Shared successfully!');
        setTimeout(() => setShareResponse(null), 3000);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareResponse('Copied to clipboard!');
        setTimeout(() => setShareResponse(null), 3000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setTool(data as Tool);
      } catch (e) {
    
        setError('Tool not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-400">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/tools">
            <Button variant="outline" className="mb-8 border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="text-center py-16">
            <p className="text-lg text-slate-400">{error || 'Tool not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Navigation */}
      <div className="bg-slate-900/50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link href="/tools">
            <Button variant="ghost" className="text-cyan-300 text-xs sm:text-sm hover:text-cyan-200 hover:bg-slate-800/50 px-2 sm:px-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900/30 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Tool Image Section - FIXED DIMENSIONS */}
            {/* 
              ✅ IMAGE DIMENSIONS FOR CANVA:
              - Width: 600px
              - Height: 600px
              - Aspect Ratio: 1:1 (Square)
              - Format: PNG or JPG with transparency preferred
              - Max file size: 5MB
              
              📍 Container Size (on Desktop):
              - Desktop: 448px × 448px (28rem × 28rem)
              - Mobile: Full width - 32px (responsive)
              - All sizes maintain 1:1 aspect ratio
              
              🎨 Design Tips for Canva:
              1. Use square format (600×600px recommended)
              2. Leave 20-30px padding on all sides for border
              3. Use high contrast against dark background
              4. Transparent background (PNG) or solid color
              5. Center the main subject
            */}
            <div className="flex items-center justify-center order-2 md:order-1">
              {/* Desktop: 448px × 448px | Mobile: responsive with 1:1 ratio */}
              <div className="relative w-full max-w-sm aspect-square bg-slate-800/40 border-2 border-cyan-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-glow-medium hover:shadow-glow-large transition-shadow duration-300">
                {tool.imageUrl ? (
                  <Image
                    src={tool.imageUrl}
                    alt={tool.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 768px) calc(100vw - 2rem), 448px"
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-slate-700 to-slate-900">
                    <div className="text-center">
                      <div className="text-cyan-400/50 mb-3">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm">No image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tool Info */}
            <div className="order-1 md:order-2">
              <Badge className={`mb-3 sm:mb-4 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(tool.category)}`}>
                {getCategoryDisplayName(tool.category)}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-100 mb-4 sm:mb-6 font-mono">{tool.name}</h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed">{tool.description}</p>

              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                {(tool.website_url || tool.url) && (
                  <a 
                    href={tool.website_url || tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const url = tool.website_url || tool.url;
                      if (!url || url.trim() === '') {
                        e.preventDefault();
                     
                      }
                    }}
                    className="flex-1"
                  >
                    <Button className="w-full bg-cyan-500 text-gray-950 hover:bg-cyan-400 px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl font-semibold shadow-glow-medium">
                      Visit Website <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
                    </Button>
                  </a>
                )}
                <Button 
                  onClick={handleShareTool}
                  variant="outline" 
                  className="flex-1 px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm md:text-base rounded-lg sm:rounded-xl border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50 flex items-center justify-center gap-2"
                >
                  {shareResponse ? (
                    <>
                      <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      {shareResponse}
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      Share Tool
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-cyan-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 fill-cyan-400" />
                    <span className="text-xl sm:text-2xl font-bold text-cyan-100">4.8</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">Rating</p>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-100 mb-2">10K+</div>
                  <p className="text-xs sm:text-sm text-slate-400">Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900/20 py-12 sm:py-16 md:py-20 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300 mb-8 sm:mb-12 font-mono">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: 'Easy to Use', description: 'Intuitive interface that requires no learning curve' },
              { title: 'Powerful Performance', description: 'Fast processing with enterprise-grade reliability' },
              { title: 'AI-Powered', description: 'Advanced AI algorithms for optimal results' },
              { title: 'Integration Ready', description: 'Seamlessly integrates with your existing tools' },
              { title: '24/7 Support', description: 'Dedicated support team available round the clock' },
              { title: 'Affordable Pricing', description: 'Flexible plans that fit any budget' },
            ].map((feature, index) => (
              <Card key={index} className="border border-cyan-500/20 bg-slate-800/40 hover:border-cyan-500/40 hover:shadow-glow-medium transition-all">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-cyan-200 mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="bg-slate-950 py-12 sm:py-16 md:py-20 border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300 mb-6 sm:mb-8 font-mono">About {tool.name}</h2>
          <div className="prose prose-slate max-w-none prose-invert">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6">
              {tool.name} is a cutting-edge AI tool designed to revolutionize the way professionals work in the {getCategoryDisplayName(tool.category).toLowerCase()} space. With its powerful features and user-friendly interface, it helps teams increase productivity and achieve better results.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6">
              Whether you&apos;re a solo entrepreneur or part of a large enterprise, {tool.name} provides the tools you need to succeed. Its advanced AI capabilities combined with intuitive design make it the perfect solution for modern workflows.
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mt-6 sm:mt-8 mb-4 font-mono">Use Cases</h3>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                'Automate repetitive tasks and save valuable time',
                'Enhance content quality with AI-powered suggestions',
                'Collaborate seamlessly with your team',
                'Generate insights from complex data',
                'Scale your operations efficiently',
              ].map((useCase, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-slate-300">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-900/20 py-12 sm:py-16 md:py-20 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-300 mb-8 sm:mb-12 text-center font-mono">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                features: ['Up to 5 projects', 'Basic features', 'Community support'],
              },
              {
                name: 'Professional',
                price: '$29',
                period: '/month',
                features: [
                  'Unlimited projects',
                  'Advanced features',
                  'Priority support',
                  'API access',
                ],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom solutions', 'Dedicated support', 'SLA guarantee'],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border rounded-lg sm:rounded-2xl overflow-hidden transition-all ${
                  plan.highlighted ? 'border-cyan-500 shadow-glow-large bg-slate-800/60' : 'border-cyan-500/20 bg-slate-800/40'
                }`}
              >
                <CardContent className={`p-4 sm:p-6 md:p-8 ${plan.highlighted ? 'bg-slate-800/80' : ''}`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-100 mb-3 sm:mb-4">{plan.name}</h3>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-300">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 ml-2 text-xs sm:text-sm">{plan.period}</span>}
                  </div>
                  {(tool?.website_url || tool?.url) ? (
                    <a
                      href={tool.website_url || tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className={`w-full mb-6 sm:mb-8 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg ${
                          plan.highlighted
                            ? 'bg-cyan-500 text-gray-950 hover:bg-cyan-400 shadow-glow-medium font-semibold'
                            : 'bg-slate-700/50 text-cyan-300 hover:bg-slate-600/50 border border-cyan-500/30'
                        }`}
                      >
                        Get Started <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      disabled
                      className={`w-full mb-6 sm:mb-8 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg opacity-50 cursor-not-allowed ${
                        plan.highlighted
                          ? 'bg-cyan-500 text-gray-950'
                          : 'bg-slate-700/50 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      Get Started
                    </Button>
                  )}
                  <ul className="space-y-2 sm:space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border-t border-b border-cyan-500/20 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-100 mb-4 sm:mb-6 font-mono">Ready to get started?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8">
            Join thousands of professionals already using {tool.name} to achieve their goals.
          </p>
          {(tool?.website_url || tool?.url) && (
            <a href={tool.website_url || tool.url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-cyan-500 text-gray-950 hover:bg-cyan-400 px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl font-semibold shadow-glow-medium">
                Start Free Trial <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="bg-slate-900/50 border-t border-cyan-500/20 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Link href="/tools">
            <Button variant="outline" className="rounded-lg sm:rounded-xl border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              Back to All Tools
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
