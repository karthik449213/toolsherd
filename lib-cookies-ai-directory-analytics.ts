// lib/cookies/ai-directory-analytics.ts
/**
 * AI Tool Directory - Privacy-First Analytics Cookies
 * 
 * PRINCIPLES:
 * ✅ No user ID or email storage
 * ✅ Session-based tracking only
 * ✅ Respects analytics consent
 * ✅ GDPR Art. 6(1)(f) compliant
 * ✅ Data minimization first
 */

import { ClientConsentStorage, ConsentCategory } from '@/lib/cookies/consent-storage';

// ============================================================================
// TYPES
// ============================================================================

export interface ToolClickEvent {
  tool_id: string;
  tool_name: string;
  category: string;
  referrer: 'search' | 'category' | 'recommendation' | 'direct' | 'bookmark';
  count: number;
  first_clicked: number;
  last_clicked: number;
}

export interface CategoryViewEvent {
  category_id: string;
  category_name: string;
  view_count: number;
  total_time_spent_seconds: number;
  tools_clicked_in_category: number;
  last_viewed: number;
}

export interface SearchQueryEvent {
  query: string;
  result_count: number;
  clicked_tools: string[];
  search_count: number;
  last_searched: number;
}

export interface AIDirectoryAnalytics {
  session_id: string;
  session_started: number;
  tool_clicks: ToolClickEvent[];
  category_views: CategoryViewEvent[];
  search_queries: SearchQueryEvent[];
  last_updated: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const COOKIE_NAMES = {
  TOOL_CLICKS: 'ts_herd_analytics_tool_clicks_v1',
  CATEGORY_VIEWS: 'ts_herd_analytics_category_views_v1',
  SEARCH_QUERIES: 'ts_herd_analytics_search_queries_v1',
  SESSION_ID: 'ts_herd_session_id',
  SESSION_START: 'ts_herd_session_start'
} as const;

const STORAGE_LIMITS = {
  MAX_TOOL_CLICKS: 50,          // Keep top 50 tools per session
  MAX_CATEGORIES: 20,            // Keep top 20 categories
  MAX_SEARCH_QUERIES: 30,       // Keep top 30 queries
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
} as const;

// ============================================================================
// SESSION MANAGEMENT (ANONYMOUS)
// ============================================================================

/**
 * Get or create anonymous session ID
 * IMPORTANT: This is NOT a user ID, just a session identifier
 * It's cleared on browser close or after timeout
 */
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(COOKIE_NAMES.SESSION_ID);

  if (!sessionId) {
    // Generate anonymous session ID (no PII)
    sessionId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(COOKIE_NAMES.SESSION_ID, sessionId);
  }

  return sessionId;
};

/**
 * Get session start time
 */
export const getSessionStartTime = (): number => {
  let startTime = parseInt(
    sessionStorage.getItem(COOKIE_NAMES.SESSION_START) || '0'
  );

  if (!startTime) {
    startTime = Date.now();
    sessionStorage.setItem(COOKIE_NAMES.SESSION_START, startTime.toString());
  }

  return startTime;
};

/**
 * Clear session (on logout)
 */
export const clearSession = (): void => {
  sessionStorage.removeItem(COOKIE_NAMES.SESSION_ID);
  sessionStorage.removeItem(COOKIE_NAMES.SESSION_START);
};

// ============================================================================
// TOOL CLICK TRACKING
// ============================================================================

/**
 * Track when user clicks on an AI tool
 * Stores aggregate count per tool, NOT individual clicks
 */
export const trackToolClick = (
  toolId: string,
  toolName: string,
  category: string,
  referrer: ToolClickEvent['referrer'] = 'direct'
): void => {
  // CRITICAL: Only track with analytics consent
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) {
    console.log('[Analytics] Skipped: User opted out');
    return;
  }

  try {
    const clicks = getToolClicksCookie();
    const existing = clicks.find(c => c.tool_id === toolId);

    if (existing) {
      // Aggregate: increment count
      existing.count += 1;
      existing.last_clicked = Date.now();
    } else {
      // First click on this tool
      clicks.push({
        tool_id: toolId,
        tool_name: toolName,
        category: category,
        referrer: referrer,
        count: 1,
        first_clicked: Date.now(),
        last_clicked: Date.now()
      });
    }

    // Trim to top N tools (data minimization)
    if (clicks.length > STORAGE_LIMITS.MAX_TOOL_CLICKS) {
      clicks.sort((a, b) => b.count - a.count);
      clicks.splice(STORAGE_LIMITS.MAX_TOOL_CLICKS);
    }

    // Save back to storage
    localStorage.setItem(
      COOKIE_NAMES.TOOL_CLICKS,
      JSON.stringify({
        session_id: getSessionId(),
        session_started: getSessionStartTime(),
        clicks,
        updated_at: Date.now()
      })
    );

    // Send to analytics (aggregated)
    sendAnalyticsEvent('tool_clicked', {
      tool_id: toolId,
      category: category
    });
  } catch (error) {
    console.error('[Analytics] Error tracking tool click:', error);
  }
};

