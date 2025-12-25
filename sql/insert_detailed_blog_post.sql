-- SQL query to insert a detailed blog post into the blog_post table

INSERT INTO blog_post (title, excerpt, cover_image_url, slug, published_at, author, content_md, tags, is_published)
VALUES (
  'Deep Dive into AI Ethics and Responsible AI',
  'An in-depth exploration of ethical considerations and responsible practices in AI development and deployment.',
  'https://example.com/images/ai-ethics.jpg',
  'deep-dive-ai-ethics-responsible-ai',
  '2024-06-01T10:00:00Z',
  'Dr. Emily Carter',
  'Artificial Intelligence (AI) has become a transformative technology with vast potential benefits. However, it also raises significant ethical questions and challenges. This blog post explores the principles of AI ethics, including fairness, transparency, accountability, and privacy. We discuss the importance of responsible AI development, the role of regulation, and best practices for ensuring AI systems are designed and deployed in ways that respect human rights and societal values. Case studies and emerging frameworks are examined to provide a comprehensive understanding of how to navigate the complex landscape of AI ethics.',
  ARRAY['AI', 'Ethics', 'Responsible AI', 'Technology'],
  true
);
