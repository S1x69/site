import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockNews } from '../mock';

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredNews = mockNews.filter(news => news.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredNews.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
  };

  if (featuredNews.length === 0) return null;

  return (
    <div className="carousel-container relative overflow-hidden rounded-2xl">
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {featuredNews.map((news) => (
          <div key={news.id} className="carousel-slide">
            <div className="carousel-image-wrapper">
              <img src={news.image} alt={news.title} className="carousel-image" />
              <div className="carousel-overlay" />
            </div>
            <div className="carousel-content">
              {news.tag && (
                <span className="carousel-tag">{news.tag}</span>
              )}
              <h2 className="carousel-title">{news.title}</h2>
              <p className="carousel-subtitle">{news.subtitle}</p>
              <Link to={`/noticia/${news.id}`} className="carousel-button">
                Ler Mais
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="carousel-nav-button left-4"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="carousel-nav-button right-4"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {featuredNews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;
