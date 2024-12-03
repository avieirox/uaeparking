import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <>
      <SEO 
        title="Parking Blog - Latest Updates and Guides"
        description="Stay informed with the latest parking news, guides, and updates from across the UAE"
        canonical="/blog"
      />
      
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Parking Blog
            </h1>
            <p className="text-gray-400 mt-2">
              Stay informed with the latest parking insights and updates
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Categories */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
              }`}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-200 text-gray-400 hover:bg-dark-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-dark-200 rounded-2xl shadow-soft hover:shadow-neon transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary-400" />
                      <time>{new Date(post.date).toLocaleDateString()}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-primary-400" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs bg-dark-300 text-primary-400 px-2 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="mt-4 text-primary-400 font-semibold group-hover:text-primary-300 transition-colors inline-flex items-center gap-2"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}