"use client";
import React, { useState } from "react";

interface BlogPostPremiumContentProps {
  previewContentHtml: string;
  fullContentHtml: string;
  onSubscribeClick?: () => void;
}

export default function BlogPostPremiumContent({
  previewContentHtml,
  fullContentHtml,
  onSubscribeClick,
}: BlogPostPremiumContentProps) {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="mt-8 relative">
      { !unlocked ? (
        <div className="relative">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: previewContentHtml }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="w-full h-48 bg-gradient-to-t from-white/95 to-transparent dark:from-zinc-900/95 dark:to-transparent backdrop-blur-sm pointer-events-auto flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold">Unlock the full article</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                  This is premium content. Subscribe to read the full article and support independent writing.
                </p>
                <div className="mt-4 flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowSubscribe(true);
                      if (onSubscribeClick) onSubscribeClick();
                    }}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white"
                  >
                    Subscribe
                  </button>
                  <button
                    onClick={() => setUnlocked(true)}
                    className="px-4 py-2 rounded-md border"
                  >
                    Unlock once
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* cover the lower area so the overlay sits on top */}
          <div className="h-48" />
        </div>
      ) : (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: fullContentHtml }}
        />
      )}
    </section>
  );
}
