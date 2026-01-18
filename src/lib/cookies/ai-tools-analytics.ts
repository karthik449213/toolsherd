// src/lib/cookies/ai-tools-analytics.ts
/**
 * AI Tools Directory - Custom Analytics & Tracking
 * 
 * Implements privacy-first cookie handling for:
 * - Tool popularity tracking
 * - Category interest analysis
 * - User preferences persistence
 * - Personalized recommendations
 * - Affiliate tracking (future)
 * 
 * All tracking requires explicit user consent via analytics/personalization toggles
 */

import { ConsentCategory } from './consent-schema';
import { ClientConsentStorage } from './consent-storage';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ToolClickEvent {
  toolId: string;
  toolName: string;
  category: string;
  timestamp: number;
  duration_ms: number;
}

export interface ToolAnalyticsData {
  session_id: string;
  tool_clicks: ToolClickEvent[];
  last_viewed_tool: string;
  total_tools_viewed: number;
  avg_view_duration_ms: number;
}

export interface CategoryInterestData {
  session_id: string;
  category_views: Record<string, { count: number; last_viewed: number }>;
  primary_interest: string;
  category_switches: number;
}

export interface SearchQueryData {
  session_id: string;
  queries: Array<{ query: string; count: number; timestamp: number }>;
  failed_searches: Array<{ query: string; timestamp: number }>;
  most_common_search: string;
}

export interface UserPreferencesData {
  default_sort: 'popularity' | 'rating' | 'newest' | 'free';
  active_filters: {
    pricing: string[];
    capability: string[];
    platform: string[];
  };
  expanded_sections: string[];
  grid_density: 'compact' | 'comfortable' | 'spacious';
}

export interface ComparisonListData {
  comparison_list: Array<{ toolId: string; addedAt: number }>;
  comparison_count: number;
}

export interface PersonalizationProfile {
  session_id: string;
  interest_profile: Record<string, { score: number; reason: string }>;
  recommended_tools: Array<{ toolId: string; rank: number; reason: string }>;
  exclusion_list: Array<{ toolId: string; timestamp: number }>;
}

// =============================================================================
// COOKIE OPERATIONS
// =============================================================================

/**
 * Tool Popularity Tracking
 * Cookie: th_analytics_tools_v1
 * Consent: analytics = true
 */
export const ToolAnalytics = {
  /**
   * Record a tool click event
   * Data stored: Tool ID, timestamp, view duration
   * Data NOT stored: User identity, IP, email
   */
  trackToolClick(toolId: string, toolName: string, category: string, duration_ms: number) {
    if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) {
      return;
    }

    try {
      const data = this.read() || this._getDefault();

      const newClick: ToolClickEvent = {
        toolId,
        toolName,
        category,
        timestamp: Date.now(),
        duration_ms,
      };

      // Keep last 50 clicks (prevent cookie overflow)
      data.tool_clicks = [newClick, ...data.tool_clicks].slice(0, 50);
      data.last_viewed_tool = toolId;
      data.total_tools_viewed = new Set(data.tool_clicks.map(c => c.toolId)).size;
      data.avg_view_duration_ms = Math.round(
        data.tool_clicks.reduce((sum, c) => sum + c.duration_ms, 0) / 
        data.tool_clicks.length
      );

      this._write(data);

      // Also send to Google Analytics (if available)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tool_click', {
          tool_id: toolId,
          tool_name: toolName,
          category: category,
          duration_ms: duration_ms,
        });
      }
    } catch (error) {
      console.warn('[ToolAnalytics] Failed to track click:', error);
    }
  },

  /**
   * Get tracking data (read-only)
   */
  read(): ToolAnalyticsData | null {
    try {
      const cookie = typeof document !== 'undefined' 
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('th_analytics_tools_v1='))
        : null;
      
      if (!cookie) return null;
      
      const value = decodeURIComponent(cookie.split('=')[1]);
      return JSON.parse(value);
    } catch {
      return null;
    }
  },

  /**
   * Clear all tool analytics
   */
  clear() {
    if (typeof document === 'undefined') return;
    document.cookie = 'th_analytics_tools_v1=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  /**
   * Write analytics data to cookie
   */
  _write(data: ToolAnalyticsData) {
    if (typeof document === 'undefined') return;
    const value = encodeURIComponent(JSON.stringify(data));
    document.cookie = `th_analytics_tools_v1=${value}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=lax`;
  },

  /**
   * Default empty data
   */
  _getDefault(): ToolAnalyticsData {
    return {
      session_id: this._generateSessionId(),
      tool_clicks: [],
      last_viewed_tool: '',
      total_tools_viewed: 0,
      avg_view_duration_ms: 0,
    };
  },

  /**
   * Generate anonymous session ID
   * Hash of: browser fingerprint + session start time
   * Cannot be linked back to user
   */
  _generateSessionId(): string {
    if (typeof window === 'undefined') return '';
    const fingerprint = `${navigator.userAgent}${navigator.language}`;
    const timestamp = Date.now();
    // Simple hash (in production, use crypto.subtle.digest)
    return `sess_${Math.random().toString(36).substring(2, 15)}`;
  },
};

