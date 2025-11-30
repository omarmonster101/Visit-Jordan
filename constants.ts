
import { TouristSite, SiteCategory, ThemeConfig, Translation, LanguageCode, Plugin, GeneralSettings, BlogPost, User, TripRequest, ThemePreset } from './types';

// --- THEME PRESETS ---
export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'original-jordan',
    name: 'Classic Jordan',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/640px-The_Treasury_Petra_Jordan.jpg',
    config: {
      primaryColor: '#8c3a3a', // Petra Red
      secondaryColor: '#bca37f', // Sand Gold
      backgroundColor: '#fdf8f6',
      surfaceColor: '#ffffff',
      navbarStyle: 'transparent',
      footerStyle: 'mega',
      borderRadius: 'sm',
      borderWidth: 'none',
      fontScale: 1,
      layoutMode: 'spacious',
      siteWidth: 'full',
      fontHeader: 'serif',
      fontBody: 'sans',
      buttonStyle: 'solid',
      buttonShape: 'square',
      cardStyle: 'flat',
      cardHoverEffect: 'lift',
      visibleSections: { hero: true, history: true, featured: true, cta: true, stats: false, videoSection: false, testimonials: false, newsletter: true }
    }
  },
  {
    id: 'wild-camping',
    name: 'Wild Camping',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Wadi_Rum_Desert.jpg/640px-Wadi_Rum_Desert.jpg',
    config: {
      primaryColor: '#2d5a27', // Forest Green
      secondaryColor: '#d4a373', // Wood
      backgroundColor: '#f0f7f4', // Soft Mint
      surfaceColor: '#ffffff',
      navbarStyle: 'solid',
      footerStyle: 'simple',
      borderRadius: 'lg',
      borderWidth: 'thin',
      fontScale: 1.05,
      layoutMode: 'compact',
      siteWidth: 'boxed',
      fontHeader: 'sans',
      fontBody: 'sans',
      buttonStyle: 'outline',
      buttonShape: 'rounded',
      cardStyle: 'bordered',
      cardHoverEffect: 'glow',
      visibleSections: { hero: true, history: false, featured: true, cta: true, stats: true, videoSection: false, testimonials: true, newsletter: false }
    }
  },
  {
    id: 'summer-vacation',
    name: 'Summer Vacation',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Aqaba_Beach.jpg/640px-Aqaba_Beach.jpg',
    config: {
      primaryColor: '#00a8e8', // Ocean Blue
      secondaryColor: '#ffcf40', // Sun Yellow
      backgroundColor: '#fffdf5', // Warm White
      surfaceColor: '#ffffff',
      navbarStyle: 'glass',
      footerStyle: 'mega',
      borderRadius: 'full',
      borderWidth: 'none',
      fontScale: 1,
      layoutMode: 'spacious',
      siteWidth: 'full',
      fontHeader: 'display',
      fontBody: 'sans',
      buttonStyle: 'soft',
      buttonShape: 'pill',
      cardStyle: 'elevated',
      cardHoverEffect: 'zoom',
      visibleSections: { hero: true, history: true, featured: true, cta: true, stats: false, videoSection: true, testimonials: true, newsletter: true }
    }
  },
  // --- NEW THEMES ---
  {
    id: 'luxury-royal',
    name: 'Luxury Royal',
    thumbnail: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=100',
    config: {
      primaryColor: '#C5A059', // Gold
      secondaryColor: '#1A1A1A', // Dark
      backgroundColor: '#0f0f0f', // Very Dark Grey
      surfaceColor: '#1a1a1a', // Dark Cards
      navbarStyle: 'floating',
      footerStyle: 'mega',
      borderRadius: 'none',
      borderWidth: 'thin',
      fontScale: 1,
      layoutMode: 'spacious',
      siteWidth: 'full',
      fontHeader: 'serif',
      fontBody: 'serif',
      buttonStyle: 'outline',
      buttonShape: 'square',
      cardStyle: 'flat',
      cardHoverEffect: 'lift',
      visibleSections: { hero: true, history: true, featured: true, cta: false, stats: true, videoSection: true, testimonials: true, newsletter: true }
    }
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=100',
    config: {
      primaryColor: '#000000', // Black
      secondaryColor: '#808080', // Grey
      backgroundColor: '#ffffff', // White
      surfaceColor: '#ffffff',
      navbarStyle: 'transparent',
      footerStyle: 'minimal',
      borderRadius: 'none',
      borderWidth: 'thin',
      fontScale: 0.95,
      layoutMode: 'spacious',
      siteWidth: 'full',
      fontHeader: 'sans',
      fontBody: 'sans',
      buttonStyle: 'solid',
      buttonShape: 'square',
      cardStyle: 'bordered',
      cardHoverEffect: 'none',
      visibleSections: { hero: true, history: false, featured: true, cta: true, stats: false, videoSection: true, testimonials: false, newsletter: true }
    }
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100',
    config: {
      primaryColor: '#00ff99', // Neon Green
      secondaryColor: '#d600ff', // Neon Purple
      backgroundColor: '#050510', // Deep Blue/Black
      surfaceColor: '#0a0a1f', // Dark surface
      navbarStyle: 'glass',
      footerStyle: 'simple',
      borderRadius: 'md',
      borderWidth: 'none',
      fontScale: 1.1,
      layoutMode: 'compact',
      siteWidth: 'full',
      fontHeader: 'display',
      fontBody: 'mono',
      buttonStyle: 'ghost',
      buttonShape: 'rounded',
      cardStyle: 'elevated',
      cardHoverEffect: 'glow',
      visibleSections: { hero: true, history: false, featured: true, cta: true, stats: true, videoSection: true, testimonials: true, newsletter: true }
    }
  },
  {
    id: 'bedouin-heritage',
    name: 'Bedouin Heritage',
    thumbnail: 'https://images.unsplash.com/photo-1444465693019-aa0b6392460d?w=100',
    config: {
      primaryColor: '#8B4513', // Saddle Brown
      secondaryColor: '#D2691E', // Chocolate
      backgroundColor: '#F4ECD8', // Parchment
      surfaceColor: '#E6DCC3', // Tan
      navbarStyle: 'solid',
      footerStyle: 'mega',
      borderRadius: 'lg',
      borderWidth: 'thick',
      fontScale: 1.05,
      layoutMode: 'spacious',
      siteWidth: 'boxed',
      fontHeader: 'serif',
      fontBody: 'sans',
      buttonStyle: 'solid',
      buttonShape: 'rounded',
      cardStyle: 'flat',
      cardHoverEffect: 'lift',
      visibleSections: { hero: true, history: true, featured: true, cta: true, stats: false, videoSection: true, testimonials: true, newsletter: true }
    }
  }
];

