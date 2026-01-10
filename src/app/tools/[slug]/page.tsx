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
  url?: string;
}

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/tools">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className="text-center py-16">
            <p className="text-lg text-slate-600">{error || 'Tool not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/tools">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Tool Image */}
            <div className="flex items-center justify-center">
              <div className="w-full h-80 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                {tool.imageUrl && (
                  <Image
                    src={tool.imageUrl}
                    alt={tool.name}
                    width={400}
                    height={320}
                    className="w-full h-full object-contain p-8"
                  />
                )}
              </div>
            </div>

            {/* Tool Info */}
            <div>
              <Badge className={`mb-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tool.category)}`}>
                {getCategoryDisplayName(tool.category)}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{tool.name}</h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">{tool.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href={tool.url || '#'} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-6 text-lg rounded-xl">
                    Visit Website <ExternalLink className="h-5 w-5 ml-2" />
                  </Button>
                </a>
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl">
                  Share Tool
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold text-slate-900">4.8</span>
                  </div>
                  <p className="text-sm text-slate-600">Rating</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">10K+</div>
                  <p className="text-sm text-slate-600">Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Easy to Use', description: 'Intuitive interface that requires no learning curve' },
              { title: 'Powerful Performance', description: 'Fast processing with enterprise-grade reliability' },
              { title: 'AI-Powered', description: 'Advanced AI algorithms for optimal results' },
              { title: 'Integration Ready', description: 'Seamlessly integrates with your existing tools' },
              { title: '24/7 Support', description: 'Dedicated support team available round the clock' },
              { title: 'Affordable Pricing', description: 'Flexible plans that fit any budget' },
            ].map((feature, index) => (
              <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">About {tool.name}</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {tool.name} is a cutting-edge AI tool designed to revolutionize the way professionals work in the {getCategoryDisplayName(tool.category).toLowerCase()} space. With its powerful features and user-friendly interface, it helps teams increase productivity and achieve better results.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Whether you&apos;re a solo entrepreneur or part of a large enterprise, {tool.name} provides the tools you need to succeed. Its advanced AI capabilities combined with intuitive design make it the perfect solution for modern workflows.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Use Cases</h3>
            <ul className="space-y-3 mb-6">
              {[
                'Automate repetitive tasks and save valuable time',
                'Enhance content quality with AI-powered suggestions',
                'Collaborate seamlessly with your team',
                'Generate insights from complex data',
                'Scale your operations efficiently',
              ].map((useCase, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Pricing Plans</h2>
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
                  plan.highlighted ? 'border-emerald-600 shadow-xl scale-105' : 'border-slate-200'
                }`}
              >
                <CardContent className={`p-8 ${plan.highlighted ? 'bg-emerald-50' : ''}`}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 ml-2">{plan.period}</span>}
                  </div>
                  <Button
                    className={`w-full mb-8 py-6 rounded-xl text-lg ${
                      plan.highlighted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <Check className="h-5 w-5 text-emerald-600" />
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
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of professionals already using {tool.name} to achieve their goals.
          </p>
          <a href={tool.url || '#'} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl font-semibold">
              Start Free Trial <ExternalLink className="h-5 w-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Tools
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
