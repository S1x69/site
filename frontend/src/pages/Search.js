import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, TrendingUp } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import { mockNews, searchPrefixes } from '../mock';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    if (searchInput.length > 0) {
      const filtered = mockNews.filter(news =>
        news.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        news.subtitle.toLowerCase().includes(searchInput.toLowerCase()) ||
        news.category.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchInput)}`);
      setShowSuggestions(false);
    }
  };

  const handlePrefixClick = (label) => {
    setSearchInput(label);
    navigate(`/busca?q=${encodeURIComponent(label)}`);
  };

  const filteredNews = mockNews.filter(news =>
    news.title.toLowerCase().includes(query.toLowerCase()) ||
    news.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    news.category.toLowerCase().includes(query.toLowerCase()) ||
    news.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="search-hero">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Buscar Notícias
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearch}>
              <div className="search-bar-large">
                <SearchIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Busque por um tema, palavra ou título..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="search-input-large"
                />
                <button type="submit" className="search-button-large">
                  Buscar
                </button>
              </div>
            </form>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && searchInput && (
              <div className="search-suggestions">
                {suggestions.map(news => (
                  <button
                    key={news.id}
                    onClick={() => navigate(`/noticia/${news.id}`)}
                    className="search-suggestion-item"
                  >
                    <img src={news.image} alt="" className="search-suggestion-image" />
                    <div className="flex-1">
                      <div className="search-suggestion-title">{news.title}</div>
                      <div className="search-suggestion-category">{news.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Prefixes */}
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Buscas Populares:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {searchPrefixes.map(prefix => (
                <button
                  key={prefix.id}
                  onClick={() => handlePrefixClick(prefix.label)}
                  className="search-prefix-button"
                >
                  {prefix.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Resultados para: <span className="search-query-highlight">"{query}"</span>
            </h2>
            <p className="result-count">
              {filteredNews.length} {filteredNews.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          </div>
        )}

        {filteredNews.length > 0 ? (
          <div className="news-grid">
            {filteredNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : query && (
          <div className="no-results">
            <SearchIcon className="w-16 h-16 mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-sm opacity-70">
              Tente outro termo de busca 🔍
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