export const INITIAL_THEME: ThemeConfig = THEME_PRESETS[0].config;

export const INITIAL_SETTINGS: GeneralSettings = {
  siteName: 'Visit Jordan',
  contactEmail: 'info@visitjordan.jo',
  socialLinks: {
    facebook: 'https://facebook.com/visitjordan',
    instagram: 'https://instagram.com/visitjordan'
  },
  maintenanceMode: false
};

export const INITIAL_USERS: User[] = [
  {
    id: 'admin-super',
    name: 'Super Director',
    email: 'hhhosts@gmail.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000&color=fff',
    joinedDate: '2023-01-01'
  },
  {
    id: 'user-1',
    name: 'John Traveler',
    email: 'john@example.com',
    role: 'visitor',
    avatar: 'https://ui-avatars.com/api/?name=John+Traveler&background=random',
    joinedDate: '2023-05-15',
    phone: '+123456789'
  }
];

// --- EXTENDED PLUGINS DEFINITION ---
export const INITIAL_PLUGINS: Plugin[] = [
  // 1. SEO & Performance (The Brain)
  { id: 'google-search-console', name: 'Google Search Console', description: 'Monitor search traffic, clicks, and indexing issues.', active: true, icon: 'Search', version: '2.0', category: 'marketing' },
  { id: 'pagespeed-insights', name: 'PageSpeed Insights API', description: 'Analyze performance and get optimization tips.', active: true, icon: 'Zap', version: '1.0', category: 'utility' },
  { id: 'google-analytics-data', name: 'Google Analytics 4 API', description: 'Advanced visitor statistics (countries, ages, retention).', active: true, icon: 'BarChart', version: '4.0', category: 'marketing' },
  { id: 'semrush-integration', name: 'Semrush API', description: 'Competitor analysis and keyword research tool.', active: false, icon: 'BarChart2', version: '1.0', category: 'marketing' },
  { id: 'moz-api', name: 'Mozscape API', description: 'Track Domain Authority and backlinks.', active: false, icon: 'Activity', version: '1.0', category: 'marketing' },
  { id: 'ahrefs-api', name: 'Ahrefs API', description: 'Check for broken links and external references.', active: false, icon: 'Link', version: '1.0', category: 'utility' },

  // 2. Maps & Location (Smart Tourism)
  { id: 'google-places-api', name: 'Google Places API', description: 'Show ratings, photos, and details from Google Maps.', active: true, icon: 'MapPin', version: '3.0', category: 'content' },
  { id: 'mapbox-integration', name: 'Mapbox API', description: 'Custom, artistic maps for stylized tourism views.', active: false, icon: 'Map', version: '2.0', category: 'ui' },
  { id: 'openstreetmap-api', name: 'OpenStreetMap API', description: 'Free, open-source mapping alternative.', active: false, icon: 'Globe', version: '1.0', category: 'utility' },

  // 3. Content & Booking (Make it Useful)
  { id: 'amadeus-api', name: 'Amadeus Booking API', description: 'Fetch flights, hotels, and points of interest.', active: false, icon: 'Plane', version: '1.0', category: 'commerce' },
  { id: 'tripadvisor-content', name: 'TripAdvisor Content API', description: 'Display traveler reviews and ratings.', active: true, icon: 'Star', version: '1.5', category: 'content' },
  { id: 'viator-api', name: 'Viator Tours API', description: 'Sell tours and activities directly (Earn Commission).', active: false, icon: 'Ticket', version: '1.0', category: 'commerce' },
  { id: 'skyscanner-api', name: 'Skyscanner API', description: 'Show flight prices to Jordan.', active: false, icon: 'Plane', version: '1.0', category: 'utility' },

  // 4. Traveler Tools (UX)
  { id: 'weather-widget', name: 'OpenWeatherMap API', description: 'Real-time weather for Petra, Wadi Rum, etc.', active: true, icon: 'CloudSun', version: '2.0', category: 'utility' },
  { id: 'currency-converter', name: 'ExchangeRate-API', description: 'Real-time currency conversion (JOD to USD/EUR).', active: true, icon: 'Coins', version: '2.1', category: 'utility' },

  // 5. Marketing & Communication (Stay Connected)
  { id: 'mailchimp-integration', name: 'Mailchimp API', description: 'Collect emails and send automated newsletters.', active: true, icon: 'Mail', version: '2.0', category: 'marketing' },
  { id: 'sendgrid-api', name: 'SendGrid API', description: 'Reliable booking confirmations and welcome emails.', active: true, icon: 'Send', version: '1.0', category: 'marketing' },

  // 6. Social Media (Engagement)
  { id: 'instagram-graph', name: 'Instagram Graph API', description: 'Display #VisitJordan feed directly on site.', active: true, icon: 'Instagram', version: '1.0', category: 'marketing' },
  { id: 'youtube-data', name: 'YouTube Data API', description: 'Fetch latest tourism videos automatically.', active: true, icon: 'Youtube', version: '1.0', category: 'content' },

  // 7. Security (Protection)
  { id: 'google-recaptcha', name: 'Google reCAPTCHA v3', description: 'Protect booking forms from spam bots.', active: true, icon: 'Shield', version: '3.0', category: 'security' },

  // --- EXISTING UTILITY PLUGINS ---
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes for sharing pages easily.', active: true, icon: 'QrCode', version: '1.1.0', category: 'utility' },
  { id: 'live-chat-support', name: 'Live Support', description: 'Connect with real agents.', active: true, icon: 'MessageCircle', version: '2.0', category: 'utility' },
  { id: 'translator', name: 'Auto Translator', description: 'Google Translate integration.', active: true, icon: 'Languages', version: '2.0', category: 'utility' },
  { id: 'print-page', name: 'Print Friendly', description: 'Add print button to pages.', active: true, icon: 'Printer', version: '1.0', category: 'utility' },
  { id: 'whatsapp-support', name: 'WhatsApp Direct', description: 'Direct chat button for support.', active: true, icon: 'MessageCircle', version: '1.5', category: 'utility' },
  
  // AI
  { id: 'ai-chatbot', name: 'Petra AI Assistant', description: 'Floating AI chatbot to answer tourist questions.', active: true, icon: 'Bot', version: '0.9.beta', category: 'ai' },
  { id: 'content-summarizer', name: 'AI Summarizer', description: 'Gemini-powered button to summarize long descriptions.', active: true, icon: 'Sparkles', version: '1.2.0', category: 'ai' },
  { id: 'voice-guide', name: 'Audio Guide (TTS)', description: 'Text-to-Speech engine to read site details aloud.', active: true, icon: 'Mic', version: '2.0.0', category: 'ai' },
  { id: 'image-optimizer', name: 'AI Image Optimizer', description: 'Auto-compress uploaded images for speed.', active: true, icon: 'Zap', version: '1.2', category: 'ai' },

  // UI
  { id: 'image-lightbox', name: 'Image Lightbox', description: 'Click images to view them in full screen mode.', active: true, icon: 'Maximize', version: '1.4.0', category: 'ui' },
  { id: 'trip-planner', name: 'Trip Planner', description: 'Bookmark sites to a "My Trip" wishlist drawer.', active: true, icon: 'Heart', version: '2.0.0', category: 'ui' },
  { id: 'music-player', name: 'Ambient Music', description: 'Background Jordanian instrumental music player.', active: true, icon: 'Music', version: '1.0.0', category: 'ui' },
  { id: 'accessibility-tools', name: 'Accessibility Suite', description: 'Toolbar for font size and contrast adjustments.', active: true, icon: 'Eye', version: '1.0.0', category: 'ui' },
  { id: 'packing-list', name: 'Packing List Gen', description: 'Generates a checklist for travelers.', active: true, icon: 'ClipboardList', version: '1.0.0', category: 'ui' },
  { id: 'timeline-view', name: 'Interactive Timeline', description: 'Show history in a vertical timeline format.', active: true, icon: 'Clock', version: '1.0', category: 'ui' },
  { id: 'read-mode', name: 'Reader Mode', description: 'Distraction free reading.', active: true, icon: 'BookOpen', version: '1.0', category: 'ui' },
  { id: 'scroll-progress', name: 'Scroll Indicator', description: 'Show reading progress bar.', active: true, icon: 'BarChart', version: '1.0', category: 'ui' },
  { id: 'back-to-top', name: 'Back to Top', description: 'Floating arrow button.', active: true, icon: 'ArrowUp', version: '1.0', category: 'ui' },
  { id: 'snow-effect', name: 'Snow Effect', description: 'Winter theme decoration.', active: false, icon: 'CloudSun', version: '1.0', category: 'ui' },
  { id: 'dark-mode', name: 'Dark Mode Toggle', description: 'Enable system-wide dark mode.', active: true, icon: 'Moon', version: '2.0', category: 'ui' },

  // Content
  { id: 'reviews-system', name: 'User Reviews', description: 'Display user ratings and comments on sites.', active: true, icon: 'Star', version: '1.1.0', category: 'content' },
  { id: 'history-slider', name: 'Before/After Slider', description: 'Compare historical sites past and present.', active: true, icon: 'History', version: '1.0', category: 'content' },
  { id: 'virtual-tour', name: '360 Virtual Tour', description: 'Embed 360 degree views of sites.', active: true, icon: 'Move', version: '1.5', category: 'content' },
  { id: 'sitemap-gen', name: 'Sitemap Generator', description: 'Auto-generate XML sitemaps for SEO.', active: true, icon: 'FileText', version: '1.0', category: 'content' },

  // Marketing
  { id: 'social-share', name: 'Social Share Bar', description: 'Sticky sidebar to share pages on social media.', active: true, icon: 'Share2', version: '1.2.0', category: 'marketing' },
  { id: 'cookie-consent', name: 'Cookie Banner', description: 'GDPR compliant cookie consent popup.', active: true, icon: 'Cookie', version: '2.0.0', category: 'marketing' },
  { id: 'seo-pro', name: 'SEO Pro Manager', description: 'Manage Meta Tags and OpenGraph data.', active: true, icon: 'Search', version: '2.5', category: 'marketing' },

  // Commerce
  { id: 'booking-engine', name: 'Direct Booking', description: 'Integrate with booking engines.', active: true, icon: 'Calendar', version: '3.0', category: 'commerce' },
  
  // Security
  { id: 'maintenance-mode', name: 'Maintenance Mode', description: 'Show under construction screen.', active: false, icon: 'Lock', version: '1.0', category: 'security' },

  // Trip Management
  { id: 'lead-scoring', name: 'AI Lead Scoring', description: 'Auto-rank trip requests based on budget and urgency.', active: true, icon: 'BarChart', version: '1.0', category: 'commerce' },
  { id: 'auto-responder', name: 'Email Auto-Responder', description: 'Send instant confirmation emails to new leads.', active: true, icon: 'Mail', version: '1.5', category: 'marketing' },
  { id: 'calendar-sync', name: 'Calendar Sync', description: 'Sync booked trips with Google/Outlook Calendar.', active: true, icon: 'CalendarCheck', version: '2.0', category: 'utility' },
  { id: 'invoice-gen', name: 'Invoice Generator', description: 'Generate professional PDF invoices for trips.', active: true, icon: 'FileText', version: '1.0', category: 'commerce' },
  { id: 'whatsapp-crm', name: 'WhatsApp Business API', description: 'Manage trip chats directly from the dashboard.', active: true, icon: 'MessageCircle', version: '2.0', category: 'utility' },
];

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Jordan',
    excerpt: 'Beyond Petra and Wadi Rum, discover the secret spots only locals know about.',
    date: '2024-03-15',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pella_Jordan_BW_13.JPG/640px-Pella_Jordan_BW_13.JPG'
  },
  {
    id: '2',
    title: 'A Guide to Jordanian Cuisine',
    excerpt: 'From Mansaf to Falafel, get ready for a culinary journey.',
    date: '2024-03-10',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mansaf.jpg/640px-Mansaf.jpg'
  }
];

