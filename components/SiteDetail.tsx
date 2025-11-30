
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, ArrowLeft, ArrowRight, Play, Image as ImageIcon, CloudSun, Thermometer, Mic, StopCircle, Sparkles, Maximize, X, Star, Video, QrCode, Clock, Info, CheckCircle, Camera, Phone, Globe, ExternalLink, Calendar, Users, Mail, User, MessageSquare, Check, Share2, Printer, FileDown, Heart, Map as MapIcon, BookOpen } from 'lucide-react';
import { fetchSiteWeather, WeatherData } from '../services/weatherService';
import { summarizeText } from '../services/geminiService';
import { SiteCard } from './SiteCard';

export const SiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, t, isRtl, toggleBookmark } = useAppContext();
  const site = state.sites.find(s => s.id === id);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // PLUGINS
  const weatherPlugin = state.plugins.find(p => p.id === 'weather-widget' && p.active);
  const voicePlugin = state.plugins.find(p => p.id === 'voice-guide' && p.active);
  const summaryPlugin = state.plugins.find(p => p.id === 'content-summarizer' && p.active);
  const lightboxPlugin = state.plugins.find(p => p.id === 'image-lightbox' && p.active);
  const mapPlugin = state.plugins.find(p => p.id === 'map-integration' && p.active);
  const qrPlugin = state.plugins.find(p => p.id === 'qr-generator' && p.active);
  const tripPlannerPlugin = state.plugins.find(p => p.id === 'trip-planner' && p.active);
  const currencyPlugin = state.plugins.find(p => p.id === 'currency-converter' && p.active);

  // State
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'map' | 'reviews'>('overview');
  const [speaking, setSpeaking] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  // Booking Form
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', guests: 2, notes: '' });

  // Child Sites (If this site is a Parent Region)
  const childSites = site ? state.sites.filter(s => s.parentId === site.id) : [];

  const isBookmarked = site ? state.bookmarks.includes(site.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (weatherPlugin && site?.coordinates) {
      fetchSiteWeather(site.coordinates.lat, site.coordinates.lng)
        .then(data => setWeather(data));
    }
  }, [site, weatherPlugin]);

  if (!site) return <div className="min-h-screen flex items-center justify-center"><h1>Site Not Found</h1></div>;

  const localized = site.translations?.[state.language] || {};
  const displayName = localized.name || site.name;
  const description = localized.longDescription || localized.description || site.longDescription || site.description;
  const displayHighlights = localized.highlights || site.highlights || [];

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = state.language === 'ar' ? 'ar-SA' : 'en-US';
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const handleSummarize = async () => {
    setGeneratingSummary(true);
    const res = await summarizeText(description);
    setSummary(res);
    setGeneratingSummary(false);
  };

  const mapUrl = site.coordinates 
    ? `https://maps.google.com/maps?q=${site.coordinates.lat},${site.coordinates.lng}&z=14&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(site.name + ' Jordan')}&z=10&output=embed`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors pb-20">
      
      {/* Lightbox */}
      {lightboxPlugin && lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightboxImg(null)}>
           <button className="absolute top-4 right-4 text-white hover:text-red-500"><X size={40}/></button>
           <img src={lightboxImg} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" />
        </div>
      )}

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsBookingOpen(false)}>
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="relative h-32 bg-gray-900">
                 <img src={site.imageUrl} className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 flex items-center justify-center"><h3 className="text-white font-serif font-bold text-2xl drop-shadow-md">{displayName}</h3></div>
                 <button onClick={() => setIsBookingOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-1 rounded-full"><X size={20}/></button>
              </div>
              <div className="p-8">
                 {bookingStep === 'form' ? (
                    <form onSubmit={(e) => { e.preventDefault(); setTimeout(() => setBookingStep('success'), 1000); }} className="space-y-4">
                       <h4 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Request Reservation</h4>
                       <div className="grid grid-cols-2 gap-4">
                          <input required type="text" className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" placeholder="Name" value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} />
                          <input required type="tel" className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" placeholder="Phone" value={bookingData.phone} onChange={e => setBookingData({...bookingData, phone: e.target.value})} />
                       </div>
                       <input required type="email" className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" placeholder="Email" value={bookingData.email} onChange={e => setBookingData({...bookingData, email: e.target.value})} />
                       <div className="grid grid-cols-2 gap-4">
                          <input required type="date" className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} />
                          <input required type="number" min="1" className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" placeholder="Guests" value={bookingData.guests} onChange={e => setBookingData({...bookingData, guests: parseInt(e.target.value)})} />
                       </div>
                       <textarea className="w-full p-3 rounded border dark:bg-slate-700 dark:border-slate-600 outline-none" rows={2} placeholder="Notes..." value={bookingData.notes} onChange={e => setBookingData({...bookingData, notes: e.target.value})} />
                       <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">Confirm</button>
                    </form>
                 ) : (
                    <div className="text-center py-8">
                       <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
                       <h4 className="text-2xl font-bold mb-2">Success!</h4>
                       <p className="text-gray-500 mb-6">Request received for {bookingData.date}.</p>
                       <button onClick={() => setIsBookingOpen(false)} className="px-6 py-2 bg-gray-900 text-white rounded-lg">Close</button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-gray-900">
         <img src={site.imageUrl} alt={displayName} className="w-full h-full object-cover opacity-90 transition-transform duration-[10s] hover:scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
         
         <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
             <Link to="/" className="text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur px-4 py-2 rounded-full transition-all hover:bg-black/40">
                {isRtl ? <ArrowRight size={20}/> : <ArrowLeft size={20}/>} {t.home}
             </Link>
             <div className="flex gap-2">
                 {tripPlannerPlugin && (
                    <button onClick={() => toggleBookmark(site.id)} className={`p-3 rounded-full backdrop-blur transition-all ${isBookmarked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                       <Heart size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                 )}
                 <button className="p-3 bg-white/20 text-white rounded-full backdrop-blur hover:bg-white/30"><Share2 size={20} /></button>
             </div>
         </div>

         <div className="absolute bottom-0 w-full p-6 md:p-12 z-20">
             <div className="container mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
                 <div>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2 animate-fade-in">
                       <MapPin size={16}/> {site.location}
                       <span className="w-1 h-1 bg-yellow-400 rounded-full mx-2"></span>
                       {site.category}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 drop-shadow-2xl leading-tight">{displayName}</h1>
                    {weatherPlugin && weather && (
                       <div className="flex items-center gap-3 text-white/90 bg-white/10 w-fit px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                          <CloudSun size={24} className="text-yellow-300"/>
                          <span className="text-xl font-bold">{weather.temp}°C</span>
                          <span className="text-sm opacity-80 border-l border-white/20 pl-3 ml-1">{weather.condition}</span>
                       </div>
                    )}
                 </div>
                 <div className="flex gap-3">
                    {site.videoUrl && (
                       <button onClick={() => { document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-white/20 backdrop-blur hover:bg-white/30 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all">
                          <Play size={20} fill="currentColor" /> Watch Video
                       </button>
                    )}
                    <button onClick={() => setIsBookingOpen(true)} className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold shadow-lg transition-all animate-bounce-subtle">
                       {t.bookNow}
                    </button>
                 </div>
             </div>
         </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 sticky top-0 z-30 shadow-sm">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-center overflow-x-auto no-scrollbar">
               <div className="flex gap-6">
                  {['overview', 'media', 'map', 'reviews'].map(tab => (
                     <button 
                       key={tab}
                       onClick={() => setActiveTab(tab as any)}
                       className={`py-4 px-2 font-bold text-sm border-b-2 transition-colors whitespace-nowrap capitalize ${activeTab === tab ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
               <div className="flex gap-4 pl-4 border-l dark:border-slate-700 hidden md:flex">
                  <button className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-xs font-bold"><Printer size={16}/> Print</button>
                  <button className="text-gray-400 hover:text-red-600 flex items-center gap-1 text-xs font-bold"><FileDown size={16}/> PDF</button>
               </div>
            </div>
         </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN (Content) */}
            <div className="lg:col-span-2 space-y-12">
               
               {activeTab === 'overview' && (
                  <div className="space-y-10 animate-fade-in">
                     {/* Summary / AI Tools */}
                     <div className="flex flex-wrap gap-3">
                        {voicePlugin && (
                           <button onClick={handleSpeak} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${speaking ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                              {speaking ? <StopCircle size={16}/> : <Mic size={16}/>} {speaking ? 'Stop Audio' : 'Audio Guide'}
                           </button>
                        )}
                        {summaryPlugin && (
                           <button onClick={handleSummarize} disabled={generatingSummary} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">
                              <Sparkles size={16}/> {generatingSummary ? 'Summarizing...' : 'AI Summary'}
                           </button>
                        )}
                        {qrPlugin && (
                           <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100">
                              <QrCode size={16}/> QR
                           </button>
                        )}
                     </div>

                     {summary && (
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-purple-900 leading-relaxed animate-fade-in">
                           <h4 className="font-bold mb-2 flex items-center gap-2"><Sparkles size={16}/> AI Summary</h4>
                           {summary}
                        </div>
                     )}

                     <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-loose font-light">
                        <p className="whitespace-pre-line text-lg">{description}</p>
                     </div>

                     {/* CHILD SITES SECTION (NEW) */}
                     {childSites.length > 0 && (
                        <div className="mt-12 pt-12 border-t dark:border-gray-700">
                           <h3 className="text-2xl font-serif font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
                              <Star className="text-yellow-500" fill="currentColor" /> 
                              {state.language === 'ar' ? `معالم في ${displayName}` : `Top Attractions in ${displayName}`}
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {childSites.map((child) => (
                                 <SiteCard key={child.id} site={child} />
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Key Highlights (Manual highlights field) */}
                     {displayHighlights.length > 0 && (
                        <div>
                           <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">Highlights</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {displayHighlights.map((h, i) => (
                                 <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                    <div className="h-48 overflow-hidden relative">
                                       <img src={h.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                                       {lightboxPlugin && <button onClick={() => setLightboxImg(h.image)} className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Maximize size={16}/></button>}
                                    </div>
                                    <div className="p-5">
                                       <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{h.title}</h4>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">{h.description}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               )}

               {activeTab === 'media' && (
                  <div className="space-y-8 animate-fade-in">
                     {site.videoUrl && (
                        <div id="video-section" className="rounded-2xl overflow-hidden shadow-xl bg-black">
                           <div className="aspect-video">
                              <iframe width="100%" height="100%" src={site.videoUrl} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                           </div>
                        </div>
                     )}
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {site.gallery?.map((img, idx) => (
                           <div key={idx} onClick={() => lightboxPlugin && setLightboxImg(img)} className="h-48 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-100 relative group">
                              <img src={img} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                 <Maximize size={24}/>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeTab === 'map' && mapPlugin && (
                  <div className="animate-fade-in bg-gray-100 rounded-2xl overflow-hidden h-[500px] shadow-inner border border-gray-200">
                      <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={mapUrl} className="grayscale-[0.3]"></iframe>
                  </div>
               )}

               {activeTab === 'reviews' && (
                  <div className="space-y-6 animate-fade-in">
                     <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl text-center">
                        <h3 className="text-xl font-bold mb-2">Visitor Reviews</h3>
                        <div className="flex justify-center items-center gap-2 mb-4 text-yellow-500">
                           <Star fill="currentColor" size={32}/>
                           <span className="text-4xl font-bold text-gray-900 dark:text-white">{site.rating || 4.8}</span>
                           <span className="text-gray-400 text-sm">/ 5.0</span>
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Write a Review</button>
                     </div>
                     {/* Mock Reviews */}
                     {[1, 2, 3].map(i => (
                        <div key={i} className="border-b pb-6 dark:border-gray-700">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">U{i}</div>
                                 <div>
                                    <p className="font-bold text-sm">Visitor {i}</p>
                                    <p className="text-xs text-gray-400">March 2024</p>
                                 </div>
                              </div>
                              <div className="flex text-yellow-400 text-xs"><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /></div>
                           </div>
                           <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Absolutely stunning place! The views were breathtaking and the guide was very knowledgeable. Highly recommended.</p>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* RIGHT COLUMN (Sticky Sidebar) */}
            <div className="lg:col-span-1">
               <div className="sticky top-24 space-y-6">
                  
                  {/* Logistics Card - Price Removed */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
                     <div className="space-y-4 mb-8">
                        {site.openingTime && (
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-500 flex items-center gap-2"><Clock size={16}/> Hours</span>
                              <span className="font-bold text-gray-900 dark:text-white">{site.openingTime} - {site.closingTime}</span>
                           </div>
                        )}
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-500 flex items-center gap-2"><Calendar size={16}/> Best Time</span>
                           <span className="font-bold text-gray-900 dark:text-white">{site.bestTimeToVisit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-500 flex items-center gap-2"><Info size={16}/> Difficulty</span>
                           <span className={`font-bold px-2 py-0.5 rounded text-xs ${site.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{site.difficulty}</span>
                        </div>
                     </div>

                     <button onClick={() => setIsBookingOpen(true)} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex justify-center items-center gap-2">
                        <Calendar size={18} /> Request Visit
                     </button>
                     <p className="text-center text-xs text-gray-400 mt-3">Free cancellation up to 24h before.</p>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 space-y-4">
                     <h4 className="font-bold text-gray-900 dark:text-white">Contact Info</h4>
                     {site.contactPhone && (
                        <a href={`tel:${site.contactPhone}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Phone size={14}/></div>
                           {site.contactPhone}
                        </a>
                     )}
                     {site.websiteUrl && (
                        <a href={site.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors text-sm">
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Globe size={14}/></div>
                           Official Website
                        </a>
                     )}
                     <div className="flex gap-2 mt-4 pt-4 border-t dark:border-slate-700">
                        <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded">Family Friendly</span>
                        <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded">Parking</span>
                     </div>
                  </div>

               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