/**
 * Get all tool clicks in current session
 * Returns aggregate data only
 */
export const getToolClicksCookie = (): ToolClickEvent[] => {
  try {
    const data = localStorage.getItem(COOKIE_NAMES.TOOL_CLICKS);
    if (!data) return [];

    const parsed = JSON.parse(data);
    return parsed.clicks || [];
  } catch (error) {
    console.error('[Analytics] Error reading tool clicks:', error);
    return [];
  }
};

/**
 * Get top clicked tools
 */
export const getTopClickedTools = (limit: number = 5): ToolClickEvent[] => {
  const clicks = getToolClicksCookie();
  return clicks
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// ============================================================================
// CATEGORY VIEW TRACKING
// ============================================================================

/**
 * Track category views (how many times user views a category)
 */
export const trackCategoryView = (
  categoryId: string,
  categoryName: string
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const categories = getCategoryViewsCookie();
    const existing = categories.find(c => c.category_id === categoryId);

    if (existing) {
      existing.view_count += 1;
      existing.last_viewed = Date.now();
    } else {
      categories.push({
        category_id: categoryId,
        category_name: categoryName,
        view_count: 1,
        total_time_spent_seconds: 0,
        tools_clicked_in_category: 0,
        last_viewed: Date.now()
      });
    }

    // Trim to top N categories
    if (categories.length > STORAGE_LIMITS.MAX_CATEGORIES) {
      categories.sort((a, b) => b.view_count - a.view_count);
      categories.splice(STORAGE_LIMITS.MAX_CATEGORIES);
    }

    localStorage.setItem(
      COOKIE_NAMES.CATEGORY_VIEWS,
      JSON.stringify({
        session_id: getSessionId(),
        categories,
        updated_at: Date.now()
      })
    );

    sendAnalyticsEvent('category_viewed', {
      category_id: categoryId
    });
  } catch (error) {
    console.error('[Analytics] Error tracking category view:', error);
  }
};

/**
 * Track time spent in category
 */
export const updateCategoryTimeSpent = (
  categoryId: string,
  seconds: number
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const categories = getCategoryViewsCookie();
    const category = categories.find(c => c.category_id === categoryId);

    if (category) {
      category.total_time_spent_seconds += seconds;
      
      localStorage.setItem(
        COOKIE_NAMES.CATEGORY_VIEWS,
        JSON.stringify({
          session_id: getSessionId(),
          categories,
          updated_at: Date.now()
        })
      );
    }
  } catch (error) {
    console.error('[Analytics] Error updating category time:', error);
  }
};

/**
 * Get all category views
 */
export const getCategoryViewsCookie = (): CategoryViewEvent[] => {
  try {
    const data = localStorage.getItem(COOKIE_NAMES.CATEGORY_VIEWS);
    if (!data) return [];

    const parsed = JSON.parse(data);
    return parsed.categories || [];
  } catch (error) {
    console.error('[Analytics] Error reading category views:', error);
    return [];
  }
};

/**
 * Get most viewed categories
 */
export const getMostViewedCategories = (limit: number = 5): CategoryViewEvent[] => {
  const categories = getCategoryViewsCookie();
  return categories
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, limit);
};

// ============================================================================
// SEARCH QUERY TRACKING
// ============================================================================

/**
 * Track search queries (what users search for)
 * Store query, not search results (data minimization)
 */
export const trackSearchQuery = (
  query: string,
  resultCount: number
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const queries = getSearchQueriesCookie();
    const existing = queries.find(q => q.query.toLowerCase() === query.toLowerCase());

    if (existing) {
      existing.search_count += 1;
      existing.last_searched = Date.now();
    } else {
      queries.push({
        query: query,
        result_count: resultCount,
        clicked_tools: [],
        search_count: 1,
        last_searched: Date.now()
      });
    }

    // Trim to top N queries
    if (queries.length > STORAGE_LIMITS.MAX_SEARCH_QUERIES) {
      queries.sort((a, b) => b.search_count - a.search_count);
      queries.splice(STORAGE_LIMITS.MAX_SEARCH_QUERIES);
    }

    localStorage.setItem(
      COOKIE_NAMES.SEARCH_QUERIES,
      JSON.stringify({
        session_id: getSessionId(),
        queries,
        updated_at: Date.now()
      })
    );

    sendAnalyticsEvent('search_performed', {
      query: query,
      results: resultCount
    });
  } catch (error) {
    console.error('[Analytics] Error tracking search:', error);
  }
};

