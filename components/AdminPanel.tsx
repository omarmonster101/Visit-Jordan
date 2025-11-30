
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { SiteCategory, TouristSite, ThemeConfig, Plugin, BlogPost, User, TripRequest } from '../types';
import { generateSiteDescription } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { THEME_PRESETS } from '../constants';

// Icons
import { 
  Layout, Type, Palette, Save, Plus, Trash2, Wand2, Settings, 
  BarChart2, Image, CloudSun, Box, Coins, Globe, MapPin, 
  MessageSquare, FileText, Share2, Grid, Home, ArrowLeft,
  Bot, Mic, Moon, ArrowUp, Cookie, Lock, Sparkles, Filter, Search,
  Clock, Compass, Printer, PhoneCall, QrCode, Maximize, Heart, Music,
  Move, MousePointer, Eye, Star, Video, Link, Calendar, Plane, Bed, Car,
  ShoppingBag, Award, FileDown, HelpCircle, FileCheck, Copy, Smartphone,
  PieChart, Shield, Stamp, Zap, CheckSquare, Square, Info, Camera, Tag,
  Thermometer, Accessibility, DollarSign, ExternalLink, RefreshCw, PenTool,
  Sun, ClipboardList, MessageCircle, User as UserIcon, Users, Edit, Check,
  SplitSquareHorizontal, History, Megaphone, Scale, PartyPopper, Keyboard, 
  AlertTriangle, Activity, CircleDollarSign, Timer, Vote, MessageSquareDashed,
  Briefcase, DownloadCloud, X, Upload, Coffee, Link2Off, Bell, UserCheck, 
  FileText as FileInvoice, Mail, CalendarCheck, BarChart, Send, MoreVertical,
  Instagram, Youtube, ShieldCheck, Ticket
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { state, updateTheme, updateSite, deleteSite, addSite, togglePlugin, updateSettings, toggleMode, addBlogPost, deleteBlogPost, addUser, updateUser, deleteUser, applyThemePreset, updateTripRequest, deleteTripRequest } = useAppContext();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sites' | 'trips' | 'users' | 'blog' | 'appearance' | 'plugins' | 'settings'>('dashboard');
  const [editingSite, setEditingSite] = useState<TouristSite | null>(null);
  const [isNewSite, setIsNewSite] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  
  // Editor Sub-Tab State
  const [editorTab, setEditorTab] = useState<'basic' | 'media' | 'logistics' | 'amenities' | 'advanced'>('basic');

  // Image Picker State
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [imageSearchResults, setImageSearchResults] = useState<string[]>([]);
  const [imageSearchLoading, setImageSearchLoading] = useState(false);
  const [pastedUrl, setPastedUrl] = useState('');

  // Plugin Search State
  const [pluginSearch, setPluginSearch] = useState('');
  const [pluginFilter, setPluginFilter] = useState('all');

  // User Management State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userSearch, setUserSearch] = useState('');

  // Trip Management State
  const [selectedTrip, setSelectedTrip] = useState<TripRequest | null>(null);

  // Mock Data for Analytics
  const analyticsData = [
    { name: 'يناير', visits: 4000 },
    { name: 'فبراير', visits: 3000 },
    { name: 'مارس', visits: 2000 },
    { name: 'أبريل', visits: 2780 },
    { name: 'مايو', visits: 1890 },
    { name: 'يونيو', visits: 2390 },
    { name: 'يوليو', visits: 3490 },
  ];

  // Icons Map for Plugins
  const IconMap: Record<string, any> = {
    CloudSun, Coins, Clock, Moon, Compass, Map: MapPin, Printer, Languages: Globe, PhoneCall, QrCode, Calculator: Square, Car, Ruler: Settings, Sun, WifiOff: Lock, Bot, Sparkles, Mic, Search, BarChart3: BarChart2, ArrowUp, Maximize, Heart, Music, Move, MousePointer, Eye, Snowflake: CloudSun, ClipboardList, Type, Menu: Grid, GalleryHorizontal: Image, ChevronRight: ArrowLeft, Star, Video, Link, Calendar, Plane, Bed, ShoppingBag, Award, FileDown, HelpCircle, FileCheck, Shirt: Tag, Camera, BookOpen: FileText, MessageCircle, Share2, Cookie, Mail: MessageSquare, PieChart, Shield, Stamp, Zap, Globe,
    SplitSquareHorizontal, History, Users, Megaphone, Scale, Palette, PartyPopper, Keyboard, MessageSquareDashed, AlertTriangle, Activity, BarChart4: Vote, CircleDollarSign, Timer, Image,
    Link2Off, Bell, UserCheck, FileText: FileInvoice, CalendarCheck, BarChart, Instagram, Youtube, ShieldCheck, Ticket, MapPin, Send
  };

  const handleAiGenerate = async () => {
    if (!editingSite) return;
    setLoadingAi(true);
    const newDesc = await generateSiteDescription(editingSite.name, editingSite.location);
    setEditingSite({ ...editingSite, description: newDesc });
    setLoadingAi(false);
  };

  // Expanded Internal Database for "Auto Search"
  const IMAGE_DATABASE: Record<string, string[]> = {
     'petra': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/800px-The_Treasury_Petra_Jordan.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Petra_Treasury.jpg/800px-Petra_Treasury.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Petra_Siq%2C_entrance_to_the_ancient_Nabatean_city_of_Petra%2C_Jordan.jpg/800px-Petra_Siq%2C_entrance_to_the_ancient_Nabatean_city_of_Petra%2C_Jordan.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Petra_Monastery.jpg/800px-Petra_Monastery.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Petra_Jordan_BW_22.JPG/800px-Petra_Jordan_BW_22.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Petra_-_The_Siq_-_2010.jpg/800px-Petra_-_The_Siq_-_2010.jpg'
     ],
     'wadi rum': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Wadi_Rum_Desert.jpg/800px-Wadi_Rum_Desert.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Wadi_Rum_Jordan.jpg/800px-Wadi_Rum_Jordan.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Wadi_Rum_in_December.jpg/800px-Wadi_Rum_in_December.jpg',
        'https://www.wadirumnomads.com/wp-content/uploads/sunset-in-wadi-rum.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Wadi_Rum_Mountains.jpg/800px-Wadi_Rum_Mountains.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Wadi_Rum_desert.jpg/800px-Wadi_Rum_desert.jpg'
     ],
     'amman': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Amman_Citadel.jpg/800px-Amman_Citadel.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Roman_Theater_Amman_02.jpg/800px-Roman_Theater_Amman_02.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Amman_Roman_Theater.jpg/800px-Amman_Roman_Theater.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/23/Temple_of_Hercules_Amman.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/King_Abdullah_I_Mosque_Amman.jpg/800px-King_Abdullah_I_Mosque_Amman.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Amman_downtown_at_night.jpg/800px-Amman_downtown_at_night.jpg'
     ],
     'jerash': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jerash_oval_plaza.jpg/800px-Jerash_oval_plaza.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7f/Jerash_Forum_1.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a0/Jerash_Theater2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Jerash_Arch_of_Hadrian.jpg/800px-Jerash_Arch_of_Hadrian.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Jerash_Colonnaded_Street.jpg/800px-Jerash_Colonnaded_Street.jpg'
     ],
     'dead sea': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Dead_Sea_salt.jpg/800px-Dead_Sea_salt.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/21/Dead_Sea_by_David_Shankbone.jpg',
        'https://c.files.bbci.co.uk/E94D/production/_92452795_1dd411f9-938a-41e2-8a6e-f225f0dfb08a.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Dead_Sea_Jordan_Sunset.jpg/800px-Dead_Sea_Jordan_Sunset.jpg'
     ],
     'aqaba': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Aqaba_Beach.jpg/800px-Aqaba_Beach.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/03/Aqaba_Coral_Reef.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aqaba_Fort.jpg/800px-Aqaba_Fort.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Aqaba_Flagpole.jpg/800px-Aqaba_Flagpole.jpg'
     ],
     'ajloun': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ajloun_Castle_01.jpg/800px-Ajloun_Castle_01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ajloun_Forest_Reserve.jpg/800px-Ajloun_Forest_Reserve.jpg',
     ],
     'madaba': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Madaba_Mosaic_Map.jpg/800px-Madaba_Mosaic_Map.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/St_George_Church_Madaba.jpg/800px-St_George_Church_Madaba.jpg'
     ],
     'salt': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Salt_Jordan_View.jpg/800px-Salt_Jordan_View.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/As-Salt_Heritage_Houses.jpg/800px-As-Salt_Heritage_Houses.jpg'
     ],
     'karak': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Kerak_Castle_2012.jpg/800px-Kerak_Castle_2012.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Kerak_Castle_Panorama.jpg/800px-Kerak_Castle_Panorama.jpg'
     ],
     'shobak': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Shobak_Castle.jpg/800px-Shobak_Castle.jpg'
     ],
     'dana': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Dana_Biosphere_Reserve_Landscape.jpg/800px-Dana_Biosphere_Reserve_Landscape.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Dana_Village.jpg/800px-Dana_Village.jpg'
     ],
     'mujib': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Wadi_Mujib_Siq_Trail.jpg/800px-Wadi_Mujib_Siq_Trail.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Wadi_Mujib_Canyon.jpg/800px-Wadi_Mujib_Canyon.jpg'
     ],
     'umm qais': [
        'https://upload.wikimedia.org/wikipedia/commons/2/29/Umm_Qais_Basilica_Terrace.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Gadara_Umm_Qais.jpg/800px-Gadara_Umm_Qais.jpg'
     ],
     'ma\'in': [
        'https://upload.wikimedia.org/wikipedia/commons/6/69/Ma%27in_Hot_Springs_Waterfall.jpg'
     ],
     'baptism': [
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/Baptism_Site_Bethany_Beyond_the_Jordan.jpg'
     ],
     'history': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Quseir_Amra_exterior.jpg/800px-Quseir_Amra_exterior.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pella_Jordan_BW_13.JPG/800px-Pella_Jordan_BW_13.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Umm_ar-Rasas_Mosaics.jpg/800px-Umm_ar-Rasas_Mosaics.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Umm_el-Jimal_Barracks.jpg/800px-Umm_el-Jimal_Barracks.jpg'
     ],
     'nature': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Azraq_Wetland_Reserve.jpg/800px-Azraq_Wetland_Reserve.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/77/Oryx_leucoryx_Shaumari.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kings_Highway_Jordan.jpg/800px-Kings_Highway_Jordan.jpg'
     ]
  };

  const handleImageSearch = () => {
     setImageSearchLoading(true);
     setImageSearchResults([]); 
     
     // 1. Determine Search Term
     const searchTerm = imageSearchQuery || editingSite?.name || 'Jordan';
     const lowerTerm = searchTerm.toLowerCase();

     // 2. Simulate Network Delay for realism
     setTimeout(() => {
        let results: string[] = [];
        
        // 3. Smart Keyword Matching (Expanded Internal DB)
        if (lowerTerm.includes('petra') || lowerTerm.includes('بتراء') || lowerTerm.includes('treasury')) {
            results = IMAGE_DATABASE['petra'];
        } else if (lowerTerm.includes('rum') || lowerTerm.includes('رم') || lowerTerm.includes('desert')) {
            results = IMAGE_DATABASE['wadi rum'];
        } else if (lowerTerm.includes('amman') || lowerTerm.includes('عمان') || lowerTerm.includes('citadel')) {
            results = IMAGE_DATABASE['amman'];
        } else if (lowerTerm.includes('jerash') || lowerTerm.includes('جرش')) {
            results = IMAGE_DATABASE['jerash'];
        } else if (lowerTerm.includes('dead') || lowerTerm.includes('ميت') || lowerTerm.includes('sea')) {
            results = IMAGE_DATABASE['dead sea'];
        } else if (lowerTerm.includes('aqaba') || lowerTerm.includes('عقبة')) {
            results = IMAGE_DATABASE['aqaba'];
        } else if (lowerTerm.includes('ajloun') || lowerTerm.includes('عجلون')) {
            results = IMAGE_DATABASE['ajloun'];
        } else if (lowerTerm.includes('madaba') || lowerTerm.includes('مأدبا')) {
            results = IMAGE_DATABASE['madaba'];
        } else if (lowerTerm.includes('salt') || lowerTerm.includes('سلط')) {
            results = IMAGE_DATABASE['salt'];
        } else if (lowerTerm.includes('karak') || lowerTerm.includes('كرك')) {
            results = IMAGE_DATABASE['karak'];
        } else if (lowerTerm.includes('shobak') || lowerTerm.includes('شوبك')) {
            results = IMAGE_DATABASE['shobak'];
        } else if (lowerTerm.includes('dana') || lowerTerm.includes('ضانا')) {
            results = IMAGE_DATABASE['dana'];
        } else if (lowerTerm.includes('mujib') || lowerTerm.includes('موجب')) {
            results = IMAGE_DATABASE['mujib'];
        } else if (lowerTerm.includes('umm qais') || lowerTerm.includes('أم قيس') || lowerTerm.includes('gadara')) {
            results = IMAGE_DATABASE['umm qais'];
        } else if (lowerTerm.includes('main') || lowerTerm.includes('ماعين')) {
            results = IMAGE_DATABASE['ma\'in'];
        } else if (lowerTerm.includes('baptism') || lowerTerm.includes('مغطس')) {
            results = IMAGE_DATABASE['baptism'];
        } else if (lowerTerm.includes('ruins') || lowerTerm.includes('history') || lowerTerm.includes('ancient')) {
            results = IMAGE_DATABASE['history'];
        } else if (lowerTerm.includes('nature') || lowerTerm.includes('forest') || lowerTerm.includes('water')) {
            results = IMAGE_DATABASE['nature'];
        } else {
            // 4. ROBUST FALLBACK for unknown terms (NO External Generators)
            const allImages = [
                ...IMAGE_DATABASE['petra'],
                ...IMAGE_DATABASE['wadi rum'],
                ...IMAGE_DATABASE['amman'],
                ...IMAGE_DATABASE['nature'],
                ...IMAGE_DATABASE['history'],
                ...IMAGE_DATABASE['dead sea'],
                ...IMAGE_DATABASE['aqaba']
            ];
            // Shuffle and pick 12
            results = allImages.sort(() => 0.5 - Math.random()).slice(0, 12);
        }

        setImageSearchResults(results);
        setImageSearchLoading(false);
     }, 600);
  };

  const openImagePicker = () => {
     setImageSearchQuery(editingSite?.name || '');
     setShowImagePicker(true);
     handleImageSearch();
  };

  const selectImage = (url: string) => {
     if (editingSite) {
        setEditingSite({ ...editingSite, imageUrl: url });
        setShowImagePicker(false);
        setPastedUrl('');
     }
  };

  const handleSaveSite = () => {
    if (editingSite) {
      if (isNewSite) {
        addSite(editingSite);
      } else {
        updateSite(editingSite);
      }
      setEditingSite(null);
      setIsNewSite(false);
    }
  };

  const handleSaveUser = () => {
     if (editingUser) {
        updateUser(editingUser);
        setEditingUser(null);
     }
  };

  const createNewSite = () => {
    const newId = (Math.max(...state.sites.map(s => parseInt(s.id) || 0)) + 1).toString();
    setEditingSite({
      id: newId,
      name: '',
      description: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/640px-The_Treasury_Petra_Jordan.jpg',
      location: '',
      category: SiteCategory.ARCHAEOLOGY,
      featured: false,
      openingTime: '09:00',
      closingTime: '17:00',
      difficulty: 'Moderate',
      accessibility: false,
      parking: false,
      guidedTours: false,
      familyFriendly: true,
      photographyAllowed: true,
    });
    setIsNewSite(true);
  };

  const filteredPlugins = state.plugins.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(pluginSearch.toLowerCase()) || p.description.toLowerCase().includes(pluginSearch.toLowerCase());
    const matchesFilter = pluginFilter === 'all' || p.category === pluginFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = state.users.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const [newPost, setNewPost] = useState({ title: '', excerpt: '', image: '' });

  const handleAddPost = () => {
    const post: BlogPost = {
       id: Date.now().toString(),
       title: newPost.title,
       excerpt: newPost.excerpt,
       image: newPost.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pella_Jordan_BW_13.JPG/640px-Pella_Jordan_BW_13.JPG',
       date: new Date().toISOString().split('T')[0]
    };
    addBlogPost(post);
    setNewPost({ title: '', excerpt: '', image: '' });
  };

  const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const handleGoogleSearch = () => {
      const term = imageSearchQuery || editingSite?.name || 'Jordan Tourism';
      window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(term)}`, '_blank');
  };

  const saveSelectedTrip = () => {
     if (selectedTrip) {
        updateTripRequest(selectedTrip);
        setSelectedTrip(null);
     }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      
      {/* TRIP DETAILS MODAL */}
      {selectedTrip && (
         <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
               <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-gray-800">{selectedTrip.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                           selectedTrip.status === 'new' ? 'bg-blue-100 text-blue-700' :
                           selectedTrip.status === 'booked' ? 'bg-green-100 text-green-700' :
                           selectedTrip.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                           'bg-yellow-100 text-yellow-700'
                        }`}>
                           {selectedTrip.status.replace('_', ' ')}
                        </span>
                     </div>
                     <p className="text-sm text-gray-500">Request ID: {selectedTrip.id} • {new Date(selectedTrip.dateSubmitted).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => setSelectedTrip(null)} className="px-4 py-2 text-gray-500 hover:bg-gray-200 rounded font-bold">Close</button>
                     <button onClick={saveSelectedTrip} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded font-bold shadow-lg flex items-center gap-2"><Save size={18}/> Save Changes</button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-8 bg-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* LEFT COLUMN: Trip Info */}
                  <div className="lg:col-span-2 space-y-6">
                     {/* Client Card */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><UserIcon size={20}/> Client Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
                              <div className="flex items-center gap-2 text-gray-800">
                                 <Mail size={16} className="text-blue-500"/>
                                 <a href={`mailto:${selectedTrip.email}`} className="hover:underline">{selectedTrip.email}</a>
                              </div>
                           </div>
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold">Phone</label>
                              <div className="flex items-center gap-2 text-gray-800">
                                 <PhoneCall size={16} className="text-green-500"/>
                                 <a href={`tel:${selectedTrip.phone}`} className="hover:underline">{selectedTrip.phone}</a>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Trip Logistics */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Plane size={20}/> Trip Logistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Start Date</label>
                              <p className="font-medium">{selectedTrip.startDate}</p>
                           </div>
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Duration</label>
                              <p className="font-medium">{selectedTrip.duration} Days</p>
                           </div>
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Travelers</label>
                              <p className="font-medium">{selectedTrip.travelers.adults} Adults, {selectedTrip.travelers.children} Kids</p>
                           </div>
                           <div>
                              <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Budget</label>
                              <p className="font-medium capitalize">{selectedTrip.budget}</p>
                           </div>
                        </div>
                     </div>

                     {/* Interests & Sites */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Heart size={20}/> Preferences</h3>
                        
                        <div className="mb-6">
                           <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Selected Interests</label>
                           <div className="flex flex-wrap gap-2">
                              {selectedTrip.interests.map(i => (
                                 <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold capitalize">{i}</span>
                              ))}
                           </div>
                        </div>

                        <div>
                           <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Requested Destinations</label>
                           <div className="grid grid-cols-2 gap-2">
                              {selectedTrip.selectedSiteIds.map(siteId => {
                                 const site = state.sites.find(s => s.id === siteId);
                                 return (
                                    <div key={siteId} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                                       <MapPin size={14} className="text-red-500"/>
                                       <span className="text-sm font-medium">{site?.name || siteId}</span>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     </div>

                     {/* User Notes */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><MessageSquare size={20}/> Client Notes</h3>
                        <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg">{selectedTrip.notes || "No additional notes provided."}</p>
                     </div>
                  </div>

                  {/* RIGHT COLUMN: Admin Actions */}
                  <div className="space-y-6">
                     
                     {/* CRM Controls */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Settings size={20}/> Manage Request</h3>
                        
                        <div className="mb-4">
                           <label className="label">Status</label>
                           <select 
                              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                              value={selectedTrip.status}
                              onChange={e => setSelectedTrip({...selectedTrip, status: e.target.value as any})}
                           >
                              <option value="new">New Request</option>
                              <option value="contacted">Contacted</option>
                              <option value="proposal_sent">Proposal Sent</option>
                              <option value="booked">Booked (Closed)</option>
                              <option value="cancelled">Cancelled</option>
                           </select>
                        </div>

                        <div className="mb-4">
                           <label className="label">Admin Internal Notes</label>
                           <textarea 
                              className="w-full p-3 border rounded-lg h-32 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Write internal notes, price quotes, or reminders here..."
                              value={selectedTrip.adminNotes || ''}
                              onChange={e => setSelectedTrip({...selectedTrip, adminNotes: e.target.value})}
                           />
                        </div>
                     </div>

                     {/* Quick Actions */}
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Zap size={20}/> Quick Actions</h3>
                        <div className="space-y-3">
                           <a 
                              href={`mailto:${selectedTrip.email}?subject=Your Trip to Jordan&body=Dear ${selectedTrip.name},%0D%0A%0D%0AThank you for your request to visit Jordan. We have received your details regarding the trip starting on ${selectedTrip.startDate}.`}
                              className="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold text-center flex items-center justify-center gap-2"
                           >
                              <Mail size={18}/> Send Email
                           </a>
                           <a 
                              href={`https://wa.me/${selectedTrip.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="block w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-center flex items-center justify-center gap-2"
                           >
                              <MessageCircle size={18}/> Chat on WhatsApp
                           </a>
                           <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold flex items-center justify-center gap-2">
                              <FileText size={18}/> Generate Quote PDF
                           </button>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      )}

      {/* IMAGE PICKER MODAL */}
      {showImagePicker && (
         <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
               {/* HEADER */}
               <div className="p-4 border-b bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800"><Image className="text-blue-500"/> Media Manager</h3>
                     <button onClick={() => setShowImagePicker(false)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 text-gray-600"><X size={20}/></button>
                  </div>
                  
                  {/* SEARCH BAR */}
                  <div className="flex gap-2">
                     <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                           value={imageSearchQuery}
                           onChange={e => setImageSearchQuery(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && handleImageSearch()}
                           placeholder="ابحث عن صور (مثال: البتراء، جرش)..."
                           className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                     </div>
                     <button onClick={handleImageSearch} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-sm whitespace-nowrap flex items-center gap-2">
                        <Globe size={18} /> بحث ذكي
                     </button>
                     <button onClick={handleGoogleSearch} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 shadow-sm whitespace-nowrap flex items-center gap-2">
                        <ExternalLink size={18} /> Google
                     </button>
                  </div>
               </div>
               
               {/* RESULTS GRID */}
               <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
                  {imageSearchLoading ? (
                     <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <RefreshCw size={48} className="animate-spin mb-4" />
                        <p>جاري البحث عن أفضل الصور...</p>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        {imageSearchResults.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imageSearchResults.map((url, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => selectImage(url)}
                                    className="group relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <img 
                                      src={url} 
                                      className="w-full h-full object-cover" 
                                      loading="lazy" 
                                      onError={(e) => {
                                        // Ultimate Fallback: If a specific URL fails, use a generic safe one
                                        (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Treasury_Petra_Jordan.jpg/640px-The_Treasury_Petra_Jordan.jpg';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                            Select
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100">
                                       HQ Source
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 flex flex-col items-center">
                                <Search size={48} className="text-gray-300 mb-4"/>
                                <p className="text-gray-500">جرب البحث بكلمات عامة مثل "Petra" أو "Jordan".</p>
                            </div>
                        )}
                     </div>
                  )}
               </div>
               
               {/* PASTE URL FOOTER */}
               <div className="p-4 border-t bg-white">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">أو ألصق رابط مباشر للصورة</label>
                  <div className="flex gap-2">
                     <input 
                        value={pastedUrl}
                        onChange={e => setPastedUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 p-3 border rounded-lg bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
                     />
                     <button 
                        disabled={!pastedUrl}
                        onClick={() => selectImage(pastedUrl)}
                        className="bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2"
                     >
                        <Check size={18}/> استخدام الرابط
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed h-full z-10 shadow-2xl border-l border-slate-800">
        <div className="p-8 border-b border-slate-800">
          <h2 className="text-2xl font-bold font-serif text-yellow-500 tracking-wide flex items-center gap-2">
            <Globe className="animate-pulse" />
            {state.settings.siteName}
          </h2>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">CMS Director Panel v3.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-bold text-slate-500 px-4 py-2 uppercase">Overview</div>
          <NavItem id="dashboard" icon={BarChart2} label="لوحة المعلومات" />
          
          <div className="text-xs font-bold text-slate-500 px-4 py-2 mt-4 uppercase">Content</div>
          <NavItem id="sites" icon={MapPin} label="المواقع السياحية" />
          <NavItem id="blog" icon={FileText} label="الأخبار والمقالات" />
          
          <div className="text-xs font-bold text-slate-500 px-4 py-2 mt-4 uppercase">Business</div>
          <NavItem id="trips" icon={Briefcase} label="طلبات الحجز (Trips)" />
          <NavItem id="users" icon={Users} label="إدارة المستخدمين" />

          <div className="text-xs font-bold text-slate-500 px-4 py-2 mt-4 uppercase">Configuration</div>
          <NavItem id="appearance" icon={Palette} label="محرر المظهر" />
          <NavItem id="plugins" icon={Box} label="الإضافات (Plugins)" />
          <NavItem id="settings" icon={Settings} label="الإعدادات العامة" />
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button 
             onClick={toggleMode}
             className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700 hover:border-slate-500"
          >
             <Home size={18} />
             <span>العودة للموقع</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-72 p-8 overflow-y-auto h-screen custom-scrollbar">
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                     <div>
                        <p className="text-gray-500 text-sm">Total Sites</p>
                        <h3 className="text-3xl font-bold text-gray-800">{state.sites.length}</h3>
                     </div>
                     <div className="bg-blue-50 p-4 rounded-full text-blue-600"><MapPin size={24}/></div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                     <div>
                        <p className="text-gray-500 text-sm">Trip Requests</p>
                        <h3 className="text-3xl font-bold text-gray-800">{state.tripRequests.length}</h3>
                     </div>
                     <div className="bg-orange-50 p-4 rounded-full text-orange-600"><Briefcase size={24}/></div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                     <div>
                        <p className="text-gray-500 text-sm">Blog Posts</p>
                        <h3 className="text-3xl font-bold text-gray-800">{state.blogPosts.length}</h3>
                     </div>
                     <div className="bg-green-50 p-4 rounded-full text-green-600"><FileText size={24}/></div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                     <div>
                        <p className="text-gray-500 text-sm">Active Plugins</p>
                        <h3 className="text-3xl font-bold text-gray-800">{state.plugins.filter(p => p.active).length}</h3>
                     </div>
                     <div className="bg-yellow-50 p-4 rounded-full text-yellow-600"><Box size={24}/></div>
                 </div>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-96">
                <h3 className="text-lg font-bold text-gray-700 mb-6">تحليل الزيارات الشهري</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        )}

        {/* SITES MANAGER */}
        {activeTab === 'sites' && (
          <div className="space-y-6 animate-fade-in h-full">
            {!editingSite && (
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">إدارة المواقع السياحية</h1>
                <button onClick={createNewSite} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow flex items-center gap-2">
                  <Plus size={20} /> <span>إضافة موقع جديد</span>
                </button>
              </div>
            )}

            {editingSite ? (
               <div className="flex flex-col xl:flex-row gap-6">
                 
                 {/* LEFT: EDITOR FORM */}
                 <div className="flex-1 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[calc(100vh-8rem)]">
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                       <h2 className="font-bold text-gray-700 flex items-center gap-2"><Settings size={18}/> {editingSite.name || 'موقع جديد'}</h2>
                       <div className="flex gap-2">
                          <button onClick={() => setEditingSite(null)} className="px-4 py-2 text-red-600 text-sm font-bold hover:bg-red-50 rounded">إلغاء</button>
                          <button onClick={handleSaveSite} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 rounded flex items-center gap-2"><Save size={16}/> حفظ التغييرات</button>
                       </div>
                    </div>
                    
                    {/* TABS */}
                    <div className="flex border-b bg-white">
                       {[
                         { id: 'basic', label: 'أساسي', icon: Info },
                         { id: 'media', label: 'الوسائط', icon: Image },
                         { id: 'logistics', label: 'اللوجستيات', icon: MapPin },
                         { id: 'amenities', label: 'المرافق', icon: Coffee }, 
                         { id: 'advanced', label: 'متقدم', icon: Star }
                       ].map(tab => (
                          <button 
                            key={tab.id}
                            onClick={() => setEditorTab(tab.id as any)}
                            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${editorTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                          >
                             <tab.icon size={16} /> {tab.label}
                          </button>
                       ))}
                    </div>

                    {/* FORM CONTENT */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
                       
                       {/* BASIC INFO */}
                       {editorTab === 'basic' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="col-span-2">
                                <label className="label">اسم الموقع</label>
                                <input className="input-field" value={editingSite.name} onChange={e => setEditingSite({...editingSite, name: e.target.value})} />
                             </div>
                             <div>
                                <label className="label">التصنيف</label>
                                <select className="input-field" value={editingSite.category} onChange={e => setEditingSite({...editingSite, category: e.target.value as any})}>
                                   {Object.values(SiteCategory).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                             </div>
                             <div>
                                <label className="label">الموقع (المدينة/المنطقة)</label>
                                <input className="input-field" value={editingSite.location} onChange={e => setEditingSite({...editingSite, location: e.target.value})} />
                             </div>
                             <div className="col-span-2">
                                <label className="label flex justify-between">
                                  الوصف القصير
                                  <button onClick={handleAiGenerate} disabled={loadingAi} className="text-xs text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded">
                                     <Wand2 size={12}/> AI Generate
                                  </button>
                                </label>
                                <textarea className="input-field" rows={3} value={editingSite.description} onChange={e => setEditingSite({...editingSite, description: e.target.value})} />
                             </div>
                             <div className="col-span-2">
                                <label className="label">الوصف الكامل</label>
                                <textarea className="input-field" rows={6} value={editingSite.longDescription || ''} onChange={e => setEditingSite({...editingSite, longDescription: e.target.value})} />
                             </div>
                          </div>
                       )}

                       {/* MEDIA */}
                       {editorTab === 'media' && (
                          <div className="space-y-4">
                             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <label className="label flex justify-between items-center mb-2 text-blue-800">
                                   <span>صورة الغلاف (Main Image)</span>
                                   <button 
                                      onClick={openImagePicker}
                                      className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg flex items-center gap-1 transition-transform hover:scale-105"
                                   >
                                      <Search size={12} /> Search Images
                                   </button>
                                </label>
                                <div className="flex gap-4 items-center">
                                   <input className="input-field flex-1" value={editingSite.imageUrl} onChange={e => setEditingSite({...editingSite, imageUrl: e.target.value})} placeholder="https://..." />
                                   <div className="w-24 h-16 bg-white rounded border overflow-hidden shrink-0 shadow-sm relative group">
                                      <img src={editingSite.imageUrl} className="w-full h-full object-cover" />
                                      <div onClick={openImagePicker} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                         <Edit className="text-white" size={20}/>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             
                             <div>
                                <label className="label">فيديو يوتيوب (Embed URL)</label>
                                <input className="input-field" value={editingSite.videoUrl || ''} onChange={e => setEditingSite({...editingSite, videoUrl: e.target.value})} placeholder="https://www.youtube.com/embed/..." />
                             </div>
                             <div>
                                <label className="label">معرض الصور (فاصلة بين الروابط)</label>
                                <textarea 
                                  className="input-field" 
                                  rows={4} 
                                  value={editingSite.gallery?.join('\n') || ''} 
                                  onChange={e => setEditingSite({...editingSite, gallery: e.target.value.split('\n')})} 
                                  placeholder="http://image1.jpg&#10;http://image2.jpg"
                                />
                             </div>
                          </div>
                       )}

                       {/* LOGISTICS */}
                       {editorTab === 'logistics' && (
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="label">أفضل وقت للزيارة</label>
                                <select className="input-field" value={editingSite.bestTimeToVisit || 'All Day'} onChange={e => setEditingSite({...editingSite, bestTimeToVisit: e.target.value as any})}>
                                   <option value="Morning">Morning</option>
                                   <option value="Afternoon">Afternoon</option>
                                   <option value="Sunset">Sunset</option>
                                   <option value="All Day">All Day</option>
                                   <option value="Spring">Spring</option>
                                   <option value="Summer">Summer</option>
                                   <option value="Autumn">Autumn</option>
                                   <option value="Winter">Winter</option>
                                </select>
                             </div>
                             <div>
                                <label className="label">ساعة الفتح</label>
                                <input type="time" className="input-field" value={editingSite.openingTime || ''} onChange={e => setEditingSite({...editingSite, openingTime: e.target.value})} />
                             </div>
                             <div>
                                <label className="label">ساعة الإغلاق</label>
                                <input type="time" className="input-field" value={editingSite.closingTime || ''} onChange={e => setEditingSite({...editingSite, closingTime: e.target.value})} />
                             </div>
                             <div>
                                <label className="label">خط العرض (Latitude)</label>
                                <input type="number" step="0.0001" className="input-field" value={editingSite.coordinates?.lat || 0} onChange={e => setEditingSite({...editingSite, coordinates: { lat: parseFloat(e.target.value), lng: editingSite.coordinates?.lng || 0 }})} />
                             </div>
                             <div>
                                <label className="label">خط الطول (Longitude)</label>
                                <input type="number" step="0.0001" className="input-field" value={editingSite.coordinates?.lng || 0} onChange={e => setEditingSite({...editingSite, coordinates: { lng: parseFloat(e.target.value), lat: editingSite.coordinates?.lat || 0 }})} />
                             </div>
                             <div className="col-span-2">
                                <label className="label">رابط الحجز الخارجي</label>
                                <input className="input-field" value={editingSite.bookingUrl || ''} onChange={e => setEditingSite({...editingSite, bookingUrl: e.target.value})} placeholder="https://booking.com/..." />
                             </div>
                          </div>
                       )}

                       {/* AMENITIES */}
                       {editorTab === 'amenities' && (
                          <div className="space-y-6">
                             <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.accessibility || false} onChange={e => setEditingSite({...editingSite, accessibility: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                                   <span>دخول الكراسي المتحركة</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.parking || false} onChange={e => setEditingSite({...editingSite, parking: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                                   <span>موقف سيارات متوفر</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.guidedTours || false} onChange={e => setEditingSite({...editingSite, guidedTours: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                                   <span>جولات سياحية مرشدة</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.familyFriendly || false} onChange={e => setEditingSite({...editingSite, familyFriendly: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                                   <span>مناسب للعائلات</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.photographyAllowed || false} onChange={e => setEditingSite({...editingSite, photographyAllowed: e.target.checked})} className="w-5 h-5 accent-blue-600" />
                                   <span>يسمح بالتصوير</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                   <input type="checkbox" checked={editingSite.featured || false} onChange={e => setEditingSite({...editingSite, featured: e.target.checked})} className="w-5 h-5 accent-yellow-600" />
                                   <span>موقع مميز (Featured)</span>
                                </label>
                             </div>
                             <div>
                                <label className="label">مستوى الصعوبة</label>
                                <div className="flex gap-2">
                                   {['Easy', 'Moderate', 'Hard', 'Extreme'].map(lvl => (
                                      <button 
                                        key={lvl}
                                        onClick={() => setEditingSite({...editingSite, difficulty: lvl as any})}
                                        className={`flex-1 py-2 rounded border text-sm font-bold ${editingSite.difficulty === lvl ? 'bg-slate-800 text-white border-slate-800' : 'text-gray-600 border-gray-200'}`}
                                      >
                                         {lvl}
                                      </button>
                                   ))}
                                </div>
                             </div>
                          </div>
                       )}

                       {/* ADVANCED */}
                       {editorTab === 'advanced' && (
                          <div className="space-y-4">
                             <div>
                                <label className="label">كلمات مفتاحية (Tags) - SEO</label>
                                <input 
                                  className="input-field" 
                                  value={editingSite.tags?.join(', ') || ''} 
                                  onChange={e => setEditingSite({...editingSite, tags: e.target.value.split(',').map(s => s.trim())})} 
                                  placeholder="history, ruins, desert..." 
                                />
                             </div>
                             <div>
                                <label className="label">رقم الهاتف للتواصل</label>
                                <input className="input-field" value={editingSite.contactPhone || ''} onChange={e => setEditingSite({...editingSite, contactPhone: e.target.value})} />
                             </div>
                             <div>
                                <label className="label">الموقع الإلكتروني الرسمي</label>
                                <input className="input-field" value={editingSite.websiteUrl || ''} onChange={e => setEditingSite({...editingSite, websiteUrl: e.target.value})} />
                             </div>
                             <div>
                                <label className="label">تقييم يدوي (0-5)</label>
                                <input type="number" max="5" min="0" step="0.1" className="input-field" value={editingSite.rating || 4.5} onChange={e => setEditingSite({...editingSite, rating: parseFloat(e.target.value)})} />
                             </div>
                          </div>
                       )}

                    </div>
                 </div>

                 {/* RIGHT: LIVE PREVIEW (Mobile Style) */}
                 <div className="w-96 bg-gray-100 rounded-[2rem] border-8 border-gray-800 overflow-hidden shadow-2xl relative shrink-0">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 z-10 flex justify-center items-center">
                       <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                    </div>
                    
                    <div className="h-full overflow-y-auto bg-white pt-8 pb-4 scrollbar-hide">
                       {/* Preview Content */}
                       <div className="relative h-64">
                          <img src={editingSite.imageUrl} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                             <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">{editingSite.category}</span>
                             <h2 className="text-2xl font-serif font-bold leading-tight">{editingSite.name}</h2>
                             <div className="flex items-center gap-1 text-xs text-gray-300 mt-1">
                                <MapPin size={12}/> {editingSite.location}
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-4 space-y-4">
                          <div className="flex justify-between items-center">
                             <div className="flex gap-1 text-yellow-500">
                                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={(editingSite.rating || 5) >= i ? "currentColor" : "none"} />)}
                             </div>
                          </div>

                          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                             {editingSite.accessibility && <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold whitespace-nowrap">Wheelchair Access</span>}
                             {editingSite.parking && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold whitespace-nowrap">Parking</span>}
                             <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold whitespace-nowrap">{editingSite.difficulty}</span>
                          </div>

                          <p className="text-sm text-gray-600 leading-relaxed">{editingSite.description}</p>
                          
                          <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                             <div className="flex justify-between">
                                <span className="text-gray-500">Open:</span>
                                <span className="font-bold">{editingSite.openingTime} - {editingSite.closingTime}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-gray-500">Best Time:</span>
                                <span className="font-bold">{editingSite.bestTimeToVisit}</span>
                             </div>
                          </div>

                          <button className="w-full py-3 bg-red-800 text-white rounded-lg font-bold shadow-lg">Book Now</button>
                       </div>
                    </div>
                 </div>

               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.sites.map((site) => (
                  <div key={site.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                       <img src={site.imageUrl} className="w-full h-full object-cover" />
                       <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold rounded">{site.category}</span>
                    </div>
                    <div className="p-4">
                       <h3 className="font-bold text-lg">{site.name}</h3>
                       <p className="text-sm text-gray-500 mt-1">{site.location}</p>
                       <div className="flex gap-2 mt-4">
                          <button onClick={() => setEditingSite(site)} className="flex-1 bg-blue-50 text-blue-600 py-2 rounded font-bold text-sm">تعديل</button>
                          <button onClick={() => deleteSite(site.id)} className="bg-red-50 text-red-600 p-2 rounded"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === 'blog' && ( 
           <div className="space-y-6 animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">إدارة الأخبار والمقالات</h1>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                 <h2 className="font-bold mb-4">Add New Post</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Post Title" 
                      className="input-field" 
                      value={newPost.title} 
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                    <input 
                      placeholder="Image URL" 
                      className="input-field" 
                      value={newPost.image} 
                      onChange={e => setNewPost({...newPost, image: e.target.value})}
                    />
                    <textarea 
                      placeholder="Post Excerpt / Summary" 
                      className="input-field col-span-2" 
                      rows={3}
                      value={newPost.excerpt} 
                      onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                    />
                    <button 
                      onClick={handleAddPost}
                      disabled={!newPost.title}
                      className="col-span-2 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 disabled:opacity-50"
                    >
                       Publish Post
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                 {state.blogPosts.map(post => (
                    <div key={post.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                       <img src={post.image} className="w-24 h-24 object-cover rounded-lg" />
                       <div className="flex-1">
                          <h3 className="font-bold text-lg">{post.title}</h3>
                          <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                          <p className="text-gray-600 text-sm">{post.excerpt}</p>
                       </div>
                       <button onClick={() => deleteBlogPost(post.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                          <Trash2 size={20} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* APPEARANCE */}
        {activeTab === 'appearance' && ( 
           <div className="space-y-6 animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">محرر المظهر (Theme Editor)</h1>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                 <h2 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><Palette size={20}/> Active Theme Preset</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {THEME_PRESETS.map(preset => (
                        <button 
                           key={preset.id}
                           onClick={() => applyThemePreset(preset.id)}
                           className={`group relative rounded-xl overflow-hidden border-4 transition-all h-32 ${state.currentThemeId === preset.id ? 'border-blue-600 shadow-xl scale-105' : 'border-transparent opacity-80 hover:opacity-100'}`}
                        >
                            <img src={preset.thumbnail} alt={preset.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                               <h3 className="text-white font-bold text-lg mb-1">{preset.name}</h3>
                               {state.currentThemeId === preset.id && (
                                   <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">Active</span>
                               )}
                            </div>
                        </button>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* PLUGINS */}
        {activeTab === 'plugins' && ( 
           <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h1 className="text-3xl font-bold text-gray-800">متجر الإضافات (Plugins)</h1>
                 </div>
                 
                 <div className="flex gap-4">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="text" 
                         placeholder="Search plugins..." 
                         className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-200 outline-none"
                         value={pluginSearch}
                         onChange={e => setPluginSearch(e.target.value)}
                       />
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredPlugins.map(plugin => {
                    const IconComponent = IconMap[plugin.icon] || Box;
                    return (
                       <div key={plugin.id} className={`p-6 rounded-xl border transition-all ${plugin.active ? 'bg-white border-blue-200 shadow-md' : 'bg-gray-50 border-gray-100 opacity-75'}`}>
                          <div className="flex justify-between items-start mb-4">
                             <div className={`p-3 rounded-lg ${plugin.active ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                                <IconComponent size={24} />
                             </div>
                             <button onClick={() => togglePlugin(plugin.id)} className={`w-12 h-6 rounded-full relative transition-colors ${plugin.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${plugin.active ? 'left-7' : 'left-1'}`}></span>
                             </button>
                          </div>
                          <h3 className="font-bold text-lg mb-1">{plugin.name}</h3>
                          <p className="text-sm text-gray-500 h-10 line-clamp-2 mb-4">{plugin.description}</p>
                       </div>
                    );
                 })}
              </div>
           </div>
        )}
        
        {/* USERS */}
        {activeTab === 'users' && ( 
           <div className="space-y-6 animate-fade-in">
               <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4">{user.name}</td>
                             <td className="px-6 py-4">{user.role}</td>
                             <td className="px-6 py-4">
                                <button onClick={() => setEditingUser(user)} className="text-blue-600"><Edit size={18}/></button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
           </div>
        )}
        
        {/* TRIPS */}
        {activeTab === 'trips' && ( 
           <div className="space-y-6 animate-fade-in">
               <h1 className="text-3xl font-bold text-gray-800 mb-8">طلبات الحجز (Trip Requests)</h1>
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-gray-50 border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-4">Client Name</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       {state.tripRequests.length === 0 ? (
                          <tr><td colSpan={4} className="p-8 text-center text-gray-500">No trip requests yet.</td></tr>
                       ) : (
                          state.tripRequests.map(trip => (
                             <tr key={trip.id} className="hover:bg-gray-50 border-b last:border-0 border-gray-100 transition-colors">
                                <td className="px-6 py-4 font-medium">{trip.name}</td>
                                <td className="px-6 py-4">
                                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                      trip.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                      trip.status === 'booked' ? 'bg-green-100 text-green-700' :
                                      trip.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                      'bg-yellow-100 text-yellow-700'
                                   }`}>
                                      {trip.status.replace('_', ' ')}
                                   </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(trip.dateSubmitted).toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex justify-center gap-2">
                                   <button 
                                      onClick={() => setSelectedTrip(trip)}
                                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1"
                                   >
                                      View Details
                                   </button>
                                   <button onClick={() => deleteTripRequest(trip.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 size={16}/></button>
                                </td>
                             </tr>
                          ))
                       )}
                    </tbody>
                 </table>
               </div>
           </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && ( 
           <div className="space-y-6">
               <h1 className="text-3xl font-bold text-gray-800">الإعدادات العامة</h1>
               <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4 max-w-lg">
                   <div>
                       <label className="label">Site Name</label>
                       <input className="input-field" value={state.settings.siteName} onChange={e => updateSettings({ siteName: e.target.value })} />
                   </div>
                   <div>
                       <label className="label">Contact Email</label>
                       <input className="input-field" value={state.settings.contactEmail} onChange={e => updateSettings({ contactEmail: e.target.value })} />
                   </div>
                   <div>
                       <label className="label">Facebook Link</label>
                       <input className="input-field" value={state.settings.socialLinks.facebook || ''} onChange={e => updateSettings({ socialLinks: { ...state.settings.socialLinks, facebook: e.target.value } })} />
                   </div>
                   <div>
                       <label className="label">Maintenance Mode</label>
                       <div onClick={() => togglePlugin('maintenance-mode')} className="cursor-pointer p-3 border rounded bg-gray-50 hover:bg-gray-100 flex items-center justify-between">
                           <span>Enable Maintenance Screen</span>
                           <div className={`w-10 h-6 rounded-full relative transition-colors ${state.plugins.find(p => p.id === 'maintenance-mode')?.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${state.plugins.find(p => p.id === 'maintenance-mode')?.active ? 'left-5' : 'left-1'}`}></span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        )}

      </main>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

// Helper icon component for amenities
const Coffee = (props: any) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
)

export default AdminPanel;
