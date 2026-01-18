'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

/**
 * useKeyboardNavigation - Handle keyboard navigation in modals/overlays
 * 
 * Features:
 * - Trap focus within modal (Tab/Shift+Tab)
 * - Close on Escape
 * - Announce state to screen readers
 */
export function useKeyboardNavigation(
  isOpen: boolean,
  onClose?: () => void
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape' && onClose) {
        onClose();
        return;
      }

      // Focus trap on Tab
      if (e.key === 'Tab') {
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          // Shift+Tab on first element -> focus last
          if (activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab on last element -> focus first
          if (activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return containerRef;
}

/**
 * useAnnouncementLive - Live region announcements for screen readers
 * 
 * Use for:
 * - Status changes
 * - Form submissions
 * - Errors
 */
export function useAnnouncementLive(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  duration: number = 3000
) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!message) return;

    setAnnouncement(message);
    const timer = setTimeout(() => setAnnouncement(''), duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return { announcement, priority };
}

/**
 * AnnouncementLive Component - Renders live region announcements
 */
export function AnnouncementLive({
  announcement,
  priority = 'polite',
}: {
  announcement: string;
  priority?: 'polite' | 'assertive';
}) {
  if (!announcement) return null;

  return React.createElement(
    'div',
    {
      className: 'sr-only',
      role: 'status',
      'aria-live': priority,
      'aria-atomic': 'true',
    },
    announcement
  );
}

/**
 * useScrollLock - Prevent scroll when modal is open
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}

/**
 * usePrefersReducedMotion - Respect user's motion preferences
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}

/**
 * useFirstVisitDetection - Detect if user is first-time visitor
 */
export function useFirstVisitDetection() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only runs in browser
    const hasVisited = localStorage.getItem('has_visited_site');
    
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('has_visited_site', 'true');
    }
    
    setIsLoaded(true);
  }, []);

  return { isFirstVisit, isLoaded };
}

/**
 * useFocusOnOpen - Auto-focus element when modal opens
 */
export function useFocusOnOpen(shouldOpen: boolean, deps?: React.DependencyList) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldOpen && elementRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        elementRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [shouldOpen, ...(deps || [])]);

  return elementRef;
}

/**
 * useReducedMotion - Get CSS classes for reduced motion
 */
export function getMotionClasses(
  prefersReduced: boolean,
  normalClass: string,
  reducedClass: string = ''
) {
  return prefersReduced ? reducedClass : normalClass;
}