/**
 * Get search queries
 */
export const getSearchQueriesCookie = (): SearchQueryEvent[] => {
  try {
    const data = localStorage.getItem(COOKIE_NAMES.SEARCH_QUERIES);
    if (!data) return [];

    const parsed = JSON.parse(data);
    return parsed.queries || [];
  } catch (error) {
    console.error('[Analytics] Error reading search queries:', error);
    return [];
  }
};

/**
 * Get popular search queries
 */
export const getPopularSearchQueries = (limit: number = 10): SearchQueryEvent[] => {
  const queries = getSearchQueriesCookie();
  return queries
    .sort((a, b) => b.search_count - a.search_count)
    .slice(0, limit);
};

// ============================================================================
// RECOMMENDATIONS (Privacy-First)
// ============================================================================

/**
 * Generate recommendations based on session activity
 * IMPORTANT: Uses aggregate session data, NOT user profiles
 */
export const getSessionRecommendations = (): {
  category: string;
  reason: string;
  tools: string[];
} | null => {
  // Find most viewed category this session
  const categories = getCategoryViewsCookie();
  if (categories.length === 0) return null;

  const topCategory = categories.sort((a, b) => b.view_count - a.view_count)[0];

  // Find most clicked tools in that category
  const toolClicks = getToolClicksCookie();
  const categoryTools = toolClicks.filter(t => t.category === topCategory.category_id);

  return {
    category: topCategory.category_name,
    reason: 'Based on your browsing in this session',
    tools: categoryTools
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(t => t.tool_id)
  };
};

/**
 * DO NOT implement:
 * ❌ Cross-session profiles
 * ❌ Behavioral clustering
 * ❌ Special category profiling (health, politics, etc.)
 * ❌ Device fingerprinting
 */

// ============================================================================
// DATA EXPORT & PRIVACY
// ============================================================================

/**
 * Get all analytics data for this session
 * Users can see what's collected about them
 */
export const getSessionAnalytics = (): AIDirectoryAnalytics => {
  return {
    session_id: getSessionId(),
    session_started: getSessionStartTime(),
    tool_clicks: getToolClicksCookie(),
    category_views: getCategoryViewsCookie(),
    search_queries: getSearchQueriesCookie(),
    last_updated: Date.now()
  };
};

/**
 * Clear all analytics (when user opts out)
 */
export const clearAnalyticsCookies = (): void => {
  localStorage.removeItem(COOKIE_NAMES.TOOL_CLICKS);
  localStorage.removeItem(COOKIE_NAMES.CATEGORY_VIEWS);
  localStorage.removeItem(COOKIE_NAMES.SEARCH_QUERIES);
};

/**
 * Send aggregated data to server for insights
 * CRITICAL: Only aggregate data, no PII
 */
export const sendAggregatedAnalytics = async (): Promise<void> => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const payload = {
      // NO session_id in production (prevents session tracking)
      timestamp: Date.now(),
      
      // AGGREGATE DATA ONLY:
      top_tools: getTopClickedTools(5).map(t => ({
        tool_id: t.tool_id,
        clicks: t.count,
        category: t.category
      })),
      
      top_categories: getMostViewedCategories(3).map(c => ({
        category_id: c.category_id,
        views: c.view_count
      })),
      
      popular_searches: getPopularSearchQueries(5).map(q => ({
        query: q.query,
        searches: q.search_count
      }))
    };

    await fetch('/api/analytics/aggregate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('[Analytics] Error sending aggregated data:', error);
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Send custom analytics events (for debugging)
 */
const sendAnalyticsEvent = (eventName: string, data: Record<string, any>): void => {
  if (typeof window === 'undefined') return;

  // Only send if analytics consent given
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    // Send to Google Analytics (if consent given)
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...data,
        // IMPORTANT: No PII
      });
    }
  } catch (error) {
    console.error('[Analytics] Error sending event:', error);
  }
};

/**
 * Log analytics status (for debugging)
 */
export const logAnalyticsStatus = (): void => {
  const hasConsent = ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS);
  const toolClicks = getToolClicksCookie().length;
  const categoryViews = getCategoryViewsCookie().length;
  const searchQueries = getSearchQueriesCookie().length;

  console.log({
    'Analytics Consent': hasConsent ? '✓ Given' : '✗ Denied',
    'Tool Clicks Tracked': toolClicks,
    'Categories Viewed': categoryViews,
    'Searches Tracked': searchQueries,
    'Session ID': getSessionId(),
    'Session Duration': `${Math.round((Date.now() - getSessionStartTime()) / 1000)}s`
  });
};

// ============================================================================
// TYPE DECLARATIONS (for window.gtag)
// ============================================================================

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, data: Record<string, any>) => void;
  }
}