export const SUPPORTED_LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'ar', name: 'العربية', flag: '🇯🇴' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const BASE_EN: Translation = {
    home: 'Home',
    explore: 'Discover Jordan',
    experiences: 'Experiences',
    planVisit: 'Plan Your Visit',
    countryName: 'The Hashemite Kingdom of Jordan',
    heroTitleHighlight: 'Petra',
    heroTitleMain: 'Discover a World Wonder',
    heroDesc: 'A journey through time in the Rose City carved into rock. An unforgettable experience blending history, nature, and Eastern charm.',
    planButton: 'Plan Your Visit',
    historyTitle: 'Ancient History',
    historySubtitle: 'Jordan: Kingdom of Time',
    historyDesc: 'From ancient times to modern modernity, Jordan offers a unique experience blending authentic past with Arab hospitality. Discover archaeological treasures and enjoy breathtaking landscapes.',
    featuredTitle: 'Featured Destinations',
    featuredSubtitle: 'Discover the Kingdom\'s most beautiful places',
    viewAll: 'View All',
    readMore: 'Read More',
    readyTitle: 'Ready for Adventure?',
    readyDesc: 'Buy the "Jordan Pass" to save time and money when visiting over 40 tourist sites, including Petra, Jerash, and Wadi Rum.',
    buyTicket: 'Buy Jordan Pass',
    visa: 'Visa & Entry',
    weather: 'Weather',
    transport: 'Getting Around',
    accommodation: 'Accommodation',
    about: 'About Jordan',
    news: 'News',
    gallery: 'Gallery',
    contact: 'Contact Us',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    rights: '© 2024 Jordan Tourism Board. All rights reserved.',
    discoverTitle: 'Diversity & Culture',
    discoverDesc: 'From the green hills of the north to the red sands of the south, Jordan is a land of mesmerizing contrasts.',
    cultureTitle: 'Bedouin Hospitality',
    natureTitle: 'Nature Reserves',
    expHiking: 'Hiking & Adventure',
    expWellness: 'Wellness & Spa',
    expFood: 'Gastronomy',
    planVisaTitle: 'Visa Requirements',
    planPassTitle: 'The Jordan Pass',
    faqTitle: 'Frequently Asked Questions',
    highlightsTitle: 'Key Highlights',
    locationTitle: 'Location',
    videoTitle: 'Watch Video',
    galleryTitle: 'Photo Gallery',
    bookNow: 'Book Now'
};

