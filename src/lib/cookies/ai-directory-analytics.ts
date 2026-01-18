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

import { ClientConsentStorage,ConsentCategory } from '@/lib/cookies/consent-storage';

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
  MAX_TOOL_CLICKS: 50,
  MAX_CATEGORIES: 20,
  MAX_SEARCH_QUERIES: 30,
  SESSION_TIMEOUT_MS: 30 * 60 * 1000,
} as const;

// ============================================================================
// SESSION MANAGEMENT (ANONYMOUS)
// ============================================================================

export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(COOKIE_NAMES.SESSION_ID);

  if (!sessionId) {
    sessionId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(COOKIE_NAMES.SESSION_ID, sessionId);
  }

  return sessionId;
};

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

export const clearSession = (): void => {
  sessionStorage.removeItem(COOKIE_NAMES.SESSION_ID);
  sessionStorage.removeItem(COOKIE_NAMES.SESSION_START);
};

// ============================================================================
// TOOL CLICK TRACKING
// ============================================================================

export const trackToolClick = (
  toolId: string,
  toolName: string,
  category: string,
  referrer: ToolClickEvent['referrer'] = 'direct'
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) {
    console.log('[Analytics] Skipped: User opted out');
    return;
  }

  try {
    const clicks = getToolClicksCookie();
    const existing = clicks.find((c: ToolClickEvent) => c.tool_id === toolId);

    if (existing) {
      existing.count += 1;
      existing.last_clicked = Date.now();
    } else {
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

    if (clicks.length > STORAGE_LIMITS.MAX_TOOL_CLICKS) {
      clicks.sort((a: ToolClickEvent, b: ToolClickEvent) => b.count - a.count);
      clicks.splice(STORAGE_LIMITS.MAX_TOOL_CLICKS);
    }

    localStorage.setItem(
      COOKIE_NAMES.TOOL_CLICKS,
      JSON.stringify({
        session_id: getSessionId(),
        session_started: getSessionStartTime(),
        clicks,
        updated_at: Date.now()
      })
    );

    sendAnalyticsEvent('tool_clicked', {
      tool_id: toolId,
      category: category
    });
  } catch (error) {
    console.error('[Analytics] Error tracking tool click:', error);
  }
};

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

export const getTopClickedTools = (limit: number = 5): ToolClickEvent[] => {
  const clicks = getToolClicksCookie();
  return clicks
    .sort((a: ToolClickEvent, b: ToolClickEvent) => b.count - a.count)
    .slice(0, limit);
};

// ============================================================================
// CATEGORY VIEW TRACKING
// ============================================================================

export const trackCategoryView = (
  categoryId: string,
  categoryName: string
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const categories = getCategoryViewsCookie();
    const existing = categories.find((c: CategoryViewEvent) => c.category_id === categoryId);

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

    if (categories.length > STORAGE_LIMITS.MAX_CATEGORIES) {
      categories.sort((a: CategoryViewEvent, b: CategoryViewEvent) => b.view_count - a.view_count);
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

export const updateCategoryTimeSpent = (
  categoryId: string,
  seconds: number
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const categories = getCategoryViewsCookie();
    const category = categories.find((c: CategoryViewEvent) => c.category_id === categoryId);

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

export const getMostViewedCategories = (limit: number = 5): CategoryViewEvent[] => {
  const categories = getCategoryViewsCookie();
  return categories
    .sort((a: CategoryViewEvent, b: CategoryViewEvent) => b.view_count - a.view_count)
    .slice(0, limit);
};

// ============================================================================
// SEARCH QUERY TRACKING
// ============================================================================

export const trackSearchQuery = (
  query: string,
  resultCount: number
): void => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const queries = getSearchQueriesCookie();
    const existing = queries.find((q: SearchQueryEvent) => q.query.toLowerCase() === query.toLowerCase());

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

    if (queries.length > STORAGE_LIMITS.MAX_SEARCH_QUERIES) {
      queries.sort((a: SearchQueryEvent, b: SearchQueryEvent) => b.search_count - a.search_count);
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

export const getPopularSearchQueries = (limit: number = 10): SearchQueryEvent[] => {
  const queries = getSearchQueriesCookie();
  return queries
    .sort((a: SearchQueryEvent, b: SearchQueryEvent) => b.search_count - a.search_count)
    .slice(0, limit);
};

// ============================================================================
// RECOMMENDATIONS (Privacy-First)
// ============================================================================

export const getSessionRecommendations = (): {
  category: string;
  reason: string;
  tools: string[];
} | null => {
  const categories = getCategoryViewsCookie();
  if (categories.length === 0) return null;

  const topCategory = categories.sort((a: CategoryViewEvent, b: CategoryViewEvent) => b.view_count - a.view_count)[0];

  const toolClicks = getToolClicksCookie();
  const categoryTools = toolClicks.filter((t: ToolClickEvent) => t.category === topCategory.category_id);

  return {
    category: topCategory.category_name,
    reason: 'Based on your browsing in this session',
    tools: categoryTools
      .sort((a: ToolClickEvent, b: ToolClickEvent) => b.count - a.count)
      .slice(0, 3)
      .map((t: ToolClickEvent) => t.tool_id)
  };
};

// ============================================================================
// DATA EXPORT & PRIVACY
// ============================================================================

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

export const clearAnalyticsCookies = (): void => {
  localStorage.removeItem(COOKIE_NAMES.TOOL_CLICKS);
  localStorage.removeItem(COOKIE_NAMES.CATEGORY_VIEWS);
  localStorage.removeItem(COOKIE_NAMES.SEARCH_QUERIES);
};

export const sendAggregatedAnalytics = async (): Promise<void> => {
  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    const payload = {
      timestamp: Date.now(),
      
      top_tools: getTopClickedTools(5).map((t: ToolClickEvent) => ({
        tool_id: t.tool_id,
        clicks: t.count,
        category: t.category
      })),
      
      top_categories: getMostViewedCategories(3).map((c: CategoryViewEvent) => ({
        category_id: c.category_id,
        views: c.view_count
      })),
      
      popular_searches: getPopularSearchQueries(5).map((q: SearchQueryEvent) => ({
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

const sendAnalyticsEvent = (eventName: string, data: Record<string, unknown>): void => {
  if (typeof window === 'undefined') return;

  if (!ClientConsentStorage.hasConsent(ConsentCategory.ANALYTICS)) return;

  try {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventName, data);
    }
  } catch (error) {
    console.error('[Analytics] Error sending event:', error);
  }
};

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

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, data: Record<string, any>) => void;
  }
}
