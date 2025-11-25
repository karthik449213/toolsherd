# Refinement Plan for src/app/blog/[slug]/page.tsx

## Steps:
- [ ] 1. Add `generateMetadata` function for dynamic SEO (title, description, OG image, canonical).
- [ ] 2. Improve `fetchPost`: Add error handling with `notFound()`, ensure single post.
- [ ] 3. Fix post mapping: Use `coverImageUrl`, handle all nulls per types.ts, remove unsupported fields.
- [ ] 4. Restructure JSX: Proper semantic structure (<article>, <header>), back link, meta info (author/date), conditional image/excerpt, remove tags/TOC placeholders.
- [ ] 5. Remove invalid client-side state/handlers (setShowSubscribe, unlocked, etc.); render full content server-side.
- [ ] 6. Enhance accessibility: alt texts, <time>, aria-labels, semantic HTML.
- [ ] 7. Final tweaks: TS strictness, Image optimization, clean up imports.

## Followup:
- Test with `npm run dev` and browser_action on a sample slug (e.g., from sql/insert_detailed_blog_post.sql).
- Update TODO.md after each step.
