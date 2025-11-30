
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const { state, t } = useAppContext();
  const { theme } = state;
  const navigate = useNavigate();

  // Determine Button Classes based on Theme Config
  const getButtonClasses = () => {
      let classes = "px-8 py-4 text-lg font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 ";
      
      // Shape
      if (theme.buttonShape === 'pill') classes += 'rounded-full ';
      else if (theme.buttonShape === 'rounded') classes += 'rounded-lg ';
      else classes += 'rounded-none ';

      // Border for outline style
      if (theme.buttonStyle === 'outline') classes += 'hover:bg-white hover:text-black ';

      return classes;
  };

  const btnStyle = {
      backgroundColor: theme.buttonStyle === 'outline' ? 'transparent' : theme.primaryColor,
      color: theme.buttonStyle === 'outline' ? 'white' : (theme.primaryColor === '#00ff99' ? '#000' : 'white'), // Handle neon text contrast
      border: theme.buttonStyle === 'outline' ? `2px solid ${theme.primaryColor}` : 'none',
      boxShadow: theme.buttonStyle === 'ghost' ? `0 0 15px ${theme.primaryColor}` : 'none'
  };

  const titleFont = theme.fontHeader === 'serif' ? 'font-serif' : theme.fontHeader === 'display' ? 'font-display' : 'font-sans';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 bg-gray-900">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/1280px-The_Treasury_Petra_Jordan.jpg"
          alt="Petra Treasury"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h2 
            className={`text-xl md:text-2xl font-light tracking-widest uppercase mb-4 opacity-90 ${theme.fontBody === 'mono' ? 'font-mono' : 'font-sans'}`}
            style={{ color: theme.secondaryColor }}
        >
          {t.countryName}
        </h2>
        <h1 className={`text-5xl md:text-8xl font-bold mb-6 drop-shadow-lg leading-tight ${titleFont}`}>
          {t.heroTitleMain.split(' ')[0]} <span style={{ color: theme.primaryColor }}>{t.heroTitleHighlight}</span>
          <br />
          <span className="text-3xl md:text-6xl font-light">{t.heroTitleMain.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className={`max-w-2xl text-lg md:text-xl text-gray-200 mb-10 leading-relaxed shadow-black drop-shadow-md ${theme.fontBody === 'serif' ? 'font-serif' : 'font-sans'}`}>
          {t.heroDesc}
        </p>

        <button
          onClick={() => navigate('/plan')}
          style={btnStyle}
          className={getButtonClasses()}
        >
          <span>{t.planButton}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
};
