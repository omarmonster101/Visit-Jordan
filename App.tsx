
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Hero } from './components/Hero';
import { SiteCard } from './components/SiteCard';
import AdminPanel from './components/AdminPanel';
import { Layout } from './components/Layout';
import { Discover } from './components/Discover';
import { Experiences } from './components/Experiences';
import { PlanVisit } from './components/PlanVisit';
import { SiteDetail } from './components/SiteDetail';
import { AuthPage } from './components/Auth';
import { UserProfile } from './components/UserProfile';
import { Play, Star, Users, Award, MapPin } from 'lucide-react';

const HomeView = () => {
  const { state, t, isRtl } = useAppContext();
  const { sites, theme } = state;
  const { visibleSections } = theme;

  // Filter to show only "Regions" (Main Sites) on the homepage
  const mainRegions = sites.filter(site => site.isRegion);

  const showHero = visibleSections?.hero ?? true;
  const showHistory = visibleSections?.history ?? true;
  const showFeatured = visibleSections?.featured ?? true;
  const showCta = visibleSections?.cta ?? true;
  const showStats = visibleSections?.stats ?? false;
  const showVideo = visibleSections?.videoSection ?? false;
  const showTestimonials = visibleSections?.testimonials ?? false;
  const showNewsletter = visibleSections?.newsletter ?? false;

  return (
    <div className="min-h-screen bg-gray-50 transition-colors" style={{ backgroundColor: theme.backgroundColor }}>
      {showHero && <Hero />}
      
      {/* STATS SECTION (New) */}
      {showStats && (
         <section className="py-12 text-white" style={{ backgroundColor: theme.primaryColor }}>
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="text-4xl font-bold mb-2">1M+</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Annual Visitors</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-2">20+</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">UNESCO Sites</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-2">4.9</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Safety Index</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Hospitality</div>
               </div>
            </div>
         </section>
      )}

      {/* Introduction Section */}
      {showHistory && (
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <span style={{ color: theme.secondaryColor }} className="font-bold tracking-widest uppercase mb-4 block">{t.historyTitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: theme.fontHeader === 'serif' ? 'Playfair Display, serif' : 'inherit', color: theme.primaryColor }}>
              {t.historySubtitle}
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: theme.secondaryColor }}></div>
            <p className="text-xl leading-relaxed font-light" style={{ color: theme.primaryColor === '#000000' || theme.backgroundColor === '#0f0f0f' ? theme.surfaceColor === '#ffffff' ? '#4b5563' : '#a0a0a0' : '#4b5563' }}>
              {t.historyDesc}
            </p>
          </div>
        </section>
      )}

      {/* VIDEO BANNER SECTION (New) */}
      {showVideo && (
         <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40"></div>
             <div className="relative z-10 text-center text-white">
                <button className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6 hover:scale-110 transition-transform border border-white">
                   <Play fill="currentColor" size={32} />
                </button>
                <h2 className="text-4xl font-bold mb-2">Experience The Magic</h2>
                <p className="text-lg opacity-90">Watch our latest campaign</p>
             </div>
         </section>
      )}

      {/* Featured Sites Grid (Only Regions) */}
      {showFeatured && (
        <section className="py-20" style={{ backgroundColor: theme.surfaceColor === '#1a1a1a' ? '#1a1a1a' : '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primaryColor === '#000000' && theme.backgroundColor === '#0f0f0f' ? '#ffffff' : theme.primaryColor }}>{t.featuredTitle}</h2>
                <p className="text-gray-500">{t.featuredSubtitle}</p>
              </div>
              <button style={{ color: theme.secondaryColor }} className="hidden md:flex font-bold hover:underline items-center gap-1">
                {t.viewAll} {isRtl ? <span>&larr;</span> : <span>&rarr;</span>}
              </button>
            </div>
            
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${theme.layoutMode === 'compact' ? 'gap-4' : 'gap-8'}`}
            >
              {mainRegions.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS SECTION (New) */}
      {showTestimonials && (
         <section className="py-20 bg-gray-100" style={{ backgroundColor: theme.backgroundColor === '#0f0f0f' ? '#050505' : '#f3f4f6' }}>
            <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.primaryColor }}>Visitor Stories</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="bg-white p-8 shadow-sm" style={{ backgroundColor: theme.surfaceColor, borderRadius: theme.borderRadius === 'full' ? '24px' : theme.borderRadius === 'none' ? '0' : '8px' }}>
                        <div className="flex text-yellow-500 mb-4"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                        <p className="italic mb-6" style={{ color: theme.surfaceColor === '#1a1a1a' ? '#ccc' : '#4b5563' }}>"Absolutely breathtaking experience. The guide was knowledgeable and the scenery was out of this world."</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                              <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} />
                           </div>
                           <div>
                              <div className="font-bold text-sm" style={{ color: theme.surfaceColor === '#1a1a1a' ? '#fff' : '#000' }}>Traveler Name</div>
                              <div className="text-xs text-gray-500">From UK</div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* Info Section / Plan Visit */}
      {showCta && (
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1549141098-b2a8d46db684?q=80&w=2000" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl font-serif font-bold mb-6">{t.readyTitle}</h2>
                <p className="text-gray-300 text-lg mb-8">
                  {t.readyDesc}
                </p>
                <button 
                  className="px-8 py-3 bg-white text-gray-900 font-bold rounded hover:bg-gray-100 transition-colors"
                  style={{ color: theme.primaryColor, borderRadius: theme.buttonShape === 'pill' ? '999px' : theme.buttonShape === 'rounded' ? '8px' : '0' }}
                >
                  {t.buyTicket}
                </button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                   <h3 className="font-bold text-xl mb-2 text-yellow-400">{t.visa}</h3>
                   <p className="text-sm text-gray-300">...</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                   <h3 className="font-bold text-xl mb-2 text-yellow-400">{t.weather}</h3>
                   <p className="text-sm text-gray-300">...</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                   <h3 className="font-bold text-xl mb-2 text-yellow-400">{t.transport}</h3>
                   <p className="text-sm text-gray-300">...</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20">
                   <h3 className="font-bold text-xl mb-2 text-yellow-400">{t.accommodation}</h3>
                   <p className="text-sm text-gray-300">...</p>
                </div>
             </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER (New) */}
      {showNewsletter && (
         <section className="py-20 text-center" style={{ backgroundColor: theme.secondaryColor }}>
            <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold mb-4 text-white">Join Our Newsletter</h2>
               <p className="text-white/80 mb-8 max-w-xl mx-auto">Get the latest travel tips, hidden gems, and exclusive offers delivered straight to your inbox.</p>
               <div className="max-w-md mx-auto flex gap-2">
                  <input type="email" placeholder="Your Email Address" className="flex-1 p-3 rounded outline-none border-none" />
                  <button className="bg-gray-900 text-white px-6 py-3 font-bold rounded hover:bg-black transition-colors">Subscribe</button>
               </div>
            </div>
         </section>
      )}
    </div>
  );
};

const MainContent = () => {
  const { state } = useAppContext();
  
  if (state.userMode === 'admin') {
    return <AdminPanel />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/plan" element={<PlanVisit />} />
      <Route path="/site/:id" element={<SiteDetail />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <MainContent />
      </Layout>
    </AppProvider>
  );
};

export default App;
