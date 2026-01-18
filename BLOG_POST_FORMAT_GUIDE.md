# Blog Post Format Guide

This guide explains the exact JSON format required to create blog posts in the system.

## Complete Format Specification

```json
{
  "title": "Emergent.sh: The Complete Guide to Autonomous \"Vibe Coding\"",
  "slug": "emergent-sh-guide-vibe-coding",
  "excerpt": "Discover how Emergent.sh is redefining software development through agentic \"vibe coding.\" This comprehensive guide explores how to build full-stack applications using natural language prompts, understanding its multi-agent architecture, and mastering the platform.",
  "category": "AI Development",
  "author": "Alex Chen",
  "tags": ["Emergent.sh", "Vibe Coding", "AI App Builder", "Autonomous Agents", "Software Development"],
  "reading_time_minutes": 10,
  "seo_title": "Emergent.sh Guide: Build Full-Stack Apps with AI Agents (2026)",
  "seo_description": "A comprehensive guide to Emergent.sh, the leading autonomous coding platform. Learn how its multi-agent system transforms natural language prompts into production-ready software without writing code manually.",
  "seo_keywords": [
    "Emergent.sh guide",
    "what is vibe coding",
    "AI software engineer",
    "autonomous coding agents",
    "build SaaS without code",
    "Claude 3.5 Sonnet app builder"
  ],
  "content": [
    {
      "type": "heading",
      "level": 1,
      "content": "Emergent.sh: The Complete Guide to Autonomous \"Vibe Coding\""
    },
    {
      "type": "paragraph",
      "content": "The landscape of software development has shifted dramatically..."
    }
  ]
}
```

## Field Reference

### Required Metadata Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Main blog post title | "Emergent.sh: The Complete Guide..." |
| `slug` | string | URL-friendly identifier (lowercase, hyphens only) | "emergent-sh-guide-vibe-coding" |
| `excerpt` | string | Brief summary for preview cards (150-200 chars recommended) | "Discover how Emergent.sh is redefining..." |
| `category` | string | Primary category for organization | "AI Development" |
| `author` | string | Author name | "Alex Chen" |
| `tags` | string[] | Array of topic tags | ["Emergent.sh", "Vibe Coding", ...] |
| `reading_time_minutes` | number | Estimated reading time | 10 |

### SEO Fields

| Field | Type | Description | Recommended Length |
|-------|------|-------------|-------------------|
| `seo_title` | string | Meta title tag for search engines | 50-60 characters |
| `seo_description` | string | Meta description tag | 150-160 characters |
| `seo_keywords` | string[] | Array of SEO keywords/phrases | 5-10 keywords |

### Content Structure

The `content` field is an array of content blocks. Each block has a `type` and type-specific properties.

#### Supported Block Types

##### 1. Heading
```json
{
  "type": "heading",
  "level": 1,
  "content": "Main Title"
}
```
- `level`: 1-6 (H1 to H6)
- `content`: Text of the heading

##### 2. Paragraph
```json
{
  "type": "paragraph",
  "content": "This is a paragraph with text content."
}
```
- `content`: Text content (supports inline formatting in display)

##### 3. Unordered List
```json
{
  "type": "list",
  "ordered": false,
  "items": [
    "First item",
    "Second item",
    "Third item"
  ]
}
```
- `ordered`: false for bullet points
- `items`: Array of list items (strings)

##### 4. Ordered List
```json
{
  "type": "list",
  "ordered": true,
  "items": [
    "First step",
    "Second step",
    "Third step"
  ]
}
```
- `ordered`: true for numbered list
- `items`: Array of list items (strings)

##### 5. Quote/Blockquote
```json
{
  "type": "quote",
  "content": "Quote text goes here"
}
```
- `content`: The quoted text

##### 6. Code Block
```json
{
  "type": "code",
  "content": "// Code example\nfunction example() {\n  return true;\n}"
}
```
- `content`: Code to display (as string, not escaped)

##### 7. Image
```json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "alt": "Image description",
  "caption": "Optional caption"
}
```
- `src`: URL to the image
- `alt`: Alt text for accessibility
- `caption`: Optional image caption

## Complete Example

Here's the complete Emergent.sh example:

