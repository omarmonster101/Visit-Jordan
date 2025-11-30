
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../constants';
import { Globe, Coins, Moon, ArrowUp, MessageCircle, X, Bot, Share2, Facebook, Twitter, Instagram, Cookie, Lock, Music, Play, Pause, Heart, Trash2, Clock, Eye, Sun, Minus, Plus, ClipboardList, CheckSquare, Square, User, LogOut, Settings } from 'lucide-react';
import { FloatingThemeEditor } from './FloatingThemeEditor';
import { VisualEditorOverlay } from './VisualEditorOverlay';

const Header = () => {
  const { state, toggleMode, setLanguage, t, isRtl, setCurrency, logout } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Theme Config
  const { theme, currentUser } = state;
  const navbarStyle = theme.navbarStyle;
  
  // Plugins
  const currencyPlugin = state.plugins.find(p => p.id === 'currency-converter' && p.active);
  const darkModePlugin = state.plugins.find(p => p.id === 'dark-mode' && p.active);
  const tripPlannerPlugin = state.plugins.find(p => p.id === 'trip-planner' && p.active);
  const timePlugin = state.plugins.find(p => p.id === 'local-time' && p.active);
  const packingPlugin = state.plugins.find(p => p.id === 'packing-list' && p.active);
  
  const [isDark, setIsDark] = useState(false);
  const [packingOpen, setPackingOpen] = useState(false);
  const [packingItems, setPackingItems] = useState([
    { id: 1, text: 'Passport & Visa', checked: false },
    { id: 2, text: 'Comfortable Walking Shoes', checked: false },
    { id: 3, text: 'Sunscreen & Hat', checked: false },
    { id: 4, text: 'Power Adapter (Type C/F)', checked: false },
    { id: 5, text: 'Jordan Pass', checked: false },
    { id: 6, text: 'Reusable Water Bottle', checked: false },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time Plugin Logic
  useEffect(() => {
    if (timePlugin) {
      const interval = setInterval(() => {
        // Jordan UTC+3
        const date = new Date();
        const jordanTime = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Amman"}));
        setTime(jordanTime.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timePlugin]);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const togglePackingItem = (id: number) => {
    setPackingItems(items => items.map(item => item.id === id ? {...item, checked: !item.checked} : item));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setUserMenuOpen(false);
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === state.language);
  
  let headerBgClass = '';
  let textColorClass = '';
  let containerWidth = theme.siteWidth === 'boxed' ? 'max-w-7xl mx-auto px-4' : 'container mx-auto px-4';

  if (scrolled) {
    headerBgClass = 'bg-white dark:bg-slate-900 shadow-md py-2';
    textColorClass = 'text-gray-700 dark:text-gray-100';
    if (navbarStyle === 'floating') {
       headerBgClass = 'bg-white/90 backdrop-blur rounded-full shadow-lg py-2 mt-4 mx-4 border border-gray-100';
    }
  } else {
    // Top of page
    if (navbarStyle === 'solid') {
      headerBgClass = 'bg-slate-900 py-4';
      textColorClass = 'text-white';
    } else if (navbarStyle === 'glass') {
      headerBgClass = 'bg-white/10 backdrop-blur-md border-b border-white/10 py-4';
      textColorClass = 'text-white';
    } else if (navbarStyle === 'floating') {
      headerBgClass = 'bg-transparent py-4';
      textColorClass = 'text-white';
    } else {
      // Transparent (default)
      headerBgClass = isHome ? 'bg-transparent py-4' : 'bg-slate-900 py-4';
      textColorClass = 'text-white';
    }
  }

  const logoColor = scrolled ? 'text-gray-800' : 'text-white';

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBgClass} ${navbarStyle === 'floating' && scrolled ? 'left-0 right-0 max-w-5xl mx-auto' : ''}`}
      >
        <div className={containerWidth + " flex justify-between items-center"}>
          <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold tracking-tighter group">
            <span className={`${logoColor} text-3xl transition-colors`} style={{ color: scrolled ? theme.primaryColor : undefined }}>{state.settings.siteName.split(' ')[0] || 'Visit'}</span>
            <span className={`${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200'} text-sm mt-1 uppercase tracking-widest`}>{state.settings.siteName.split(' ').slice(1).join(' ') || 'Jordan'}</span>
          </Link>
          
          <nav className={`hidden md:flex items-center ${isRtl ? 'gap-8' : 'gap-8'}`}>
            <Link to="/" className={`font-medium transition-colors hover:opacity-80 ${textColorClass}`}>{t.home}</Link>
            <Link to="/discover" className={`font-medium transition-colors hover:opacity-80 ${textColorClass}`}>{t.explore}</Link>
            <Link to="/experiences" className={`font-medium transition-colors hover:opacity-80 ${textColorClass}`}>{t.experiences}</Link>
            <Link to="/plan" className={`font-medium transition-colors hover:opacity-80 ${textColorClass}`}>{t.planVisit}</Link>
          </nav>

          <div className="flex gap-3 items-center">
            
            {/* Local Time Plugin */}
            {timePlugin && (
              <div className={`hidden lg:flex items-center gap-1 text-xs font-mono px-2 py-1 rounded border ${scrolled ? 'border-gray-200 text-gray-500' : 'border-white/20 text-white/80'}`}>
                <Clock size={12} />
                <span>{time} AMMAN</span>
              </div>
            )}

            {/* Packing List Toggle */}
            {packingPlugin && (
              <button 
                onClick={() => setPackingOpen(true)}
                className={`hidden md:block p-2 rounded-full transition-all ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                title="Packing List"
              >
                <ClipboardList size={18} />
              </button>
            )}

            {/* Trip Planner Toggle */}
            {tripPlannerPlugin && currentUser && (
              <button 
                onClick={() => setPlannerOpen(true)}
                className={`relative p-2 rounded-full transition-all ${scrolled ? 'text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
              >
                <Heart size={18} />
                {state.bookmarks.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            )}

            {/* Currency Switcher */}
            {currencyPlugin && (
              <div className="relative hidden sm:block">
                  <button
                    onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-bold transition-all ${scrolled ? 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
                  >
                    <Coins size={14} />
                    <span>{state.currency}</span>
                  </button>
                  {currencyMenuOpen && (
                    <div className="absolute top-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl py-1 w-24 overflow-hidden z-50 animate-fade-in text-gray-800 dark:text-gray-200">
                        {['JOD', 'USD', 'EUR'].map(curr => (
                          <button 
                            key={curr}
                            onClick={() => { setCurrency(curr as any); setCurrencyMenuOpen(false); }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-xs font-bold ${state.currency === curr ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : ''}`}
                          >
                            {curr}
                          </button>
                        ))}
                    </div>
                  )}
              </div>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${scrolled ? 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
              >
                <Globe size={16} />
                <span className="uppercase">{currentLang?.code}</span>
              </button>
              
              {langMenuOpen && (
                <div className={`absolute top-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl py-2 w-40 max-h-64 overflow-y-auto ${isRtl ? 'left-0' : 'right-0'} z-50 animate-fade-in`}>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-3 ${state.language === lang.code ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Auth Menu */}
            {currentUser ? (
               <div className="relative ml-2">
                  <button 
                     onClick={() => setUserMenuOpen(!userMenuOpen)}
                     className="flex items-center gap-2 bg-white/10 p-1 pr-3 rounded-full hover:bg-white/20 transition-all border border-white/20"
                  >
                     <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                     <span className={`text-xs font-bold hidden sm:block ${scrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}>{currentUser.name.split(' ')[0]}</span>
                  </button>

                  {userMenuOpen && (
                     <div className={`absolute top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 w-48 ${isRtl ? 'left-0' : 'right-0'} z-50 animate-fade-in text-gray-800 dark:text-gray-200`}>
                        <div className="px-4 py-2 border-b dark:border-slate-700">
                           <p className="font-bold text-sm truncate">{currentUser.name}</p>
                           <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm">
                           <User size={16} /> Profile Dashboard
                        </Link>
                        
                        {/* Secured Admin Link */}
                        {currentUser.role === 'admin' && (
                           <button onClick={() => { toggleMode(); setUserMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm text-yellow-600 font-bold bg-yellow-50">
                              <Settings size={16} /> CMS Admin Mode
                           </button>
                        )}

                        <div className="border-t dark:border-slate-700 mt-2 pt-2">
                           <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm">
                              <LogOut size={16} /> Sign Out
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <div className="flex gap-2 ml-2">
                  <Link 
                    to="/login"
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${scrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-100' : 'border-white text-white hover:bg-white/10'}`}
                  >
                    Sign In
                  </Link>
               </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Visual Editor Overlay */}
      <VisualEditorOverlay />
      
      {/* Trip Planner Drawer */}
      {tripPlannerPlugin && plannerOpen && currentUser && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setPlannerOpen(false)}></div>
          <div className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-80 bg-white dark:bg-slate-900 z-[70] shadow-2xl p-6 flex flex-col animate-slide-in`}>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><Heart className="text-red-500" /> My Trip</h2>
                <button onClick={() => setPlannerOpen(false)}><X /></button>
             </div>
             <div className="flex-1 overflow-y-auto space-y-4">
                {state.bookmarks.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">No saved places yet.</p>
                ) : (
                  state.sites.filter(s => state.bookmarks.includes(s.id)).map(site => {
                    // Localize Name
                    const loc = site.translations?.[state.language] || {};
                    const displayName = loc.name || site.name;
                    return (
                      <div key={site.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                         <img src={site.imageUrl} className="w-16 h-16 object-cover rounded" />
                         <div className="flex-1">
                            <h4 className="font-bold text-sm">{displayName}</h4>
                            <span className="text-xs text-gray-500">{site.location}</span>
                         </div>
                      </div>
                    );
                  })
                )}
             </div>
             <Link to="/profile" onClick={() => setPlannerOpen(false)} className="w-full block text-center bg-gray-100 text-gray-800 font-bold py-3 rounded-lg mt-4 mb-2">View Full Itinerary</Link>
             <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg">Start Booking</button>
          </div>
        </>
      )}

      {/* Packing List Modal */}
      {packingPlugin && packingOpen && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4" onClick={() => setPackingOpen(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold flex items-center gap-2"><ClipboardList size={24}/> Packing List</h2>
                  <button onClick={() => setPackingOpen(false)}><X size={24}/></button>
               </div>
               <div className="space-y-3 mb-6">
                  {packingItems.map(item => (
                     <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer" onClick={() => togglePackingItem(item.id)}>
                        {item.checked ? <CheckSquare className="text-green-500" /> : <Square className="text-gray-400" />}
                        <span className={item.checked ? 'line-through text-gray-400' : ''}>{item.text}</span>
                     </div>
                  ))}
               </div>
               <button onClick={() => setPackingOpen(false)} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">Done</button>
            </div>
        </div>
      )}

      {/* ADMIN FLOATING THEME EDITOR */}
      {currentUser?.role === 'admin' && state.userMode !== 'admin' && (
         <FloatingThemeEditor />
      )}
    </>
  );
};

const Footer = () => {
  const { state, t, isRtl } = useAppContext();
  
  if (state.theme.footerStyle === 'simple') {
     return (
        <footer className="bg-gray-900 text-white py-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
           <p>{t.rights}</p>
        </footer>
     )
  }

  if (state.theme.footerStyle === 'minimal') {
    return (
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 py-6" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="container mx-auto px-4 flex justify-between items-center">
             <span className="font-bold">{state.settings.siteName}</span>
             <p className="text-sm text-gray-500">{t.rights}</p>
          </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-yellow-500 mb-6">{state.settings.siteName}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t.countryName}
            </p>
            <div className="flex gap-4 mt-6">
               {state.settings.socialLinks.facebook && <a href={state.settings.socialLinks.facebook} className="text-gray-400 hover:text-white transition-colors">FB</a>}
               {state.settings.socialLinks.instagram && <a href={state.settings.socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors">IG</a>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t.explore}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/discover" className="hover:text-yellow-500">{t.about}</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">{t.news}</Link></li>
              <li><Link to="#" className="hover:text-yellow-500">{t.gallery}</Link></li>
              <li><Link to="/plan" className="hover:text-yellow-500">{t.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t.featuredTitle}</h4>
            <ul className="space-y-2 text-gray-400">
              {state.sites.slice(0, 4).map(s => {
                const loc = s.translations?.[state.language] || {};
                const name = loc.name || s.name;
                return (
                  <li key={s.id}><Link to={`/site/${s.id}`} className="hover:text-yellow-500">{name}</Link></li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t.newsletter}</h4>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Email" className={`bg-gray-800 border-none rounded p-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none ${isRtl ? 'text-right' : 'text-left'}`} />
              <button 
                className="py-3 px-4 font-bold rounded text-gray-900 transition-colors"
                style={{ backgroundColor: state.theme.secondaryColor }}
              >
                {t.subscribe}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>{t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, isRtl } = useAppContext();
  const location = useLocation();

  // PLUGINS
  const readingProgressPlugin = state.plugins.find(p => p.id === 'reading-progress' && p.active);
  const backToTopPlugin = state.plugins.find(p => p.id === 'back-to-top' && p.active);
  const whatsappPlugin = state.plugins.find(p => p.id === 'whatsapp-support' && p.active);
  const chatbotPlugin = state.plugins.find(p => p.id === 'ai-chatbot' && p.active);
  const cookiePlugin = state.plugins.find(p => p.id === 'cookie-consent' && p.active);
  const socialSharePlugin = state.plugins.find(p => p.id === 'social-share' && p.active);
  const snowPlugin = state.plugins.find(p => p.id === 'snow-effect' && p.active);
  const maintenancePlugin = state.plugins.find(p => p.id === 'maintenance-mode' && p.active);
  const musicPlugin = state.plugins.find(p => p.id === 'music-player' && p.active);
  const accessibilityPlugin = state.plugins.find(p => p.id === 'accessibility-tools' && p.active);
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setReadingProgress(Number(scroll));
      setShowBackTop(totalScroll > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Accessibility Effects
  useEffect(() => {
     document.documentElement.style.fontSize = `${fontScale * 16}px`;
     if (highContrast) {
        document.documentElement.classList.add('high-contrast');
     } else {
        document.documentElement.classList.remove('high-contrast');
     }
  }, [fontScale, highContrast]);

  if (state.userMode === 'admin' && state.currentUser?.role === 'admin') {
    return <>{children}</>;
  }

  // Maintenance Mode Intercept
  if (maintenancePlugin) {
    return (
       <div className="h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
          <Lock size={64} className="text-yellow-500 mb-6" />
          <h1 className="text-4xl font-serif font-bold mb-4">{state.settings.siteName}</h1>
          <p className="text-xl text-gray-400 mb-8">We are currently undergoing scheduled maintenance.</p>
          <button onClick={() => state.toggleMode()} className="text-sm underline text-gray-600">Admin Login</button>
       </div>
    )
  }

  return (
    <div 
      className={`font-sans ${isRtl ? 'text-right' : 'text-left'} bg-white dark:bg-gray-900 transition-colors duration-300 ${highContrast ? 'grayscale contrast-150' : ''}`} 
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ 
        fontFamily: state.theme.fontBody === 'serif' ? 'Playfair Display, serif' : 'Cairo, sans-serif',
        backgroundColor: state.theme.backgroundColor
      }}
    >
      {/* Snow Effect (Simulated) */}
      {snowPlugin && (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-screen bg-[url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css')]">
           {/* In a real app, use react-tsparticles or similar */}
        </div>
      )}

      {/* Reading Progress */}
      {readingProgressPlugin && (
        <div className="fixed top-0 left-0 h-1 bg-yellow-500 z-[60]" style={{ width: `${readingProgress * 100}%` }}></div>
      )}

      <Header />

      {/* Accessibility Toolbar */}
      {accessibilityPlugin && (
        <div className={`fixed top-24 ${isRtl ? 'left-0' : 'right-0'} z-40`}>
           <button 
             onClick={() => setAccessOpen(!accessOpen)} 
             className="bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700"
             title="Accessibility Tools"
           >
              <Eye size={20} />
           </button>
           {accessOpen && (
              <div className={`absolute top-0 ${isRtl ? 'left-12' : 'right-12'} bg-white dark:bg-slate-800 p-4 rounded-lg shadow-2xl w-48 border border-gray-200 dark:border-slate-700 animate-slide-in`}>
                 <h4 className="font-bold mb-3 text-sm uppercase text-gray-500">Accessibility</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-sm">Font Size</span>
                       <div className="flex gap-1">
                          <button onClick={() => setFontScale(s => Math.max(0.8, s - 0.1))} className="p-1 bg-gray-200 rounded hover:bg-gray-300 text-black"><Minus size={14}/></button>
                          <button onClick={() => setFontScale(s => Math.min(1.5, s + 0.1))} className="p-1 bg-gray-200 rounded hover:bg-gray-300 text-black"><Plus size={14}/></button>
                       </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm">Contrast</span>
                       <button onClick={() => setHighContrast(!highContrast)} className={`w-10 h-6 rounded-full relative transition-colors ${highContrast ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${highContrast ? 'left-5' : 'left-1'}`}></span>
                       </button>
                    </div>
                    <button onClick={() => {setFontScale(1); setHighContrast(false);}} className="text-xs text-blue-500 underline w-full text-center">Reset</button>
                 </div>
              </div>
           )}
        </div>
      )}
      
      {/* Music Player Plugin */}
      {musicPlugin && (
        <div className={`fixed bottom-8 ${isRtl ? 'right-8' : 'left-8'} z-40`}>
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className={`p-3 rounded-full shadow-lg transition-all flex items-center gap-2 ${isPlaying ? 'bg-yellow-500 text-black' : 'bg-white dark:bg-slate-800 text-gray-500'}`}
           >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span className={`text-xs font-bold ${isPlaying ? 'block' : 'hidden'}`}>Ambient</span>
           </button>
        </div>
      )}

      {/* Social Share Sidebar */}
      {socialSharePlugin && (
         <div className={`fixed top-1/2 -translate-y-1/2 ${isRtl ? 'right-0' : 'left-0'} z-40 bg-white dark:bg-slate-800 shadow-xl rounded-${isRtl ? 'l' : 'r'}-lg p-2 flex flex-col gap-2`}>
            <button className="p-2 text-blue-600 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Facebook size={20}/></button>
            <button className="p-2 text-sky-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Twitter size={20}/></button>
            <button className="p-2 text-pink-600 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Share2 size={20}/></button>
         </div>
      )}

      <div className="min-h-screen">
        {children}
      </div>
      
      <Footer />

      {/* Back to Top */}
      {backToTopPlugin && showBackTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all animate-fade-in"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* WhatsApp Button */}
      {whatsappPlugin && (
         <a 
           href="https://wa.me/96270000000" 
           target="_blank" 
           rel="noreferrer"
           className="fixed bottom-24 left-8 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
         >
           <MessageCircle size={24} />
         </a>
      )}

      {/* AI Chatbot Widget */}
      {chatbotPlugin && (
        <>
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className={`fixed bottom-24 ${isRtl ? 'left-8' : 'right-8'} z-40 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2`}
          >
            {chatOpen ? <X size={24} /> : <Bot size={24} />}
            {!chatOpen && <span className="text-sm font-bold hidden md:inline">Ask AI</span>}
          </button>
          
          {chatOpen && (
            <div className={`fixed bottom-40 ${isRtl ? 'left-8' : 'right-8'} z-40 w-80 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in`}>
               <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2"><Bot size={18} /> Petra Assistant</h3>
                  <button onClick={() => setChatOpen(false)}><X size={18}/></button>
               </div>
               <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-slate-900">
                  <div className="bg-blue-100 dark:bg-slate-700 text-gray-800 dark:text-white p-3 rounded-lg rounded-tl-none mb-2 text-sm self-start max-w-[80%]">
                     Welcome to Jordan! How can I help you plan your trip today?
                  </div>
               </div>
               <div className="p-3 border-t dark:border-slate-700">
                  <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 dark:bg-slate-700 p-2 rounded-lg text-sm outline-none" />
               </div>
            </div>
          )}
        </>
      )}

      {/* Cookie Consent */}
      {cookiePlugin && !cookieDismissed && (
        <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white p-4 z-50 flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-up">
           <div className="flex items-center gap-4">
              <Cookie className="text-yellow-500" size={24} />
              <p className="text-sm">We use cookies to ensure you get the best experience on our website.</p>
           </div>
           <div className="flex gap-2">
              <button onClick={() => setCookieDismissed(true)} className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded hover:bg-yellow-400">Accept</button>
              <button onClick={() => setCookieDismissed(true)} className="px-4 py-2 bg-transparent border border-white text-white text-sm font-bold rounded hover:bg-white/10">Decline</button>
           </div>
        </div>
      )}

    </div>
  );
};