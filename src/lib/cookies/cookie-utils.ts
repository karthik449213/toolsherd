/**
 * Cookie Utilities - Server & Client Safe
 * 
 * Provides low-level cookie operations that work in both server and client contexts.
 * Handles encoding/decoding and security considerations.
 */

import { cookies } from 'next/headers';
import type { CompactConsent, ConsentRecord } from './consent-schema';

// Cookie configuration constants
export const CONSENT_COOKIE_NAME = 'cookie_consent';
export const CONSENT_COOKIE_PATH = '/';
export const CONSENT_COOKIE_DOMAIN = undefined; // Auto-detect current domain
export const CONSENT_COOKIE_SECURE = process.env.NODE_ENV === 'production'; // HTTPS only in production
export const CONSENT_COOKIE_SAME_SITE = 'Lax'; // Allows top-level navigation
export const CONSENT_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Compression/Decompression for compact consent storage
 * Reduces cookie size from ~800 bytes to ~150 bytes
 */

export function compressConsent(record: ConsentRecord): CompactConsent {
  const sourceMap: Record<string, CompactConsent['s']> = {
    banner_accept_all: 'aba',
    banner_reject_all: 'abr',
    banner_preferences: 'abp',
    preferences_page: 'pp',
    api_call: 'api',
    implicit_accept: 'ia',
  };

  return {
    c: record.categories,
    d: Math.floor(record.consentDate / 1000),
    e: Math.floor(record.expiryDate / 1000),
    s: sourceMap[record.consentSource] as CompactConsent['s'],
    v: record.version,
    pv: record.policyVersion,
  };
}

export function decompressConsent(compact: CompactConsent): ConsentRecord {
  const sourceMap: Record<CompactConsent['s'], string> = {
    aba: 'banner_accept_all',
    abr: 'banner_reject_all',
    abp: 'banner_preferences',
    pp: 'preferences_page',
    api: 'api_call',
    ia: 'implicit_accept',
  };

  return {
    categories: compact.c,
    consentDate: compact.d * 1000,
    expiryDate: compact.e * 1000,
    userAgent: 'stored',
    country: null,
    gdprApplicable: false,
    ccpaApplicable: false,
    consentSource: sourceMap[compact.s] as any,
    version: compact.v,
    policyVersion: compact.pv,
    revokedAt: null,
  };
}

/**
 * Cookie encoding helpers
 * Encodes JSON safely for cookie storage
 */

export function encodeCookie(value: unknown): string {
  try {
    const json = JSON.stringify(value);
    // Base64 encode to handle special characters
    return Buffer.from(json).toString('base64');
  } catch (error) {
    console.error('Failed to encode cookie value', error);
    return '';
  }
}

export function decodeCookie<T = unknown>(encoded: string): T | null {
  try {
    const json = Buffer.from(encoded, 'base64').toString('utf-8');
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Failed to decode cookie value', error);
    return null;
  }
}

/**
 * Server-side cookie operations
 * Use in API routes and server components
 */

export async function getServerCookie(name: string): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } catch (error) {
    console.error('Failed to get server cookie', error);
    return undefined;
  }
}

export async function setServerCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    path?: string;
  } = {}
): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      maxAge: options.maxAge ?? CONSENT_COOKIE_MAX_AGE,
      secure: options.secure ?? CONSENT_COOKIE_SECURE,
      httpOnly: options.httpOnly ?? false, // Allow client access for consent
      sameSite: (options.sameSite ?? CONSENT_COOKIE_SAME_SITE)?.toLowerCase() as 'strict' | 'lax' | 'none',
      path: options.path ?? CONSENT_COOKIE_PATH,
    });
  } catch (error) {
    console.error('Failed to set server cookie', error);
    throw error;
  }
}

export async function deleteServerCookie(name: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    console.error('Failed to delete server cookie', error);
    throw error;
  }
}

/**
 * Client-side cookie operations
 * Use in client components and browser contexts
 */

export function getClientCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;

  try {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return undefined;
  } catch (error) {
    console.error('Failed to get client cookie', error);
    return undefined;
  }
}

export function setClientCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    path?: string;
  } = {}
): void {
  if (typeof document === 'undefined') return;

  try {
    const {
      maxAge = CONSENT_COOKIE_MAX_AGE,
      secure = CONSENT_COOKIE_SECURE,
      sameSite = CONSENT_COOKIE_SAME_SITE,
      path = CONSENT_COOKIE_PATH,
    } = options;

    let cookieString = `${name}=${encodeURIComponent(value)}`;
    cookieString += `; path=${path}`;
    cookieString += `; max-age=${maxAge}`;
    if (secure) cookieString += '; secure';
    cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
  } catch (error) {
    console.error('Failed to set client cookie', error);
  }
}

export function deleteClientCookie(name: string): void {
  if (typeof document === 'undefined') return;

  try {
    document.cookie = `${name}=; path=/; max-age=0`;
  } catch (error) {
    console.error('Failed to delete client cookie', error);
  }
}

/**
 * Adaptive cookie access
 * Works in both server and client contexts
 */

export async function getCookie(name: string): Promise<string | undefined> {
  // Try server first (if in server context)
  if (typeof window === 'undefined') {
    return getServerCookie(name);
  }

  // Fall back to client
  return getClientCookie(name);
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    path?: string;
  } = {}
): void {
  // If in server context, we can't set cookies directly
  if (typeof window === 'undefined') {
    console.warn('Cannot set cookies in server context. Use setServerCookie in API routes.');
    return;
  }

  setClientCookie(name, value, options);
}

/**
 * Cookie metadata helpers
 */

export function getCookieExpiryDate(maxAge: number = CONSENT_COOKIE_MAX_AGE): Date {
  const now = new Date();
  now.setSeconds(now.getSeconds() + maxAge);
  return now;
}

export function getCookieSize(value: string): number {
  // Estimate cookie size in bytes
  return Buffer.byteLength(`${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/`);
}

export function validateCookieSize(value: string): boolean {
  // Most browsers support 4KB per cookie
  const maxSize = 4096;
  return getCookieSize(value) <= maxSize;
}

/**
 * Security helpers
 */

export function isCookieSecure(): boolean {
  if (typeof window === 'undefined') return CONSENT_COOKIE_SECURE;
  return window.location.protocol === 'https:';
}

export function shouldUseCookie(): boolean {
  // Check if cookies are enabled
  if (typeof navigator === 'undefined') return true; // Assume enabled on server

  const testCookie = '__test_cookie__';
  try {
    setClientCookie(testCookie, 'test', { maxAge: 1 });
    const result = getClientCookie(testCookie) === 'test';
    deleteClientCookie(testCookie);
    return result;
  } catch {
    return false;
  }
}

/**
 * Privacy-preserving cookie operations
 */

export function sanitizeCookieValue(value: string): string {
  // Remove any potential XSS vectors
  return value
    .replace(/[<>\"']/g, '') // Remove HTML/script chars
    .substring(0, 4096); // Truncate to cookie size limit
}

export function getCookieHash(value: string): string {
  // Simple hash for integrity checking (not cryptographic)
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function verifyCookieIntegrity(value: string, hash: string): boolean {
  return getCookieHash(value) === hash;
}