```json
{
  "title": "Emergent.sh: The Complete Guide to Autonomous \"Vibe Coding\"",
  "slug": "emergent-sh-guide-vibe-coding",
  "excerpt": "Discover how Emergent.sh is redefining software development through agentic \"vibe coding.\" This comprehensive guide explores how to build full-stack applications using natural language prompts, understanding its multi-agent architecture, and mastering the platform.",
  "category": "AI Development",
  "author": "Alex Chen",
  "tags": ["Emergent.sh", "Vibe Coding", "AI App Builder", "Autonomous Agents", "Software Development"],
  "reading_time_minutes": 10,
  "seo_title": "Emergent.sh Guide: Build Full-Stack Apps with AI Agents (2026)",
  "seo_description": "A comprehensive guide to Emergent.sh, the leading autonomous coding platform. Learn how its multi-agent system transforms natural language prompts into production-ready software without writing code manually.",
  "seo_keywords": [
    "Emergent.sh guide",
    "what is vibe coding",
    "AI software engineer",
    "autonomous coding agents",
    "build SaaS without code",
    "Claude 3.5 Sonnet app builder"
  ],
  "content": [
    {
      "type": "heading",
      "level": 1,
      "content": "Emergent.sh: The Complete Guide to Autonomous \"Vibe Coding\""
    },
    {
      "type": "paragraph",
      "content": "The landscape of software development has shifted dramatically. We have moved past simple code completion and into the era of autonomous software engineering. Leading this charge in 2026 is Emergent.sh, a platform that has popularized the concept of \"vibe coding\"—building complex applications through natural language conversations with AI agents."
    },
    {
      "type": "paragraph",
      "content": "If you are a founder looking to launch an MVP quickly, a product manager wanting to prototype ideas without taxing engineering resources, or a developer looking to accelerate boilerplate creation, Emergent.sh is designed for you. This guide will walk you through everything you need to know about the platform."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "What is Emergent.sh?"
    },
    {
      "type": "paragraph",
      "content": "Emergent.sh is an agentic development platform. Unlike traditional AI coding assistants that act as a \"copilot\" suggesting snippets of code within your editor, Emergent acts as a full virtual engineering team."
    },
    {
      "type": "paragraph",
      "content": "You provide a high-level description of what you want to build (the \"vibe\"), and Emergent's autonomous agents handle the rest. They architect the database, write the backend API (Node/Python), create the frontend UI (React/Next.js), handle authentication, and even deploy the application. It doesn't just simulate coding; it actually creates files, runs terminal commands, and fixes its own errors in real-time."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "How It Works: The Multi-Agent Architecture"
    },
    {
      "type": "paragraph",
      "content": "The magic of Emergent lies in its orchestration of multiple specialized AI agents, primarily powered by advanced models like Anthropic's Claude 3.5 Sonnet. When you submit a prompt, it isn't handled by one single AI. Instead, it is broken down by a team of virtual experts:"
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "The Builder Agent - The core engineer that writes the actual functional code across the stack.",
        "The Designer Agent - Focuses on UI/UX, ensuring the application looks modern and is responsive (often using Tailwind CSS).",
        "The QA Agent - actively tests the application as it's being built, identifying bugs and instructing the Builder to fix them.",
        "The Ops Agent - Handles environment setup, database connections, dependencies, and deployment."
      ]
    },
    {
      "type": "quote",
      "content": "Emergent isn't about replacing developers; it's about abstracting away the tedious parts of coding so creators can focus on product logic and user experience. It's the closest we've come to programming at the speed of thought."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Key Features Distinct to Emergent"
    },
    {
      "type": "heading",
      "level": 3,
      "content": "1. Full-Stack Autonomy"
    },
    {
      "type": "paragraph",
      "content": "Many tools handle just frontend or just SQL. Emergent builds the entire vertical slice: the database schema (PostgreSQL), the server logic, and the client-side interface, ensuring they all communicate correctly from day one."
    },
    {
      "type": "heading",
      "level": 3,
      "content": "2. Universal API Integrations"
    },
    {
      "type": "paragraph",
      "content": "Connecting third-party services is usually a headache. Emergent has pre-built \"brokers\" for common services. You can simply ask it to \"add Stripe subscription payments\" or \"use Auth0 for login,\" and the agents handle the secure credential exchange and webhooks setup automatically."
    },
    {
      "type": "heading",
      "level": 3,
      "content": "3. Autonomous Debugging Loop"
    },
    {
      "type": "paragraph",
      "content": "When code fails—and it will—you don't have to paste errors back into a chat window. Emergent's agents read the terminal output, analyze the stack trace, formulate a fix, apply it, and re-run the tests without human intervention."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Mastering \"Vibe Coding\": Prompting Best Practices"
    },
    {
      "type": "paragraph",
      "content": "While Emergent handles the heavy lifting, the quality of your output depends on the quality of your input. \"Vibe coding\" requires a shift from technical specification to descriptive intent."
    },
    {
      "type": "code",
      "content": "// The Vibe Coding Approach\n\n// BAD PROMPT:\n\"Create a website with a login button and a database.\"\n(Too vague. The agents will make too many assumptions.)\n\n// GOOD PROMPT:\n\"Build a SaaS dashboard for a pet sitting business. Users should log in via Google Auth. Once logged in, they should see a calendar view where they can schedule appointments. The design should be friendly, using a pastel color palette. We need a PostgreSQL database to store user profiles and appointment details. Please include a Stripe integration for accepting payments for bookings.\"\n(Specific intent, defines the 'vibe', outlines core features and desired stack elements.)"
    },
    {
      "type": "heading",
      "level": 3,
      "content": "Tips for Success:"
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "Be iterative - Don't try to build Amazon in one prompt. Start with an MVP and add features sequentially.",
        "Define the stack constraints if necessary - If you specifically need Python backend instead of Node, tell the agent beforehand.",
        "Review the 'Plan' - Before executing, Emergent presents a plan. Read it to ensure the agents understood your intent correctly."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Understanding the Pricing Model"
    },
    {
      "type": "paragraph",
      "content": "It is important to note that Emergent.sh operates on a consumption-based credit model, not just a flat monthly seat fee. Because autonomous agents perform complex, multi-step tasks (like running tests and fixing bugs repeatedly), they consume significant compute resources."
    },
    {
      "type": "paragraph",
      "content": "Simple UI tweaks cost few credits, while asking the agent to \"refactor the entire backend authentication system\" will consume many more. Users need to balance their reliance on autonomy versus manual intervention to manage costs effectively."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Conclusion"
    },
    {
      "type": "paragraph",
      "content": "Emergent.sh represents a significant leap forward in democratizing software creation. By allowing humans to communicate intent via natural language and letting AI handle the implementation details, it dramatically lowers the barrier to entry for building sophisticated applications. Whether you are technical or not, mastering Emergent is becoming an essential skill for rapid product development in 2026."
    }
  ]
}
```

