'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, ExternalLink, Check, Star } from 'lucide-react';

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
        console.error('Error fetching tool:', e);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/tools">
            <Button variant="ghost" className="text-cyan-300 hover:text-cyan-200 hover:bg-slate-800/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900/30 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Tool Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square bg-slate-800/40 border border-cyan-500/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-glow-medium">
                {tool.imageUrl && (
                  <Image
                    src={tool.imageUrl}
                    alt={tool.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Tool Info */}
            <div>
              <Badge className={`mb-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tool.category)}`}>
                {getCategoryDisplayName(tool.category)}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-cyan-100 mb-6 font-mono">{tool.name}</h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">{tool.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {(tool.website_url || tool.url) && (
                  <a 
                    href={tool.website_url || tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const url = tool.website_url || tool.url;
                      if (!url || url.trim() === '') {
                        e.preventDefault();
                        console.warn('No valid website URL provided');
                      }
                    }}
                  >
                    <Button className="w-full sm:w-auto bg-cyan-500 text-gray-950 hover:bg-cyan-400 px-8 py-6 text-lg rounded-xl font-semibold shadow-glow-medium">
                      Visit Website <ExternalLink className="h-5 w-5 ml-2" />
                    </Button>
                  </a>
                )}
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50">
                  Share Tool
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 pt-8 border-t border-cyan-500/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-cyan-400 fill-cyan-400" />
                    <span className="text-2xl font-bold text-cyan-100">4.8</span>
                  </div>
                  <p className="text-sm text-slate-400">Rating</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-100 mb-2">10K+</div>
                  <p className="text-sm text-slate-400">Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900/20 py-16 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 font-mono">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Easy to Use', description: 'Intuitive interface that requires no learning curve' },
              { title: 'Powerful Performance', description: 'Fast processing with enterprise-grade reliability' },
              { title: 'AI-Powered', description: 'Advanced AI algorithms for optimal results' },
              { title: 'Integration Ready', description: 'Seamlessly integrates with your existing tools' },
              { title: '24/7 Support', description: 'Dedicated support team available round the clock' },
              { title: 'Affordable Pricing', description: 'Flexible plans that fit any budget' },
            ].map((feature, index) => (
              <Card key={index} className="border border-cyan-500/20 bg-slate-800/40 hover:border-cyan-500/40 hover:shadow-glow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-200 mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="bg-slate-950 py-16 border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 font-mono">About {tool.name}</h2>
          <div className="prose prose-slate max-w-none prose-invert">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {tool.name} is a cutting-edge AI tool designed to revolutionize the way professionals work in the {getCategoryDisplayName(tool.category).toLowerCase()} space. With its powerful features and user-friendly interface, it helps teams increase productivity and achieve better results.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Whether you&apos;re a solo entrepreneur or part of a large enterprise, {tool.name} provides the tools you need to succeed. Its advanced AI capabilities combined with intuitive design make it the perfect solution for modern workflows.
            </p>
            <h3 className="text-2xl font-bold text-cyan-300 mt-8 mb-4 font-mono">Use Cases</h3>
            <ul className="space-y-3 mb-6">
              {[
                'Automate repetitive tasks and save valuable time',
                'Enhance content quality with AI-powered suggestions',
                'Collaborate seamlessly with your team',
                'Generate insights from complex data',
                'Scale your operations efficiently',
              ].map((useCase, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-900/20 py-16 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-12 text-center font-mono">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className={`border rounded-2xl overflow-hidden transition-all ${
                  plan.highlighted ? 'border-cyan-500 shadow-glow-large bg-slate-800/60' : 'border-cyan-500/20 bg-slate-800/40'
                }`}
              >
                <CardContent className={`p-8 ${plan.highlighted ? 'bg-slate-800/80' : ''}`}>
                  <h3 className="text-2xl font-bold text-cyan-100 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-cyan-300">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 ml-2">{plan.period}</span>}
                  </div>
                  <Button
                    className={`w-full mb-8 py-6 rounded-xl text-lg ${
                      plan.highlighted
                        ? 'bg-cyan-500 text-gray-950 hover:bg-cyan-400 shadow-glow-medium font-semibold'
                        : 'bg-slate-700/50 text-cyan-300 hover:bg-slate-600/50 border border-cyan-500/30'
                    }`}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <Check className="h-5 w-5 text-cyan-400" />
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
      <section className="bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 border-t border-b border-cyan-500/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-cyan-100 mb-6 font-mono">Ready to get started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of professionals already using {tool.name} to achieve their goals.
          </p>
          <a href={tool.url || '#'} target="_blank" rel="noopener noreferrer">
            <Button className="bg-cyan-500 text-gray-950 hover:bg-cyan-400 px-8 py-6 text-lg rounded-xl font-semibold shadow-glow-medium">
              Start Free Trial <ExternalLink className="h-5 w-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="bg-slate-900/50 border-t border-cyan-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools">
            <Button variant="outline" className="rounded-xl border-cyan-500/30 text-cyan-300 hover:bg-slate-800/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Tools
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
