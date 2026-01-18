/**
 * Category Mapping
 * Maps between new category IDs and database values
 * This allows the UI to use new category IDs while maintaining backward compatibility
 */

export const categoryMapping: Record<string, string[]> = {
  ai_agents: ['ai_agents', 'agents'],
  agentic_ai: ['agentic_ai', 'agentic'],
  no_code_ai: ['no_code_ai', 'no-code', 'nocode'],
  ai_automation: ['ai_automation', 'automation'],
  ai_seo: ['ai_seo', 'seo'],
  ai_content_engines: ['ai_content_engines', 'content_engines', 'content creation'],
  ai_creative_tools: ['ai_creative_tools', 'creative'],
  ai_business_growth: ['ai_business_growth', 'business', 'sales'],
  ai_ecommerce: ['ai_ecommerce', 'ecommerce', 'e-commerce'],
  ai_productivity: ['ai_productivity', 'productivity'],
  ai_saas_builders: ['ai_saas_builders', 'saas', 'builders'],
  ai_dev_platforms: ['ai_dev_platforms', 'coding', 'dev', 'development'],
};

/**
 * Get all database values for a category ID
 */
export const getDatabaseValuesForCategory = (categoryId: string): string[] => {
  return categoryMapping[categoryId] || [];
};

/**
 * Build query filter for a category
 * Returns SQL query string or null for 'all'
 */
export const buildCategoryFilter = (categoryId: string): string | null => {
  if (categoryId === 'all') return null;

  const values = getDatabaseValuesForCategory(categoryId);
  if (values.length === 0) return null;

  // Build OR clause for all possible values
  const filters = values.map(v => `category.ilike.%${v}%`).join(',');
  return filters;
};

/**
 * Get display name for a category
 */
export const getCategoryDisplayName = (categoryId: string): string => {
  const names: Record<string, string> = {
    ai_agents: 'AI Agents & Autonomous Systems',
    agentic_ai: 'Agentic AI & Multi-Agent Workflows',
    no_code_ai: 'No-Code & Low-Code AI Builders',
    ai_automation: 'AI Automation & Workflow Tools',
    ai_seo: 'AI SEO & Search Growth Tools',
    ai_content_engines: 'AI Content Engines (Blogs, Reels, YouTube)',
    ai_creative_tools: 'AI Creative Tools (Video, Image, Audio)',
    ai_business_growth: 'AI for Business, Sales & Lead Gen',
    ai_ecommerce: 'AI for E-Commerce & Dropshipping',
    ai_productivity: 'AI Productivity & Personal Assistants',
    ai_saas_builders: 'AI SaaS Builders & Marketplaces',
    ai_dev_platforms: 'AI Dev, APIs & Deployment Platforms',
  };
  return names[categoryId] || categoryId;
};