## Validation Rules

When creating a blog post, the system validates:

1. **Required fields**: title, slug, excerpt, category, author, tags, reading_time_minutes, content
2. **Slug format**: Must be lowercase, hyphenated, no spaces or special characters
3. **Content array**: Must contain at least one content block
4. **Content blocks**: Each block must have a valid `type` field
5. **SEO fields**: Should be present for better search visibility

## Tips for Writing Great Content

### For Paragraphs
- Keep paragraphs 2-4 sentences long
- Use clear, accessible language
- Link concepts together logically

### For Lists
- Use 3-5 items per list
- Keep items concise
- Maintain parallel structure

### For Headings
- Use H2 for major sections
- Use H3 for subsections
- Keep heading text concise (under 60 characters)

### For Code Blocks
- Include language comments if helpful
- Keep code examples focused (10-20 lines)
- Add context before code blocks

### For Quotes
- Use sparingly (1-2 per post)
- Make quotes meaningful and memorable
- Consider attributing in the UI

## Publishing Workflow

1. Prepare your JSON following this format
2. Go to `/admin/blog/create`
3. Paste your JSON into the JSON Content field
4. Click "Parse JSON"
5. Upload a featured image (required for SEO)
6. Optionally upload body images if referenced in content
7. Review the preview
8. Click "Publish Blog Post"

Your blog post will immediately be accessible at `/blog/{slug}`
