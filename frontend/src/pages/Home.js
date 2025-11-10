import React from 'react';
import NewsCarousel from '../components/NewsCarousel';
import NewsCard from '../components/NewsCard';
import { mockNews } from '../mock';

const Home = () => {
  const newsByCategory = {
    'Tecnologia': mockNews.filter(n => n.category === 'Tecnologia'),
    'Esportes': mockNews.filter(n => n.category === 'Esportes'),
    'Mundo': mockNews.filter(n => n.category === 'Mundo'),
    'Entretenimento': mockNews.filter(n => n.category === 'Entretenimento')
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Carousel */}
        <NewsCarousel />

        {/* Latest News */}
        <section className="mt-16">
          <div className="section-header">
            <h2 className="section-title">Últimas Notícias</h2>
            <div className="section-divider" />
          </div>
          <div className="news-grid">
            {mockNews.slice(0, 6).map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* News by Category */}
        {Object.entries(newsByCategory).map(([category, news]) => (
          news.length > 0 && (
            <section key={category} className="mt-16">
              <div className="section-header">
                <h2 className="section-title">{category}</h2>
                <div className="section-divider" />
              </div>
              <div className="news-grid">
                {news.map(item => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  );
};

export default Home;
