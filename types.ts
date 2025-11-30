
export enum SiteCategory {
  ARCHAEOLOGY = 'Archaeology',
  NATURE = 'Nature',
  RELIGIOUS = 'Religious',
  LEISURE = 'Leisure',
  CULTURAL = 'Cultural',
  ADVENTURE = 'Adventure'
}

export interface SiteHighlight {
  title: string;
  description: string;
  image: string;
}

export interface SiteTranslation {
  name: string;
  description: string;
  longDescription?: string;
  highlights?: SiteHighlight[];
}

export interface TouristSite {
  id: string;
  // --- Hierarchy ---
  isRegion?: boolean; // e.g., Petra City, Amman City
  parentId?: string;  // e.g., 'petra' for The Treasury

  // --- Basic Info (5) ---
  name: string;
  description: string;
  longDescription?: string;
  location: string;
  category: SiteCategory;
  
  // --- Media (3) ---
  imageUrl: string;
  gallery?: string[];
  videoUrl?: string;

  // --- Logistics (4) - Price Removed ---
  coordinates?: { lat: number; lng: number };
  openingTime?: string;
  closingTime?: string;
  bestTimeToVisit?: 'Morning' | 'Afternoon' | 'Sunset' | 'All Day' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

  // --- Features & Amenities (7) ---
  featured: boolean;
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  accessibility?: boolean; // Wheelchair accessible
  parking?: boolean;
  guidedTours?: boolean;
  familyFriendly?: boolean;
  photographyAllowed?: boolean;

  // --- Contact & External (3) ---
  contactPhone?: string;
  websiteUrl?: string;
  bookingUrl?: string;

  // --- Advanced (3) ---
  tags?: string[]; // SEO Keywords
  rating?: number; // Manual override
  highlights?: SiteHighlight[];
  translations?: Partial<Record<LanguageCode, SiteTranslation>>;
}

export interface ThemeConfig {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string; // New: Card backgrounds
  
  // Layout & Global
  layoutMode: 'spacious' | 'compact';
  navbarStyle: 'transparent' | 'solid' | 'glass' | 'floating';
  footerStyle: 'simple' | 'mega' | 'minimal';
  siteWidth: 'full' | 'boxed';

  // Shapes & Borders
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  borderWidth: 'none' | 'thin' | 'thick';
  
  // Typography
  fontHeader: 'sans' | 'serif' | 'display';
  fontBody: 'sans' | 'serif' | 'mono';
  fontScale: number;
  
  // Component Specifics
  buttonStyle: 'solid' | 'outline' | 'ghost' | 'soft';
  buttonShape: 'square' | 'rounded' | 'pill';
  cardStyle: 'flat' | 'elevated' | 'bordered';
  cardHoverEffect: 'none' | 'lift' | 'zoom' | 'glow';

  // Section Visibility (Expanded for Builder)
  visibleSections: {
    hero: boolean;
    history: boolean;
    featured: boolean;
    cta: boolean;
    stats: boolean;        // New
    videoSection: boolean; // New
    testimonials: boolean; // New
    newsletter: boolean;   // New
  };
}

export interface ThemePreset {
  id: string;
  name: string;
  thumbnail: string; // URL or color code
  config: ThemeConfig;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  active: boolean;
  icon: string; // Icon name
  version: string;
  category: 'utility' | 'ai' | 'ui' | 'marketing' | 'commerce' | 'content' | 'security';
}

export interface GeneralSettings {
  siteName: string;
  contactEmail: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  maintenanceMode: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'visitor';
  avatar?: string;
  phone?: string;
  joinedDate: string;
}

export interface TripRequest {
  id: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'booked' | 'cancelled';
  dateSubmitted: string;
  
  // Logistics
  startDate: string;
  duration: number; // Days
  travelers: { adults: number; children: number };
  budget: 'economy' | 'standard' | 'luxury';
  
  // Preferences
  selectedSiteIds: string[];
  interests: string[];
  
  // Contact
  name: string;
  email: string;
  phone: string;
  notes?: string;
  
  // Admin Internal
  adminNotes?: string;
}

export type LanguageCode = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'it' | 'tr' | 'ru' | 'zh' | 'ja';

export interface Translation {
  home: string;
  explore: string;
  experiences: string;
  planVisit: string;
  countryName: string;
  heroTitleHighlight: string;
  heroTitleMain: string;
  heroDesc: string;
  planButton: string;
  historyTitle: string;
  historySubtitle: string;
  historyDesc: string;
  featuredTitle: string;
  featuredSubtitle: string;
  viewAll: string;
  readMore: string;
  readyTitle: string;
  readyDesc: string;
  buyTicket: string;
  visa: string;
  weather: string;
  transport: string;
  accommodation: string;
  about: string;
  news: string;
  gallery: string;
  contact: string;
  newsletter: string;
  subscribe: string;
  rights: string;
  discoverTitle: string;
  discoverDesc: string;
  cultureTitle: string;
  natureTitle: string;
  expHiking: string;
  expWellness: string;
  expFood: string;
  planVisaTitle: string;
  planPassTitle: string;
  faqTitle: string;
  highlightsTitle: string;
  locationTitle: string;
  videoTitle: string;
  galleryTitle: string;
  bookNow: string;
}

export interface AppState {
  sites: TouristSite[];
  blogPosts: BlogPost[];
  tripRequests: TripRequest[];
  theme: ThemeConfig;
  currentThemeId: string; 
  userMode: 'visitor' | 'admin';
  visualEditMode: boolean; // New
  currentUser: User | null;
  users: User[]; 
  language: LanguageCode;
  plugins: Plugin[];
  settings: GeneralSettings;
  currency: 'JOD' | 'USD' | 'EUR';
  bookmarks: string[];
}

export interface AppContextType {
  state: AppState;
  updateSite: (site: TouristSite) => void;
  addSite: (site: TouristSite) => void;
  deleteSite: (id: string) => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  applyThemePreset: (presetId: string) => void;
  toggleMode: () => void;
  toggleVisualEditMode: () => void; // New
  setLanguage: (lang: LanguageCode) => void;
  togglePlugin: (id: string) => void;
  updateSettings: (settings: Partial<GeneralSettings>) => void;
  setCurrency: (currency: 'JOD' | 'USD' | 'EUR') => void;
  toggleBookmark: (id: string) => void;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addTripRequest: (request: TripRequest) => void;
  updateTripRequest: (request: TripRequest) => void;
  deleteTripRequest: (id: string) => void;
  t: Translation;
  isRtl: boolean;
}