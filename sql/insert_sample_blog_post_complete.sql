-- SQL query to insert a complete sample blog post with all fields

INSERT INTO blog_post (
  title, 
  slug, 
  excerpt, 
  content_md, 
  cover_image_url, 
  seo_title, 
  seo_description, 
  author, 
  tags, 
  published_at, 
  is_published, 
  created_at, 
  updated_at
)
VALUES (
  'Deep Dive into AI Ethics and Responsible AI',
  'deep-dive-ai-ethics-responsible-ai',
  'An in-depth exploration of ethical considerations and responsible practices in AI development and deployment.',
  '# Deep Dive into AI Ethics and Responsible AI

Artificial Intelligence (AI) has become a transformative technology with vast potential benefits. However, it also raises significant ethical questions and challenges.

## Core Principles

This blog post explores the key principles of AI ethics:

- **Fairness**: Ensuring AI systems do not discriminate against individuals or groups
- **Transparency**: Making AI decision-making processes understandable to users
- **Accountability**: Establishing clear responsibility for AI system outcomes
- **Privacy**: Protecting personal data and user information

## Responsible AI Development

We discuss the importance of responsible AI development, including:

1. Diverse and inclusive teams in AI development
2. Rigorous testing and validation procedures
3. Continuous monitoring and improvement
4. Clear documentation and explainability

## Regulatory Framework

The role of regulation in ensuring AI systems are designed and deployed in ways that respect human rights and societal values.

## Case Studies

Real-world examples of how organizations are implementing ethical AI practices successfully.

## Conclusion

Navigating the complex landscape of AI ethics requires commitment from developers, organizations, and policymakers to create a trustworthy AI future.',
  'https://example.com/images/ai-ethics.jpg',
  'AI Ethics and Responsible AI Development - A Complete Guide',
  'Learn about the principles and practices of ethical AI development, fairness in machine learning, and responsible AI deployment strategies.',
  'Dr. Emily Carter',
  ARRAY['AI', 'Ethics', 'Responsible AI', 'Technology'],
  '2024-06-01T10:00:00Z',
  true,
  '2024-06-01T10:00:00Z',
  '2024-06-01T10:00:00Z'
);
