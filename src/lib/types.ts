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
}

export interface RawBlogPost {
  id?: number;
  title?: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  slug?: string;
  publishedat?: string;
  author?: string | null;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}
