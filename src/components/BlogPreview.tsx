import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blogPosts';

interface BlogPreviewProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  slug: string;
}

export default function BlogPreview({ title, excerpt, date, author, image, slug }: BlogPreviewProps) {
  return (
    <article className="bg-dark-200 rounded-2xl shadow-soft hover:shadow-neon transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary-400" />
            <time>{new Date(date).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-primary-400" />
            <span>{author.name}</span>
          </div>
        </div>
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-400 line-clamp-3">{excerpt}</p>
        <Link 
          to={`/blog/${slug}`}
          className="mt-4 text-primary-400 font-semibold group-hover:text-primary-300 transition-colors inline-flex items-center gap-2"
        >
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}