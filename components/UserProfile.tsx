
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Navigate, Link } from 'react-router-dom';
import { User, MapPin, Settings, Heart, LogOut, Camera, Shield, Bell, CreditCard } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { state, logout, updateProfile, isRtl } = useAppContext();
  const { currentUser, sites, bookmarks } = state;
  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'settings'>('overview');
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(currentUser?.name || '');
  const [tempPhone, setTempPhone] = useState(currentUser?.phone || '');

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleSave = () => {
    updateProfile({ name: tempName, phone: tempPhone });
    setEditing(false);
  };

  const bookmarkedSites = sites.filter(s => bookmarks.includes(s.id));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
         <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                     <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover border-4 border-gray-100" />
                     <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
                        <Camera size={14} />
                     </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
                  <p className="text-gray-500 text-sm mb-6">{currentUser.email}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Member Since {new Date(currentUser.joinedDate).getFullYear()}</p>
                  
                  <button onClick={logout} className="w-full py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 text-sm font-bold">
                     <LogOut size={16} /> Sign Out
                  </button>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <nav className="flex flex-col">
                     <button onClick={() => setActiveTab('overview')} className={`p-4 text-left flex items-center gap-3 font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <User size={18} /> Account Overview
                     </button>
                     <button onClick={() => setActiveTab('trips')} className={`p-4 text-left flex items-center gap-3 font-medium transition-colors ${activeTab === 'trips' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Heart size={18} /> My Trips <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{bookmarks.length}</span>
                     </button>
                     <button onClick={() => setActiveTab('settings')} className={`p-4 text-left flex items-center gap-3 font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Settings size={18} /> Settings
                     </button>
                  </nav>
               </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
               {activeTab === 'overview' && (
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                     <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-bold">Profile Details</h2>
                        <button 
                           onClick={() => editing ? handleSave() : setEditing(true)}
                           className={`px-4 py-2 rounded-lg text-sm font-bold ${editing ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                           {editing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                           {editing ? (
                              <input className="w-full p-2 border rounded" value={tempName} onChange={e => setTempName(e.target.value)} />
                           ) : (
                              <p className="text-lg text-gray-900 font-medium">{currentUser.name}</p>
                           )}
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                           <p className="text-lg text-gray-900 font-medium">{currentUser.email}</p>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
                           {editing ? (
                              <input className="w-full p-2 border rounded" value={tempPhone} onChange={e => setTempPhone(e.target.value)} placeholder="+962..." />
                           ) : (
                              <p className="text-lg text-gray-900 font-medium">{currentUser.phone || 'Not set'}</p>
                           )}
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nationality</label>
                           <p className="text-lg text-gray-900 font-medium">Jordanian</p>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'trips' && (
                  <div className="space-y-6 animate-fade-in">
                     <h2 className="text-2xl font-bold mb-4">Saved Destinations</h2>
                     {bookmarkedSites.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
                           <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                           <h3 className="text-xl font-bold text-gray-800 mb-2">No trips saved yet</h3>
                           <p className="text-gray-500 mb-6">Start exploring Jordan and save your favorite spots here.</p>
                           <Link to="/discover" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Explore Now</Link>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {bookmarkedSites.map(site => (
                              <Link to={`/site/${site.id}`} key={site.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex h-40">
                                 <div className="w-40 relative">
                                    <img src={site.imageUrl} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="p-4 flex-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-lg mb-1">{site.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{site.location}</p>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded w-fit">{site.category}</span>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     )}
                  </div>
               )}

               {activeTab === 'settings' && (
                  <div className="space-y-6 animate-fade-in">
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Bell size={24}/></div>
                           <div>
                              <h3 className="font-bold">Notifications</h3>
                              <p className="text-sm text-gray-500">Receive emails about new offers</p>
                           </div>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                           <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                           <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="bg-purple-50 p-3 rounded-full text-purple-600"><Shield size={24}/></div>
                           <div>
                              <h3 className="font-bold">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-500">Add an extra layer of security</p>
                           </div>
                        </div>
                        <button className="text-blue-600 font-bold text-sm">Enable</button>
                     </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="bg-green-50 p-3 rounded-full text-green-600"><CreditCard size={24}/></div>
                           <div>
                              <h3 className="font-bold">Payment Methods</h3>
                              <p className="text-sm text-gray-500">Manage your cards for bookings</p>
                           </div>
                        </div>
                        <button className="text-blue-600 font-bold text-sm">Manage</button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
