import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    if (diffInHours < 48) return 'Ontem';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <Link to={`/noticia/${news.id}`} className="news-card group">
      <div className="news-card-image-wrapper">
        <img src={news.image} alt={news.title} className="news-card-image" />
        <div className="news-card-category">{news.category}</div>
        {news.tag && (
          <div className="news-card-tag">{news.tag}</div>
        )}
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{news.title}</h3>
        <p className="news-card-subtitle">{news.subtitle}</p>
        <div className="news-card-meta">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(news.date)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{news.author}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
