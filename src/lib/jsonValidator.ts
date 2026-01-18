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
    let data = json as Record<string, unknown>;

    // Debug: Show what we received
    console.log('🔍 Blog JSON received:', {
      hasTitle: !!data.title,
      hasSlug: !!data.slug,
      hasExcerpt: !!data.excerpt,
      hasCategory: !!data.category,
      hasContent: !!data.content,
      contentType: typeof data.content,
      hasAuthor: !!data.author,
      hasSeoTitle: !!data.seo_title,
      hasSeoDescription: !!data.seo_description,
      hasTags: Array.isArray(data.tags),
      hasSeoKeywords: Array.isArray(data.seo_keywords),
      hasReadingTime: typeof data.reading_time_minutes,
    });

    // Required fields
    if (!data.title || typeof data.title !== 'string') {
      errors.push(`❌ Title: ${data.title ? 'must be string' : 'required'}`);
    }
    if (!data.slug || typeof data.slug !== 'string') {
      errors.push(`❌ Slug: ${data.slug ? 'must be string' : 'required'}`);
    }
    if (!data.excerpt || typeof data.excerpt !== 'string') {
      errors.push(`❌ Excerpt: ${data.excerpt ? 'must be string' : 'required'}`);
    }
    if (!data.category || typeof data.category !== 'string') {
      errors.push(`❌ Category: ${data.category ? 'must be string' : 'required'}`);
    }
    
    // Content can be either a string or an array of content blocks
    if (!data.content) {
      errors.push('❌ Content: Required - must be a string or array of content blocks');
    } else if (typeof data.content === 'string') {
      // Valid as string - try to parse to validate JSON
      try {
        JSON.parse(data.content);
        console.log('✅ Content: Valid JSON string');
      } catch (e) {
        errors.push(`❌ Content: Invalid JSON string - ${e instanceof Error ? e.message : 'unknown error'}`);
      }
    } else if (Array.isArray(data.content)) {
      // Convert array to string
      try {
        data.content = JSON.stringify(data.content);
        console.log('✅ Content: Array converted to JSON string');
      } catch (e) {
        errors.push(`❌ Content: Array conversion failed - ${e instanceof Error ? e.message : 'unknown error'}`);
      }
    } else {
      errors.push(`❌ Content: Invalid type (${typeof data.content}) - must be string or array`);
    }
    
    if (!data.seo_title || typeof data.seo_title !== 'string') {
      errors.push(`❌ SEO Title: ${data.seo_title ? 'must be string' : 'required'}`);
    }
    if (!data.seo_description || typeof data.seo_description !== 'string') {
      errors.push(`❌ SEO Description: ${data.seo_description ? 'must be string' : 'required'}`);
    }
    if (!data.author || typeof data.author !== 'string') {
      errors.push(`❌ Author: ${data.author ? 'must be string' : 'required'}`);
    }

    if (typeof data.reading_time_minutes !== 'number' || data.reading_time_minutes < 1) {
      errors.push(`❌ Reading Time: Must be a number > 0 (got ${typeof data.reading_time_minutes}: ${data.reading_time_minutes})`);
    }

    if (!Array.isArray(data.seo_keywords)) {
      errors.push(`❌ SEO Keywords: Must be an array (got ${typeof data.seo_keywords})`);
    } else {
      data.seo_keywords.forEach((kw, idx) => {
        if (typeof kw !== 'string') {
          errors.push(`❌ SEO Keyword[${idx}]: Must be string (got ${typeof kw})`);
        }
      });
    }

    if (!Array.isArray(data.tags)) {
      errors.push(`❌ Tags: Must be an array (got ${typeof data.tags})`);
    } else {
      data.tags.forEach((tag, idx) => {
        if (typeof tag !== 'string') {
          errors.push(`❌ Tag[${idx}]: Must be string (got ${typeof tag})`);
        }
      });
    }

    if (errors.length > 0) {
      console.log('❌ Validation failed:', errors);
      return { valid: false, errors };
    }

    console.log('✅ All validations passed!');
    
    // Ensure all required fields are present in the data object
    const blogData: BlogFormData = {
      title: data.title as string,
      slug: data.slug as string,
      excerpt: data.excerpt as string,
      category: data.category as string,
      content: data.content as string,
      seo_title: data.seo_title as string,
      seo_description: data.seo_description as string,
      seo_keywords: data.seo_keywords as string[],
      author: data.author as string,
      reading_time_minutes: data.reading_time_minutes as number,
      tags: data.tags as string[],
      image_placeholder: data.image_placeholder ? String(data.image_placeholder) : undefined,
      coverImageUrl: data.coverImageUrl ? String(data.coverImageUrl) : undefined,
      bodyImages: data.bodyImages && Array.isArray(data.bodyImages) ? data.bodyImages : undefined,
    };

    return {
      valid: true,
      data: blogData,
      errors: [],
    };
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error';
    console.error('❌ JSON parsing error:', errorMsg);
    return {
      valid: false,
      errors: [`JSON parsing error: ${errorMsg}`],
    };
  }
};
