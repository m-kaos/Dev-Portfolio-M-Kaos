import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface BlogPost {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const Blog: React.FC = () => {
  const { theme } = useTheme();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      date: 'Oct 15, 2025',
      title: 'Building Modern Web Applications with React and TypeScript',
      excerpt: 'Explore best practices and patterns for creating scalable and maintainable React applications using TypeScript.',
      readTime: '5 min read',
    },
    {
      id: 2,
      date: 'Oct 8, 2025',
      title: 'The Future of Frontend Development',
      excerpt: 'A deep dive into emerging trends and technologies that are shaping the future of web development.',
      readTime: '7 min read',
    },
    {
      id: 3,
      date: 'Sep 28, 2025',
      title: 'Mastering Tailwind CSS',
      excerpt: 'Learn how to leverage Tailwind CSS to create beautiful, responsive designs with minimal effort.',
      readTime: '4 min read',
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">03</h2>
          <h3 className="text-3xl md:text-4xl font-light">Latest posts</h3>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={`rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer hover:translate-y-[-4px] ${
                theme === 'glass'
                  ? 'glass-card hover:bg-white/20'
                  : 'border border-border hover:border-accent'
              }`}
            >
              <div className="mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-muted-foreground">Blog Image</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              </div>

              <h4 className="text-xl font-light mb-3 line-clamp-2">{post.title}</h4>
              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
                <span className="text-accent hover:underline">Read more →</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className={`px-8 py-3 rounded-full transition-colors ${
              theme === 'glass'
                ? 'glass-button hover:bg-white/25 text-foreground'
                : 'border border-border hover:bg-accent/10 hover:border-accent hover:text-accent'
            }`}
          >
            View all posts
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Blog;