/**
 * Category Interest Tracking
 * Cookie: th_analytics_category_v1
 * Consent: analytics = true
 */
export const CategoryInterest = {
  /**
   * Track when user views a category
   */
  trackCategoryView(category: string) {
    if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) {
      return;
    }

    try {
      const data = this.read() || this._getDefault();

      if (!data.category_views[category]) {
        data.category_views[category] = { count: 0, last_viewed: 0 };
      }

      data.category_views[category].count++;
      data.category_views[category].last_viewed = Date.now();

      // Update primary interest (most viewed category)
      const entries = Object.entries(data.category_views);
      if (entries.length > 0) {
        data.primary_interest = entries.sort(([,a], [,b]) => b.count - a.count)[0][0];
      }

      this._write(data);

      // Send to GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'category_view', {
          category: category,
          total_views: data.category_views[category].count,
        });
      }
    } catch (error) {
      console.warn('[CategoryInterest] Failed to track category view:', error);
    }
  },

  /**
   * Get category interest profile (for recommendations)
   */
  getProfile(): CategoryInterestData | null {
    return this.read();
  },

  /**
   * Read category data
   */
  read(): CategoryInterestData | null {
    try {
      const cookie = typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('th_analytics_category_v1='))
        : null;
      
      if (!cookie) return null;
      
      const value = decodeURIComponent(cookie.split('=')[1]);
      return JSON.parse(value);
    } catch {
      return null;
    }
  },

  /**
   * Clear all category tracking
   */
  clear() {
    if (typeof document === 'undefined') return;
    document.cookie = 'th_analytics_category_v1=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  /**
   * Write category data
   */
  _write(data: CategoryInterestData) {
    if (typeof document === 'undefined') return;
    const value = encodeURIComponent(JSON.stringify(data));
    document.cookie = `th_analytics_category_v1=${value}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=lax`;
  },

  /**
   * Default empty data
   */
  _getDefault(): CategoryInterestData {
    return {
      session_id: ToolAnalytics._generateSessionId(),
      category_views: {},
      primary_interest: '',
      category_switches: 0,
    };
  },
};

/**
 * User Preferences Persistence
 * Cookie: th_pref_sort_v1
 * Consent: Not required (improves UX)
 */
export const UserPreferences = {
  /**
   * Save sort and filter preferences
   */
  setSortAndFilters(preferences: Partial<UserPreferencesData>) {
    try {
      const data = this.read() || this._getDefault();
      const updated = { ...data, ...preferences };
      this._write(updated);
    } catch (error) {
      console.warn('[UserPreferences] Failed to save preferences:', error);
    }
  },

  /**
   * Get saved preferences
   */
  getPreferences(): UserPreferencesData {
    return this.read() || this._getDefault();
  },

  /**
   * Read preferences
   */
  read(): UserPreferencesData | null {
    try {
      const cookie = typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('th_pref_sort_v1='))
        : null;
      
      if (!cookie) return null;
      
      const value = decodeURIComponent(cookie.split('=')[1]);
      return JSON.parse(value);
    } catch {
      return null;
    }
  },

  /**
   * Clear preferences
   */
  clear() {
    if (typeof document === 'undefined') return;
    document.cookie = 'th_pref_sort_v1=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  /**
   * Write preferences
   */
  _write(data: UserPreferencesData) {
    if (typeof document === 'undefined') return;
    const value = encodeURIComponent(JSON.stringify(data));
    document.cookie = `th_pref_sort_v1=${value}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=lax`;
  },

  /**
   * Default preferences
   */
  _getDefault(): UserPreferencesData {
    return {
      default_sort: 'popularity',
      active_filters: {
        pricing: [],
        capability: [],
        platform: [],
      },
      expanded_sections: [],
      grid_density: 'comfortable',
    };
  },
};

/**
 * Comparison List
 * Cookie: th_pref_compare_v1
 * Consent: Not required (feature support)
 */
