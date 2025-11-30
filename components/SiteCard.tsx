
import React, { useState } from 'react';
import { TouristSite } from '../types';
import { useAppContext } from '../context/AppContext';
import { ImageOff, Heart, Star, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  site: TouristSite;
}

export const SiteCard: React.FC<Props> = ({ site }) => {
  const { state, t, toggleBookmark } = useAppContext();
  const { theme, language, currentUser } = state;
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  
  const tripPlannerPlugin = state.plugins.find(p => p.id === 'trip-planner' && p.active);
  const isBookmarked = state.bookmarks.includes(site.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
    } else {
      toggleBookmark(site.id);
    }
  };

  const localized = site.translations?.[language] || {};
  const displayName = localized.name || site.name;
  const displayDescription = localized.description || site.description;

  const getRadius = () => {
    switch(theme.borderRadius) {
       case 'none': return '0px';
       case 'sm': return '4px';
       case 'md': return '8px';
       case 'lg': return '16px';
       case 'full': return '24px';
       default: return '8px';
    }
  };

  const getShadow = () => {
     if (theme.cardStyle === 'flat') return 'none';
     if (theme.cardStyle === 'bordered') return 'none';
     return '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const getBorder = () => {
     if (theme.cardStyle === 'bordered') return '1px solid #e5e7eb';
     return 'none';
  };

  return (
    <Link 
      to={`/site/${site.id}`}
      className={`group relative overflow-hidden flex flex-col cursor-pointer transition-all duration-300 bg-white hover:shadow-xl`}
      style={{ 
        borderRadius: getRadius(),
        boxShadow: getShadow(),
        border: getBorder(),
        backgroundColor: theme.surfaceColor || 'white'
      }}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={site.imageUrl} 
            alt={displayName} 
            className={`w-full h-full object-cover transition-transform duration-700 ${theme.cardHoverEffect === 'zoom' ? 'group-hover:scale-110' : ''}`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
             <ImageOff size={32} className="mb-2" />
             <span className="text-xs">No Image</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800 rounded shadow-sm flex items-center gap-1">
          {site.rating && <Star size={10} className="text-yellow-500 fill-current" />}
          {site.category}
        </div>

        {tripPlannerPlugin && (
          <button 
            onClick={handleBookmark}
            className={`absolute top-4 left-4 p-2.5 rounded-full shadow-sm transition-all z-10 ${isBookmarked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
          >
             <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <h3 className={`text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-1 ${theme.fontHeader === 'serif' ? 'font-serif' : 'font-sans'}`}>
              {displayName}
           </h3>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3 font-medium">
             <MapPin size={12} /> {site.location}
        </div>

        <p 
          className={`text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-3 ${theme.fontBody === 'serif' ? 'font-serif' : 'font-sans'}`}
          style={{ fontSize: `${theme.fontScale}rem` }}
        >
          {displayDescription}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          {/* Price removed from display */}
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
             {site.featured ? 'Featured' : 'View Details'}
          </span>
          <span 
             className="text-xs font-bold uppercase tracking-widest group-hover:underline decoration-2 underline-offset-4 text-gray-400 group-hover:text-gray-800"
          >
            {t.readMore}
          </span>
        </div>
      </div>
    </Link>
  );
};
