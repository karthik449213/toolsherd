import { ToolFormData, BlogFormData } from './types';

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors: string[];
}

export const validateToolJson = (json: unknown): ValidationResult<ToolFormData> => {
  const errors: string[] = [];

  try {
    const data = json as Record<string, unknown>;

    // Required fields
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Tool name is required and must be a string');
    }
    if (!data.slug || typeof data.slug !== 'string') {
      errors.push('Slug is required and must be a string');
    }
    if (!data.category || typeof data.category !== 'string') {
      errors.push('Category is required and must be a string');
    }
    if (!data.description || typeof data.description !== 'string') {
      errors.push('Description is required and must be a string');
    }
    if (!data.detailed_description || typeof data.detailed_description !== 'string') {
      errors.push('Detailed description is required and must be a string');
    }

    // Arrays
    if (!Array.isArray(data.key_features)) {
      errors.push('Key features must be an array');
    } else {
      data.key_features.forEach((feature, idx) => {
        if (typeof feature.title !== 'string') errors.push(`Feature ${idx}: title must be string`);
        if (typeof feature.description !== 'string') errors.push(`Feature ${idx}: description must be string`);
      });
    }

    if (!Array.isArray(data.use_cases)) {
      errors.push('Use cases must be an array');
    }

    if (!Array.isArray(data.pricing_tiers)) {
      errors.push('Pricing tiers must be an array');
    } else {
      data.pricing_tiers.forEach((tier, idx) => {
        if (typeof tier.name !== 'string') errors.push(`Tier ${idx}: name must be string`);
        if (typeof tier.price !== 'string') errors.push(`Tier ${idx}: price must be string`);
        if (!Array.isArray(tier.features)) errors.push(`Tier ${idx}: features must be array`);
      });
    }

    if (!data.seo_keywords || !Array.isArray(data.seo_keywords)) {
      errors.push('SEO keywords must be an array');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      data: data as unknown as ToolFormData,
      errors: [],
    };
  } catch (e) {
    return {
      valid: false,
      errors: [`JSON parsing error: ${e instanceof Error ? e.message : 'Unknown error'}`],
    };
  }
};

export const validateBlogJson = (json: unknown): ValidationResult<BlogFormData> => {
  const errors: string[] = [];

  try {
    const data = json as Record<string, unknown>;

    // Required fields
    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string');
    }
    if (!data.slug || typeof data.slug !== 'string') {
      errors.push('Slug is required and must be a string');
    }
    if (!data.excerpt || typeof data.excerpt !== 'string') {
      errors.push('Excerpt is required and must be a string');
    }
    if (!data.category || typeof data.category !== 'string') {
      errors.push('Category is required and must be a string');
    }
    if (!data.content_md || typeof data.content_md !== 'string') {
      errors.push('Content (markdown) is required and must be a string');
    }
    if (!data.seo_title || typeof data.seo_title !== 'string') {
      errors.push('SEO title is required and must be a string');
    }
    if (!data.seo_description || typeof data.seo_description !== 'string') {
      errors.push('SEO description is required and must be a string');
    }
    if (!data.author || typeof data.author !== 'string') {
      errors.push('Author is required and must be a string');
    }

    if (typeof data.reading_time_minutes !== 'number' || data.reading_time_minutes < 1) {
      errors.push('Reading time must be a number greater than 0');
    }

    if (!Array.isArray(data.seo_keywords)) {
      errors.push('SEO keywords must be an array');
    }

    if (!Array.isArray(data.tags)) {
      errors.push('Tags must be an array');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      data: data as unknown as BlogFormData,
      errors: [],
    };
  } catch (e) {
    return {
      valid: false,
      errors: [`JSON parsing error: ${e instanceof Error ? e.message : 'Unknown error'}`],
    };
  }
};