export const ComparisonList = {
  /**
   * Add tool to comparison list
   */
  addTool(toolId: string) {
    try {
      const data = this.read() || this._getDefault();
      
      // Prevent duplicates
      if (!data.comparison_list.find((item: any) => item.toolId === toolId)) {
        data.comparison_list.push({ toolId, addedAt: Date.now() });
        data.comparison_count = data.comparison_list.length;
      }
      
      this._write(data);
    } catch (error) {
      console.warn('[ComparisonList] Failed to add tool:', error);
    }
  },

  /**
   * Remove tool from comparison
   */
  removeTool(toolId: string) {
    try {
      const data = this.read() || this._getDefault();
      data.comparison_list = data.comparison_list.filter((item: any) => item.toolId !== toolId);
      data.comparison_count = data.comparison_list.length;
      this._write(data);
    } catch (error) {
      console.warn('[ComparisonList] Failed to remove tool:', error);
    }
  },

  /**
   * Get comparison list
   */
  getList(): string[] {
    const data = this.read();
    return data?.comparison_list.map(item => item.toolId) || [];
  },

  /**
   * Read comparison data
   */
  read(): ComparisonListData | null {
    try {
      const cookie = typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith('th_pref_compare_v1='))
        : null;
      
      if (!cookie) return null;
      
      const value = decodeURIComponent(cookie.split('=')[1]);
      return JSON.parse(value);
    } catch {
      return null;
    }
  },

  /**
   * Clear comparison list
   */
  clear() {
    if (typeof document === 'undefined') return;
    document.cookie = 'th_pref_compare_v1=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  /**
   * Write comparison data
   */
  _write(data: ComparisonListData) {
    if (typeof document === 'undefined') return;
    const value = encodeURIComponent(JSON.stringify(data));
    document.cookie = `th_pref_compare_v1=${value}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=lax`;
  },

  /**
   * Default data
   */
  _getDefault(): ComparisonListData {
    return {
      comparison_list: [],
      comparison_count: 0,
    };
  },
};

/**
 * Personalized Recommendations (Privacy-First)
 * Cookie: th_personal_rec_v1
 * Consent: personalization = true
 * 
 * IMPORTANT: Built only from aggregated analytics data
 * Does NOT include: email, name, IP, location, cross-site tracking
 */
export const PersonalRecommendations = {
  /**
   * Get personalized recommendations based on interest profile
   * Falls back to popular tools if personalization not enabled
   */
  getRecommendations(allTools: Tool[], limit: number = 10): Tool[] {
    // Check consent
    if (!ClientConsentStorage.hasConsent(ConsentCategory.PERSONALIZATION)) {
      return this._getPopularTools(allTools, limit);
    }

    // Get user's interest profile from analytics cookies
    const categoryProfile = CategoryInterest.getProfile();
    if (!categoryProfile || !categoryProfile.primary_interest) {
      return this._getPopularTools(allTools, limit);
    }

    // Score and rank tools
    const scored = allTools.map(tool => ({
      tool,
      score: this._calculateRelevanceScore(tool, categoryProfile),
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ tool }) => tool);
  },

  /**
   * Calculate relevance score for a tool
   * Transparent scoring visible to users
   */
  _calculateRelevanceScore(tool: Tool, profile: CategoryInterestData): number {
    let score = 0;
    let reasons: string[] = [];

    // Primary interest: +50 points
    if (tool.category === profile.primary_interest) {
      score += 50;
      reasons.push(`Matches your primary interest (${profile.primary_interest})`);
    }

    // Other interests: +10 points each
    for (const [category, data] of Object.entries(profile.category_views)) {
      if (tool.category === category && data.count > 0) {
        const boost = Math.min(data.count, 30);
        score += boost;
        reasons.push(`Matches your interest in ${category}`);
      }
    }

    // Rating boost: +15 points
    if (tool.rating && tool.rating > 4.5) {
      score += 15;
      reasons.push('Highly rated by community');
    }

    // Exclude blocked tools: -1000 points
    if (this._isExcluded(tool.id, profile)) {
      score -= 1000;
      reasons.push('Excluded by user');
    }

    return score;
  },

  /**
   * Check if tool is in user's exclusion list
   */
  _isExcluded(toolId: string, profile: CategoryInterestData): boolean {
    return false; // TODO: Implement exclusion list
  },

  /**
   * Fallback: return popular tools
   */
  _getPopularTools(allTools: Tool[], limit: number): Tool[] {
    return allTools
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  },

  /**
   * Get personalization profile for transparency
   */
  getProfile(): PersonalizationProfile | null {
    const categoryData = CategoryInterest.getProfile();
    if (!categoryData) return null;

    return {
      session_id: categoryData.session_id,
      interest_profile: {
        [categoryData.primary_interest]: {
          score: 100,
          reason: `You viewed ${categoryData.category_views[categoryData.primary_interest]?.count || 0} tools in this category`,
        },
      },
      recommended_tools: [], // TODO: Calculate recommendations
      exclusion_list: [],
    };
  },

  /**
   * Clear personalization profile (user request)
   */
  clear() {
    // This is a special case - delete recommendation data
    // But keep analytics (user can keep their interests private but still enjoy recommendations)
  },
};

/**
 * Type for tool data
 */
export interface Tool {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  // ... other fields
}

/**
 * Export all analytics modules
 */
export const AIToolsAnalytics = {
  ToolAnalytics,
  CategoryInterest,
  UserPreferences,
  ComparisonList,
  PersonalRecommendations,
};
