import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../contexts/NavigationContext';
import { ShaderAnimation } from './shader-lines';
import blogPostsData from '../data/blogPosts.json';
import blog1 from '../imgs/blog 1.png';
import blog2 from '../imgs/blog 2.png';
import blog3 from '../imgs/blog 3.png';

interface BlogPostData {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
}

const imageMap: { [key: string]: string } = {
  'blog 1.png': blog1,
  'blog 2.png': blog2,
  'blog 3.png': blog3,
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { isCollapsed } = useNavigation();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Find the blog post by slug
    const foundPost = blogPostsData.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost as BlogPostData);

      // Find related posts (same tags, different post)
      const related = blogPostsData
        .filter(
          (p) =>
            p.slug !== slug &&
            (foundPost.tags as string[]).some((tag) => (p.tags as string[]).includes(tag))
        )
        .slice(0, 3) as BlogPostData[];
      setRelatedPosts(related);
    }
    setLoading(false);
  }, [slug]);

  // If post not found after loading, redirect to blog list
  if (!loading && !post) {
    return <Navigate to="/blog" replace />;
  }

  // Show loading state
  if (loading || !post) {
    return null;
  }

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
          <article className="px-6 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link to="/blog" className="text-accent hover:underline mb-8 inline-block">
                ← Back to all posts
              </Link>

              {/* Header */}
              <header className="mb-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 bg-accent/10 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-light mb-6">{post.title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </header>

              {/* Featured Image */}
              <div className="w-full h-96 rounded-2xl overflow-hidden mb-12">
                <img
                  src={imageMap[post.image] || post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-light mb-6 mt-12">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-light mb-4 mt-10">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-light mb-3 mt-8">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-lg leading-relaxed mb-6 text-foreground">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-6 space-y-2 text-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="text-lg ml-4">{children}</li>,
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="px-2 py-1 bg-secondary rounded text-accent">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-secondary p-6 rounded-lg overflow-x-auto mb-6 border border-border">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-accent pl-6 italic my-6 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-20 pt-12 border-t border-border">
                  <h2 className="text-3xl font-light mb-8">Related Posts</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className={`group block rounded-xl p-4 hover:shadow-lg transition-all ${
                          theme === 'glass'
                            ? 'glass-card hover:bg-white/20'
                            : 'border border-border hover:border-accent'
                        }`}
                      >
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                          <img
                            src={imageMap[relatedPost.image] || relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <h4 className="font-light mb-2 line-clamp-2">{relatedPost.title}</h4>
                        <p className="text-sm text-muted-foreground">{relatedPost.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
