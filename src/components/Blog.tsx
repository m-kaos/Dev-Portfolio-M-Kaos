import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
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

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from JSON data
    const posts = blogPostsData.slice(0, 3); // Only show first 3 on homepage
    setBlogPosts(posts as BlogPost[]);
  }, []);

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">03</h2>
          <h3 className="text-3xl md:text-4xl font-light">Latest posts</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <h4 className="text-xl font-light mb-3 line-clamp-2">{post.title}</h4>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
                <span className="text-accent hover:underline">Read more →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className={`inline-block px-8 py-3 rounded-full transition-colors ${
              theme === 'glass'
                ? 'glass-button hover:bg-white/25 text-foreground'
                : 'border border-border hover:bg-accent/10 hover:border-accent hover:text-accent'
            }`}
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
