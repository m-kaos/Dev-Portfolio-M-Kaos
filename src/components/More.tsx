import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import musicImage from '../imgs/music.webp';
import gameImage from '../imgs/star citizen.webp';

const More: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const cards = [
    {
      id: 'music',
      title: 'Music Portfolio',
      description: 'Explore my musical journey, compositions, and creative process',
      image: musicImage,
      link: '/music',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 'games',
      title: 'GG',
      description: 'Dive into my gaming world, favorite titles, and experiences',
      image: gameImage,
      link: '/games',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl md:text-8xl font-light">04</h2>
          <h3 className="text-3xl md:text-4xl font-light">More about me</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className={`group relative h-[500px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                theme === 'glass'
                  ? 'glass-card hover:bg-white/20'
                  : 'border border-border hover:border-accent'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 z-10">
                <div className="transform transition-all duration-500 group-hover:translate-y-[-20px]">
                  <h4 className="text-4xl md:text-5xl font-light mb-4 text-white drop-shadow-lg">
                    {card.title}
                  </h4>
                  <p className="text-lg text-white/90 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 drop-shadow-md">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <span>Explore</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional tagline */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Beyond code — exploring creativity through every medium.
          </p>
        </div>
      </div>
    </section>
  );
};

export default More;
