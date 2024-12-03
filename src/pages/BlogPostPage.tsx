import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Link 
            to="/blog"
            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} - UAE Parking Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={post.image}
      />
      
      <div className="min-h-screen bg-dark-100">
        {/* Hero Section */}
        <div className="relative h-96">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <article className="bg-dark-200 rounded-2xl shadow-soft p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-4">
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <span className="block text-gray-400">Written by</span>
                  <span className="text-white font-medium">{post.author.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <time>{new Date(post.date).toLocaleDateString()}</time>
              </div>

              <div className="flex flex-wrap gap-2">
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
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-dark-200 rounded-xl shadow-soft hover:shadow-neon transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <img 
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}