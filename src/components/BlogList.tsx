import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../contexts/NavigationContext';
import { ShaderAnimation } from './shader-lines';
import blogPostsData from '../data/blogPosts.json';
import blog1 from '../imgs/blog 1.png';
import blog2 from '../imgs/blog 2.png';
import blog3 from '../imgs/blog 3.png';

interface BlogPost {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
}

const imageMap: { [key: string]: string } = {
  'blog 1.png': blog1,
  'blog 2.png': blog2,
  'blog 3.png': blog3,
};

const BlogList: React.FC = () => {
  const { theme } = useTheme();
  const { isCollapsed } = useNavigation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Load all blog posts from JSON data
    setBlogPosts(blogPostsData as BlogPost[]);
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div className="min-h-screen bg-secondary relative">
      {/* Shader Background - Only in glass mode */}
      {theme === 'glass' && (
        <div className="fixed inset-0 z-0">
          <ShaderAnimation />
        </div>
      )}

      <main
        className={`relative z-10 min-h-screen py-0 md:py-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-0 md:ml-6 mr-0 md:mr-24' : 'ml-0 md:ml-56 mr-0 md:mr-24'
        }`}
      >
        <div
          className={`min-h-screen rounded-none md:rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
            theme === 'glass' ? 'glass-panel' : 'bg-background'
          }`}
        >
          <section className="px-6 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-16">
                <Link
                  to="/#blog"
                  className="text-accent hover:underline mb-4 inline-block"
                >
                  ← Back to home
                </Link>
                <h1 className="text-5xl md:text-7xl font-light mb-4">All Blog Posts</h1>
                <p className="text-xl text-muted-foreground">
                  Thoughts on web development, AI, and technology
                </p>
              </div>

              {/* Tag Filter */}
              <div className="mb-12">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedTag === null
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    All Posts
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedTag === tag
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className={`group block rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer hover:translate-y-[-4px] ${
                      theme === 'glass'
                        ? 'glass-card hover:bg-white/20'
                        : 'border border-border hover:border-accent'
                    }`}
                  >
                    <div className="mb-4">
                      <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                        <img
                          src={imageMap[post.image] || post.image}
                          alt={post.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{post.readTime}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-xl font-light mb-3 line-clamp-2">{post.title}</h4>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">By {post.author}</span>
                      <span className="text-accent hover:underline">Read more →</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No posts message */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No posts found with tag "{selectedTag}"
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogList;
