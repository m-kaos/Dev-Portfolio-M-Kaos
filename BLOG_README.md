# Blog System Documentation

## Overview
Complete blog system with data-driven architecture, markdown rendering, and backend-ready integration.

## Structure

### Data
- **Location**: `src/data/blogPosts.json`
- **Schema**:
```json
{
  "id": number,
  "slug": string,
  "date": string,
  "title": string,
  "excerpt": string,
  "readTime": string,
  "author": string,
  "image": string,
  "tags": string[],
  "content": string (markdown)
}
```

### Components
1. **Blog.tsx** - Homepage section (shows 3 latest posts)
2. **BlogList.tsx** - All posts page with tag filtering
3. **BlogPost.tsx** - Individual post page with markdown rendering

### Routes
- `/` - Homepage with blog section
- `/blog` - All blog posts
- `/blog/:slug` - Individual post

## Adding New Posts

### Option 1: JSON (Current)
Add to `src/data/blogPosts.json`:
```json
{
  "id": 4,
  "slug": "your-post-slug",
  "date": "2025-10-23",
  "title": "Your Post Title",
  "excerpt": "Brief description...",
  "readTime": "5 min read",
  "author": "Author Name",
  "image": "blog 1.png",
  "tags": ["React", "TypeScript"],
  "content": "# Your markdown content here..."
}
```

### Option 2: Backend Integration
Replace data fetching in components:

```typescript
// Before
import blogPostsData from '../data/blogPosts.json';
setBlogPosts(blogPostsData);

// After
const response = await fetch('https://api.yourdomain.com/posts');
const posts = await response.json();
setBlogPosts(posts);
```

## Features
- ✅ Markdown content rendering
- ✅ Tag-based filtering
- ✅ Related posts suggestions
- ✅ SEO-friendly URLs (slugs)
- ✅ Responsive design
- ✅ Theme support (white/dark/glass)
- ✅ Image lazy loading
- ✅ Grayscale hover effects

## Images
- Add blog images to `src/imgs/`
- Update `imageMap` in components:
```typescript
const imageMap = {
  'blog 1.png': blog1,
  'your-new-image.png': yourImage,
};
```

## Dependencies
- `react-markdown` - Markdown rendering

## Scalability
The system is designed to handle unlimited posts. Performance remains optimal as data is loaded per route:
- Homepage: 3 posts
- Blog list: All posts (paginate if needed)
- Blog post: Single post + 3 related