const BASE_AR: Translation = {
    home: 'الرئيسية',
    explore: 'اكتشف الأردن',
    experiences: 'التجارب',
    planVisit: 'خطط لزيارتك',
    countryName: 'المملكة الأردنية الهاشمية',
    heroTitleHighlight: 'البتراء',
    heroTitleMain: 'اكتشف إحدى عجائب الدنيا',
    heroDesc: 'رحلة عبر الزمن في المدينة الوردية المنحوتة في الصخر. تجربة لا تُنسى تمزج بين التاريخ والطبيعة وسحر الشرق.',
    planButton: 'خطط لزيارتك',
    historyTitle: 'تاريخ عريق',
    historySubtitle: 'الأردن: مملكة الزمن',
    historyDesc: 'من العصور القديمة إلى الحداثة المعاصرة، يقدم الأردن تجربة فريدة تمتزج فيها أصالة الماضي مع كرم الضيافة العربية. اكتشف الكنوز الأثرية، واستمتع بالمناظر الطبيعية الخلابة، وعش تجربة لا تنسى.',
    featuredTitle: 'أبرز الوجهات',
    featuredSubtitle: 'اكتشف أجمل الأماكن في المملكة',
    viewAll: 'عرض الكل',
    readMore: 'اقرأ المزيد',
    readyTitle: 'هل أنت جاهز للمغامرة؟',
    readyDesc: 'قم بشراء "تذكرة الأردن الموحدة" ووفر الوقت والمال عند زيارة أكثر من 40 موقعاً سياحياً، بما في ذلك البتراء وجرش ووادي رم.',
    buyTicket: 'شراء التذكرة الموحدة',
    visa: 'التأشيرة والدخول',
    weather: 'الطقس',
    transport: 'التنقل',
    accommodation: 'الإقامة',
    about: 'عن الأردن',
    news: 'الأخبار',
    gallery: 'معرض الصور',
    contact: 'تواصل معنا',
    newsletter: 'النشرة البريدية',
    subscribe: 'اشتراك',
    rights: '© 2024 هيئة تنشيط السياحة الأردنية. جميع الحقوق محفوظة.',
    discoverTitle: 'التنوع والثقافة',
    discoverDesc: 'من التلال الخضراء في الشمال إلى الرمال الحمراء في الجنوب، الأردن أرض التناقضات الساحرة.',
    cultureTitle: 'الضيافة البدوية',
    natureTitle: 'المحميات الطبيعية',
    expHiking: 'المشي والمغامرة',
    expWellness: 'السياحة العلاجية',
    expFood: 'فن الطهي',
    planVisaTitle: 'متطلبات التأشيرة',
    planPassTitle: 'التذكرة الموحدة (Jordan Pass)',
    faqTitle: 'الأسئلة الشائعة',
    highlightsTitle: 'أبرز المعالم',
    locationTitle: 'الموقع على الخريطة',
    videoTitle: 'شاهد الفيديو',
    galleryTitle: 'معرض الصور',
    bookNow: 'احجز الآن'
};

