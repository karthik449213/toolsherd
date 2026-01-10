export interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  slug: string;
  publishedAt: Date;
  author: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface RawBlogPost {
  id?: number;
  title?: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  slug?: string;
  published_at?: string;
  author?: string | null;
  content_md?: string;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  category?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  is_published?: boolean;
}

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  author?: string;
  publishedAt: Date;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogPostComponentProps {
  title: string;
  author?: string;
  publishedAt: Date;
  updatedAt?: Date;
  excerpt?: string;
  content: string;
  coverImage?: string;
  slug: string;
  tags?: string[];
  relatedPosts?: Array<{
    title: string;
    slug: string;
    excerpt?: string;
  }>;
}

export interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedDate: string;
  modifiedDate: string;
  imageUrl: string;
  url: string;
  articleSection?: string;
}

// Admin Form Types
export interface ToolFeature {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface ToolFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  detailed_description: string;
  key_features: ToolFeature[];
  use_cases: string[];
  pricing_tiers: PricingTier[];
  target_audience: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  rating: number;
  user_count: number;
  imageUrl?: string;
}

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content_md: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  author: string;
  reading_time_minutes: number;
  tags: string[];
  image_placeholder: string;
  coverImageUrl?: string;
  bodyImages?: string[]; // Array of body image URLs
}
