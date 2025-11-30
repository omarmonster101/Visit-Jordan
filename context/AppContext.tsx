
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState, TouristSite, ThemeConfig, AppContextType, LanguageCode, Plugin, GeneralSettings, BlogPost, User, TripRequest } from '../types';
import { INITIAL_SITES, INITIAL_THEME, TRANSLATIONS, SUPPORTED_LANGUAGES, INITIAL_PLUGINS, INITIAL_SETTINGS, INITIAL_BLOG, INITIAL_USERS, THEME_PRESETS } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

const detectLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return 'ar';
  const browserLang = navigator.language.split('-')[0] as LanguageCode;
  const supportedCodes = SUPPORTED_LANGUAGES.map(l => l.code);
  return supportedCodes.includes(browserLang) ? browserLang : 'en';
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    sites: INITIAL_SITES,
    blogPosts: INITIAL_BLOG,
    tripRequests: [],
    theme: INITIAL_THEME,
    currentThemeId: 'original-jordan', 
    userMode: 'visitor',
    visualEditMode: false,
    currentUser: null,
    users: INITIAL_USERS,
    language: 'ar',
    plugins: INITIAL_PLUGINS,
    settings: INITIAL_SETTINGS,
    currency: 'JOD',
    bookmarks: []
  });

  // Load User from LocalStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('visit_jordan_user');
    const savedBookmarks = localStorage.getItem('visit_jordan_bookmarks');
    const savedUsersList = localStorage.getItem('visit_jordan_users_list');
    const savedTrips = localStorage.getItem('visit_jordan_trips');
    
    if (savedUsersList) {
        try {
            const usersList = JSON.parse(savedUsersList);
            setState(prev => ({ ...prev, users: usersList }));
        } catch (e) { console.error("Failed to parse users list"); }
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState(prev => ({ ...prev, currentUser: user }));
      } catch (e) { console.error("Failed to parse user"); }
    }
    
    if (savedBookmarks) {
      try {
        const bookmarks = JSON.parse(savedBookmarks);
        setState(prev => ({ ...prev, bookmarks }));
      } catch (e) { console.error("Failed to parse bookmarks"); }
    }

    if (savedTrips) {
        try {
            const trips = JSON.parse(savedTrips);
            setState(prev => ({ ...prev, tripRequests: trips }));
        } catch (e) { console.error("Failed to parse trips"); }
    }

    setState(prev => ({ ...prev, language: detectLanguage() }));
  }, []);

  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    const isRtl = state.language === 'ar';
    document.documentElement.lang = state.language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.style.fontFamily = state.theme.fontFamily === 'serif' ? '"Playfair Display", serif' : '"Cairo", sans-serif';
    
    // Apply Background Color from Theme
    document.body.style.backgroundColor = state.theme.backgroundColor;
  }, [state.language, state.theme.fontFamily, state.theme.backgroundColor]);

  // Persist Users List whenever it changes
  useEffect(() => {
     if (state.users.length > 0) {
        localStorage.setItem('visit_jordan_users_list', JSON.stringify(state.users));
     }
  }, [state.users]);

  // Persist Trips
  useEffect(() => {
      localStorage.setItem('visit_jordan_trips', JSON.stringify(state.tripRequests));
  }, [state.tripRequests]);

  const updateSite = (updatedSite: TouristSite) => {
    setState((prev) => ({
      ...prev,
      sites: prev.sites.map((s) => (s.id === updatedSite.id ? updatedSite : s)),
    }));
  };

  const addSite = (newSite: TouristSite) => {
    setState((prev) => ({
      ...prev,
      sites: [...prev.sites, newSite],
    }));
  };

  const deleteSite = (id: string) => {
    setState((prev) => ({
      ...prev,
      sites: prev.sites.filter((s) => s.id !== id),
    }));
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setState((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...updates },
    }));
  };

  const applyThemePreset = (presetId: string) => {
    const preset = THEME_PRESETS.find(p => p.id === presetId);
    if (preset) {
        setState(prev => ({
            ...prev,
            currentThemeId: presetId,
            theme: preset.config
        }));
    }
  };

  const toggleMode = () => {
    if (state.currentUser?.role === 'admin') {
      setState((prev) => ({
        ...prev,
        userMode: prev.userMode === 'visitor' ? 'admin' : 'visitor',
        visualEditMode: false // Reset visual editor when toggling modes
      }));
    } else {
      console.warn("Unauthorized: Only admins can switch to admin mode.");
    }
  };

  const toggleVisualEditMode = () => {
    if (state.currentUser?.role === 'admin') {
        setState(prev => ({ ...prev, visualEditMode: !prev.visualEditMode }));
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const togglePlugin = (id: string) => {
    setState(prev => ({
      ...prev,
      plugins: prev.plugins.map(p => p.id === id ? { ...p, active: !p.active } : p)
    }));
  };

  const updateSettings = (updates: Partial<GeneralSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  };

  const setCurrency = (currency: 'JOD' | 'USD' | 'EUR') => {
    setState(prev => ({ ...prev, currency }));
  };

  const toggleBookmark = (id: string) => {
    setState(prev => {
      const isBookmarked = prev.bookmarks.includes(id);
      const newBookmarks = isBookmarked 
          ? prev.bookmarks.filter(b => b !== id) 
          : [...prev.bookmarks, id];
      
      localStorage.setItem('visit_jordan_bookmarks', JSON.stringify(newBookmarks));
      return { ...prev, bookmarks: newBookmarks };
    });
  };

  // Auth Methods
  const login = (user: User) => {
    localStorage.setItem('visit_jordan_user', JSON.stringify(user));
    setState(prev => ({ ...prev, currentUser: user }));
  };

  const logout = () => {
    localStorage.removeItem('visit_jordan_user');
    setState(prev => ({ 
      ...prev, 
      currentUser: null, 
      bookmarks: [], 
      userMode: 'visitor',
      visualEditMode: false
    }));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (state.currentUser) {
      const updatedUser = { ...state.currentUser, ...updates };
      localStorage.setItem('visit_jordan_user', JSON.stringify(updatedUser));
      
      const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
      setState(prev => ({ ...prev, currentUser: updatedUser, users: updatedUsers }));
    }
  };

  // User Management
  const addUser = (user: User) => {
    setState(prev => ({
       ...prev,
       users: [...prev.users, user]
    }));
  };

  const updateUser = (user: User) => {
    setState(prev => ({
       ...prev,
       users: prev.users.map(u => u.id === user.id ? user : u)
    }));
  };

  const deleteUser = (id: string) => {
    setState(prev => ({
       ...prev,
       users: prev.users.filter(u => u.id !== id)
    }));
  };

  const addBlogPost = (post: BlogPost) => {
    setState(prev => ({
      ...prev,
      blogPosts: [post, ...prev.blogPosts]
    }));
  };

  const deleteBlogPost = (id: string) => {
    setState(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(p => p.id !== id)
    }));
  };

  const addTripRequest = (request: TripRequest) => {
     setState(prev => ({
        ...prev,
        tripRequests: [request, ...prev.tripRequests]
     }));
  };

  const updateTripRequest = (request: TripRequest) => {
     setState(prev => ({
        ...prev,
        tripRequests: prev.tripRequests.map(r => r.id === request.id ? request : r)
     }));
  };

  const deleteTripRequest = (id: string) => {
     setState(prev => ({
        ...prev,
        tripRequests: prev.tripRequests.filter(r => r.id !== id)
     }));
  };

  const t = TRANSLATIONS[state.language];
  const isRtl = state.language === 'ar';

  return (
    <AppContext.Provider value={{ 
      state, 
      updateSite, 
      addSite, 
      deleteSite, 
      updateTheme,
      applyThemePreset,
      toggleMode, 
      toggleVisualEditMode,
      setLanguage, 
      togglePlugin,
      updateSettings,
      setCurrency,
      toggleBookmark,
      login, 
      logout,
      updateProfile,
      addUser,
      updateUser,
      deleteUser,
      addBlogPost,
      deleteBlogPost,
      addTripRequest,
      updateTripRequest,
      deleteTripRequest,
      t, 
      isRtl 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