const createTranslation = (base: Translation, overrides: Partial<Translation>): Translation => ({
    ...base,
    ...overrides
});

export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  ar: BASE_AR,
  en: BASE_EN,
  fr: createTranslation(BASE_EN, { home: 'Accueil', explore: 'Découvrir', bookNow: 'Réserver' }),
  es: createTranslation(BASE_EN, { home: 'Inicio', explore: 'Descubrir', bookNow: 'Reservar' }),
  de: createTranslation(BASE_EN, { home: 'Startseite', explore: 'Entdecken', bookNow: 'Buchen' }),
  it: createTranslation(BASE_EN, { home: 'Home', explore: 'Scopri', bookNow: 'Prenota' }),
  tr: createTranslation(BASE_EN, { home: 'Ana Sayfa', explore: 'Keşfet', bookNow: 'Rezervasyon' }),
  ru: createTranslation(BASE_EN, { home: 'Главная', explore: 'Узнать', bookNow: 'Забронировать' }),
  zh: createTranslation(BASE_EN, { home: '首页', explore: '探索约旦', bookNow: '预订' }),
  ja: createTranslation(BASE_EN, { home: 'ホーム', explore: 'ヨルダンを探索', bookNow: '予約する' }),
};

// --- INITIAL SITES DATA ---
export const INITIAL_SITES: TouristSite[] = [
  // 1. PETRA
  {
    id: 'petra',
    name: 'البتراء - Petra',
    isRegion: true,
    description: 'المدينة الوردية، عجيبة الدنيا السابعة.',
    location: 'South',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/800px-The_Treasury_Petra_Jordan.jpg',
    featured: true,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 30.3285, lng: 35.4444 },
    translations: {
        ar: { name: 'البتراء', description: 'عاصمة الأنباط والمدينة الوردية الخالدة.' },
        en: { name: 'Petra', description: 'The Rose City, capital of the Nabataeans.' }
    }
  },
  // 2. WADI RUM
  {
    id: 'wadi-rum',
    name: 'وادي رم - Wadi Rum',
    isRegion: true,
    description: 'وادي القمر، صحراء خلابة.',
    location: 'South',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Wadi_Rum_Desert.jpg/800px-Wadi_Rum_Desert.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Sunset',
    coordinates: { lat: 29.5790, lng: 35.4194 },
    translations: {
        ar: { name: 'وادي رم', description: 'سحر الصحراء وجبال المريخ.' },
        en: { name: 'Wadi Rum', description: 'Desert magic and Martian mountains.' }
    }
  },
  // 3. DEAD SEA
  {
    id: 'dead-sea',
    name: 'البحر الميت - Dead Sea',
    isRegion: true,
    description: 'أخفض بقعة في العالم والسبا الطبيعي.',
    location: 'Central',
    category: SiteCategory.LEISURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Dead_Sea_salt.jpg/800px-Dead_Sea_salt.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'All Day',
    coordinates: { lat: 31.5590, lng: 35.6110 },
    translations: {
        ar: { name: 'البحر الميت', description: 'السبا الطبيعي الأكبر في العالم.' },
        en: { name: 'Dead Sea', description: 'World\'s largest natural spa.' }
    }
  },
  // 4. AMMAN
  {
    id: 'amman',
    name: 'عمان - Amman',
    isRegion: true,
    description: 'العاصمة التي تجمع بين العراقة والحداثة.',
    location: 'Central',
    category: SiteCategory.CULTURAL,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Amman_Citadel.jpg/800px-Amman_Citadel.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'All Day',
    coordinates: { lat: 31.9454, lng: 35.9284 },
    translations: {
        ar: { name: 'عمان', description: 'قلب الأردن النابض بالحياة والتاريخ.' },
        en: { name: 'Amman', description: 'The bustling heart of Jordan, blending old and new.' }
    }
  },
  // 5. JERASH
  {
    id: 'jerash',
    name: 'جرش - Jerash',
    isRegion: true,
    description: 'مدينة الأعمدة الرومانية.',
    location: 'North',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jerash_oval_plaza.jpg/800px-Jerash_oval_plaza.jpg',
    featured: true,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Afternoon',
    coordinates: { lat: 32.2723, lng: 35.8914 },
    translations: {
        ar: { name: 'جرش', description: 'بومبي الشرق وأعظم المدن الرومانية المحفوظة.' },
        en: { name: 'Jerash', description: 'Pompeii of the East, the best preserved Roman provincial city.' }
    }
  },
  // 6. AJLOUN
  {
    id: 'ajloun',
    name: 'عجلون - Ajloun',
    isRegion: true,
    description: 'قلعة عجلون وغاباتها الخضراء.',
    location: 'North',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ajloun_Castle_01.jpg/800px-Ajloun_Castle_01.jpg',
    featured: true,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 32.3326, lng: 35.7517 },
    translations: {
        ar: { name: 'عجلون', description: 'الطبيعة الخلابة والتاريخ الإسلامي العريق.' },
        en: { name: 'Ajloun', description: 'Beautiful nature and Islamic history.' }
    }
  },
  // 7. UMM QAIS
  {
    id: 'umm-qais',
    name: 'أم قيس - Umm Qais',
    isRegion: true,
    description: 'مدينة جدارا القديمة المطلة على بحيرة طبريا.',
    location: 'North',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Umm_Qais_Basilica_Terrace.jpg',
    featured: false,
    difficulty: 'Easy',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 32.6534, lng: 35.6796 },
    translations: {
        ar: { name: 'أم قيس', description: 'إطلالات بانورامية وتاريخ روماني عريق.' },
        en: { name: 'Umm Qais', description: 'Panoramic views and ancient Gadara ruins.' }
    }
  },
  // 8. PELLA
  {
    id: 'pella',
    name: 'طبقة فحل - Pella',
    isRegion: true,
    description: 'آثار رومانية في الغور الشمالي.',
    location: 'North',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pella_Jordan_BW_13.JPG/800px-Pella_Jordan_BW_13.JPG',
    featured: false,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Winter',
    coordinates: { lat: 32.4500, lng: 35.6100 },
    translations: {
        ar: { name: 'طبقة فحل', description: 'واحدة من المدن العشرة (الديكابولس) الغنية بالآثار.' },
        en: { name: 'Pella', description: 'One of the Decapolis cities rich in ruins.' }
    }
  },
  // 9. MADABA
  {
    id: 'madaba',
    name: 'مأدبا - Madaba',
    isRegion: true,
    description: 'مدينة الفسيفساء والكنائس التاريخية.',
    location: 'Central',
    category: SiteCategory.CULTURAL,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Madaba_Mosaic_Map.jpg/800px-Madaba_Mosaic_Map.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 31.7195, lng: 35.7941 },
    translations: {
        ar: { name: 'مأدبا', description: 'عاصمة الفسيفساء وخارطة الأراضي المقدسة.' },
        en: { name: 'Madaba', description: 'The City of Mosaics.' }
    }
  },
  // 10. MOUNT NEBO
  {
    id: 'mount-nebo',
    name: 'جبل نيبو - Mount Nebo',
    isRegion: true,
    description: 'المكان الذي رأى منه النبي موسى أرض الموعد.',
    location: 'Central',
    category: SiteCategory.RELIGIOUS,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Mount_Nebo_Memorial.jpg/800px-Mount_Nebo_Memorial.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 31.7683, lng: 35.7250 },
    translations: {
        ar: { name: 'جبل نيبو', description: 'موقع ديني مقدس وإطلالات لا تنسى.' },
        en: { name: 'Mount Nebo', description: 'A holy site with unforgettable views.' }
    }
  },
  // 11. BAPTISM SITE
  {
    id: 'baptism-site',
    name: 'المغطس - Baptism Site',
    isRegion: true,
    description: 'موقع عماد السيد المسيح (بيت عنيا).',
    location: 'Central',
    category: SiteCategory.RELIGIOUS,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Baptism_Site_Bethany_Beyond_the_Jordan.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 31.8375, lng: 35.5496 },
    translations: {
        ar: { name: 'المغطس', description: 'موقع التراث العالمي ومكان المعمودية.' },
        en: { name: 'Baptism Site', description: 'World Heritage Site and place of baptism.' }
    }
  },
  // 12. AS-SALT
  {
    id: 'as-salt',
    name: 'السلط - As-Salt',
    isRegion: true,
    description: 'مدينة التسامح والمباني التراثية الصفراء.',
    location: 'Central',
    category: SiteCategory.CULTURAL,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Salt_Jordan_View.jpg/800px-Salt_Jordan_View.jpg',
    featured: false,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Afternoon',
    coordinates: { lat: 32.0392, lng: 35.7272 },
    translations: {
        ar: { name: 'السلط', description: 'مدينة الأوائل والتراث العمراني الفريد.' },
        en: { name: 'As-Salt', description: 'City of tolerance and unique golden architecture.' }
    }
  },
  // 13. KARAK
  {
    id: 'karak',
    name: 'الكرك - Karak',
    isRegion: true,
    description: 'قلعة الكرك الحصينة.',
    location: 'South',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Kerak_Castle_2012.jpg/800px-Kerak_Castle_2012.jpg',
    featured: true,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 31.1806, lng: 35.7024 },
    translations: {
        ar: { name: 'الكرك', description: 'قلعة الصليبيين التي تحكي قصص البطولات.' },
        en: { name: 'Karak', description: 'The mighty Crusader castle.' }
    }
  },
  // 14. SHOBAK
  {
    id: 'shobak',
    name: 'الشوبك - Shobak',
    isRegion: true,
    description: 'قلعة مونتريال الصليبية.',
    location: 'South',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Shobak_Castle.jpg/800px-Shobak_Castle.jpg',
    featured: false,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Afternoon',
    coordinates: { lat: 30.5306, lng: 35.5606 },
    translations: {
        ar: { name: 'الشوبك', description: 'قلعة منعزلة ذات تاريخ عريق.' },
        en: { name: 'Shobak', description: 'A secluded castle with ancient history.' }
    }
  },
  // 15. WADI MUJIB
  {
    id: 'wadi-mujib',
    name: 'وادي الموجب - Wadi Mujib',
    isRegion: true,
    description: 'جراند كانيون الأردن للمغامرات المائية.',
    location: 'Central',
    category: SiteCategory.ADVENTURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Wadi_Mujib_Siq_Trail.jpg/800px-Wadi_Mujib_Siq_Trail.jpg',
    featured: true,
    difficulty: 'Hard',
    bestTimeToVisit: 'Summer',
    coordinates: { lat: 31.4667, lng: 35.5667 },
    translations: {
        ar: { name: 'وادي الموجب', description: 'مغامرة السيق والمياه المتدفقة.' },
        en: { name: 'Wadi Mujib', description: 'The Grand Canyon of Jordan adventure.' }
    }
  },
  // 16. DANA RESERVE
  {
    id: 'dana-reserve',
    name: 'محمية ضانا - Dana Reserve',
    isRegion: true,
    description: 'أكبر محمية طبيعية في الأردن.',
    location: 'South',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Dana_Biosphere_Reserve_Landscape.jpg/800px-Dana_Biosphere_Reserve_Landscape.jpg',
    featured: true,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 30.6667, lng: 35.6167 },
    translations: {
        ar: { name: 'محمية ضانا', description: 'تنوع حيوي مذهل وهدوء ساحر.' },
        en: { name: 'Dana Reserve', description: 'Stunning biodiversity and charming serenity.' }
    }
  },
  // 17. MA'IN HOT SPRINGS
  {
    id: 'main-hot-springs',
    name: 'حمامات ماعين - Ma\'in Hot Springs',
    isRegion: true,
    description: 'شلالات مياه معدنية ساخنة علاجية.',
    location: 'Central',
    category: SiteCategory.LEISURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Ma%27in_Hot_Springs_Waterfall.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Winter',
    coordinates: { lat: 31.6099, lng: 35.6105 },
    translations: {
        ar: { name: 'حمامات ماعين', description: 'استرخاء وعلاج تحت الشلالات الساخنة.' },
        en: { name: 'Ma\'in Hot Springs', description: 'Relaxation and healing under hot waterfalls.' }
    }
  },
  // 18. AQABA
  {
    id: 'aqaba',
    name: 'العقبة - Aqaba',
    isRegion: true,
    description: 'البحر الأحمر والشواطئ والشعاب المرجانية.',
    location: 'South',
    category: SiteCategory.LEISURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Aqaba_Beach.jpg/800px-Aqaba_Beach.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'All Day',
    coordinates: { lat: 29.5319, lng: 35.0061 },
    translations: {
        ar: { name: 'العقبة', description: 'شمس وبحر وتاريخ في ثغر الأردن الباسم.' },
        en: { name: 'Aqaba', description: 'Sun, sea, and history at Jordan\'s Red Sea port.' }
    }
  },
  // 19. KINGS HIGHWAY
  {
    id: 'kings-highway',
    name: 'طريق الملوك - Kings Highway',
    isRegion: true,
    description: 'أقدم الطرق التجارية التاريخية في العالم.',
    location: 'South',
    category: SiteCategory.ADVENTURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kings_Highway_Jordan.jpg/800px-Kings_Highway_Jordan.jpg',
    featured: false,
    difficulty: 'Easy',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 31.0, lng: 35.6 },
    translations: {
        ar: { name: 'طريق الملوك', description: 'رحلة عبر التاريخ والمناظر الطبيعية الخلابة.' },
        en: { name: 'Kings Highway', description: 'A journey through history and scenic landscapes.' }
    }
  },
  // 20. DESERT CASTLES
  {
    id: 'desert-castles',
    name: 'القلاع الصحراوية - Desert Castles',
    isRegion: true,
    description: 'قصور الأمويين في البادية (خرانة، عمرة، الحلابات).',
    location: 'East',
    category: SiteCategory.CULTURAL,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Quseir_Amra_exterior.jpg/800px-Quseir_Amra_exterior.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Winter',
    coordinates: { lat: 31.7, lng: 36.6 },
    translations: {
        ar: { name: 'القلاع الصحراوية', description: 'فنون العمارة الإسلامية المبكرة في قلب الصحراء.' },
        en: { name: 'Desert Castles', description: 'Early Islamic architecture in the heart of the desert.' }
    }
  },
  // 21. AZRAQ
  {
    id: 'azraq-wetland',
    name: 'الأزرق - Azraq',
    isRegion: true,
    description: 'واحة الأزرق المائية وقلعة الأزرق.',
    location: 'East',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Azraq_Wetland_Reserve.jpg/800px-Azraq_Wetland_Reserve.jpg',
    featured: false,
    difficulty: 'Easy',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 31.8333, lng: 36.8167 },
    translations: {
        ar: { name: 'محمية الأزرق', description: 'واحة خضراء وسط الصحراء ومحطة للطيور المهاجرة.' },
        en: { name: 'Azraq Wetland', description: 'A green oasis in the desert and bird migration hub.' }
    }
  },
  // 22. SHAUMARI
  {
    id: 'shaumari',
    name: 'محمية الشومري - Shaumari Reserve',
    isRegion: true,
    description: 'موطن المها العربي وغزال الريم.',
    location: 'East',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Oryx_leucoryx_Shaumari.jpg',
    featured: false,
    difficulty: 'Easy',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 31.7333, lng: 36.7667 },
    translations: {
        ar: { name: 'محمية الشومري', description: 'سفاري الحياة البرية الأردنية.' },
        en: { name: 'Shaumari Reserve', description: 'Jordanian wildlife safari.' }
    }
  },
  // 23. UMM AR-RASAS
  {
    id: 'umm-ar-rasas',
    name: 'أم الرصاص - Umm Ar-Rasas',
    isRegion: true,
    description: 'موقع تراث عالمي يضم فسيفساء مذهلة.',
    location: 'Central',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Umm_ar-Rasas_Mosaics.jpg/800px-Umm_ar-Rasas_Mosaics.jpg',
    featured: false,
    difficulty: 'Easy',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 31.5000, lng: 35.9167 },
    translations: {
        ar: { name: 'أم الرصاص', description: 'تاريخ بيزنطي وإسلامي مبكر.' },
        en: { name: 'Umm Ar-Rasas', description: 'Byzantine and early Islamic history.' }
    }
  },
  // 24. UMM EL-JIMAL
  {
    id: 'umm-el-jimal',
    name: 'أم الجمال - Umm el-Jimal',
    isRegion: true,
    description: 'الواحة السوداء المبنية من الحجر البازلتي.',
    location: 'North',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Umm_el-Jimal_Barracks.jpg/800px-Umm_el-Jimal_Barracks.jpg',
    featured: false,
    difficulty: 'Moderate',
    bestTimeToVisit: 'Spring',
    coordinates: { lat: 32.3275, lng: 36.3703 },
    translations: {
        ar: { name: 'أم الجمال', description: 'تراث نبطي وروماني وبيزنطي في البادية الشمالية.' },
        en: { name: 'Umm el-Jimal', description: 'Nabataean, Roman, and Byzantine heritage in the North Badia.' }
    }
  },
  // CHILDREN SITES (Highlights)
  {
    id: 'amman-citadel',
    parentId: 'amman',
    name: 'جبل القلعة - Citadel',
    description: 'معبد هرقل، القصر الأموي، والكنيسة البيزنطية.',
    location: 'Amman',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Temple_of_Hercules_Amman.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Sunset',
    coordinates: { lat: 31.9544, lng: 35.9355 },
    translations: {
        ar: { name: 'جبل القلعة', description: 'إطلالة بانورامية على عمان القديمة.' },
        en: { name: 'The Citadel', description: 'Panoramic views over old Amman.' }
    }
  },
  {
    id: 'roman-theatre',
    parentId: 'amman',
    name: 'المدرج الروماني - Roman Theatre',
    description: 'مسرح أثري ضخم وسط البلد.',
    location: 'Amman',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Roman_Theater_Amman_02.jpg/800px-Roman_Theater_Amman_02.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 31.9515, lng: 35.9392 },
    translations: {
        ar: { name: 'المدرج الروماني', description: 'أيقونة عمان الرومانية.' },
        en: { name: 'Roman Theatre', description: 'The Roman icon of Amman.' }
    }
  },
   {
    id: 'petra-treasury',
    parentId: 'petra',
    name: 'الخزنة - The Treasury',
    description: 'أشهر معالم البتراء، واجهة منحوتة بدقة في الجبل.',
    location: 'Petra',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Petra_Treasury.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 30.3222, lng: 35.4516 },
    translations: {
        ar: { name: 'الخزنة', description: 'أيقونة البتراء الخالدة.' },
        en: { name: 'The Treasury', description: 'The eternal icon of Petra.' }
    }
  },
  {
    id: 'petra-siq',
    parentId: 'petra',
    name: 'السيق - The Siq',
    description: 'ممر صخري طويل وضيق يقود إلى قلب المدينة.',
    location: 'Petra',
    category: SiteCategory.NATURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Petra_Siq%2C_entrance_to_the_ancient_Nabatean_city_of_Petra%2C_Jordan.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'Morning',
    coordinates: { lat: 30.32, lng: 35.45 },
    translations: {
        ar: { name: 'السيق', description: 'بوابة التاريخ الصخرية.' },
        en: { name: 'The Siq', description: 'The rocky gateway to history.' }
    }
  },
  {
    id: 'petra-monastery',
    parentId: 'petra',
    name: 'الدير - The Monastery',
    description: 'معلم ضخم يشبه الخزنة، يحتاج المشي للوصول إليه.',
    location: 'Petra',
    category: SiteCategory.ARCHAEOLOGY,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Petra_Monastery.jpg/800px-Petra_Monastery.jpg',
    featured: true,
    difficulty: 'Hard',
    bestTimeToVisit: 'Afternoon',
    coordinates: { lat: 30.33, lng: 35.43 },
    translations: {
        ar: { name: 'الدير', description: 'جوهرة الجبل المخفية.' },
        en: { name: 'The Monastery', description: 'The hidden jewel of the mountain.' }
    }
  },
  {
    id: 'south-beach',
    parentId: 'aqaba',
    name: 'الشاطئ الجنوبي - South Beach',
    description: 'أفضل منطقة للغوص ومشاهدة المرجان.',
    location: 'Aqaba',
    category: SiteCategory.LEISURE,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Aqaba_Beach.jpg/800px-Aqaba_Beach.jpg',
    featured: true,
    difficulty: 'Easy',
    bestTimeToVisit: 'All Day',
    coordinates: { lat: 29.4, lng: 34.9 },
    translations: {
        ar: { name: 'الشاطئ الجنوبي', description: 'جنة الغوص والمرجان.' },
        en: { name: 'South Beach', description: 'Diving and coral paradise.' }
    }
  },
];
